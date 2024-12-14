"use client";
import React, { useState } from "react";

const DelegateForm = () => {
  const [formData, setFormData] = useState({
    participant_name: "",
    gender: "",
    contact_number: "",
    email_id: "",
    organisation_name: "",
    accommodation: "",
    committee_preference_1: "",
    committee_preference_2: "",
    committee_preference_3: "",
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
      const response = await fetch("/api/submit-delegate-form", {
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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Delegate Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Participant Details */}
        <fieldset style={{ marginBottom: "20px" }}>
          <legend>Participant Details</legend>
          <label>
            Participant Name:
            <input
              type="text"
              name="participant_name"
              value={formData.participant_name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <label>
            Contact Number:
            <input
              type="tel"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Email ID:
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Organisation Name:
            <input
              type="text"
              name="organisation_name"
              value={formData.organisation_name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Accommodation:
            <select
              name="accommodation"
              value={formData.accommodation}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </fieldset>

        {/* Committee Preferences */}
        <fieldset style={{ marginBottom: "20px" }}>
          <legend>Committee Preferences</legend>
          <label>
            Preference 1:
            <input
              type="text"
              name="committee_preference_1"
              value={formData.committee_preference_1}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Preference 2:
            <input
              type="text"
              name="committee_preference_2"
              value={formData.committee_preference_2}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Preference 3:
            <input
              type="text"
              name="committee_preference_3"
              value={formData.committee_preference_3}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        {/* Experience Section */}
        <fieldset style={{ marginBottom: "20px" }}>
          <legend>Experience as Delegate</legend>
          <label>
            MUNs as a Delegate:
            <input
              type="number"
              name="exp_delegate_muns"
              value={formData.exp_delegate_muns}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Experience:
            <textarea
              name="exp_delegate_text"
              value={formData.exp_delegate_text}
              onChange={handleChange}
            ></textarea>
          </label>
        </fieldset>

        <fieldset style={{ marginBottom: "20px" }}>
          <legend>Experience as EB</legend>
          <label>
            MUNs as an EB:
            <input
              type="number"
              name="exp_eb_muns"
              value={formData.exp_eb_muns}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Experience:
            <textarea
              name="exp_eb_text"
              value={formData.exp_eb_text}
              onChange={handleChange}
            ></textarea>
          </label>
        </fieldset>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DelegateForm;