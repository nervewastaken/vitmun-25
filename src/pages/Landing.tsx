"use client";
import NextImage from "next/image";
import React, { useState, useEffect } from "react";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import Marquee from "@/components/custom/Marquee";
import Link from "next/link";
import ImageFilledText from "@/components/ui/ImageFilledText";
import { Bebas_Neue } from "next/font/google";
import { Montaga, Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const characters = Array.from("7 - 9 MAR 2025");
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const montaga = Montaga({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

const Loader = () => (
  <div className="flex items-center justify-center h-screen w-screen">
    <div className="spinner"></div>
    <style jsx>{`
      .spinner {
        border: 8px solid rgba(0, 0, 0, 0.1);
        border-top: 8px solid #0070f3;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const Landing = ( { onLoad } ) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const imageSources = [
    "/home.svg",
    "/blue.jpg",
    "/globe-rotating.png",
    "/globe.svg",
    "/bird.svg",
    "/castle.svg",
  ];

  useEffect(() => {
    const loadImages = async () => {
      try {
        const promises: Promise<void>[] = imageSources.map((src) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`);
              resolve(); 
            };
          });
        });
        

        await Promise.all(promises);
        setLoading(false);
        onLoad(); // Call onLoad only after all images are loaded
      } catch (error) {
        console.error('Error loading images:', error);
        setLoading(false);
        onLoad();
      }
    };

    loadImages();
  }, [onLoad]);

  const handleInd = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative py-[5vh] h-[100vh] max-w-[100vw] overflow-hidden bg-gradient-to-b from-transparent to-blue-100 overflow-x-hidden">
          {/* Main Content */}
          <div className="relative flex flex-col items-center w-full">
            {/* Hero Banner */}
            <div className="relative w-full h-[20vh] lg:h-[39vh]">
              <NextImage
                src="/home.svg"
                height={0}
                width={0}
                alt="Banner"
                className="h-full w-full object-cover opacity-95"
              />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center z-10 border-b-[1.5vh] border-transparent select-none"
                style={{ borderImage: "url('/blue.jpg') 20 stretch" }}
              >
                <div className="flex whitespace-nowrap">
                {characters.map((char, index) => (
  <motion.span
    key={index}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay: index * 0.2, // Stagger effect
    }}
    className={`text-[7vh] mt-[6vh] lg:text-[25vh] origin-center ${bebasNeue.className}`}
  >
    <motion.div
      whileHover={{
        scale: 1.4,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="whitespace-nowrap"
    >
      <ImageFilledText
        text={char === " " ? "\u00A0" : char}
        imageUrl="/hero_font.svg"
      />
    </motion.div>
  </motion.span>
))}

</div>

              </div>
            </div>

            {/* Logo Section */}
            <div className="mt-8 flex flex-col items-center justify-center text-[8vh]">
              {/* Rotating Globe */}
              <div className="relative z-10">
                <div className="relative -mt-[10vh] lg:-mt-[18vh] mb-[2vh]">
                  <div
                    className="inset-0 border-rotating p-8 z-1 h-[18vh] w-[18vh] lg:h-[26vh] lg:w-[26vh] z-0"
                    style={{
                      background: `url('/globe-rotating.png') center/100% 100%`,
                    }}
                  />
                  <NextImage
                    height={0}
                    width={0}
                    src="/globe.svg"
                    alt="VITMUN"
                    draggable="false"
                    className="h-[10vh] w-[10vh] lg:h-[16vh] lg:w-[18vh] rounded-full z-15 absolute -mt-[14vh] ml-[4vh] lg:-mt-[21vh] lg:ml-[4vh]"
                  />
                </div>
              </div>

              {/* Event Title */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-[2vh] lg:text-[3vh] font-bebas">Office of Students' Welfare</p>
                <p className="text-[1vh] lg:text-[1.5vh] font-bebas">presents</p>
                <div className="font-bold text-[5vh] lg:text-[6vh] select-none flex justify-center">
                  <span className={`${montaga.className} text-center`}>VIT</span>
                  <ImageFilledText
                    text="MUN"
                    imageUrl="/blue.jpg"
                    className={`${montserrat.className} text-center`}
                  />
                  <NextImage
                    src="/bird.svg"
                    width={24}
                    height={24}
                    alt="bird"
                    className="inline -mt-12"
                  />
                </div>
                <p className="text-[1.5vh] lg:text-[1.75vh] text-black border border-black justify-center px-4 rounded-3xl select-none italic text-center">
                  WHERE YOUR VOICE MATTERS
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col lg:flex-row gap-y-0 lg:gap-x-8 lg:font-semibold relative justify-center items-center">
                <div className="z-10 ">
                  <button
                    onClick={handleInd}
                    className="font-bebas text-[2.5vh] lg:text-[3.5vh] bg-white py-1 px-6 lg:px-8 border rounded-3xl z-10 shadow-2xl hover:bg-slate-100"
                  >
                    INDIVIDUAL REGISTRATION
                  </button>
                </div>
                {showPopup && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="relative bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-lg h-[30vh] lg:h-[40vh] flex flex-row justify-center items-center">
                      <button
                        className="absolute top-4 right-4 text-gray-400"
                        onClick={closePopup}
                      >
                        <NextImage
                          src="/cross.svg"
                          width={56}
                          height={56}
                          alt="Close"
                        />
                      </button>
                      <div className="mt-[5vh] flex flex-col justify-center items-center space-y-8 text-[2.5vh] lg:text-[4.5vh] ">
                        <Link href="/registrations/internal">
                          <button className="font-bebas bg-white py-2 px-8 border rounded-3xl z-10 hover:bg-slate-100 hover:border-black">
                            VIT VELLORE STUDENT
                          </button>
                        </Link>
                        <Link href="/registrations/external">
                          <p className="font-bebas bg-white py-2 px-8 border rounded-3xl z-10 hover:bg-slate-100 hover:border-black">
                            EXTERNAL PARTICIPANT
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <div className="z-10 -mt-[4vh] lg:mt-0">
                  <Link href="/registrations/delegation">
                    <button className="font-bebas text-[2.5vh] lg:text-[3.5vh] bg-white py-1 px-5 lg:px-8 border rounded-3xl z-30 shadow-2xl gap-y-0 hover:bg-slate-100">
                      DELEGATION REGISTRATION
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <NextImage
            src="/castle.svg"
            alt="castle"
            width={960}
            height={540}
            className="h-[20vh] max-w-[60vw] lg:h-[50vh] lg:max-w-[30vw] absolute bottom-[5vh] lg:bottom-[6vh] left-0 z-0 overflow-hidden"
          />
          <NextImage
            src="/castle.svg"
            alt="castle"
            width={960}
            height={540}
            className="h-[20vh] max-w-[60vw] lg:h-[50vh] lg:max-w-[30vw] absolute bottom-[5vh] lg:bottom-[6vh] transform scale-x-[-1] right-0 z-0 overflow-hidden"
          />
          <div className="absolute h-[5vh] lg:h-[6vh] bottom-0 w-full z-0 py-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/blue.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="inset-0 bg-black" style={{ opacity: 0.2 }}></div>
            </div>
            <Marquee text1="VITMUN'25" text2="WHERE YOUR VOICE MATTERS" />
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;