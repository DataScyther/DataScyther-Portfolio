
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Star, CircleDot, CircleArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / containerRef.current.offsetWidth) - 0.5;
        const y = ((e.clientY - rect.top) / containerRef.current.offsetHeight) - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate interactive particles
  const generateInteractiveParticles = () => {
    return [...Array(10)].map((_, i) => (
      <div
        key={`interactive-particle-${i}`}
        className={cn(
          "absolute rounded-full z-0 transition-all duration-700 hover:scale-150",
          activeButton ? "animate-pulse-glow" : ""
        )}
        style={{
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          backgroundColor: i % 3 === 0 ? '#9b87f5' : i % 3 === 1 ? '#1EAEDB' : '#D946EF',
          opacity: Math.random() * 0.6 + 0.4,
          transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
          filter: isHovering ? 'brightness(1.5)' : 'brightness(1)'
        }}
      />
    ));
  };

  // Function to handle scrolling to a section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = section.getBoundingClientRect().top;
      const offsetPosition = targetPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Hexagonal grid background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 41.343 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413 7.07-7.07 7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z\' fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Dynamic particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "absolute rounded-full", 
              mounted ? "animate-pulse-glow" : ""
            )}
            style={{
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#9b87f5' : i % 3 === 1 ? '#1EAEDB' : '#D946EF',
              opacity: Math.random() * 0.6 + 0.3,
              animation: `pulse-glow ${Math.random() * 6 + 3}s ease-in-out infinite`,
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        ))}
      </div>
      
      {/* Interactive particles that respond to hover */}
      <div className="absolute inset-0 z-0">
        {generateInteractiveParticles()}
      </div>
      
      {/* Gradient orbs with parallax effect */}
      <div 
        className="absolute top-20 -right-32 w-96 h-96 bg-cyber-light/10 rounded-full blur-3xl animate-float"
        style={{ 
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      <div 
        className="absolute bottom-10 -left-32 w-96 h-96 bg-cyber-accent/10 rounded-full blur-3xl animate-pulse-glow"
        style={{ 
          transform: `translate(${mousePosition.x * -50}px, ${mousePosition.y * -50}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      
      {/* Main content with entrance animations */}
      <div className="container mx-auto px-6 z-10">
        <div className="relative">
          <div className="text-center mb-10">
            <div 
              className={cn(
                "inline-block mb-4 py-1 px-3 rounded-full bg-cyber-accent/10 text-cyber-accent text-sm font-semibold transition-all duration-500",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              )}
            >
              <span className="animate-pulse-glow inline-flex items-center">
                <CircleDot className="w-4 h-4 mr-2" />
                Data Scientist • ML Engineer • Developer
              </span>
            </div>
            
            <h1 
              className={cn(
                "text-4xl md:text-6xl lg:text-7xl font-bold mb-4 transition-all duration-700",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
              )}
            >
              <span className="block mb-2">Hi, I'm </span>
              <span className="gradient-text relative inline-block">
                Nishant Kumar
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 opacity-30 blur-xl rounded-lg -z-10"></span>
              </span>
            </h1>
            
            <p 
              className={cn(
                "text-xl md:text-2xl max-w-2xl mx-auto text-gray-300 mb-8 transition-all duration-900",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              )}
            >
              <span className="typing-effect">Transforming data into insights with a touch of innovation</span>
            </p>
            
            <div 
              className={cn(
                "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
              )}
            >
              <Button 
                className={cn(
                  "bg-gradient-to-r from-cyber-blue to-cyber-light hover:opacity-90 shadow-lg relative group overflow-hidden",
                  activeButton === 'projects' ? "shadow-cyber-light/50" : "shadow-cyber-light/20",
                )}
                onMouseEnter={() => setActiveButton('projects')}
                onMouseLeave={() => setActiveButton(null)}
                onClick={() => scrollToSection('projects')}
              >
                <span className="relative z-10 flex items-center">
                  <Star className={cn(
                    "mr-2 transition-all duration-300",
                    activeButton === 'projects' ? "rotate-45 scale-125" : ""
                  )} />
                  View My Projects
                </span>
                <span className="absolute inset-0 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></span>
              </Button>
              
              <Button 
                variant="outline" 
                className={cn(
                  "border-cyber-light text-cyber-light relative group overflow-hidden",
                  activeButton === 'contact' ? "bg-cyber-light/20" : "hover:bg-cyber-light/10"
                )}
                onMouseEnter={() => setActiveButton('contact')}
                onMouseLeave={() => setActiveButton(null)}
                onClick={() => scrollToSection('contact')}
              >
                <span className="relative z-10 flex items-center">
                  <CircleDot className={cn(
                    "mr-2 transition-all duration-300",
                    activeButton === 'contact' ? "scale-125" : ""
                  )} />
                  Contact Me
                </span>
                <span className="absolute inset-0 bg-cyber-light/10 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator with interaction */}
      <div 
        className={cn(
          "absolute bottom-8 animate-bounce cursor-pointer transition-all duration-300",
          isHovering ? "text-white scale-110" : "text-cyber-light/50"
        )}
        onClick={() => scrollToSection('about')}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 opacity-80">Scroll Down</span>
          <CircleArrowDown className="text-cyber-light/70 hover:text-cyber-light transition-all duration-300" />
        </div>
      </div>

      {/* Add CSS for the typing animation */}
      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          
          .typing-effect {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            animation: typing 3s steps(40) 1s 1 normal both;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
