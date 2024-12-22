"use client";

import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/tabs";
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
  }, [activeTab]);

  return (
    <>
      <Tabs
        tabs={[
          { title: "UNGA-DISEC", value: "UNGA-DISEC" },
          { title: "UNGA-SOCHUM", value: "UNGA-SOCHUM" },
          { title: "UNSC", value: "UNSC" },
          { title: "JHES", value: "JHES" },
          { title: "CHAOS", value: "CHAOS" },
          { title: "AIPPM", value: "AIPPM" },
          { title: "ORF", value: "ORF" },
        ]}
        onTabChange={(tab) => setActiveTab(tab.value)} // Handle tab change
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Sr No.</TableHead>
              <TableHead>Delegate Name</TableHead>
              <TableHead>Portfolio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((delegate, idx) => (
                <TableRow key={delegate._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{delegate.participant_name || "N/A"}</TableCell>
                  <TableCell>
                    {delegate.allotment_portfolio || "Not Assigned"}
                  </TableCell>
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
      )}
    </>
  );
};

export default DelegateTable;
