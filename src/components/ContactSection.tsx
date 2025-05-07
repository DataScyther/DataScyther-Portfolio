import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    { 
      icon: <Mail className="w-5 h-5" />, 
      label: "Email", 
      value: "ishantkumaryts@gmail.com", 
      href: "mailto:ishantkumaryts@gmail.com"
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      label: "Phone", 
      value: "+91 8826379598", 
      href: "tel:+918826379598"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      label: "LinkedIn", 
      value: "Nishant Kumar", 
      href: "https://linkedin.com/in/"
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      label: "GitHub", 
      value: "nishantkumar", 
      href: "https://github.com/"
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(155,135,245,0.1),transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interested in collaborating or have a question? Feel free to reach out—I'm always open to discussing new projects, opportunities, and ideas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Card className="data-card overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-medium mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start hover:text-cyber-light transition-colors"
                  >
                    <div className="bg-cyber-darker p-2 rounded-md mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-cyber-light/10">
                <h4 className="text-md font-medium mb-4 text-white">Connect with me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://linkedin.com/in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyber-darker hover:bg-cyber-light/10 p-2 rounded-md transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://github.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyber-darker hover:bg-cyber-light/10 p-2 rounded-md transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="data-card overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <h3 className="text-xl font-medium mb-6 text-white">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-cyber-darker border-cyber-light/10 focus:border-cyber-light focus:ring-cyber-light/10"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-cyber-darker border-cyber-light/10 focus:border-cyber-light focus:ring-cyber-light/10"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-cyber-darker border-cyber-light/10 focus:border-cyber-light focus:ring-cyber-light/10 resize-none"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyber-blue to-cyber-light hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">◌</span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
