"use client";

import DelegateTable from "@/components/custom/delegatetable";
import Navbar from "@/pages/Navbar";
import React from "react";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="pt-[11vh] bg-gradient-to-l from-transparent to-blue-100">
      <h1 className="text-2xl md:text-4xl font-semibold mb-2 text-left px-6">
        Allotments
      </h1>

      <button
  className="text-white bg-green-500 hover:shadow-lg hover:shadow-green-300 rounded-md py-2 transition-all px-4 mx-6"
  onClick={() =>
    window.open(
      "https://docs.google.com/spreadsheets/d/1uWmQmWyDJIISxIHaRMPpfOtzxMfI686Z1lvbcd9w9dY/edit?usp=sharing",
      "_blank"
    )
  }
>
  DELEGATE MATRIX
</button>


      <div className="pt-8">
        <DelegateTable />
      </div>
      </div>
    </>
  );
};

export default Page;
