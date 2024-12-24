"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

interface CommitteePreference {
  committee?: string;
  allotments: string[];
}

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
  committee_preferences?: Record<string, CommitteePreference>;
}

interface Delegation {
  _id: string;
  organisationName: string;
  headDelegate: string;
  email: string;
  contactNumber: string;
  delegationStrength: number;
}

const AdminPage = () => {
  const [externalDelegates, setExternalDelegates] = useState<Delegate[]>([]);
  const [internalDelegates, setInternalDelegates] = useState<Delegate[]>([]);
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from MongoDB
  const fetchData = async () => {
    try {
      const [externalResponse, internalResponse, delegationResponse] =
        await Promise.all([
          fetch("/api/admin/external-delegates"),
          fetch("/api/admin/internal-delegates"),
          fetch("/api/admin/delegations"),
        ]);

      const externalData = await externalResponse.json();
      const internalData = await internalResponse.json();
      const delegationData = await delegationResponse.json();

      setExternalDelegates(externalData.data || []);
      setInternalDelegates(internalData.data || []);
      setDelegations(delegationData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignedIn>
  {/* Fixed Navbar */}
  <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
    <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
      <span className="text-lg font-bold mx-auto sm:mx-0">Admin Panel- VITMUN 25</span>
      <div className="hidden sm:flex space-x-4">
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
      </div>
    </div>
  </nav>

  {/* Content Section */}
  <div id="top" className="p-6 mt-16 bg-gray-100 rounded-lg shadow-md">
    <ul className="list-disc pl-8 space-y-2 text-gray-700">
      <li>
        Use <span className="font-semibold">Ctrl+F</span> or <span className="font-semibold">Cmd+F</span> to search for delegates.
      </li>
      <li>
        <span className="font-semibold text-red-600">DO NOT FORGET</span> to save your changes.
      </li>
      <li>
        <span className="font-semibold text-red-600">Confidential:</span> This page is extremely confidential and should only be accessed by the Core Secretariat and USG-Delegate Affairs and USG-Hospitality.
      </li>
    </ul>
  </div>


        <div className="text-4xl px-42">External Delegates</div>
        <section id="external">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {externalDelegates.map((external) => (
                <Fragment key={external._id}>
                  <TableRow>
                    <TableCell>
                      <strong>Participant Name:</strong>
                    </TableCell>
                    <TableCell>
                      {external.participant_name || "Not Provided"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Gender:</strong>
                    </TableCell>
                    <TableCell>{external.gender || "Not Provided"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Contact Number:</strong>
                    </TableCell>
                    <TableCell>
                      {external.contact_number || "Not Provided"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Email:</strong>
                    </TableCell>
                    <TableCell>{external.email_id || "Not Provided"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Organisation:</strong>
                    </TableCell>
                    <TableCell>
                      {external.organisation_name || "Not Provided"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Accommodation:</strong>
                    </TableCell>
                    <TableCell>
                      {external.accommodation || "Not Provided"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Committee Preferences:</strong>
                    </TableCell>
                    <TableCell>
                      <ul>
                        {Object.entries(
                          external.committee_preferences || {}
                        ).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong>{" "}
                            {value?.committee || "Not Assigned"}
                            <ul>
                              {(value?.allotments || []).map(
                                (allotment, idx) => (
                                  <li key={idx}>
                                    {key}.{idx + 1}:{" "}
                                    {allotment || "Not Assigned"}
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Paid?:</strong>
                    </TableCell>
                    <TableCell>{external.paid ? "Yes" : "No"}</TableCell>
                  </TableRow>

                  {/* Editing Fields */}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex-1">
                          <select
                            name="allotment_committee"
                            value={external.allotment_committee || ""}
                            onChange={(e) =>
                              handleExternalChange(
                                external._id,
                                "allotment_committee",
                                e.target.value
                              )
                            }
                            className="w-full border rounded-lg px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-[#54B3EA]"
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

                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Allotment Portfolio"
                            defaultValue={external.allotment_portfolio}
                            onChange={(e) =>
                              handleExternalChange(
                                external._id,
                                "allotment_portfolio",
                                e.target.value
                              )
                            }
                            className="w-full border rounded-lg px-4 py-2"
                          />
                        </div>

                        <div className="flex-1">
                          <select
                            value={external.paid.toString()}
                            onChange={(e) =>
                              handleExternalChange(
                                external._id,
                                "paid",
                                e.target.value === "true"
                              )
                            }
                            className="w-full border rounded-lg px-4 py-2"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
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
                      </div>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* Internal Delegates Section */}
        <section id="internal" className="mb-10 ">
          <h2 className="text-4xl font-semibold mb-4">Internal Delegates</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internalDelegates.map((internal) => (
                <Fragment key={internal._id}>
                  <TableRow>
                    <TableCell>
                      <strong>Registration Number:</strong>
                    </TableCell>
                    <TableCell>
                      {internal.registration_number || "Not Provided"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Participant Name:</strong>
                    </TableCell>
                    <TableCell>
                      {internal.participant_name || "Not Provided"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Gender:</strong>
                    </TableCell>
                    <TableCell>{internal.gender || "Not Provided"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Contact Number:</strong>
                    </TableCell>
                    <TableCell>
                      {internal.contact_number || "Not Provided"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Email:</strong>
                    </TableCell>
                    <TableCell>{internal.email_id || "Not Provided"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Committee Preferences:</strong>
                    </TableCell>
                    <TableCell>
                      <ul>
                        {Object.entries(
                          internal.committee_preferences || {}
                        ).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong>{" "}
                            {value.committee || "Not Assigned"}
                            <ul>
                              {value.allotments.map((allotment, idx) => (
                                <li key={idx}>
                                  {key}.{idx + 1}: {allotment || "Not Assigned"}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Paid?:</strong>
                    </TableCell>
                    <TableCell>{internal.paid || "Not Provided"}</TableCell>
                  </TableRow>

                  {/* Editing Fields */}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex-1">
                          <select
                            value={internal.allotment_committee || ""}
                            onChange={(e) =>
                              handleInternalChange(
                                internal._id,
                                "allotment_committee",
                                e.target.value
                              )
                            }
                            className="w-full border rounded-lg px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-[#54B3EA]"
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

                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Allotment Portfolio"
                            defaultValue={internal.allotment_portfolio}
                            onChange={(e) =>
                              handleInternalChange(
                                internal._id,
                                "allotment_portfolio",
                                e.target.value
                              )
                            }
                            className="w-full border rounded-lg px-4 py-2"
                          />
                        </div>

                        <div className="flex-1">
                          <select
                            value={internal.paid.toString()}
                            onChange={(e) =>
                              handleInternalChange(
                                internal._id,
                                "paid",
                                e.target.value === "true"
                              )
                            }
                            className="w-full border rounded-lg px-4 py-2"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
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
                      </div>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* Delegations Section */}
        <section id="delegations">
          <h2 className="text-4xl font-semibold">Delegations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {delegations.map((delegation) => (
              <Card key={delegation._id} className="p-4">
                <p>
                  <strong>Organisation Name:</strong>{" "}
                  {delegation.organisationName}
                </p>
                <p>
                  <strong>Head Delegate:</strong> {delegation.headDelegate}
                </p>
                <p>
                  <strong>Email:</strong> {delegation.email}
                </p>
                <p>
                  <strong>Contact Number:</strong> {delegation.contactNumber}
                </p>
                <p>
                  <strong>Delegation Strength:</strong>{" "}
                  {delegation.delegationStrength}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default AdminPage;
