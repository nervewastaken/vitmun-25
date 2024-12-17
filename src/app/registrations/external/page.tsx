"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ExternalDelegateForm = () => {
  const [formData, setFormData] = useState({
    participant_name: "",
    gender: "",
    contact_number: "",
    email_id: "",
    organisation_name: "",
    accommodation: "",
    committee_preference_1: "",
    allotment_preference_1_1: "",
    allotment_preference_1_2: "",
    allotment_preference_1_3: "",
    committee_preference_2: "",
    allotment_preference_2_1: "",
    allotment_preference_2_2: "",
    allotment_preference_2_3: "",
    committee_preference_3: "",
    allotment_preference_3_1: "",
    allotment_preference_3_2: "",
    allotment_preference_3_3: "",
    exp_delegate_muns: "",
    exp_delegate_text: "",
    exp_eb_muns: "",
    exp_eb_text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-delegate-form-ext", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Form submitted successfully!");
        console.log("Response Data:", data);
        setFormData({
          participant_name: "",
          gender: "",
          contact_number: "",
          email_id: "",
          organisation_name: "",
          accommodation: "",
          committee_preference_1: "",
          allotment_preference_1_1: "",
          allotment_preference_1_2: "",
          allotment_preference_1_3: "",
          committee_preference_2: "",
          allotment_preference_2_1: "",
          allotment_preference_2_2: "",
          allotment_preference_2_3: "",
          committee_preference_3: "",
          allotment_preference_3_1: "",
          allotment_preference_3_2: "",
          allotment_preference_3_3: "",
          exp_delegate_muns: "",
          exp_delegate_text: "",
          exp_eb_muns: "",
          exp_eb_text: "",
        });
      } else {
        alert("Failed to submit the form!");
        console.error("Error:", data);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="px-20">
      <h1 className="text-center text-2xl font-semibold mb-4">
        External Delegate Registration Form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md rounded-lg p-6"
      >
        {/* Participant Details */}

        <legend className="font-semibold text-lg">Participant Details</legend>
        <div className="space-y-4">
          {/* Row 1: Participant Name and Gender */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="participant_name">Participant Name</Label>
              <Input
                type="text"
                name="participant_name"
                value={formData.participant_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="gender">Gender</Label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="block w-full border rounded-md px-3 py-2"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 2: Contact Number and Email ID */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="email_id">Email ID</Label>
              <Input
                type="email"
                name="email_id"
                value={formData.email_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 3: Organisation Name and Accommodation */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="organisation_name">Organisation Name</Label>
              <Input
                type="text"
                name="organisation_name"
                value={formData.organisation_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="accommodation">Accommodation</Label>
              <select
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
                required
                className="block w-full border rounded-md px-3 py-2"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Committee Preferences */}

        <legend className="font-semibold text-lg">Committee Preferences</legend>
        {[1, 2, 3].map((pref) => (
          <div key={pref} className="space-y-2 mb-4">
            <Label htmlFor={`committee_preference_${pref}`}>
              Preference {pref}
            </Label>
            <select
              name={`committee_preference_${pref}`}
              value={formData[`committee_preference_${pref}`]}
              onChange={handleChange}
              required={pref === 1}
              className="block w-full border rounded-md px-3 py-2"
            >
              <option value="" disabled>
                Select a committee
              </option>
              <option value="UNGA-DISEC">UNGA-DISEC</option>
              <option value="UNGA-SOCHUM">UNGA-SOCHUM</option>
              <option value="UNSC">UNSC</option>
              <option value="Jackson Hole Economic Symposium (JHES)">
                Jackson Hole Economic Symposium (JHES)
              </option>
              <option value="CHAOS">CHAOS</option>
              <option value="AIPPM">AIPPM</option>
              <option value="specialised committee">
                Specialised Committee
              </option>
            </select>
            {[1, 2, 3].map((allotment) => (
              <div key={allotment}>
                <Label htmlFor={`allotment_preference_${pref}_${allotment}`}>
                  Allotment Preference {pref}.{allotment}
                </Label>
                <Input
                  type="text"
                  name={`allotment_preference_${pref}_${allotment}`}
                  value={formData[`allotment_preference_${pref}_${allotment}`]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        ))}

        {/* Experience Section */}

        <legend className="font-semibold text-lg">Experience</legend>
        <div className="space-y-4">
          <div>
            <Label htmlFor="exp_delegate_muns">MUNs as a Delegate</Label>
            <Input
              type="number"
              name="exp_delegate_muns"
              value={formData.exp_delegate_muns}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="exp_delegate_text">Delegate Experience</Label>
            <textarea
              name="exp_delegate_text"
              value={formData.exp_delegate_text}
              onChange={handleChange}
              className="block w-full border rounded-md px-3 py-2"
              rows="3"
            ></textarea>
          </div>
          <div>
            <Label htmlFor="exp_eb_muns">MUNs as an EB</Label>
            <Input
              type="number"
              name="exp_eb_muns"
              value={formData.exp_eb_muns}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="exp_eb_text">EB Experience</Label>
            <textarea
              name="exp_eb_text"
              value={formData.exp_eb_text}
              onChange={handleChange}
              className="block w-full border rounded-md px-3 py-2"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ExternalDelegateForm;
