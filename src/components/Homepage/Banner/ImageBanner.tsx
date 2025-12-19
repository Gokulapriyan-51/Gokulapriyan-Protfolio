import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function ImageBanner({ className }: { className?: string }) {
  const image1Ref = useRef<HTMLImageElement | null>(null);
  const image2Ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 8
    });

    tl.to(image1Ref.current, {
      x: '100%',
      opacity: 0,
      duration: 2
    }).fromTo(
      image2Ref.current,
      { x: '-100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 2 },
      '-=1'
    );

    // ✅ Type-safe cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
        <Image
          ref={image2Ref}
          src="/assets/pngwing.png"
          alt="banner"
          width={1000}
          height={1000}
          priority
          className="h-full w-full object-contain opacity-0"
        />
      </div>

      <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
        <Image
          ref={image1Ref}
          src="/assets/img3.png"
          alt="banner"
          width={1000}
          height={1000}
          priority
          className="h-full w-full object-contain"
        />  
      </div>
    </>
  );
}
