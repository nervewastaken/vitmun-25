"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Cards from "./Cards"

const AboutUs = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-transparent to-blue-200 text-black">
      {/* Title Section */}

    <Cards />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold tracking-wide">We At VITMUNSoc.</h1>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Image with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3 }}
          whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          className="relative w-64 h-64 lg:w-96 lg:h-96"
        >
          <Image
            src="/team.png"
            alt="Team"
            fill
            className="rounded-lg object-cover shadow-lg"
          />
        </motion.div>

        {/* Text Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 3, delayChildren: 0.3, staggerChildren: 0.2 },
            },
          }}
          className="flex flex-col space-y-4 max-w-lg"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
            className="text-3xl font-semibold"
          >
            Who We Are
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-lg leading-relaxed"
          >
            The VIT Model United Nations Society (VITMUNSoc) is a model of excellence, teaching argumentation, diplomacy, public speaking, and more to its members and the VIT student community.
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-lg leading-relaxed"
          >
            It has become one of India's top MUN societies, winning awards with each effort.
          </motion.p>
        </motion.div>
      </div>

      {/* Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 3 }}
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent)",
        }}
      />

    </div>
  );
};

export default AboutUs;
