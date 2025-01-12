"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";

import { Trash } from "lucide-react";

import { Fragment } from "react";
import Link from "next/link";
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
  const [showUnallottedOnly, setShowUnallottedOnly] = useState(false);

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

  const deleteDelegate = async (type: "external" | "internal", id: string) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this delegate? This action cannot be undone."
      );
      if (!confirmation) return;

      const response = await fetch(
        `/api/admin/delete-delegate?type=${type}&id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Delegate deleted successfully!");
        fetchData(); // Refresh the data after deletion
      } else {
        alert(result.error || "Failed to delete the delegate.");
      }
    } catch (error) {
      console.error("Error deleting delegate:", error);
      alert("An error occurred while deleting the delegate.");
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

  const filterDelegates = (delegates: Delegate[]) => {
    if (showUnallottedOnly) {
      return delegates.filter(
        (delegate) =>
          !delegate.allotment_committee || !delegate.allotment_portfolio
      );
    }
    return delegates;
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
        <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50 ">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <span className="text-lg font-bold mx-auto sm:mx-0">
              Admin Panel- VITMUN 25
            </span>
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
              <UserButton />

              <div className="flex items-center space-x-4 mb-6">
                <Switch
                  id="showUnallotted"
                  checked={showUnallottedOnly}
                  onCheckedChange={setShowUnallottedOnly} // Update state when toggled
                />
                <label
                  htmlFor="showUnallotted"
                  className="text-sm font-medium text-gray-700"
                >
                  Show only unallotted delegates
                </label>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Section */}
        <div id="top" className="p-6 mt-16 bg-gray-100 rounded-lg shadow-md">
          <ul className="list-disc pl-8 space-y-2 text-gray-700">
            <li>
              Use <span className="font-semibold">Ctrl+F</span> or{" "}
              <span className="font-semibold">Cmd+F</span> to search for
              delegates.
            </li>
            <li>
              <span className="font-semibold text-red-600">DO NOT FORGET</span>{" "}
              to save your changes.
            </li>
          </ul>
        </div>

        <section id="external">
          <div className="text-4xl p-24 text-center">External Delegates</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
            {filterDelegates(externalDelegates).map((external) => (
              <Card key={external._id} className="w-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {external.participant_name || "Name not provided"}
                    </CardTitle>
                    <Button
                      variant="destructive"
                      className="flex items-center space-x-2"
                      onClick={() => deleteDelegate("external", external._id)} // Replace "external" with "internal" for internal delegates
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
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
                              {external.experience?.delegate?.experience ||
                                "N/A"}
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
                            defaultValue={external.paid.toString()}
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
                    <Button
                      variant="destructive"
                      className="flex items-center space-x-2"
                      onClick={() => deleteDelegate("internal", internal._id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
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
                              {internal.experience?.delegate?.experience ||
                                "N/A"}
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
                            defaultValue={internal.paid.toString()}
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
