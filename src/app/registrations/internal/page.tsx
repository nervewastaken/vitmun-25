"use client";
import React, { useState } from "react";

const InternalDelegateForm = () => {
  const [formData, setFormData] = useState({
    registration_number: "",
    participant_name: "",
    gender: "",
    contact_number: "",
    email_id: "",
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
      const response = await fetch("/api/submit-delegate-form-int", {
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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "30px" }}>
      <h1
        style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}
      >
        Delegate Registration Form
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Registration Number */}
        <div>
          <label style={{ fontWeight: "bold" }}>Registration Number</label>
          <input
            type="text"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleChange}
            required
            style={inputStyles}
          />
        </div>

        {/* Participant Details */}
        <fieldset style={fieldsetStyles}>
          <legend style={legendStyles}>Participant Details</legend>
          <div style={fieldGroupStyles}>
            <label style={labelStyles}>Participant Name</label>
            <input
              type="text"
              name="participant_name"
              value={formData.participant_name}
              onChange={handleChange}
              required
              style={inputStyles}
            />
          </div>
          <div style={fieldGroupStyles}>
            <label style={labelStyles}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              style={inputStyles}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={fieldGroupStyles}>
            <label style={labelStyles}>Contact Number</label>
            <input
              type="tel"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
              style={inputStyles}
            />
          </div>
          <div style={fieldGroupStyles}>
            <label style={labelStyles}>Email ID</label>
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              required
              style={inputStyles}
            />
          </div>
        </fieldset>

        {/* Committee Preferences */}
        <fieldset style={fieldsetStyles}>
          <legend style={legendStyles}>Committee Preferences</legend>
          {[1, 2, 3].map((pref) => (
            <div key={pref} style={{ marginBottom: "15px" }}>
              <label style={labelStyles}>Preference {pref}</label>
              <select
                name={`committee_preference_${pref}`}
                value={formData[`committee_preference_${pref}`]}
                onChange={handleChange}
                required={pref === 1}
                style={inputStyles}
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
                <div key={allotment} style={fieldGroupStyles}>
                  <label style={labelStyles}>
                    Allotment Preference {pref}.{allotment}
                  </label>
                  <input
                    type="text"
                    name={`allotment_preference_${pref}_${allotment}`}
                    value={
                      formData[`allotment_preference_${pref}_${allotment}`]
                    }
                    onChange={handleChange}
                    style={inputStyles}
                  />
                </div>
              ))}
            </div>
          ))}
        </fieldset>

        {/* Experience Section */}
        <fieldset style={fieldsetStyles}>
          <legend style={legendStyles}>Experience</legend>
          <div style={fieldGroupStyles}>
            <label style={labelStyles}>MUNs as a Delegate</label>
            <input
              type="number"
              name="exp_delegate_muns"
              value={formData.exp_delegate_muns}
              onChange={handleChange}
              style={inputStyles}
            />
          </div>
          <div style={fieldGroupStyles}>
            <label style={labelStyles}>Delegate Experience</label>
            <textarea
              name="exp_delegate_text"
              value={formData.exp_delegate_text}
              onChange={handleChange}
              style={{ ...inputStyles, height: "80px" }}
            ></textarea>
          </div>
          <div style={fieldGroupStyles}>
            <label style={labelStyles}>MUNs as an EB</label>
            <input
              type="number"
              name="exp_eb_muns"
              value={formData.exp_eb_muns}
              onChange={handleChange}
              style={inputStyles}
            />
          </div>
          <div style={fieldGroupStyles}>
            <label style={labelStyles}>EB Experience</label>
            <textarea
              name="exp_eb_text"
              value={formData.exp_eb_text}
              onChange={handleChange}
              style={{ ...inputStyles, height: "80px" }}
            ></textarea>
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            background: "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007BFF")}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// Styling
const fieldsetStyles = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "8px",
};
const legendStyles = {
  fontWeight: "bold",
  fontSize: "16px",
};
const labelStyles = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
};
const inputStyles = {
  width: "100%",
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};
const fieldGroupStyles = {
  marginBottom: "15px",
};

export default InternalDelegateForm;
