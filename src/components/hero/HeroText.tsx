
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HeroTechIcons from './HeroTechIcons';
import { scrollToSection } from './HeroUtils';

interface HeroTextProps {
  textContainerRef: React.RefObject<HTMLDivElement>;
}

const HeroText: React.FC<HeroTextProps> = ({ textContainerRef }) => {
  return (
    <div 
      ref={textContainerRef}
      className="md:w-3/5 mb-10 md:mb-0 transition-transform duration-300"
    >
      <div className="mb-6 inline-block">
        <span className="px-3 py-1 backdrop-blur-md bg-cyber-light/10 text-cyber-light text-sm font-medium rounded-full border border-cyber-light/20 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
          <span className="animate-pulse inline-block w-2 h-2 bg-cyber-light rounded-full mr-2"></span>
          Data Science & ML Specialist
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 relative">
        <div className="absolute -left-4 top-0 w-10 h-10 border-l-2 border-t-2 border-cyber-accent/50"></div>
        <span className="gradient-text drop-shadow-[0_5px_15px_rgba(155,135,245,0.3)]">Data Science</span> & <span className="gradient-text drop-shadow-[0_5px_15px_rgba(30,174,219,0.3)]">ML Engineer</span>
        <br />Turning Data into <span className="gradient-text relative inline-block">
          Insights
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 animate-pulse"></span>
        </span>
        <div className="absolute -right-4 bottom-0 w-10 h-10 border-r-2 border-b-2 border-cyber-pink/50"></div>
      </h1>
      
      <p className="text-lg text-gray-300 mb-8 max-w-xl glass-card relative z-10 p-5 backdrop-blur-md bg-cyber-darker/40 rounded-lg border border-cyber-light/10">
        I build machine learning models and data-driven applications 
        that help businesses make smarter decisions and create innovative products.
        <span className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-cyber-light/5 to-transparent rounded-lg pointer-events-none"></span>
      </p>
      
      <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4">
        <Button 
          className="w-full sm:w-auto bg-gradient-to-r from-cyber-blue to-cyber-light hover:opacity-90 text-white shadow-lg shadow-cyber-light/20 relative overflow-hidden group"
          size="lg"
        >
          <a href="#projects" onClick={(e) => scrollToSection('#projects', e)} className="flex items-center">
            <span className="relative z-10">View My Projects</span>
            <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            
            {/* Button glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyber-blue/0 via-cyber-light/70 to-cyber-blue/0 blur-md -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out"></div>
          </a>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full sm:w-auto border-cyber-light text-cyber-light hover:bg-cyber-light/10 shadow-lg group relative overflow-hidden"
          size="lg"
        >
          <a href="#contact" onClick={(e) => scrollToSection('#contact', e)} className="relative z-10 flex items-center">
            Contact Me
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
          
          {/* Button border glow effect */}
          <div className="absolute inset-0 border border-cyber-light/50 rounded-md opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-300"></div>
        </Button>
      </div>
      
      <HeroTechIcons />
    </div>
  );
};

export default HeroText;
