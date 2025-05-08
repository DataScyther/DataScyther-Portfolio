
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
      {/* Background decorative elements */}
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-cyber-pink/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text">Data Science</span> & <span className="gradient-text">ML Engineer</span>
              <br />Turning Data into <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              I build machine learning models and data-driven applications 
              that help businesses make smarter decisions and create innovative products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-gradient-to-r from-cyber-blue to-cyber-light text-white hover:opacity-90" 
                size="lg"
              >
                <a href="#projects" onClick={(e) => scrollToSection('#projects', e)} className="flex items-center">
                  View My Projects <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-cyber-light text-cyber-light hover:bg-cyber-light/10"
                size="lg"
              >
                <a href="#contact" onClick={(e) => scrollToSection('#contact', e)}>Contact Me</a>
              </Button>
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center md:justify-end">
            <div className="cyber-border p-1 rounded-xl overflow-hidden">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden relative">
                <img 
                  src="https://placehold.co/600x600/1A1F2C/9b87f5?text=NK" 
                  alt="Nishant Kumar" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-transparent opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <svg className="w-6 h-6 text-cyber-light" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
