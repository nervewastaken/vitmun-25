"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Delegate {
  _id?: string;
  participant_name: string;
  email_id: string;
  contact_number: string;
  allotment_committee: string;
  allotment_portfolio: string;
  gender?: string;
  organisation_name?: string;
  accommodation?: string;
  registration_number?: string;
  committee_preferences?: unknown;
  experience?: unknown;
  lunch?: unknown;
}

const AddExternalDelegate = () => {
  const [formData, setFormData] = useState<Delegate>({
    participant_name: "",
    email_id: "",
    contact_number: "",
    allotment_committee: "",
    allotment_portfolio: "",
  });

  const [recentDelegates, setRecentDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch recent delegates
  const fetchRecentDelegates = async () => {
    try {
      const response = await fetch("/api/admin/ext-del");
      const data = await response.json();

      // Filter only the delegates with required fields filled and other fields empty
      const filteredDelegates = (data.data || []).filter(
        (delegate: Delegate) =>
          delegate.participant_name &&
          delegate.email_id &&
          delegate.contact_number &&
          delegate.allotment_committee &&
          delegate.allotment_portfolio &&
          !delegate.gender &&
          !delegate.organisation_name &&
          !delegate.accommodation &&
          !delegate.registration_number &&
          !delegate.committee_preferences &&
          !delegate.experience
      );

      setRecentDelegates(filteredDelegates);
    } catch (error) {
      console.error("Error fetching delegates:", error);
    }
  };

  // Submit new delegate
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/ext-del", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Delegate added successfully!");
        setFormData({
          participant_name: "",
          email_id: "",
          contact_number: "",
          allotment_committee: "",
          allotment_portfolio: "",
        });
        fetchRecentDelegates(); // Refresh list
      } else {
        alert("Error adding delegate.");
      }
    } catch (error) {
      console.error("Error adding delegate:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentDelegates();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add External Delegate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="participant_name">Name</Label>
            <Input
              id="participant_name"
              name="participant_name"
              type="text"
              value={formData.participant_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contact_number">Contact</Label>
            <Input
              id="contact_number"
              name="contact_number"
              type="text"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email_id">Email</Label>
          <Input
            id="email_id"
            name="email_id"
            type="email"
            value={formData.email_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="allotment_committee">Committee</Label>
            {/* <Input
              id="allotment_committee"
              name="allotment_committee"
              type="text"
              value={formData.allotment_committee}
              onChange={handleChange}
              required
            /> */}

            <select
              id="allotment_committee"
              name="allotment_committee"
              value={formData.allotment_committee}
              onChange={handleChange}
              required
              
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
          <div>
            <Label htmlFor="allotment_portfolio">Portfolio</Label>
            <Input
              id="allotment_portfolio"
              name="allotment_portfolio"
              type="text"
              value={formData.allotment_portfolio}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Delegate"}
        </Button>
      </form>

      <h3 className="text-xl font-bold mt-6">Recently Added Delegates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {recentDelegates.map((delegate) => (
          <Card key={delegate._id}>
            <CardHeader>
              <CardTitle>{delegate.participant_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Contact:</strong> {delegate.contact_number}
              </p>
              <p>
                <strong>Committee:</strong> {delegate.allotment_committee}
              </p>
              <p>
                <strong>Portfolio:</strong> {delegate.allotment_portfolio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddExternalDelegate;
