import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lato } from "next/font/google";

const latoBold = Lato({ subsets: ["latin"], weight: "900" });

interface CommitteeCardProps {
  image: string;
  name: string;
  onClick: () => void;
  isSelected: boolean;
}

const CommitteeCard: React.FC<CommitteeCardProps> = ({ image, name, onClick, isSelected }) => {
  return (
    <motion.div
      className={`flex flex-col items-center cursor-pointer transition duration-300 py-5 lg:py-3 mx-20 rounded-md ${
        isSelected ? "ring-4 ring-[#54B3EA] bg-black bg-opacity-10" : "hover:ring-4 hover:ring-[#54B3EA] hover:bg-black hover:bg-opacity-5"
      }`}
      onClick={onClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <Image
        src={image}
        alt={name}
        width={96}
        height={96}
        className="w-24 h-24 rounded-full mb-2 object-cover"
      />
      <h3 className={`text-lg font-semibold text-center ${latoBold.className}`}>{name}</h3>
    </motion.div>
  );
};

export default CommitteeCard;