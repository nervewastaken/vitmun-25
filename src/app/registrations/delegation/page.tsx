"use client";

import NeedHelp from "@/components/custom/needhelp";
import { useState } from "react";

export default function DelegationForm() {
  const [formData, setFormData] = useState({
    organisationName: "",
    headDelegate: "",
    email: "",
    contactNumber: "",
    delegationStrength: "",
  });

  const [errors, setErrors] = useState({});

  // Validate form inputs
  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.organisationName.trim()) {
      newErrors.organisationName = "Organisation Name is required";
    }
    if (!formData.headDelegate.trim()) {
      newErrors.headDelegate = "Head Delegate is required";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "A valid Email ID is required";
    }
    if (!formData.contactNumber.trim() || !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "A valid Contact Number is required";
    }
    if (
      !formData.delegationStrength.trim() ||
      isNaN(Number(formData.delegationStrength)) ||
      Number(formData.delegationStrength) <= 0
    ) {
      newErrors.delegationStrength = "Delegation Strength must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/submit-delegation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Delegation submitted successfully!");
        setFormData({
          organisationName: "",
          headDelegate: "",
          email: "",
          contactNumber: "",
          delegationStrength: "",
        });
      } else {
        alert("Failed to submit delegation.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delegation Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Organisation Name:</label>
          <input
            type="text"
            value={formData.organisationName}
            onChange={(e) =>
              setFormData({ ...formData, organisationName: e.target.value })
            }
            className="border p-2 w-full"
          />
          {errors.organisationName && (
            <p className="text-red-500 text-sm">{errors.organisationName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Head Delegate:</label>
          <input
            type="text"
            value={formData.headDelegate}
            onChange={(e) =>
              setFormData({ ...formData, headDelegate: e.target.value })
            }
            className="border p-2 w-full"
          />
          {errors.headDelegate && (
            <p className="text-red-500 text-sm">{errors.headDelegate}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Email ID:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Contact Number:</label>
          <input
            type="tel"
            value={formData.contactNumber}
            onChange={(e) =>
              setFormData({ ...formData, contactNumber: e.target.value })
            }
            className="border p-2 w-full"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm">{errors.contactNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Delegation Strength:</label>
          <input
            type="number"
            value={formData.delegationStrength}
            onChange={(e) =>
              setFormData({ ...formData, delegationStrength: e.target.value })
            }
            className="border p-2 w-full"
          />
          {errors.delegationStrength && (
            <p className="text-red-500 text-sm">{errors.delegationStrength}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <NeedHelp/>
    </div>
  );
}