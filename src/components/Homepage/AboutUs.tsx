import aboutUs from '@/data/aboutUs.json';
import { gsap } from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import './styles/text.css';

interface AboutUsProps {
  className?: string;
}

const Card = ({ image, text, imageOnLeft }: { image: string; text: string; imageOnLeft?: boolean }) => {
  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-10 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg`}>
      {/* IMAGE SECTION */}
      <div className={`md:w-1/3 ${imageOnLeft ? 'order-1' : 'order-2'}`}>
        <Image src={image} alt="aboutus-image" width={300} height={300} className="rounded-xl shadow-lg" />
      </div>

      {/* TEXT SECTION */}
      <div className="md:w-2/3 text-center md:text-left text-gray-300 text-lg">
        {text}
      </div>
    </div>
  );
};

export default function HomepageAboutUs({ className }: AboutUsProps) {
  const bgTextRef = useRef(null);

  useEffect(() => {
    gsap.to(bgTextRef.current, {
      xPercent: 28,
      duration: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: bgTextRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  return (
    <div id="aboutUs" className={`relative flex flex-col items-center px-6 md:px-16 py-20 ${className}`}>
      
      {/* Section Heading */}
      <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-10">
        About 
      </h2>

      {/* About Us Content */}
      <div className="flex flex-col gap-10 w-full max-w-5xl">
        {aboutUs.map((card, index) => (
          <Card key={index} text={card.text} image={card.image} imageOnLeft={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
}
