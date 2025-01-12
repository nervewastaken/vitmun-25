"use client";

import React, { useState } from "react";
import CommitteeCard from "@/components/custom/committee";
import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from "@/pages/Navbar";
import Image from "next/image";

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
      <div className="h-full pt-28 bg-gradient-to-b from-transparent to-blue-100 ">
        <div className="grid gap-0 md:gap-x-4 lg:gap-x-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
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