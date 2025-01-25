"use client";

import React, { useState } from "react";
import CommitteeCard from "@/components/custom/committee";
import { Lato, Lora } from "next/font/google";
import Navbar from "@/pages/Navbar";
import Image from "next/image";

const lora = Lora({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-lora",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-lato",
});

const committees = [
  { name: "CHAOS", imageWhite: "/committee/chaos.png", imageBlack: "/committee/chaos2.png", data:"Where uncertainty meets strategy", agenda: "Clausula Rebus Sic Stantibus", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "JHES", imageWhite: "/committee/jhes.png", imageBlack: "/committee/jhes2.png", data:"Where global economies converge", agenda: "How Can Central Banks Manage Inflation Caused by Trade Shocks?", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "UNGA-SOCHUM", imageWhite: "/committee/sochum.png", imageBlack: "/committee/sochum2.png", data:"Championing human rights, one debate at a time", agenda: "Transitional Justice and Accountability in ensuring Human Security.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "UNSC", imageWhite: "/committee/unsc.png", imageBlack: "/committee/unsc2.png", data:"Power, politics, and peace. Freeze Date: 15 October 1977" ,agenda: "The Ogaden Situation", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "DISEC", imageWhite: "/committee/disec.png", imageBlack: "/committee/disec2.png", data:"Where diplomacy meets defence", agenda: "Discussing Ballistic Missile Proliferation with emphasis on the Hague Code of Conduct.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "AIPPM", imageWhite: "/committee/aippm.png", imageBlack: "/committee/aippm2.png", data:"Where India’s political spectrum unites", agenda: "Discussing the structure and framework for a prospective UCC (Uniform Civil Code) Bill.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "ORF", imageWhite: "/committee/orf.png", imageBlack: "/committee/orf2.png", data:"Shaping the future, one policy at a time. Forum: Rakshamanthan: India’s Defence Dialogue", agenda: "Future of India’s Armed Forces : Vision 2030 and beyond", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
];

const CommitteesPage = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<{
    data: string; name: string, agenda: string, board: { [key: string]: string } 
} | null>(null);

  const handleCommitteeClick = (committee: { name: string, agenda: string, data: string, board: { [key: string]: string } }) => {
    setSelectedCommittee(committee);
  };

  const closeModal = () => {
    setSelectedCommittee(null);
  };

  return (
    <>
      <Navbar />
      <div className="relative pt-[12vh] h-auto max-w-[100vw] overflow-hidden bg-gradient-to-l from-transparent to-blue-100">
        <h1 className={`text-2xl md:text-4xl font-semibold mb-2 text-left  px-6 ${lato.className}`}>
          Committees
        </h1>
        <p className="text-md md:text-2xl font-light mb-4 text-left px-6">
          Presenting the committees for VITMUN'25
        </p>
        <div className={`grid gap-4 md:gap-x-6 lg:gap-x-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 ${lora.className}`}>
          {committees.map((committee) => (
            <CommitteeCard
              key={committee.name}
              imageWhite={committee.imageWhite}
              imageBlack={committee.imageBlack}
              name={committee.name}
              onClick={() => handleCommitteeClick(committee)}
              onClick={() => handleCommitteeClick(committee)}
              isSelected={selectedCommittee?.name === committee.name}
            />
          ))}
        </div>

        {selectedCommittee && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
    aria-modal="true"
    role="dialog"
  >
    <div className="bg-white border-4 border-black bg-gradient-to-l from-transparent to-blue-100 p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-w-3xl mx-auto text-center relative overflow-y-auto max-h-[90vh]">
      <button
        className="absolute top-4 right-4 rounded-full"
        onClick={closeModal}
        aria-label="Close Modal"
      >
        <Image src="/cross.svg" alt="Close" width={36} height={36} />
      </button>
      <h2 className="text-3xl font-bold mb-4">{selectedCommittee.name}</h2>
      <p className="text-lg mb-4">
        <strong>
          {selectedCommittee.name === "UNSC"
            ? selectedCommittee.data.split(" Freeze Date:")[0]
            : selectedCommittee.name === "ORF" && selectedCommittee.data.includes("Forum:")
            ? selectedCommittee.data.split(" Forum:")[0]
            : selectedCommittee.data}
        </strong>
      </p>
      {selectedCommittee.name === "UNSC" && (
        <p className="text-lg mb-4">
          <strong>Freeze Date:</strong> 15 October 1977
        </p>
      )}
      {selectedCommittee.name === "ORF" && selectedCommittee.data.includes("Forum:") && (
        <p className="text-lg mb-4">
          <strong>Forum:</strong> {selectedCommittee.data.split("Forum:")[1].trim()}
        </p>
      )}
      <p className="text-lg mb-4">
        <strong>Agenda:</strong> {selectedCommittee.agenda}
      </p>
      {/* {Object.entries(selectedCommittee.board).map(([position, person]) => (
        <p key={position} className="mb-2">
          <strong>{position}:</strong> {person}
        </p>
      ))} */}
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default CommitteesPage;