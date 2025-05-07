
import React from 'react';

const Footer: React.FC = () => {
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

  return (
    <footer className="py-8 bg-cyber-darker border-t border-cyber-light/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" onClick={(e) => scrollToSection('#home', e)} className="text-xl font-bold flex items-center">
              <span className="gradient-text">NK</span>
              <span className="text-sm ml-1">DataScyther</span>
            </a>
            <p className="text-sm text-gray-400 mt-1">Turning Data into Insights</p>
          </div>
          
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => scrollToSection('#home', e)}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection('#about', e)}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={(e) => scrollToSection('#projects', e)}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection('#contact', e)}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Nishant Kumar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
