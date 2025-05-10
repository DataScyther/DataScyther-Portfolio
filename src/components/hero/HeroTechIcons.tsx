
import React from 'react';
import { Code, Database, Brain, Sparkles } from 'lucide-react';

const HeroTechIcons: React.FC = () => {
  return (
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
  );
};

export default HeroTechIcons;
