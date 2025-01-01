"use client";

import React, { useState } from "react";
import CommitteeCard from "@/components/custom/committee";
import { Lora } from "next/font/google";
import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from "@/components/custom/Navbar";
import Image from "next/image";

const lora = Lora({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-lora",
});

const committees = [
  { name: "AIPPM", image: "/committee/AIPPM.png", agenda: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "CHAOS", image: "/committee/CHAOS.png", agenda: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "DISEC", image: "/committee/DISEC.png", agenda: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "JHES", image: "/committee/JHES.png", agenda: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "ORF", image: "/committee/ORF.png", agenda: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "UNGA-SOCHUM", image: "/committee/UNGA-SOCHUM.png", agenda: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
  { name: "UNSC", image: "/committee/UNSC.png", agenda: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.", board: { "Chair": "Person A", "Vice Chair": "Person B", "Scribe": "Person C" } },
];

const CommitteesPage = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<{ name: string, agenda: string, board: { [key: string]: string } } | null>(null);

  const handleCommitteeClick = (committee: { name: string, agenda: string, board: { [key: string]: string } }) => {
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
      <Navbar />
      <div className="px-4 sm:px-8 lg:px-20 py-6">
        <h1 className={`text-2xl md:text-3xl font-semibold mb-2 text-left ${lora.className}`}>
          Committees
        </h1>
        <p className="text-md md:text-lg font-light mb-6 text-left">
          Presenting the committees for VITMUN'25
        </p>
        <div className="grid gap-2 md:gap-4 lg:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {committees.map((committee) => (
            <CommitteeCard
              key={committee.name}
              image={committee.image}
              name={committee.name}
              onClick={() => handleCommitteeClick(committee)}
              isSelected={selectedCommittee?.name === committee.name}
            />
          ))}
        </div>
        {selectedCommittee && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 bg-blur-md">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-w-3xl mx-auto text-center relative">
              <button
                className="absolute top-4 right-4 h-12"
                onClick={closeModal}
              >
                <Image src="/cross.svg" alt="Close" width={24} height={24} />
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedCommittee.name}</h2>
              <p className="text-l mb-4"><strong>Agenda:</strong> {selectedCommittee.agenda}</p>
              {Object.entries(selectedCommittee.board).map(([position, person]) => (
                <p key={position} className="mb-2"><strong>{position}:</strong> {person}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </ReactLenis>
  );
};

export default CommitteesPage;