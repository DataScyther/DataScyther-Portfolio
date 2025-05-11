
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="about" className="scroll-mt-20">
          <AboutSection />
        </section>
        <section id="skills" className="scroll-mt-20">
          <SkillsSection />
        </section>
        <section id="projects" className="scroll-mt-20">
          <ProjectsSection />
        </section>
        <section id="contact" className="scroll-mt-20">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
