
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Database, Brain, Sparkles } from 'lucide-react';
import FuturisticBackground from './FuturisticBackground';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
        const imgX = ((x / rect.width) * 2 - 1) * 5;
        const imgY = ((y / rect.height) * 2 - 1) * 5;
        
        imageRef.current.style.transform = `perspective(1000px) rotateY(${imgX}deg) rotateX(${-imgY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
      
      // Apply subtle movement to text
      if (textContainerRef.current) {
        const textX = ((x / rect.width) * 2 - 1) * 10;
        const textY = ((y / rect.height) * 2 - 1) * 5;
        
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

  // Smooth scroll function
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetSection = document.querySelector(sectionId);
    
    if (targetSection) {
      const navbarHeight = 80;
      const targetPosition = (targetSection as HTMLElement).getBoundingClientRect().top;
      const offsetPosition = targetPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Reactive glowing effect that follows cursor
  const glowStyles = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(155, 135, 245, 0.15) 0%, 
                rgba(30, 174, 219, 0.15) 30%, 
                rgba(30, 174, 219, 0) 70%)`,
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  return (
    <div 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden pt-16"
    >
      <FuturisticBackground />
      
      {/* Interactive background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0" style={glowStyles}></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
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
            
            {/* Floating tech icons */}
            <div className="mt-12 flex gap-6 relative">
              <div className="absolute -top-8 -left-8 w-full h-full border-t-2 border-l-2 border-cyber-accent/20 rounded-lg opacity-30"></div>
              
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-darker/50 border border-cyber-light/10 backdrop-blur-sm shadow-lg hover:shadow-cyber-light/20 transition-all hover:-translate-y-1 group">
                <Code className="w-6 h-6 text-cyber-light/70 group-hover:text-cyber-light" />
                <div className="absolute -bottom-2 left-0 right-0 mx-auto w-4 h-1 bg-cyber-light/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-darker/50 border border-cyber-light/10 backdrop-blur-sm shadow-lg hover:shadow-cyber-accent/20 transition-all hover:-translate-y-1 group">
                <Database className="w-6 h-6 text-cyber-accent/70 group-hover:text-cyber-accent" />
                <div className="absolute -bottom-2 left-0 right-0 mx-auto w-4 h-1 bg-cyber-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-darker/50 border border-cyber-light/10 backdrop-blur-sm shadow-lg hover:shadow-cyber-pink/20 transition-all hover:-translate-y-1 group">
                <Brain className="w-6 h-6 text-cyber-pink/70 group-hover:text-cyber-pink" />
                <div className="absolute -bottom-2 left-0 right-0 mx-auto w-4 h-1 bg-cyber-pink/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-darker/50 border border-cyber-light/10 backdrop-blur-sm shadow-lg hover:shadow-cyber-blue/20 transition-all hover:-translate-y-1 group">
                <Sparkles className="w-6 h-6 text-cyber-blue/70 group-hover:text-cyber-blue" />
                <div className="absolute -bottom-2 left-0 right-0 mx-auto w-4 h-1 bg-cyber-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-full h-full border-b-2 border-r-2 border-cyber-pink/20 rounded-lg opacity-30"></div>
            </div>
          </div>
          
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
        </div>
        
        {/* Enhanced scroll indicator - more futuristic */}
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
      </div>
    </div>
  );
};

export default HeroSection;
