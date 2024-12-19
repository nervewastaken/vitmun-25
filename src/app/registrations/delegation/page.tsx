"use client";

import NeedHelp from "@/components/custom/needhelp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection
import { useToast } from "@/hooks/use-toast"; // Shadcn toast hook
import { Lora } from "next/font/google";
import { Lato } from "next/font/google";
import { ReactLenis } from "@studio-freight/react-lenis";

const latoThin = Lato({ subsets: ["latin"], weight: "300" });
const latoBold = Lato({ subsets: ["latin"], weight: "700" });

const lora = Lora({
  subsets: ["latin"],
  weight: ["700"], // Use the weight you need
  variable: "--font-lora", // Set the variable
});

export default function DelegationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    organisationName: "",
    headDelegate: "",
    email: "",
    contactNumber: "",
    delegationStrength: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { toast } = useToast();
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.organisationName.trim())
      newErrors.organisationName = "Organisation Name is required";
    if (!formData.headDelegate.trim())
      newErrors.headDelegate = "Head Delegate is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (
      !formData.contactNumber.trim() ||
      !/^\d{10}$/.test(formData.contactNumber)
    )
      newErrors.contactNumber = "Valid Contact Number is required";
    if (
      !formData.delegationStrength.trim() ||
      isNaN(Number(formData.delegationStrength)) ||
      Number(formData.delegationStrength) <= 0
    )
      newErrors.delegationStrength = "Positive number required";
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fix the errors in the form.",
      });
      return;
    }

    try {
      const response = await fetch("/api/submit-delegation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Form submitted successfully!",
        });

        setTimeout(() => {
          router.push("/"); // Redirect to home after a short delay
        }, 2000);
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "Something went wrong, please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.04,
        duration: 2.5,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.04,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
      }}
    >
      <div className="px-4 sm:px-8 lg:px-20 py-6">
        <h1
          className={`${latoBold.className} text-2xl md:text-3xl mb-2 text-left`}
        >
          Request An Invite
        </h1>
        <p className={`${latoThin.className} text-md md:text-lg mb-8`}>
          Fill out the form below if your delegation hasn&apos;t received an invite
          yet.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white shadow-[0_0_15px_4px_rgba(0,255,255,0.2)] rounded-lg p-6 md:p-10"
        >
          {/* Organisation Name */}
          <div className="mb-6">
            <label
              className={`block font-medium mb-1 ${lora.className}`}
              htmlFor="organisationName"
            >
              Organization Name
            </label>
            <input
              type="text"
              name="organisationName"
              value={formData.organisationName}
              onChange={handleChange}
              placeholder="Organization"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#54B3EA] text-black"
            />
          </div>

          {/* Grid Layout for other inputs */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Head Delegate */}
            <div>
              <label
                className={`block font-medium mb-1 ${lora.className}`}
                htmlFor="headDelegate"
              >
                Head Delegate
              </label>
              <input
                type="text"
                name="headDelegate"
                value={formData.headDelegate}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#54B3EA] text-black"
              />
            </div>

            {/* Email ID */}
            <div>
              <label
                className={`block font-medium mb-1 ${lora.className}`}
                htmlFor="email"
              >
                Email-ID
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#54B3EA] text-black"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label
                className={`block font-medium mb-1 ${lora.className}`}
                htmlFor="contactNumber"
              >
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="WhatsApp Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#54B3EA] text-black"
              />
            </div>

            {/* Delegation Strength */}
            <div>
              <label
                className={`block font-medium mb-1 ${lora.className}`}
                htmlFor="delegationStrength"
              >
                Delegation Strength
              </label>
              <input
                type="number"
                name="delegationStrength"
                value={formData.delegationStrength}
                onChange={handleChange}
                placeholder="Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#54B3EA]  text-black"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              className="bg-[#54B3EA] hover:bg-[#62B4E2] text-white font-semibold py-1 px-6 rounded-lg transition uppercase text-md md:text-lg"
            >
              Request
            </Button>
          </div>
        </form>
        {/* Toast Notifications */}
        <NeedHelp />
      </div>
    </ReactLenis>
  );
}
