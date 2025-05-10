
import React from 'react';
import { MousePosition } from './HeroUtils';

interface HeroGlowEffectProps {
  mousePosition: MousePosition;
  isHovering: boolean;
}

const HeroGlowEffect: React.FC<HeroGlowEffectProps> = ({ mousePosition, isHovering }) => {
  // More subtle reactive glowing effect that follows cursor
  const glowStyles = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(155, 135, 245, 0.10) 0%, 
                rgba(30, 174, 219, 0.10) 25%, 
                rgba(30, 174, 219, 0) 60%)`,
    opacity: isHovering ? 0.8 : 0,
    transition: 'opacity 0.7s ease-in-out',
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0" style={glowStyles}></div>
  );
};

export default HeroGlowEffect;
