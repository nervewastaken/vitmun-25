import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";

const latoThin = Inter({ subsets: ["latin"], weight: "400" });
const latoBold = Inter({ subsets: ["latin"], weight: "900" });

const AboutMunsoc = () => {
  return (
    <div className="text-black font-medium text-xl bg-gradient-to-l from-transparent to-blue-100">
      <div className="w-[90%] mx-auto pt-24 flex flex-col gap-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
          >
            <div className="border-4 border-blue-500 rounded-xl p-2">
              <Image
                src="/mun2.svg"
                alt="VITMUN 1"
                draggable="false"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ translateY: -40, opacity: 0 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-2xl md:text-4xl mb-4 ${latoBold.className}`}
            >
              We are VITMUNSoc.
            </h2>
            <p className={`text-sm md:text-lg leading-relaxed ${latoThin.className}`}>
              The VIT Model United Nations Society (VITMUNSoc) is a model of
              excellence, teaching argumentation, diplomacy, public speaking,
              and more to its members and the VIT student community.
              <br />
              <br />
              It has become one of India's top MUN societies, winning awards
              with each effort.
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ translateY: -40, opacity: 0 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-2xl md:text-4xl mb-4 ${latoBold.className}`}
            >
              Delegate at VITMUN.
            </h2>
            <p className={`text-sm md:text-lg leading-relaxed ${latoThin.className}`}>
              Choose VITMUN'25 for immersive simulations, skill refinement, and
              cultural awareness. Elevate your leadership potential amidst a
              diverse cohort.
              <br />
              <br />
              With extensive exposure and industry engagement, it’s more than
              just a conference.
              <br />
              <br />
              It’s a pathway to global impact and personal growth.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
          >
            <div className="border-4 border-blue-500 rounded-xl p-2">
              <Image
                src="/mun.svg"
                alt="VITMUN 2"
                width={500}
                height={400}
                draggable="false"

                className="rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutMunsoc;
