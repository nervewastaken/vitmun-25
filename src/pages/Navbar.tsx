import Link from "next/link";
import Image from "next/image";
import { Karma } from "next/font/google";
import { useState } from "react";
import { Menu} from "lucide-react";
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row justify-end items-center w-full gap-x-24">
          <ul className="flex flex-row gap-x-8 text-[3vh]">
            <li className="hover:text-[#54B3EA]">
              <Link href="/">HOME</Link>
            </li>
            <li className="hover:text-[#54B3EA]">
              <Link href="/committees">COMMITTEES</Link>
            </li>
            {/* <li className="hover:text-[#54B3EA]">
              <Link href="/resources">RESOURCES</Link>
            </li>
            <li className="hover:text-[#54B3EA]">
              <Link href="/allotments">ALLOTMENTS</Link>
            </li> */}
          </ul>
          {/* <Link href="/pay-now" passHref>
            <button className={`bg-[#62B4E2] w-[10vw] text-[3vh] p-2 text-white rounded-md hover:bg-[#50a0c8] transition font-bebas`}>
              PAY NOW
            </button>
          </Link> */}
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-20 h-[90vh] bg-gradient-to-l from-transparent to-blue-100`}>
          <div className="flex flex-col w-full p-4 text-center items-center justify-center">
            <ul className="flex flex-col gap-y-8 w-full text-[4vh]">
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
              {/* <li>
                <Link
                  href="/resources"
                  onClick={toggleMenu}
                  className="hover:text-[#54B3EA]"
                >
                  RESOURCES
                </Link>
              </li>
              <li>
                <Link
                  href="/allotments"
                  onClick={toggleMenu}
                  className="hover:text-[#54B3EA]"
                >
                  ALLOTMENTS
                </Link>
              </li> */}
            </ul>
            {/* <Link href="/pay-now" passHref className="mt-4">
              <button onClick={toggleMenu} className="bg-[#62B4E2] w-full text-[2.5vh] p-4 text-white rounded-md hover:bg-[#50a0c8] transition font-bebas">
                PAY NOW
              </button>
            </Link> */}

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
  );
}
