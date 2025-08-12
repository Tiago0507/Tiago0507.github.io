import React, { useState } from 'react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  // Icon component for rendering SVG icons
  const TechIcon = ({ iconUrl, alt }: { iconUrl: string; alt: string }) => (
    <img 
      src={iconUrl} 
      alt={alt}
      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
      loading="lazy"
    />
  );

  const skillCategories = {
    frontend: {
      name: 'Frontend',
      color: 'from-green-400 to-green-600',
      
      skills: [
        { 
          name: 'React', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
          color: 'text-cyan-400' 
        },
        { 
          name: 'JavaScript', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
          color: 'text-yellow-400' 
        },
        { 
          name: 'TypeScript', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
          color: 'text-blue-400' 
        },
        { 
          name: 'Tailwind CSS', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
          color: 'text-teal-400' 
        },
        { 
          name: 'Bootstrap', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
          color: 'text-purple-400' 
        },
      ]
    },
    backend: {
      name: 'Backend',
      color: 'from-blue-400 to-blue-600',
      skills: [
        { 
          name: 'Spring Boot', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
          color: 'text-green-400' 
        },
        { 
          name: 'NestJS', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
          color: 'text-red-400' 
        },
        { 
          name: 'Next.js', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
          color: 'text-gray-100' 
        },
        { 
          name: 'Java', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
          color: 'text-orange-400' 
        },
        { 
          name: 'Kotlin', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
          color: 'text-purple-400' 
        },
        { 
          name: 'Python', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
          color: 'text-yellow-400' 
        },
        { 
          name: 'MySQL', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
          color: 'text-blue-400' 
        },
        { 
          name: 'PostgreSQL', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
          color: 'text-blue-500' 
        },
        { 
          name: 'MongoDB', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
          color: 'text-green-500' 
        },
      ]
    },
    devops: {
      name: 'Cloud & DevOps',
      color: 'from-orange-400 to-pink-600',
      skills: [
        { 
          name: 'AWS', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
          color: 'text-orange-400' 
        },
        { 
          name: 'Azure', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
          color: 'text-blue-400' 
        },
        { 
          name: 'Docker', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
          color: 'text-blue-400' 
        },
        { 
          name: 'Terraform', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg',
          color: 'text-purple-400' 
        },
        { 
          name: 'Jenkins', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg',
          color: 'text-blue-600' 
        },
        { 
          name: 'Ansible', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg',
          color: 'text-red-500' 
        },
        { 
          name: 'Git', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
          color: 'text-gray-100' 
        },
        { 
          name: 'GitHub', 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
          color: 'text-gray-100' 
        },
      ]
    }
  };

  return (
    <section id="skills" className="py-20 px-6 bg-midnight-blue/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-light mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Technologies and tools I work with across different domains
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-midnight/50 backdrop-blur-sm p-2 rounded-2xl border border-accent/10 inline-flex">
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                    : 'text-gray-400 hover:text-white hover:bg-accent/10'
                }`}
              >
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="relative min-h-[400px]">
          {Object.entries(skillCategories).map(([key, category]) => (
            <div
              key={key}
              className={`absolute inset-0 transition-all duration-500 ${
                activeTab === key 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8 pointer-events-none'
              }`}
            >
              <div className="bg-midnight/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/10">
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent inline-flex items-center gap-3`}>
                    
                    {category.name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {category.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group relative"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="bg-midnight/70 backdrop-blur-sm border border-accent/20 rounded-xl p-6 text-center hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20">
                        <div className="mb-3 flex justify-center">
                          <TechIcon iconUrl={skill.icon} alt={skill.name} />
                        </div>
                        <h4 className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </h4>
                      </div>
                      
                      {/* Hover effect - glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300 -z-10 blur-xl`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-accent/10 backdrop-blur-sm p-8 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl"></span>
              <h4 className="text-accent font-semibold text-lg">Currently Learning</h4>
            </div>
            <p className="text-gray-300 max-w-md">
              Advanced Cloud Architecture, Kubernetes, Infrastructure as Code, 
              and preparing for AWS/Azure certifications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;