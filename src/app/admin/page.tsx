"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const AdminPage = () => {
  const [externalDelegates, setExternalDelegates] = useState([]);
  const [internalDelegates, setInternalDelegates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from MongoDB
  const fetchDelegates = async () => {
    try {
      const externalResponse = await fetch("/api/admin/external-delegates");
      const internalResponse = await fetch("/api/admin/internal-delegates");

      const externalData = await externalResponse.json();
      const internalData = await internalResponse.json();

      setExternalDelegates(externalData.data);
      setInternalDelegates(internalData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update allotment details
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
        alert("Delegate updated successfully!");
        fetchDelegates(); // Refresh data
      } else {
        alert("Failed to update delegate.");
      }
    } catch (error) {
      console.error("Error updating delegate:", error);
      alert("An error occurred.");
    }
  };

  useEffect(() => {
    fetchDelegates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignedIn>
        <div>
          <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
          <p className="mb-6">Manage Delegates</p>

          {/* External Delegates Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">External Delegates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {externalDelegates.map((delegate) => (
                <Card key={delegate._id} className="p-4">
                  <p><strong>Participant Name:</strong> {delegate.participant_name}</p>
                  <p><strong>Gender:</strong> {delegate.gender}</p>
                  <p><strong>Contact Number:</strong> {delegate.contact_number}</p>
                  <p><strong>Email:</strong> {delegate.email_id}</p>
                  <p><strong>Organisation:</strong> {delegate.organisation_name}</p>
                  <p><strong>Accommodation:</strong> {delegate.accommodation}</p>
                  <p><strong>Committee Preferences:</strong></p>
                  <ul>
                    <li><strong>Preference 1:</strong> {delegate.committee_preferences.preference_1?.committee}</li>
                    <li><strong>Preference 2:</strong> {delegate.committee_preferences.preference_2?.committee}</li>
                    <li><strong>Preference 3:</strong> {delegate.committee_preferences.preference_3?.committee}</li>
                  </ul>
                  <p><strong>Experience:</strong></p>
                  <ul>
                    <li><strong>Delegate MUNs:</strong> {delegate.experience.delegate.muns}</li>
                    <li><strong>Delegate Experience:</strong> {delegate.experience.delegate.experience}</li>
                    <li><strong>EB MUNs:</strong> {delegate.experience.eb.muns}</li>
                    <li><strong>EB Experience:</strong> {delegate.experience.eb.experience}</li>
                  </ul>
                  <p><strong>Allotment Committee:</strong> {delegate.allotment_committee || "Not Assigned"}</p>
                  <p><strong>Allotment Portfolio:</strong> {delegate.allotment_portfolio || "Not Assigned"}</p>
                  <div>
                    <input
                      type="text"
                      placeholder="Allotment Committee"
                      defaultValue={delegate.allotment_committee}
                      onChange={(e) => delegate.allotment_committee = e.target.value}
                      className="mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Allotment Portfolio"
                      defaultValue={delegate.allotment_portfolio}
                      onChange={(e) => delegate.allotment_portfolio = e.target.value}
                      className="mb-4"
                    />
                    <Button
                      onClick={() =>
                        updateDelegate(
                          "external",
                          delegate._id,
                          delegate.allotment_committee,
                          delegate.allotment_portfolio
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
          <section>
            <h2 className="text-xl font-semibold mb-4">Internal Delegates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {internalDelegates.map((delegate) => (
                <Card key={delegate._id} className="p-4">
                  <p><strong>Participant Name:</strong> {delegate.participant_name}</p>
                  <p><strong>Gender:</strong> {delegate.gender}</p>
                  <p><strong>Contact Number:</strong> {delegate.contact_number}</p>
                  <p><strong>Email:</strong> {delegate.email_id}</p>
                  <p><strong>Committee Preferences:</strong></p>
                  <ul>
                    <li><strong>Preference 1:</strong> {delegate.committee_preferences.preference_1?.committee}</li>
                    <li><strong>Preference 2:</strong> {delegate.committee_preferences.preference_2?.committee}</li>
                    <li><strong>Preference 3:</strong> {delegate.committee_preferences.preference_3?.committee}</li>
                  </ul>
                  <p><strong>Experience:</strong></p>
                  <ul>
                    <li><strong>Delegate MUNs:</strong> {delegate.experience.delegate.muns}</li>
                    <li><strong>Delegate Experience:</strong> {delegate.experience.delegate.experience}</li>
                    <li><strong>EB MUNs:</strong> {delegate.experience.eb.muns}</li>
                    <li><strong>EB Experience:</strong> {delegate.experience.eb.experience}</li>
                  </ul>
                  <p><strong>Allotment Committee:</strong> {delegate.allotment_committee || "Not Assigned"}</p>
                  <p><strong>Allotment Portfolio:</strong> {delegate.allotment_portfolio || "Not Assigned"}</p>
                  <div>
                    <input
                      type="text"
                      placeholder="Allotment Committee"
                      defaultValue={delegate.allotment_committee}
                      onChange={(e) => delegate.allotment_committee = e.target.value}
                      className="mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Allotment Portfolio"
                      defaultValue={delegate.allotment_portfolio}
                      onChange={(e) => delegate.allotment_portfolio = e.target.value}
                      className="mb-4"
                    />
                    <Button
                      onClick={() =>
                        updateDelegate(
                          "internal",
                          delegate._id,
                          delegate.allotment_committee,
                          delegate.allotment_portfolio
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
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default AdminPage;