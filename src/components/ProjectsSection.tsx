
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Github, ExternalLink, Code, Database, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "UPI QR Code Generator",
      description: "A web application that generates UPI QR codes for seamless payments, supporting multiple UPI providers and custom payment amounts.",
      tags: ["JavaScript", "React", "QR Code API", "Payment Integration"],
      image: "https://placehold.co/600x400/1A1F2C/9b87f5?text=QR+Generator",
      githubUrl: "#",
      liveUrl: "#",
      icon: <Code className="w-5 h-5" />,
    },
    {
      title: "4D Musical Spheres with Ripple Effect",
      description: "An interactive 3D visualization that transforms music into dynamic spheres with ripple effects, creating a synesthetic experience.",
      tags: ["Three.js", "WebAudio API", "JavaScript", "3D Visualization"],
      image: "https://placehold.co/600x400/1A1F2C/1EAEDB?text=3D+Visualization",
      githubUrl: "#",
      liveUrl: "#",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: "Sentiment Analysis Dashboard",
      description: "A machine learning-powered dashboard that analyzes customer reviews and social media mentions to extract sentiment and key insights.",
      tags: ["Python", "NLP", "BERT", "ReactJS", "D3.js"],
      image: "https://placehold.co/600x400/1A1F2C/D946EF?text=Sentiment+Analysis",
      githubUrl: "#",
      liveUrl: "#",
      icon: <Database className="w-5 h-5" />,
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      {/* Background decorative elements */}
      <div className="absolute top-40 -left-40 w-80 h-80 bg-cyber-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-cyber-pink/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my work in data science, visualization, and web development, demonstrating practical applications of my technical skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="data-card h-full flex flex-col overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-cyber-darker/80 p-2 rounded-md z-20">
                  {project.icon}
                </div>
              </div>
              
              <CardContent className="flex-grow p-6">
                <h3 className="text-xl font-medium mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs px-2 py-1 rounded-full bg-cyber-darker text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="border-t border-cyber-light/10 p-4 pt-4 space-x-3">
                <Button 
                  variant="outline"
                  size="sm" 
                  className="border-cyber-light/20 hover:bg-cyber-light/10 flex-1"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
                <Button 
                  size="sm"
                  className="bg-cyber-light hover:bg-cyber-light/80 flex-1"
                  asChild
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            className="border-cyber-light text-cyber-light hover:bg-cyber-light/10"
            size="lg"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
