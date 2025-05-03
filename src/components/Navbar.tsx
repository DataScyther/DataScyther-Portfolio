import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navLinks = [{
    name: 'Home',
    path: '#home'
  }, {
    name: 'About',
    path: '#about'
  }, {
    name: 'Skills',
    path: '#skills'
  }, {
    name: 'Projects',
    path: '#projects'
  }, {
    name: 'Contact',
    path: '#contact'
  }];
  return <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-cyber-darker/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold flex items-center">
            <span className="gradient-text">NK</span>
            <span className="text-sm ml-1 hidden md:inline">DataScyther</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map(link => <li key={link.name}>
                  <a href={link.path} className="text-sm text-gray-300 hover:text-white hover:underline underline-offset-4 transition-colors">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-cyber-blue to-cyber-light text-white hover:opacity-90" size="sm" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-cyber-darker/90 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4">
            <ul className="space-y-4">
              {navLinks.map(link => <li key={link.name}>
                  <a href={link.path} className="block text-gray-300 hover:text-white py-2" onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </a>
                </li>)}
              <li>
                <Button className="w-full bg-gradient-to-r from-cyber-blue to-cyber-light text-white hover:opacity-90 mt-2" asChild onClick={() => setIsMenuOpen(false)}>
                  <a href="#contact">Get in Touch</a>
                </Button>
              </li>
            </ul>
          </div>
        </div>}
    </header>;
};
export default Navbar;