import React from 'react';
import { Skill } from '../types';

const Skills: React.FC = () => {
  const skills: Skill[] = [
    // Backend
    { name: 'Spring Boot', level: 90, category: 'backend' },
    { name: 'NestJS', level: 75, category: 'backend' },
    { name: 'Next.js', level: 70, category: 'backend' },
    { name: 'JavaScript', level: 80, category: 'backend' },
    { name: 'TypeScript', level: 80, category: 'backend' },
    { name: 'Java', level: 90, category: 'backend' },
    { name: 'Kotlin', level: 70, category: 'backend' },
    { name: 'Python', level: 85, category: 'backend' },
    
    // Frontend
    { name: 'React', level: 78, category: 'frontend' },
    { name: 'Tailwind CSS', level: 75, category: 'frontend' },
    { name: 'Bootstrap', level: 70, category: 'frontend' },
    
    // Database
    { name: 'MySQL', level: 80, category: 'database' },
    { name: 'PostgreSQL', level: 85, category: 'database' },
    { name: 'MongoDB', level: 65, category: 'database' },
    
    // DevOps & Cloud
    { name: 'Terraform', level: 60, category: 'devops' },
    { name: 'Jenkins', level: 55, category: 'devops' },
    { name: 'Ansible', level: 55, category: 'devops' },
    { name: 'AWS', level: 60, category: 'devops' },
    { name: 'Azure', level: 55, category: 'devops' },
    
    // Tools
    { name: 'Git/GitHub', level: 85, category: 'tools' },
    { name: 'Docker', level: 80, category: 'tools' },
    { name: 'SCRUM/Kanban', level: 85, category: 'tools' },
  ];

  const categories = {
    backend: { name: 'Backend', color: 'from-blue-400 to-blue-600' },
    frontend: { name: 'Frontend', color: 'from-green-400 to-green-600' },
    database: { name: 'Database', color: 'from-purple-400 to-purple-600' },
    devops: { name: 'DevOps & Cloud', color: 'from-orange-400 to-orange-600' },
    tools: { name: 'Tools & Methods', color: 'from-pink-400 to-pink-600' },
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 px-6 bg-midnight-blue/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-light mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </div>

        <div className="grid gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-midnight/50 backdrop-blur-sm p-6 rounded-xl border border-accent/10">
              <h3 className={`text-xl font-bold mb-6 bg-gradient-to-r ${categories[category as keyof typeof categories].color} bg-clip-text text-transparent`}>
                {categories[category as keyof typeof categories].name}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-200">{skill.name}</span>
                      <span className="text-accent text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${categories[skill.category as keyof typeof categories].color} rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-accent/10 backdrop-blur-sm p-6 rounded-xl border border-accent/20">
            <p className="text-gray-300 mb-2">
              <span className="text-accent font-semibold">Currently Learning:</span>
            </p>
            <p className="text-gray-400">
              Advanced DevOps practices, Cloud Architecture patterns, Kubernetes, 
              Infrastructure as Code, and preparing for AWS/Azure certifications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;