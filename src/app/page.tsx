"use client";

import NeedHelp from "@/components/custom/needhelp";
import Landing from "../pages/Landing"
import Navbar from "../pages/Navbar"
import AboutMunsoc from "@/components/custom/aboutMunsoc";

export default function Home() {
  

  // Redirect if the user is authenticated
  

  return (
    <div>
      <Navbar />
      <Landing />
      <AboutMunsoc/>
      <NeedHelp/>
      {/* <AboutUs /> */}
    </div>
  );
}