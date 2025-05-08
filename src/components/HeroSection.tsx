
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetSection = document.querySelector(sectionId);
    
    if (targetSection) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = (targetSection as HTMLElement).getBoundingClientRect().top;
      const offsetPosition = targetPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center relative pt-16 overflow-hidden">
      {/* Enhanced background elements with improved visibility */}
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyber-blue/40 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-cyber-pink/40 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyber-accent/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-10 md:mb-0">
            <div className="mb-4 inline-block">
              <span className="px-3 py-1 bg-cyber-light/10 text-cyber-light text-sm font-medium rounded-full">
                Data Science & ML Specialist
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text">Data Science</span> & <span className="gradient-text">ML Engineer</span>
              <br />Turning Data into <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl backdrop-blur-sm bg-cyber-darker/30 p-4 rounded-lg">
              I build machine learning models and data-driven applications 
              that help businesses make smarter decisions and create innovative products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-gradient-to-r from-cyber-blue to-cyber-light hover:opacity-90 text-white shadow-lg shadow-cyber-light/20" 
                size="lg"
              >
                <a href="#projects" onClick={(e) => scrollToSection('#projects', e)} className="flex items-center">
                  View My Projects <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-cyber-light text-cyber-light hover:bg-cyber-light/10 shadow-lg"
                size="lg"
              >
                <a href="#contact" onClick={(e) => scrollToSection('#contact', e)}>Contact Me</a>
              </Button>
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center md:justify-end">
            <div className="relative">
              {/* Decorative elements around the profile image */}
              <div className="absolute -top-4 -left-4 w-full h-full border-t-2 border-l-2 border-cyber-light/30 rounded-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-b-2 border-r-2 border-cyber-accent/30 rounded-xl"></div>
              
              <div className="cyber-border p-1 rounded-xl overflow-hidden neon-border shadow-xl">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden relative">
                  <img 
                    src="https://placehold.co/600x600/1A1F2C/9b87f5?text=NK" 
                    alt="Nishant Kumar" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-transparent opacity-40"></div>
                  
                  {/* Tech-themed overlay elements */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cyber-darker to-transparent">
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-2 rounded-full bg-cyber-light animate-pulse-glow"></div>
                      <div className="h-2 w-2 rounded-full bg-cyber-accent animate-pulse-glow"></div>
                      <div className="h-2 w-2 rounded-full bg-cyber-pink animate-pulse-glow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-cyber-light mb-2">Explore More</span>
          <div className="h-10 w-5 border-2 border-cyber-light/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyber-light rounded-full mt-1 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
