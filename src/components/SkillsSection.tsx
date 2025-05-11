
import React from 'react';
import { Shield, Database, BarChart3, Code, Cloud, Brain } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      name: "Programming",
      icon: <Code className="w-5 h-5 text-cyber-light" />,
      skills: ["Python", "R", "SQL", "JavaScript", "Java", "C++"],
    },
    {
      name: "Machine Learning",
      icon: <Brain className="w-5 h-5 text-cyber-light" />,
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Deep Learning", "NLP", "Computer Vision"],
    },
    {
      name: "Data Analysis",
      icon: <BarChart3 className="w-5 h-5 text-cyber-light" />,
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau", "Power BI"],
    },
    {
      name: "Big Data",
      icon: <Database className="w-5 h-5 text-cyber-light" />,
      skills: ["Hadoop", "Spark", "Kafka", "MongoDB", "PostgreSQL", "Elasticsearch"],
    },
    {
      name: "Cloud Computing",
      icon: <Cloud className="w-5 h-5 text-cyber-light" />,
      skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Serverless"],
    },
    {
      name: "Security & Ethics",
      icon: <Shield className="w-5 h-5 text-cyber-light" />,
      skills: ["Data Privacy", "GDPR Compliance", "Ethical AI", "Secure ML", "Adversarial Testing"],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-cyber-darker relative">
      {/* Simplified background elements */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyber-light/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyber-accent/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-left max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Technical Expertise</h2>
          <p className="text-gray-400">
            My technical toolkit combines data science fundamentals with cutting-edge technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="cyber-border p-1 group"
            >
              <div className="bg-gradient-to-br from-cyber-dark to-cyber-darker rounded-lg p-5 h-full">
                <div className="flex items-center mb-3">
                  <div className="mr-3 p-2 rounded-md bg-cyber-darker">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-medium text-cyber-light">{category.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="text-xs px-2 py-1 rounded-full bg-cyber-darker/80 text-gray-300 border border-cyber-light/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="inline-block cyber-border p-1 max-w-xl w-full">
            <div className="rounded-lg bg-cyber-darker p-5">
              <h3 className="text-lg font-medium text-cyber-light mb-3 text-left">Proficiency Level</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
                {['Python', 'Machine Learning', 'Data Analysis', 'AWS', 'SQL'].map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-white text-left">{skill}</p>
                    <div className="h-1.5 bg-cyber-darker/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyber-light to-cyber-accent" 
                        style={{ width: `${85 + Math.random() * 15}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
