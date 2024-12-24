"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import Marquee from "@/components/custom/Marquee";
import Link from "next/link";

interface ImageFilledTextProps {
  text: string;
  imageUrl: string;
  className?: string;
}

const ImageFilledText = ({
  text = "7-9 MAR 2025",
  imageUrl = "/blue.jpg",
  className = "",
}: ImageFilledTextProps) => {
  return (
    <div className="relative inline-block">
      <div
        className={`relative font-bold ${className}`}
        style={{
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.1) brightness(0.9)",
        }}
      >
        {text}
      </div>

      <div
        className="absolute inset-0 font-bold"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.1)",
          color: "transparent",
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {text}
      </div>
    </div>
  );
};

const Landing = () => {
  const eventTime = new Date("January 7, 2025 00:00:00");
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);


  const handleInd = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="absolute h-[85vh] w-[100vw] overflow-hidden bg-gradient-to-b from-transparent to-blue-100">
      <div className="relative flex flex-col items-center w-full">
        <div className="relative w-full h-[25vh]">
          <Image
            src="/home.svg"
            height={0}
            width={0}
            alt="Banner"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 border-b-[1.5vh] border-transparent" style={{ borderImage: "url('/blue.jpg') 30 stretch" }}>
            <ImageFilledText
              text="7-9 MAR 2025"
              imageUrl="/blue.jpg"
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[23vh] whitespace-nowrap"
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center text-[8vh]">
          <div className="relative z-10 mx-auto">
        
          <div className="relative w-fit p-8 -mt-[15vh] z-10">
      <div 
        className="absolute inset-0 rounded-full border-rotating"
        style={{
          background: `url('/globe-border.svg') center/100% 100%`,
          padding: '10px',
          transform: 'scale(1.1)'
        }}
      />
      <Image
        height={0}
        width={0}
        src="/globe.svg"
        alt="VITMUN"
        className="h-[20vh] w-auto rounded-full bg-white relative"
      />
    </div>



</div>


            <div className="font-bebas font-bold">
              VIT
              <ImageFilledText
                text="MUN"
                imageUrl="/blue.jpg"
                className=""
              />
              <Image
                src="/bird.svg"
                width={24}
                height={24}
                alt="bird"
                className="inline"
              />
            </div>
            <p className="text-[2.5vh] text-black border border-black px-4 rounded-3xl">WHERE YOUR VOICE MATTERS</p>

            <div className="flex gap-x-8 font-semibold relative">
              <div className="z-10">
              <button onClick={handleInd} className="font-bebas text-[3vh] bg-white py-2 px-8 border rounded-3xl z-10 border-black shadow-black">
                INDIVIDUAL REGISTRATION
              </button>
              </div>
              {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                  <div className="relative bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-lg h-[40vh] flex flex-row justify-center items-center">
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
                    <div className="mt-[5vh] flex flex-col justify-center items-center space-y-8">
                      <Link href="/registrations/internal">
                      <button className="font-bebas text-[3vh] bg-white py-2 px-8 border rounded-3xl z-10">
                        VIT VELLORE STUDENT
                      </button>
                      </Link>

                      <Link href="/registrations/external">
                      <p className="font-bebas text-[3vh] bg-white py-2 px-8 border rounded-3xl z-10">
                        EXTERNAL PARTICIPANT
                      </p>
                      </Link>

                    </div>
                  </div>
                </div>
              )}
              <div className="z-10">
                 <Link href="/registrations/delegation"> 
                  <button className="font-bebas text-[3vh] bg-white py-2 px-8 border rounded-3xl z-30 border-black ">
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
        src="/castle.png"
        alt="castle"
        width={960}  // Use an arbitrary width or approximate based on your design
        height={540} // Use an arbitrary height or approximate based on your design
        className="h-[50vh] w-[30vw] absolute bottom-[8vh] transform scale-x-[-1] left-0 z-0"
      />

      <Image
        src="/castle.png"
        alt="castle"
        width={960}  // Use an arbitrary width or approximate based on your design
        height={540} // Use an arbitrary height or approximate based on your design
        className="h-[50vh] w-[30vw] absolute bottom-[8vh] right-0"
      />

      <div>
      </div>
      <div
        className="absolute h-[8vh] bottom-0 w-full"
        style={{
          backgroundImage: "url('/blue-marquee.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Marquee text1="VITMUN" text2="WHERE YOUR VOICE MATTERS" />
      </div>
    </div>
  );
};

export default Landing;
