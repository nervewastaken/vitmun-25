"use client";

import React, { useState } from "react";
import CommitteeCard from "@/components/custom/committee";
import { Lora } from "next/font/google";
import { ReactLenis } from "@studio-freight/react-lenis";

const lora = Lora({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-lora",
});

const committees = [
  { name: "AIPPM", image: "/committee/AIPPM.png", agenda: "Agenda for AIPPM", board: "Board for AIPPM" },
  { name: "CHAOS", image: "/committee/CHAOS.png", agenda: "Agenda for CHAOS", board: "Board for CHAOS" },
  { name: "DISEC", image: "/committee/DISEC.png", agenda: "Agenda for DISEC", board: "Board for DISEC" },
  { name: "JHES", image: "/committee/JHES.png", agenda: "Agenda for JHES", board: "Board for JHES" },
  { name: "ORF", image: "/committee/ORF.png", agenda: "Agenda for ORF", board: "Board for ORF" },
  { name: "UNGA-SOCHUM", image: "/committee/UNGA-SOCHUM.png", agenda: "Agenda for UNGA-SOCHUM", board: "Board for UNGA-SOCHUM" },
  { name: "UNSC", image: "/committee/UNSC.png", agenda: "Agenda for UNSC", board: "Board for UNSC" },
];

const CommitteesPage = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<{ name: string, agenda: string, board: string } | null>(null);

  const handleCommitteeClick = (committee: { name: string, agenda: string, board: string }) => {
    setSelectedCommittee(committee);
  };

  const closeModal = () => {
    setSelectedCommittee(null);
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
        <h1 className={`text-2xl md:text-3xl font-semibold mb-2 text-left ${lora.className}`}>
          Committees
        </h1>
        <p className="text-md md:text-lg font-light mb-6 text-left">
          Presenting the committees for VITMUN'25
        </p>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {committees.map((committee) => (
            <CommitteeCard
              key={committee.name}
              image={committee.image}
              name={committee.name}
              onClick={() => handleCommitteeClick(committee)}
            />
          ))}
        </div>
        {selectedCommittee && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-w-3xl mx-auto text-center]">
              <h2 className="text-xl font-bold mb-4">{selectedCommittee.name}</h2>
              <p className="mb-4">Agenda : {selectedCommittee.agenda}</p>
              <p className="mb-4">Board : {selectedCommittee.board}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </ReactLenis>
  );
};

export default CommitteesPage;