"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import NeedHelp from "@/components/custom/needhelp";
import { useRouter } from "next/navigation"; // For redirection
import { useToast } from "@/hooks/use-toast"; // Shadcn toast hook


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

  const { toast } = useToast();
  const router = useRouter();

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
      toast({
        variant: "success", // You can customize it (success/error)
        title: "Form Submitted Successfully",
        description: "Redirecting you to the home page...",
      });

      // Redirect to Home after a slight delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      // Handle errors based on response code
      if (response.status === 400) {
        toast({
          variant: "destructive",
          title: "Duplicate Entry Detected",
          description:
            "An entry with this email/contact already exists. Please contact Delegate Affairs for support.",
        });
      } else if (response.status === 500) {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: "Something went wrong on our end. Try again later.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Unexpected Error",
          description: data.error || "Please check your input and try again.",
        });
      }
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Network Error",
      description: "An error occurred while submitting the form. Please try again.",
    });
    console.error("Error:", error);
  }
};


  return (
    <div className="px-4 sm:px-8 lg:px-20 py-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-left">
        External Individual Registration Form
      </h1>
      <p className="text-md md:text-lg font-light mb-6 text-left">
        Fill out the form below if you are interested in participating at VITMUN'25.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white  shadow-[0_4px_10px_rgba(0,255,255,0.4),0_8px_12px_rgba(0,0,0,0.3)] rounded-lg p-6 md:p-10"
      >
        {/* Participant Details */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block font-medium mb-1" htmlFor="participant_name">
              Participant Name
            </label>
            <input
              type="text"
              name="participant_name"
              value={formData.participant_name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="gender">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="" disabled>Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="contact_number">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              placeholder="WhatsApp Number"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="email_id">
              Email ID
            </label>
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              placeholder="Email ID"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="organisation_name">
              Organisation Name
            </label>
            <input
              type="text"
              name="organisation_name"
              value={formData.organisation_name}
              onChange={handleChange}
              placeholder="Organisation"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="accommodation">
              Accommodation
            </label>
            <select
              name="accommodation"
              value={formData.accommodation}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Committee Preferences */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4">Committee Preferences</legend>
          {[1, 2, 3].map((pref) => (
            <div
              key={pref}
              className="mb-8 p-4 border-2 border-gray-300 rounded-lg shadow-sm"
            >
              <label className="block font-medium mb-2">
                Committee Preference {pref}
              </label>
              <select
                name={`committee_preference_${pref}`}
                value={formData[`committee_preference_${pref}`]}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mb-4"
              >
                <option value="">Select Committee</option>
                <option value="UNGA-DISEC">UNGA-DISEC</option>
                <option value="UNGA-SOCHUM">UNGA-SOCHUM</option>
                <option value="UNSC">UNSC</option>
                <option value="Jackson Hole Economic Symposium (JHES)">
                  Jackson Hole Economic Symposium (JHES)
                </option>
                <option value="CHAOS">CHAOS</option>
                <option value="AIPPM">AIPPM</option>
                <option value="Specialised Committee">Specialised Committee</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((allotment) => (
                  <input
                    key={allotment}
                    type="text"
                    name={`allotment_preference_${pref}_${allotment}`}
                    value={formData[`allotment_preference_${pref}_${allotment}`]}
                    onChange={handleChange}
                    placeholder={`Allotment Preference ${allotment}`}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                ))}
              </div>
            </div>
          ))}
        </fieldset>

        {/* Experience Section */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4">Experience</legend>
          <div className="space-y-4">
            <input
              type="number"
              name="exp_delegate_muns"
              value={formData.exp_delegate_muns}
              onChange={handleChange}
              placeholder="Number of MUNs as Delegate"
              className="w-full border rounded-lg px-4 py-2"
            />
            <textarea
              name="exp_delegate_text"
              value={formData.exp_delegate_text}
              onChange={handleChange}
              placeholder="Conference Name/year - Committee - Country - Award(N/A if none)"
              className="w-full border rounded-lg px-4 py-2"
              rows="3"
            ></textarea>
            <input
              type="number"
              name="exp_eb_muns"
              value={formData.exp_eb_muns}
              onChange={handleChange}
              placeholder="Number of MUNs as Executive Board"
              className="w-full border rounded-lg px-4 py-2"
            />
            <textarea
              name="exp_eb_text"
              value={formData.exp_eb_text}
              onChange={handleChange}
              placeholder="Conference Name/year - Committee - Country - Award(N/A if none)"
              className="w-full border rounded-lg px-4 py-2"
              rows="3"
            ></textarea>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            className=" bg-[#54B3EA] hover:bg-[#62B4E2] text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            PRESENT AND VOTING
          </Button>
        </div>
      </form>
      <NeedHelp />
    </div>
  );
};

export default ExternalDelegateForm;
