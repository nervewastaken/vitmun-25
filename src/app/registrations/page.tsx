"use client";

import React from "react";
import { useRouter } from "next/navigation";

const RegistrationsPage = () => {
  const router = useRouter();

  const handleInternalClick = () => {
    router.push("/registrations/internal");
  };

  const handleExternalClick = () => {
    router.push("/registrations/external");
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f9",
    }}>
      <h1 style={{ marginBottom: "20px" }}>Delegate Registration</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={handleInternalClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Internal Registration
        </button>
        <button
          onClick={handleExternalClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          External Registration
        </button>
      </div>
    </div>
  );
};

export default RegistrationsPage;
