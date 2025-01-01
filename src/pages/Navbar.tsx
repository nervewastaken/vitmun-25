import Link from "next/link";
import Image from "next/image";
import { Karma } from "next/font/google";
import "../app/globals.css";

const karma = Karma({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Navbar() {
  return (
    <nav className={` h-[15vh] w-[100vw] ${karma.className} z-20`}>
      <div className="flex flex-row items-center h-full w-full px-4">
        <Link href="https://vit.ac.in/" target="_blank" passHref>
          <Image
            src="/vit-logo.svg"
            height={150}
            width={150}
            alt="VIT Logo"
          />
        </Link>
        <div className="flex flex-row justify-end items-center w-full gap-x-24 mr-[2vw]">
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
      </div>
    </nav>
  );
}