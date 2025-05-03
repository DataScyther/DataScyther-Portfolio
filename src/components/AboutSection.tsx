import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
const AboutSection: React.FC = () => {
  const experiences = [{
    company: 'British Airways',
    position: 'Data Science Intern',
    period: 'Virtual Experience',
    description: 'Analyzed customer reviews to identify key factors affecting business outcomes using sentiment analysis and NLP techniques.'
  }, {
    company: 'BCG',
    position: 'Data Science & Analytics Intern',
    period: 'Virtual Experience',
    description: 'Developed predictive models for customer churn and provided strategic recommendations based on data-driven insights.'
  }, {
    company: 'Accenture',
    position: 'Data Analytics Intern',
    period: 'Virtual Experience',
    description: 'Processed and analyzed large datasets to identify operational efficiencies and business optimization opportunities.'
  }];
  return <section id="about" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute top-0 -right-32 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-32 w-80 h-80 bg-cyber-pink/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Computer Science graduate with a passion for data science and machine learning, seeking to leverage technical skills to derive meaningful insights from complex datasets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="cyber-border p-1 overflow-hidden">
              <div className="gradient-border w-full bg-cyber-darker p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <GraduationCap className="mr-2 text-cyber-light" />
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium">Bachelor's in Computer Science</h4>
                    <p className="text-gray-400">Specialization in Data Science</p>
                    <p className="text-sm text-gray-500">2020 - 2027</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="cyber-border p-1 overflow-hidden mt-6">
              <div className="gradient-border w-full bg-cyber-darker p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Award className="mr-2 text-cyber-accent" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-md font-medium">AWS Solution Architect</h4>
                    <p className="text-sm text-gray-400">Amazon Web Services</p>
                  </div>
                  <div>
                    <h4 className="text-md font-medium">Machine Learning Specialization</h4>
                    <p className="text-sm text-gray-400">Stanford University</p>
                  </div>
                  <div>
                    <h4 className="text-md font-medium">Data Science Professional</h4>
                    <p className="text-sm text-gray-400">IBM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Briefcase className="mr-2 text-cyber-pink" />
              Work Experience
            </h3>
            
            {experiences.map((exp, index) => <Card key={index} className="data-card">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-cyber-light">{exp.position}</h4>
                      <span className="text-xs text-gray-500">{exp.period}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-0.5">{exp.company}</p>
                    <p className="text-sm mt-3 text-gray-300">{exp.description}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;