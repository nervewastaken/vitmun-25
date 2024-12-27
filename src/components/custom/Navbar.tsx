import Link from "next/link";
import Image from "next/image";
import { Karma } from "next/font/google";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../../app/globals.css";
import ImageFilledText from "@/components/ui/ImageFilledText"

const karma = Karma({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`h-[15vh] w-full ${karma.className} z-20`}>
      <div className="flex flex-row items-center h-full w-full px-4 relative">
        <Link href="https://vit.ac.in/" target="_blank" passHref>
          <Image
            src="/vit-logo.svg"
            height={150}
            width={150}
            alt="VIT Logo"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden ml-auto"
        >
          {isMenuOpen ? <Image src="/cross.svg" height={48} width={48} alt="cross"/> : <Menu size={48} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row justify-end items-center w-full gap-x-24 mr-[2vw]">
          <ul className="flex flex-row gap-x-8 text-[3vh]">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/committees">COMMITTEES</Link>
            </li>
            <li>
              <Link href="/resources">RESOURCES</Link>
            </li>
            <li>
              <Link href="/allotments">ALLOTMENTS</Link>
            </li>
          </ul>
          <Link href="/pay-now" passHref>
            <button className="bg-[#62B4E2] w-[10vw] text-[3vh] p-2 text-white rounded-md hover:bg-[#50a0c8] transition">
              PAY NOW
            </button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-20 h-[85vh]`}>
          <div className="flex flex-col w-full p-4 text-center items-center">
            <ul className="flex flex-col gap-y-8 w-full text-[3vh]">
              <li>
                <Link href="/" onClick={toggleMenu}>HOME</Link>
              </li>
              <li>
                <Link href="/committees" onClick={toggleMenu}>COMMITTEES</Link>
              </li>
              <li>
                <Link href="/resources" onClick={toggleMenu}>RESOURCES</Link>
              </li>
              <li>
                <Link href="/allotments" onClick={toggleMenu}>ALLOTMENTS</Link>
              </li>
            </ul>
            <Link href="/pay-now" passHref className="mt-4">
              <button onClick={toggleMenu} className="bg-[#62B4E2] w-full text-[2vh] p-4 text-white rounded-md hover:bg-[#50a0c8] transition">
                PAY NOW
              </button>
            </Link>

  <div className="mt-[6vh] w-full relative inset-0 rounded-full flex flex-col items-center justify-center">
    <Image
      height={0}
      width={0}
      src="/globe.svg"
      alt="VITMUN"
      className="h-auto w-[20vw] rounded-full bg-white"
    />

<div className="font-bebas font-bold text-center text-[5vh]">
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
  <p className="text-[2vh] text-black border border-black px-4 rounded-3xl text-center">
    WHERE YOUR VOICE MATTERS
  </p>
  </div>

          </div>
        </div>
      </div>
    </nav>
  );
}