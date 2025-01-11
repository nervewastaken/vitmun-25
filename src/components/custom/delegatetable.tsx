"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const DelegateTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("UNGA-DISEC");
  const [isMobileView, setIsMobileView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { title: "UNGA-DISEC", value: "UNGA-DISEC" },
    { title: "UNGA-SOCHUM", value: "UNGA-SOCHUM" },
    { title: "UNSC", value: "UNSC" },
    { title: "JHES", value: "JHES" },
    { title: "CHAOS", value: "CHAOS" },
    { title: "AIPPM", value: "AIPPM" },
    { title: "ORF", value: "ORF" },
  ];

  const fetchData = async (committee: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/allotments/?committee=${committee}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        console.error("Failed to fetch data:", result.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);

    // Detect screen size for responsive behavior
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // Initial check and event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Tabs or Collapsible Menu */}
      {isMobileView ? (
        <div className="relative">
          <button
            className="bg-gray-100 p-4 w-full rounded-lg flex justify-between items-center shadow-md"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="font-medium text-gray-700">{activeTab}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06-.02L10 10.17l3.71-3.98a.75.75 0 111.08 1.04l-4 4.28a.75.75 0 01-1.08 0l-4-4.28a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bg-white shadow-md w-full mt-2 rounded-lg z-10"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setActiveTab(tab.value);
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 ${
                      activeTab === tab.value
                        ? "bg-blue-500 text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex justify-center items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
          {tabs.map((tab) => (
            <motion.button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-2 rounded-lg text-sm font-medium ${
                activeTab === tab.value
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.title}
            </motion.button>
          ))}
        </div>
      )}

      {/* Data Table */}
      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-6"
        >
          Loading...
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Sr No.</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Delegate Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((delegate, idx) => (
                  <TableRow key={delegate._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      {delegate.allotment_portfolio || "Not Assigned"}
                    </TableCell>
                    <TableCell>{delegate.participant_name || "N/A"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </div>
  );
};

export default DelegateTable;
