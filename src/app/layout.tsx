import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Roboto } from "next/font/google"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto", // CSS variable to use in styles
});

export const metadata: Metadata = {
  title: "VITMUN 2025",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${roboto.variable}`}>
        <body>
          <SignedOut>
             {/* No redirectUrl here; redirect handled globally */}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}