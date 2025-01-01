"use client";

import Landing from "../pages/Landing"
import Navbar from "../components/custom/Navbar"
import AboutUs from "@/pages/About";

export default function Home() {
  

  // Redirect if the user is authenticated
  

  return (
    <div>
      <Navbar />
      <Landing />
      {/* <AboutUs /> */}
    </div>
  );
}