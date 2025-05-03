
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particles background effect */}
      <div className="absolute inset-0 z-0">
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4}px`,
                height: `${Math.random() * 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? '#9b87f5' : i % 3 === 1 ? '#1EAEDB' : '#D946EF',
                opacity: Math.random() * 0.6 + 0.3,
                animation: `pulse-glow ${Math.random() * 6 + 3}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Gradient circles */}
      <div className="absolute top-20 -right-32 w-96 h-96 bg-cyber-light/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-cyber-accent/10 rounded-full blur-3xl animate-pulse-glow"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 z-10">
        <div className="relative">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 py-1 px-3 rounded-full bg-cyber-accent/10 text-cyber-accent text-sm font-semibold">
              Data Scientist • ML Engineer • Developer
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="block">Hi, I'm </span>
              <span className="gradient-text">Nishant Kumar</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300 mb-8">
              Transforming data into insights with a touch of innovation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-cyber-blue to-cyber-light hover:opacity-90 shadow-lg shadow-cyber-light/20">
                View My Projects
              </Button>
              <Button variant="outline" className="border-cyber-light text-cyber-light hover:bg-cyber-light/10">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 animate-bounce">
        <ArrowDown className="text-cyber-light/50" />
      </div>
    </section>
  );
};

export default HeroSection;
