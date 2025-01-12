import {
  ClerkProvider,
  //SignInButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto", // CSS variable to use in styles
});

export const metadata: Metadata = {
  title: "VITMUN'25 | Model United Nations",
  description: `Charting peace on a steady course. Through every voice, a path refined, Where silence speaks, and fears are shed. A handshake seals what hearts convey, Uniting minds where tensions lay.`,
  keywords: [
    "VITMUN",
    "Model United Nations",
    "VIT",
    "Debate",
    "Networking",
    "MUN",
    "Vellore Institute of Technology",
  ],
  authors: [{ name: "VITMUN Team", url: "https://vitmun.vit.ac.in" }],
  openGraph: {
    title: "VITMUN'25 | Model United Nations",
    description: "Where your voice matters. Join the debate!",
    url: "https://vitmun.vit.ac.in",
    siteName: "VITMUN'25",
    images: [
      {
        url: "/team.png", // Image used for sharing
        width: 1200,
        height: 630,
        alt: "VITMUN'25 Team Photo",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VITMUN'25 | Model United Nations",
    description: "Where your voice matters. Join the debate!",
    images: ["/team.png"], // Same image for Twitter
  },
  viewport: "width=device-width, initial-scale=1.0", // For mobile responsiveness
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en" suppressHydrationWarning className={`${roboto.variable}`}>
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
