
import React, { useRef } from 'react';

interface HeroInteractiveImageProps {
  imageRef: React.RefObject<HTMLDivElement>;
}

const HeroInteractiveImage: React.FC<HeroInteractiveImageProps> = ({ imageRef }) => {
  return (
    <div className="md:w-2/5 flex justify-center md:justify-end">
      <div className="relative" ref={imageRef}>
        {/* Cybernetic frame with animated elements */}
        <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-cyber-blue/20 via-cyber-light/20 to-cyber-pink/20 blur-lg opacity-70 animate-pulse"></div>
        <div className="absolute -top-6 -left-6 w-full h-full border-t-2 border-l-2 border-cyber-light/30 rounded-xl transform -rotate-3"></div>
        <div className="absolute -bottom-6 -right-6 w-full h-full border-b-2 border-r-2 border-cyber-accent/30 rounded-xl transform rotate-3"></div>
        
        {/* Corner tech elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-2 border-cyber-light rounded-full"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-2 border-cyber-pink rounded-full"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-2 border-cyber-blue rounded-full"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-cyber-accent rounded-full"></div>
        
        {/* Connection lines */}
        <div className="absolute top-0 left-2 w-[1px] h-12 bg-gradient-to-b from-cyber-light/0 via-cyber-light/50 to-cyber-light/0"></div>
        <div className="absolute top-2 left-0 h-[1px] w-12 bg-gradient-to-r from-cyber-light/0 via-cyber-light/50 to-cyber-light/0"></div>
        
        <div className="absolute bottom-0 right-2 w-[1px] h-12 bg-gradient-to-b from-cyber-pink/0 via-cyber-pink/50 to-cyber-pink/0"></div>
        <div className="absolute bottom-2 right-0 h-[1px] w-12 bg-gradient-to-r from-cyber-pink/0 via-cyber-pink/50 to-cyber-pink/0"></div>
        
        <div className="cyber-border p-1 rounded-xl overflow-hidden neon-border shadow-xl transition-transform duration-300 relative">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden relative">
            <img 
              src="https://placehold.co/600x600/1A1F2C/9b87f5?text=NK" 
              alt="Nishant Kumar" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-transparent opacity-40"></div>
            
            {/* Scanning effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-cyber-light/0 via-cyber-light/70 to-cyber-light/0 animate-[scanline_4s_linear_infinite]"></div>
            </div>
            
            {/* Tech-themed overlay elements */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cyber-darker to-transparent">
              <div className="flex justify-between items-center">
                <div className="h-2 w-2 rounded-full bg-cyber-light animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-cyber-accent animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-cyber-pink animate-pulse"></div>
              </div>
              
              {/* Digital readout */}
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs font-mono text-cyber-light/80">SYST.READY</div>
                <div className="text-xs font-mono text-cyber-accent/80">ML.ENGINE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInteractiveImage;
