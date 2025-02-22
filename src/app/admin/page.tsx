"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import * as XLSX from "xlsx";

// import { Trash } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Delegate {
  _id: string;
  participant_name?: string;
  gender?: string;
  contact_number?: string;
  email_id?: string;
  organisation_name?: string;
  accommodation?: string;
  allotment_committee?: string;
  allotment_portfolio?: string;
  paid: boolean;
  registration_number?: string;
  committee_preferences?: {
    preference_1?: {
      committee: string;
      allotments: [string, string, string]; // Array for 1.1, 1.2, 1.3
    };
    preference_2?: {
      committee: string;
      allotments: [string, string, string]; // Array for 2.1, 2.2, 2.3
    };
    preference_3?: {
      committee: string;
      allotments: [string, string, string]; // Array for 3.1, 3.2, 3.3
    };
  };
  experience?: {
    delegate: {
      muns: string;
      experience: string;
    };
    eb: {
      muns: string;
      experience: string;
    };
  };
}

interface Delegation {
  _id: string;
  organisation_name: string;
  head_delegate: string;
  email_id: string;
  contact_number: string;
  delegation_strength: number;
}

const AdminPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [externalDelegates, setExternalDelegates] = useState<Delegate[]>([]);
  const [internalDelegates, setInternalDelegates] = useState<Delegate[]>([]);
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUnallottedOnly, setShowUnallottedOnly] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateAllLunchStatus = async () => {
    if (
      !confirm(
        "Are you sure you want to reset the lunch status for all delegates?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/admin/update-lunch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.success) {
        alert(`Successfully reset lunch status for delegates!`);
      } else {
        alert("Failed to update lunch status.");
      }
    } catch (error) {
      console.error("Error updating lunch status:", error);
      alert("An error occurred while updating lunch status.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("isAdminLoggedIn", "true");
        setIsAuthenticated(true);
        setUsername("");
        setPassword("");
        await fetchData();
      } else {
        setLoginError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
    setExternalDelegates([]);
    setInternalDelegates([]);
    setDelegations([]);
    router.push("/admin");
  };
  // Fetch data from MongoDB
  const fetchData = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem("isAdminLoggedIn");
      if (!isLoggedIn) {
        setIsAuthenticated(false);
        return;
      }

      const [externalResponse, internalResponse, delegationResponse] =
        await Promise.all([
          fetch("/api/admin/external-delegates"),
          fetch("/api/admin/internal-delegates"),
          fetch("/api/admin/delegations"),
        ]);

      if (
        externalResponse.status === 401 ||
        internalResponse.status === 401 ||
        delegationResponse.status === 401
      ) {
        handleLogout();
        return;
      }

      const externalData = await externalResponse.json();
      const internalData = await internalResponse.json();
      const delegationData = await delegationResponse.json();

      // Filter external delegates: Skip those with missing committee preferences or experience
      const filteredExternalDelegates = (externalData.data || []).filter(
        (delegate: Delegate) => {
          return (
            delegate.committee_preferences &&
            delegate.experience &&
            delegate.experience.delegate &&
            delegate.experience.eb
          );
        }
      );

      // Set states
      setExternalDelegates(filteredExternalDelegates);
      setInternalDelegates(internalData.data || []);
      setDelegations(delegationData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error instanceof Error && error.message.includes("unauthorized")) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  // const deleteDelegate = async (type: "external" | "internal", id: string) => {
  //   try {
  //     const confirmation = window.confirm(
  //       "Are you sure you want to delete this delegate? This action cannot be undone."
  //     );
  //     if (!confirmation) return;

  //     const response = await fetch(
  //       `/api/admin/delete-delegate?type=${type}&id=${id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     const result = await response.json();

  //     if (response.ok && result.success) {
  //       alert("Delegate deleted successfully!");
  //       fetchData(); // Refresh the data after deletion
  //     } else {
  //       alert(result.error || "Failed to delete the delegate.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting delegate:", error);
  //     alert("An error occurred while deleting the delegate.");
  //   }
  // };

  const handleInternalChange = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    setInternalDelegates((prev) =>
      prev.map((delegate) =>
        delegate._id === id ? { ...delegate, [field]: value } : delegate
      )
    );
  };

  const handleExternalChange = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    setExternalDelegates((prev) =>
      prev.map((delegate) =>
        delegate._id === id ? { ...delegate, [field]: value } : delegate
      )
    );
  };

  // Update allotment details for internal and external delegates
  const updateDelegate = async (
    type: "external" | "internal",
    id: string,
    committee: string | undefined,
    portfolio: string | undefined,
    paid: boolean
  ) => {
    try {
      const response = await fetch(`/api/admin/update-delegate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          id,
          allotment_committee: committee,
          allotment_portfolio: portfolio,
          paid,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Updated successfully!");
        fetchData(); // Refresh data
      } else {
        alert("Failed to update.");
      }
    } catch (error) {
      console.error("Error updating delegate:", error);
      alert("An error occurred.");
    }
  };

  const filterDelegates = (delegates: Delegate[]) => {
    if (showUnallottedOnly) {
      return delegates.filter(
        (delegate) =>
          !delegate.allotment_committee || !delegate.allotment_portfolio
      );
    }
    return delegates;
  };

  const generateExcel = () => {
    const data = {
      internal: internalDelegates,
      external: externalDelegates,
      delegations: delegations,
    };

    const workbook = XLSX.utils.book_new();

    Object.entries(data).forEach(([sheetName, sheetData]) => {
      if (sheetData.length > 0) {
        const formattedData = sheetData.map((entry) => {
          const newEntry = { ...entry };

          // Remove unwanted fields
          delete newEntry._id;
          delete newEntry.committee_preferences;
          delete newEntry.experience;

          // Expand committee preferences
          if (entry.committee_preferences) {
            for (let i = 1; i <= 3; i++) {
              const preferenceKey = `preference_${i}`;
              newEntry[`Committee ${i}`] =
                entry.committee_preferences[preferenceKey]?.committee || "";
              newEntry[`Preference ${i}`] =
                entry.committee_preferences[preferenceKey]?.allotments?.join(
                  ", "
                ) || "";
            }
          }

          // Expand experience details
          if (entry.experience) {
            newEntry["Delegate MUNs"] = entry.experience.delegate?.muns || "";
            newEntry["Delegate Experience"] =
              entry.experience.delegate?.experience || "";
            newEntry["EB MUNs"] = entry.experience.eb?.muns || "";
            newEntry["EB Experience"] = entry.experience.eb?.experience || "";
          }

          return newEntry;
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
    });

    // Create and download the Excel file
    XLSX.writeFile(workbook, "delegate_allotments.xlsx");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = sessionStorage.getItem("isAdminLoggedIn");
      if (isLoggedIn === "true") {
        setIsAuthenticated(true);
        await fetchData();
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              VITMUN Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter admin username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter admin password"
                />
              </div>
              {loginError && (
                <div className="p-3 rounded bg-red-50 text-red-600 text-sm">
                  {loginError}
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Fixed Navbar */}
     <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
  <div className="max-w-7xl mx-auto px-4 py-2">
    <div className="flex justify-between items-center">
      <span className="text-lg font-bold">Admin Panel- VITMUN 25</span>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#internal"
              className="px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Internal
            </Link>
            <Link
              href="#external"
              className="px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              External
            </Link>
            <Link
              href="#delegations"
              className="px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Delegations
            </Link>
            <Link
              href="../allotments"
              className="px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Allotments
            </Link>

            <div className="flex items-center space-x-3">
              <Switch
                id="showUnallotted"
                checked={showUnallottedOnly}
                onCheckedChange={setShowUnallottedOnly}
              />
              <label
                htmlFor="showUnallotted"
                className="text-sm font-medium text-gray-200"
              >
                Show only unallotted
              </label>
              <Link
                href="/ext-del"
                className="px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Delegation
              </Link>
            </div>
            <Button
              className="mt-6 bg-red-600 text-white hover:bg-red-700"
              onClick={updateAllLunchStatus}
            >
              Reset Lunch
            </Button>

           <Button variant="secondary" onClick={handleLogout} className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </Button>
            <Button onClick={generateExcel} className="bg-green-500 text-white px-4 py-2 rounded">
              Download Excel
            </Button>
          </div>
           <div className="md:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:bg-blue-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </Button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden pt-4 pb-2 space-y-4">
        <div className="flex flex-col space-y-2">
          <Link
            href="#internal"
            className="px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Internal
          </Link>
          <Link
            href="#external"
            className="px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            External
          </Link>
          <Link
            href="#delegations"
            className="px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Delegations
          </Link>
          <Link
            href="../allotments"
            className="px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Allotments
          </Link>
        </div>

        <div className="flex flex-col space-y-4 border-t border-blue-500 pt-4">
          <div className="flex items-center space-x-3 px-4">
            <Switch
              id="showUnallotted"
              checked={showUnallottedOnly}
              onCheckedChange={setShowUnallottedOnly}
            />
            <label
              htmlFor="showUnallotted"
              className="text-sm font-medium text-gray-200"
            >
              Show only unallotted
            </label>
          </div>

          <Link
            href="/ext-del"
            className="px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Add Delegation
          </Link>

          <Button
            className="bg-red-600 text-white hover:bg-red-700 mx-4"
            onClick={() => {
              updateAllLunchStatus();
              setIsMenuOpen(false);
            }}
          >
            Reset Lunch
          </Button>

          <Button
            onClick={generateExcel}
            className="bg-green-500 text-white mx-4"
          >
            Download Excel
          </Button>

          <Button
            variant="secondary"
            onClick={handleLogout}
            className="bg-white text-blue-600 hover:bg-gray-100 mx-4 flex items-center gap-2"
          >
            {/* ... logout icon and text ... */}
          </Button>
        </div>
      </div>
    )}
  </div>
</nav>

      {/* Content Section */}
      <div id="top" className="w-full p-6 mt-[8vh] md:mt-[15vh] bg-gray-100 rounded-lg shadow-md">
        <ul className="mt-30 list-disc pl-8 space-y-2 text-gray-700">
          <li>
            Use <span className="font-semibold">Ctrl+F</span> or{" "}
            <span className="font-semibold">Cmd+F</span> to search for
            delegates.
          </li>
          <li>
            <span className="font-semibold text-red-600">DO NOT FORGET</span> to
            save your changes.
          </li>
        </ul>
      </div>

      <section id="external" className="mt-[0.5vh]">
        <div className="text-4xl p-12 text-center">External Delegates</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
          {filterDelegates(externalDelegates).map((external) => (
            <Card key={external._id} className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {external.participant_name || "Name not provided"}
                  </CardTitle>
                  {/* <Button
                    variant="destructive"
                    className="flex items-center space-x-2"
                    onClick={() => deleteDelegate("external", external._id)} // Replace "external" with "internal" for internal delegates
                  >
                    <Trash className="w-4 h-4" />
                  </Button> */}
                </div>
                <CardDescription>
                  <strong>Allotment Committee:</strong>{" "}
                  {external.allotment_committee || "Not Assigned"}
                  <br />
                  <strong>Portfolio:</strong>{" "}
                  {external.allotment_portfolio || "Not Assigned"}
                  <br />
                  <strong>Paid:</strong> {external.paid ? "Yes" : "No"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {/* Personal Details */}
                  <AccordionItem value="personalDetails">
                    <AccordionTrigger>Personal Details</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        <strong>Contact Number:</strong>{" "}
                        {external.contact_number || "Not Provided"}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {external.email_id || "Not Provided"}
                      </p>
                      <p>
                        <strong>Gender:</strong>{" "}
                        {external.gender || "Not Provided"}
                      </p>
                      <p>
                        <strong>Accommodation:</strong>{" "}
                        {external.accommodation || "Not Provided"}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Committee Preferences */}
                  <AccordionItem value="preferences">
                    <AccordionTrigger>Preferences</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(
                          external.committee_preferences || {}
                        ).map(
                          (
                            [preferenceKey, preferenceValue],
                            committeeIndex
                          ) => (
                            <div key={preferenceKey} className="space-y-1">
                              {/* Committee Header */}
                              <p className="text-lg font-semibold">
                                {committeeIndex + 1}){" "}
                                {preferenceValue.committee || "Not Assigned"}
                              </p>

                              {/* Allotments */}
                              <ul className="space-y-1 ">
                                {preferenceValue.allotments.map(
                                  (allotment, preferenceIndex) => (
                                    <li key={preferenceIndex}>
                                      {String.fromCharCode(
                                        97 + preferenceIndex
                                      )}
                                      ) {allotment || "Not Assigned"}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* MUN Experience */}
                  <AccordionItem value="mun-exp">
                    <AccordionTrigger>MUN Experience</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Delegate Experience */}
                        <div>
                          <p>
                            <strong>MUNs as Delegate:</strong>{" "}
                            {external.experience?.delegate?.muns || "N/A"}
                          </p>
                          <p>
                            <strong>Details:</strong>{" "}
                            {external.experience?.delegate?.experience || "N/A"}
                          </p>
                        </div>

                        {/* EB Experience */}
                        <div>
                          <p>
                            <strong>MUNs as EB:</strong>{" "}
                            {external.experience?.eb?.muns || "N/A"}
                          </p>
                          <p>
                            <strong>Details:</strong>{" "}
                            {external.experience?.eb?.experience || "N/A"}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Edit Allotment</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Allotment Details</SheetTitle>
                      <SheetDescription>
                        Make changes to allotment details and save them.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="allotment_committee"
                          className="text-right"
                        >
                          Committee
                        </Label>
                        <select
                          id="allotment_committee"
                          defaultValue={external.allotment_committee || ""}
                          onChange={(e) =>
                            handleExternalChange(
                              external._id,
                              "allotment_committee",
                              e.target.value
                            )
                          }
                          className="col-span-3 border rounded-md px-3 py-2"
                        >
                          <option value="" disabled>
                            Select Committee
                          </option>
                          <option value="UNGA-DISEC">UNGA-DISEC</option>
                          <option value="UNGA-SOCHUM">UNGA-SOCHUM</option>
                          <option value="UNSC">UNSC</option>
                          <option value="JHES">
                            Jackson Hole Economic Symposium (JHES)
                          </option>
                          <option value="CHAOS">CHAOS</option>
                          <option value="AIPPM">AIPPM</option>
                          <option value="ORF">ORF</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="allotment_portfolio"
                          className="text-right"
                        >
                          Portfolio
                        </Label>
                        <Input
                          id="allotment_portfolio"
                          defaultValue={external.allotment_portfolio}
                          onChange={(e) =>
                            handleExternalChange(
                              external._id,
                              "allotment_portfolio",
                              e.target.value
                            )
                          }
                          placeholder="Allotment Portfolio"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="paid" className="text-right">
                          Paid
                        </Label>
                        <select
                          id="paid"
                          defaultValue={external.paid?.toString() || "false"}
                          onChange={(e) =>
                            handleExternalChange(
                              external._id,
                              "paid",
                              e.target.value === "true"
                            )
                          }
                          className="col-span-3 border rounded-md px-3 py-2"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button
                          onClick={() =>
                            updateDelegate(
                              "external",
                              external._id,
                              external.allotment_committee,
                              external.allotment_portfolio,
                              external.paid
                            )
                          }
                        >
                          Save Changes
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Internal Delegates Section */}
      <section id="internal" className="mb-10 ">
        <div className="text-4xl p-24 text-center">Internal Delegates</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
          {filterDelegates(internalDelegates).map((internal) => (
            <Card key={internal._id} className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {internal.participant_name || "Name not provided"}
                  </CardTitle>
                  {/* <Button
                    variant="destructive"
                    className="flex items-center space-x-2"
                    onClick={() => deleteDelegate("internal", internal._id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button> */}
                </div>
                <CardDescription>
                  <strong>Allotment Committee:</strong>{" "}
                  {internal.allotment_committee || "Not Assigned"}
                  <br />
                  <strong>Portfolio:</strong>{" "}
                  {internal.allotment_portfolio || "Not Assigned"}
                  <br />
                  <strong>Paid:</strong> {internal.paid ? "Yes" : "No"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {/* Personal Details */}
                  <AccordionItem value="personalDetails">
                    <AccordionTrigger>Personal Details</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        <strong>Registration Number:</strong>{" "}
                        {internal.registration_number || "Not Provided"}
                      </p>
                      <p>
                        <strong>Contact Number:</strong>{" "}
                        {internal.contact_number || "Not Provided"}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {internal.email_id || "Not Provided"}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Committee Preferences */}
                  <AccordionItem value="preferences">
                    <AccordionTrigger>Preferences</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(
                          internal.committee_preferences || {}
                        ).map(
                          (
                            [preferenceKey, preferenceValue],
                            committeeIndex
                          ) => (
                            <div key={preferenceKey} className="space-y-1">
                              {/* Committee Header */}
                              <p className="text-lg font-semibold">
                                {committeeIndex + 1}){" "}
                                {preferenceValue.committee || "Not Assigned"}
                              </p>

                              {/* Allotments */}
                              <ul className="space-y-1 ">
                                {preferenceValue.allotments.map(
                                  (allotment, preferenceIndex) => (
                                    <li key={preferenceIndex}>
                                      {String.fromCharCode(
                                        97 + preferenceIndex
                                      )}
                                      ) {allotment || "Not Assigned"}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="mun-exp">
                    <AccordionTrigger>MUN Experience</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Delegate Experience */}
                        <div>
                          <p>
                            <strong>MUNs as Delegate:</strong>{" "}
                            {internal.experience?.delegate?.muns || "N/A"}
                          </p>
                          <p>
                            <strong>Details:</strong>{" "}
                            {internal.experience?.delegate?.experience || "N/A"}
                          </p>
                        </div>

                        {/* EB Experience */}
                        <div>
                          <p>
                            <strong>MUNs as EB:</strong>{" "}
                            {internal.experience?.eb?.muns || "N/A"}
                          </p>
                          <p>
                            <strong>Details:</strong>{" "}
                            {internal.experience?.eb?.experience || "N/A"}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Edit Allotment</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Allotment Details</SheetTitle>
                      <SheetDescription>
                        Make changes to allotment details and save them.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="allotment_committee"
                          className="text-right"
                        >
                          Committee
                        </Label>
                        <select
                          id="allotment_committee"
                          defaultValue={internal.allotment_committee || ""}
                          onChange={(e) =>
                            handleInternalChange(
                              internal._id,
                              "allotment_committee",
                              e.target.value
                            )
                          }
                          className="col-span-3 border rounded-md px-3 py-2"
                        >
                          <option value="" disabled>
                            Select Committee
                          </option>
                          <option value="UNGA-DISEC">UNGA-DISEC</option>
                          <option value="UNGA-SOCHUM">UNGA-SOCHUM</option>
                          <option value="UNSC">UNSC</option>
                          <option value="JHES">
                            Jackson Hole Economic Symposium (JHES)
                          </option>
                          <option value="CHAOS">CHAOS</option>
                          <option value="AIPPM">AIPPM</option>
                          <option value="ORF">ORF</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="allotment_portfolio"
                          className="text-right"
                        >
                          Portfolio
                        </Label>
                        <Input
                          id="allotment_portfolio"
                          defaultValue={internal.allotment_portfolio}
                          onChange={(e) =>
                            handleInternalChange(
                              internal._id,
                              "allotment_portfolio",
                              e.target.value
                            )
                          }
                          placeholder="Allotment Portfolio"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="paid" className="text-right">
                          Paid
                        </Label>
                        <select
                          id="paid"
                          defaultValue={(internal.paid !== undefined
                            ? internal.paid
                            : true
                          ).toString()}
                          onChange={(e) =>
                            handleInternalChange(
                              internal._id,
                              "paid",
                              e.target.value === "true"
                            )
                          }
                          className="col-span-3 border rounded-md px-3 py-2"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button
                          onClick={() =>
                            updateDelegate(
                              "internal",
                              internal._id,
                              internal.allotment_committee,
                              internal.allotment_portfolio,
                              internal.paid
                            )
                          }
                        >
                          Save Changes
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Delegations Section */}
      <section id="delegations">
        <div className="text-4xl p-8 text-center">Delegations</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {delegations.map((delegation) => (
            <Card key={delegation._id} className="p-4">
              <p>
                <strong>Organisation Name:</strong>{" "}
                {delegation.organisation_name}
              </p>
              <p>
                <strong>Head Delegate:</strong> {delegation.head_delegate}
              </p>
              <p>
                <strong>Email:</strong> {delegation.email_id}
              </p>
              <p>
                <strong>Contact Number:</strong> {delegation.contact_number}
              </p>
              <p>
                <strong>Delegation Strength:</strong>{" "}
                {delegation.delegation_strength}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminPage;
