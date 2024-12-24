import Image from "next/image";
import React, { useState, useEffect } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import Marquee from "@/components/custom/Marquee"
import Button from "@/components/custom/Button"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
            <Image
              src="/vitmun-logo.svg"
              height={0}
              width={0}
              alt="VITMUN"
              className="h-[15vh] w-auto sm:h-[20vh] md:h-[25vh] lg:h-[30vh] -mt-[15vh] z-10 border rounded-full bg-white"
            />
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
            {/* <p className="text-[2.5vh] text-black font-semibold mb-4">Registrations Open In...</p>
            <FlipClockCountdown
              digitBlockStyle={{
                color: "white",
                backgroundColor: "blue",
                height: 40,
                width: 30,
                fontSize: 30,
                fontWeight: 600,
              }}
              dividerStyle={{
                backgroundColor: "blue",
                color: "blue",
                height: 2,
              }}
              to={eventTime.getTime()}
              onComplete={() => {
                setCountdownComplete(true);
              }}
            /> */}

<Router>
      <Routes>
        <Route path="/individual" element={<div>Individual Page</div>} />
        
      </Routes>
      <div className="flex gap-x-8 mt-[3vh] font-semibold">
      <Button onClick={() => console.log('Button clicked')} label="INDIVIDUAL REGISTRATION" />
      <Button onClick={() => console.log('Button clicked')} label="DELEGATION REGISTRATION" />
      </div>
    </Router>
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
  className="h-[50vh] w-[30vw] absolute bottom-[8vh] right-0 z-0"
/>


<div>
      
    </div>
    <div
  className="absolute h-[8vh] bottom-0 w-full"
  style={{
    backgroundImage: "url('/blue.jpg')",
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
