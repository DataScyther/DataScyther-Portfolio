
import React from 'react';

const HeroScrollIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <span className="text-sm text-cyber-light mb-2 font-mono tracking-wider opacity-80">NAVIGATE_DOWN</span>
      <div className="h-14 w-8 border-2 border-cyber-light/30 rounded-full flex justify-center relative overflow-hidden group hover:border-cyber-light/50 transition-colors">
        <div className="w-1 absolute top-2 h-3 bg-cyber-light rounded-full animate-[scrollPulse_2s_infinite] group-hover:bg-cyber-light/80"></div>
        
        {/* Animated lines */}
        <div className="absolute inset-x-0 h-full">
          <div className="h-[1px] w-full bg-cyber-light/20 absolute top-[30%] transform -translate-y-1/2"></div>
          <div className="h-[1px] w-full bg-cyber-light/20 absolute top-[60%] transform -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroScrollIndicator;
