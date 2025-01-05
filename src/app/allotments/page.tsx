"use client";
import DelegateTable from "@/components/custom/delegatetable";
import Navbar from "@/pages/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <DelegateTable />
      </div>
    </>
  );
};

export default page;
