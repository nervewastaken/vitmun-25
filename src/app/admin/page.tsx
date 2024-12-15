"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const AdminPage = () => {
  const [externalDelegates, setExternalDelegates] = useState([]);
  const [internalDelegates, setInternalDelegates] = useState([]);
  const [delegations, setDelegations] = useState([]);
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

  // Update allotment details for internal and external delegates
  const updateDelegate = async (type, id, committee, portfolio) => {
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
        <div>
          <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
          <p className="mb-6">
            Manage Internal Delegates, External Delegates, and Delegations
          </p>

          {/* External Delegates Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">External Delegates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {externalDelegates.map((external) => (
                <Card key={external._id} className="p-4">
                  <p>
                    <strong>Participant Name:</strong>{" "}
                    {external.participant_name}
                  </p>
                  <p>
                    <strong>Gender:</strong> {external.gender}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {external.contact_number}
                  </p>
                  <p>
                    <strong>Email:</strong> {external.email_id}
                  </p>
                  <p>
                    <strong>Organisation:</strong> {external.organisation_name}
                  </p>
                  <p>
                    <strong>Accommodation:</strong> {external.accommodation}
                  </p>
                  <p>
                    <strong>Allotment Committee:</strong>{" "}
                    {external.allotment_committee || "Not Assigned"}
                  </p>
                  <p>
                    <strong>Allotment Portfolio:</strong>{" "}
                    {external.allotment_portfolio || "Not Assigned"}
                  </p>
                  <p>
                    <strong>Committee Preferences:</strong>
                  </p>
                  <ul>
                    {Object.entries(external.committee_preferences || {}).map(
                      ([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong>{" "}
                          {value?.committee || "Not Assigned"}
                          <ul>
                            {(value?.allotments || []).map((allotment, idx) => (
                              <li key={idx}>
                                {key}.{idx + 1}: {allotment || "Not Assigned"}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                  <div>
                    <input
                      type="text"
                      placeholder="Allotment Committee"
                      defaultValue={external.allotment_committee}
                      onChange={(e) =>
                        (external.allotment_committee = e.target.value)
                      }
                      className="mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Allotment Portfolio"
                      defaultValue={external.allotment_portfolio}
                      onChange={(e) =>
                        (external.allotment_portfolio = e.target.value)
                      }
                      className="mb-4"
                    />
                    <Button
                      onClick={() =>
                        updateDelegate(
                          "external",
                          external._id,
                          external.allotment_committee,
                          external.allotment_portfolio
                        )
                      }
                    >
                      Save Changes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Internal Delegates Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Internal Delegates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {internalDelegates.map((internal) => (
                <Card key={internal._id} className="p-4">
                  <p>
                    <strong>Registration Number:</strong>{" "}
                    {internal.registration_number}
                  </p>
                  <p>
                    <strong>Participant Name:</strong>{" "}
                    {internal.participant_name}
                  </p>
                  <p>
                    <strong>Gender:</strong> {internal.gender}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {internal.contact_number}
                  </p>
                  <p>
                    <strong>Email:</strong> {internal.email_id}
                  </p>
                  <p>
                    <strong>Committee Preferences:</strong>
                  </p>
                  <ul>
                    {Object.entries(internal.committee_preferences || {}).map(
                      ([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value.committee}
                          <ul>
                            {value.allotments.map((allotment, idx) => (
                              <li key={idx}>
                                {key}.{idx + 1}: {allotment || "Not Assigned"}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                  <div>
                    <input
                      type="text"
                      placeholder="Allotment Committee"
                      defaultValue={internal.allotment_committee}
                      onChange={(e) =>
                        (internal.allotment_committee = e.target.value)
                      }
                      className="mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Allotment Portfolio"
                      defaultValue={internal.allotment_portfolio}
                      onChange={(e) =>
                        (internal.allotment_portfolio = e.target.value)
                      }
                      className="mb-4"
                    />
                    <Button
                      onClick={() =>
                        updateDelegate(
                          "internal",
                          internal._id,
                          internal.allotment_committee,
                          internal.allotment_portfolio
                        )
                      }
                    >
                      Save Changes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Delegations Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Delegations</h2>
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
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default AdminPage;
