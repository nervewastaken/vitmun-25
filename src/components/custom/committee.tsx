import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lato } from "next/font/google";

const latoBold = Lato({ subsets: ["latin"], weight: "900" });

interface CommitteeCardProps {
  image: string;
  name: string;
  onClick: () => void;
}

const CommitteeCard: React.FC<CommitteeCardProps> = ({ image, name, onClick }) => {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
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