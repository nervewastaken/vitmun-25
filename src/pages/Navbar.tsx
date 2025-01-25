import Link from "next/link";
import Image from "next/image";
import { Karma } from "next/font/google";
import { useState } from "react";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import "../app/globals.css";
import ImageFilledText from "@/components/ui/ImageFilledText";
import { Montaga, Montserrat } from "next/font/google";

const karma = Karma({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montaga = Montaga({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setDropdownOpen(false);
    }
  };

  return (
    <>
      {(isMenuOpen || isDropdownOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40" 
          onClick={() => {
            setIsMenuOpen(false);
            setDropdownOpen(false);
          }}
        />
      )}

      <nav className={`fixed h-[10vh] w-[100vw] ${karma.className} z-50 bg-white bg-gradient-to-l from-transparent to-blue-100`}>
        <div className="flex flex-row items-center h-full w-full relative px-4 lg:px-16">
          <Link href="/">
            <Image src="/vit-logo.svg" height={150} width={150} alt="VIT Logo" />
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden ml-auto">
            {isMenuOpen ? (
              <Image src="/cross.svg" height={48} width={48} alt="cross" />
            ) : (
              <Menu size={48} />
            )}
          </button>

          <div className="hidden md:flex flex-row justify-end items-center w-full gap-x-24">
            <ul className="flex flex-row gap-x-8 text-[3vh]">
              <li className="hover:text-[#54B3EA]">
                <Link href="/">HOME</Link>
              </li>
              <li className="hover:text-[#54B3EA]">
                <Link href="/committees">COMMITTEES</Link>
              </li>
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="hover:text-[#54B3EA] focus:outline-none flex items-center"
                >
                  RESOURCES
                  {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {isDropdownOpen && (
                  <ul className="absolute top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-[15vw]">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link href="https://drive.google.com/file/d/1UhHYEbJeCZkzTPwWwjk3vIlb3_OFMsuz/view?usp=drive_link" target="blank">Conference Brochure</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="hover:text-[#54B3EA]">
                <Link target="_blank" href="https://docs.google.com/spreadsheets/d/1uWmQmWyDJIISxIHaRMPpfOtzxMfI686Z1lvbcd9w9dY/edit?usp=sharing">ALLOTMENTS</Link>
              </li>
            </ul>
          </div>

          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 h-[90vh] bg-gradient-to-l from-transparent to-blue-100`}>
            <div className="flex flex-col w-full p-4 text-center items-center justify-center">
              <ul className="flex flex-col gap-y-8 w-full text-[3.5vh]">
                <li>
                  <Link
                    href="/"
                    onClick={toggleMenu}
                    className="hover:text-[#54B3EA]"
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    href="/committees"
                    onClick={toggleMenu}
                    className="hover:text-[#54B3EA]"
                  >
                    COMMITTEES
                  </Link>
                </li>
                <li>
                  <div 
                    className="flex flex-col items-center"
                    onClick={toggleDropdown}
                  >
                    <div className="flex items-center hover:text-[#54B3EA]">
                      RESOURCES
                      {isDropdownOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                    {isDropdownOpen && (
                      <ul className="mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-[70vw]">
                        <li className="px-4 py-2 hover:bg-gray-100 text-[2.5vh]">
                          <Link 
                            href="https://drive.google.com/file/d/1UhHYEbJeCZkzTPwWwjk3vIlb3_OFMsuz/view?usp=drive_link" 
                            target="blank"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu();
                            }}
                          >
                            Conference Brochure
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://docs.google.com/spreadsheets/d/1uWmQmWyDJIISxIHaRMPpfOtzxMfI686Z1lvbcd9w9dY/edit?gid=0#gid=0"
                    onClick={toggleMenu}
                    className="hover:text-[#54B3EA]"
                  >
                    ALLOTMENTS
                  </Link>
                </li>
              </ul>

              <div className="mt-[6vh] w-full relative inset-0 rounded-full flex flex-col items-center justify-center">
                <Image
                  height={0}
                  width={0}
                  src="/globe.svg"
                  alt="VITMUN"
                  className="h-auto w-[20vw] rounded-full"
                />

                <div className="flex flex-col items-center justify-center">
                  <div className="font-bold text-[5vh] lg:text-[6vh] select-none flex justify-center">
                    <span className={`${montaga.className} text-center`}>VIT</span>
                    <ImageFilledText
                      text="MUN"
                      imageUrl="/blue.jpg"
                      className={`${montserrat.className} text-center`}
                    />
                    <Image
                      src="/bird.svg"
                      width={24}
                      height={24}
                      alt="bird"
                      className="inline -mt-12"
                    />
                  </div>
                  <div>
                    <p className="text-[1.5vh] lg:text-[1.75vh] text-black border border-black justify-center px-4 rounded-3xl select-none italic text-center">
                      WHERE YOUR VOICE MATTERS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}