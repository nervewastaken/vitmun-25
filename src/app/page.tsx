"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import Landing from "../pages/Landing"
import Navbar from "../components/custom/Navbar"
import AboutUs from "@/pages/About";

export default function Home() {
  const { isSignedIn } = useAuth();

  // Redirect if the user is authenticated
  useEffect(() => { 
    if (isSignedIn) {
      window.location.href = "/admin"; // Redirect to the admin page
    }
  }, [isSignedIn]);

  if (isSignedIn) {
    return null; // Render nothing while redirecting
  }

  return (
    <div>
      <Navbar />
      <Landing />
      {/* <AboutUs /> */}
    </div>
  );
}