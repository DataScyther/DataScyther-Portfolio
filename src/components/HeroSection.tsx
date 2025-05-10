
import React, { useState, useEffect, useRef } from 'react';
import FuturisticBackground from './FuturisticBackground';
import HeroGlowEffect from './hero/HeroGlowEffect';
import HeroText from './hero/HeroText';
import HeroInteractiveImage from './hero/HeroInteractiveImage';
import HeroScrollIndicator from './hero/HeroScrollIndicator';
import { MousePosition } from './hero/HeroUtils';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Calculate mouse position relative to the hero section
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      // Apply subtle tilt effect to the image
      if (imageRef.current) {
        const imgX = ((x / rect.width) * 2 - 1) * 4; // Reduced tilt intensity
        const imgY = ((y / rect.height) * 2 - 1) * 4; // Reduced tilt intensity
        
        imageRef.current.style.transform = `perspective(1000px) rotateY(${imgX}deg) rotateX(${-imgY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
      
      // Apply subtle movement to text
      if (textContainerRef.current) {
        const textX = ((x / rect.width) * 2 - 1) * 8; // Reduced movement intensity
        const textY = ((y / rect.height) * 2 - 1) * 4; // Reduced movement intensity
        
        textContainerRef.current.style.transform = `translate(${textX}px, ${textY}px)`;
      }
    };

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      currentHeroRef.addEventListener('mousemove', handleMouseMove);
      currentHeroRef.addEventListener('mouseenter', () => setIsHovering(true));
      currentHeroRef.addEventListener('mouseleave', () => {
        setIsHovering(false);
        
        // Reset transforms when mouse leaves
        if (imageRef.current) {
          imageRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
        }
        
        if (textContainerRef.current) {
          textContainerRef.current.style.transform = 'translate(0px, 0px)';
        }
      });
    }

    return () => {
      if (currentHeroRef) {
        currentHeroRef.removeEventListener('mousemove', handleMouseMove);
        currentHeroRef.removeEventListener('mouseenter', () => setIsHovering(true));
        currentHeroRef.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden pt-16"
    >
      <FuturisticBackground />
      
      {/* Interactive background elements */}
      <HeroGlowEffect mousePosition={mousePosition} isHovering={isHovering} />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <HeroText textContainerRef={textContainerRef} />
          <HeroInteractiveImage imageRef={imageRef} />
        </div>
        
        <HeroScrollIndicator />
      </div>
    </div>
  );
};

export default HeroSection;
