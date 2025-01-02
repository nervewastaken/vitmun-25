"use client";

import Landing from "../pages/Landing"
import Navbar from "../pages/Navbar"

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