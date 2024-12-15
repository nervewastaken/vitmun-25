"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

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
      <h1>Welcome to the Home Page</h1>
      <p>Please sign in to access the admin dashboard.</p>
    </div>
  );
}