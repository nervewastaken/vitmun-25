import React from 'react';
import Image from 'next/image';

interface MarqueeProps {
  text1: string;
  text2: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text1, text2 }) => {
  return (
    <div className="overflow-hidden w-full text-white font-bebas text-[2vh] lg:text-[3vh] py-1 z-1">
      {/* Marquee Container */}
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeat enough content to cover the gap */}
        {[...Array(8)].map((_, index) => (
          <React.Fragment key={index}>
            {/* SVG Icon */}
            <Image src="/trident.svg" width={36} height={36} alt="trident" />
          &nbsp;
            {/* Text 1 */}
            &nbsp;&nbsp;<div className="inline-block mr-6 mt-[1mm]">{text1}</div>
            
            {/* Text 2 with added margin-top */}
            <div className="inline-block mr-6 mt-[1mm]">{text2}</div>
            
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
