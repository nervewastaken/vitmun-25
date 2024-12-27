import React from 'react';
import Image from 'next/image';

interface MarqueeProps {
  text1: string;
  text2: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text1, text2 }) => {
  return (
    <div className="overflow-hidden w-full text-white font-bebas text-[2vh] lg:text-[4vh] py-2">
      {/* Marquee Container */}
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeat enough content to cover the gap */}
        {[...Array(8)].map((_, index) => (
          <React.Fragment key={index}>
            {/* SVG Icon */}
              <Image src="/trident.svg" width={36} height={36} alt="trident" />
          
            {/* Text 1 */}
            <div className="inline-block mx-6">{text1}</div>
            {/* Text 2 */}
            <div className="inline-block mr-6">{text2}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
