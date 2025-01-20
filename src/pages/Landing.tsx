"use client";
import Image from "next/image";
import React, { useState } from "react";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import Marquee from "@/components/custom/Marquee";
import Link from "next/link";
import ImageFilledText from "@/components/ui/ImageFilledText"
import { Bebas_Neue } from "next/font/google";
import { Montaga, Montserrat } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const montaga = Montaga({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

const Landing = () => {
  const [showPopup, setShowPopup] = useState(false);


  const handleInd = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="relative py-[5vh] h-[100vh] max-w-[100vw] overflow-hidden bg-gradient-to-b from-transparent to-blue-100 overflow-x-hidden">
      <div className="relative flex flex-col items-center w-full ">
        <div className="relative w-full h-[20vh] lg:h-[39vh]">
          <Image
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
        {Array.from("7 - 9 MAR 2025").map((char, index) => (
          <span
            key={index}
            className={`text-[7vh] mt-[6vh] lg:text-[25vh]  transition-all duration-300 origin-center ${bebasNeue.className}`}

          >
            <ImageFilledText
              text={char === " " ? "\u00A0" : char}
              imageUrl="/hero_font.svg"

              className="whitespace-nowrap"

            />
          </span>
        ))}
      </div>
    </div>



          <div className="mt-8 flex flex-col items-center justify-center text-[8vh]">
          <div className="relative z-10">
        <div className="relative -mt-[10vh] lg:-mt-[18vh] mb-[2vh]">
      <div 
        className="inset-0 border-rotating p-8 z-1 h-[18vh] w-[18vh] lg:h-[30vh] lg:w-[30vh] z-0"
        style={{
          background: `url('/globe-rotating.png') center/100% 100%`,
         
          
        }}
      />
      <Image
        height={0}
        width={0}
        src="/globe.svg"
        alt="VITMUN"
        draggable="false"
        className="h-[10vh] w-[10vh] lg:h-[18vh] lg:w-[18vh]  rounded-full z-15 absolute -mt-[14vh] ml-[4vh] lg:-mt-[24vh] lg:ml-[6vh]"
      />
    </div>
    </div>




    <div className="flex flex-col items-center justify-center">
  <div className="font-bold text-[5vh] lg:text-[6vh] select-none flex justify-center">
    <span className={`${montaga.className} text-center`}>VIT</span>
    <ImageFilledText
      text="MUN"
      imageUrl="/blue.jpg"
      className={`${montserrat.className} text-center`}
    />
    <Image
      src="/bird.svg"
      width={24}
      height={24}
      alt="bird"
      className="inline -mt-12"
    />
  </div>
  <div>
    <p className="text-[1.5vh] lg:text-[1.75vh] text-black border border-black justify-center px-4 rounded-3xl select-none italic text-center">
      WHERE YOUR VOICE MATTERS
    </p>
  </div>
</div>


            <div className="flex flex-col lg:flex-row gap-y-0 lg:gap-x-8 lg:font-semibold relative justify-center items-center">
  <div className="z-10 ">
    <button
      onClick={handleInd}
      className="font-bebas text-[2.5vh] lg:text-[3.5vh] bg-white py-1 px-6 lg:px-8 border rounded-3xl z-10  shadow-2xl hover:bg-slate-100"
    >
      INDIVIDUAL REGISTRATION
    </button>
  </div>
  
  {showPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="relative bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-lg h-[30vh] lg:h-[40vh] flex flex-row justify-center items-center">
        <div>
          <button
            className="absolute top-4 right-4 text-gray-400"
            onClick={closePopup}
          >
            <Image
              src="/cross.svg"
              width={56}
              height={56}
              alt="Close"
            />
          </button>
        </div>
        <div className="mt-[5vh] flex flex-col justify-center items-center space-y-8 text-[2.5vh] lg:text-[3vh] ">
          <Link href="/registrations/internal">
            <button className="font-bebas  bg-white py-2 px-8 border rounded-3xl z-10">
              VIT VELLORE STUDENT
            </button>
          </Link>

          <Link href="/registrations/external">
            <p className="font-bebas  bg-white py-2 px-8 border rounded-3xl z-10">
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

        <div className="text-center mt-[4vh]">
        </div>
      </div>

      <Image
        src="/castle.svg"
        alt="castle"
        width={960}
        height={540} 
        className="h-[20vh] max-w-[60vw] lg:h-[50vh] lg:max-w-[30vw] absolute bottom-[5vh] lg:bottom-[6vh]  left-0 z-0 overflow-hidden"
      />

      <Image
        src="/castle.svg"
        alt="castle"
        width={960}  
        height={540} 
        className="h-[20vh] max-w-[60vw] lg:h-[50vh] lg:max-w-[30vw] absolute bottom-[5vh] lg:bottom-[6vh] transform scale-x-[-1] right-0 z-0 overflow-hidden"
      />

      <div>
      </div>
      <div className="absolute h-[5vh] lg:h-[6vh] bottom-0 w-full z-0 py-0">
  {/* Background Overlay */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('/blue.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div
      className=" inset-0 bg-black"
      style={{ opacity: 0.2 }}
    ></div>
  </div>

  {/* Marquee Text */}
    <Marquee text1="VITMUN'25" text2="WHERE YOUR VOICE MATTERS" />
</div>

    </div>
  );
};

export default Landing;
