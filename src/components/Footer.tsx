
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-darker py-8 relative">
      {/* Gradient line at the top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-light to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-5 md:mb-0">
            <div className="text-xl font-bold gradient-text mb-1">NK<span className="text-sm">.DataScienceLab</span></div>
            <p className="text-gray-400 text-sm">
              Transforming data into insights
            </p>
          </div>
          
          <div className="flex space-x-5">
            <a 
              href="https://github.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-light transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-light transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:ishantkumaryts@gmail.com" 
              className="text-gray-400 hover:text-cyber-light transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-800 pt-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            © {new Date().getFullYear()} Nishant Kumar. All rights reserved.
          </div>
          <div className="mt-3 md:mt-0">
            <span>Designed with 💻 and coded with ☕</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
