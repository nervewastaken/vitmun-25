"use client";

import { useState } from 'react';
import NeedHelp from "@/components/custom/needhelp";
import Landing from "../pages/Landing";
import Navbar from "../pages/Navbar";
import AboutMunsoc from "@/components/custom/aboutMunsoc";

export default function Home() {
  const [isLandingLoaded, setIsLandingLoaded] = useState(false);

  const handleLandingLoad = () => {
    setIsLandingLoaded(true);
  };

  return (
    <div>
      {isLandingLoaded && (
        <>
          <Navbar />
        </>
      )}
      <Landing onLoad={handleLandingLoad} />
      {isLandingLoaded && (
        <>
          <AboutMunsoc />
          <NeedHelp />
        </>
      )}
    </div>
  );
}