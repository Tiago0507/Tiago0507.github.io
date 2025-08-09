import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Medical Management Backend Project (Backend) - Oncologic',
      description: 'Web-based platform designed to optimize the administrative and operational management of Oncologic Clinic in Cali - Backend.',
      technologies: ['Spring Boot', 'JWT', 'Docker', 'Java', 'PostgreSQL'],
      githubUrl: 'https://github.com/Tiago0507/proyecto-final-siscom',
    },
    {
      id: '2',
      title: 'Medical Management Frontend Project (Frontend) - Oncologic',
      description: 'Web-based platform designed to optimize the administrative and operational management of Oncologic Clinic in Cali - Frontend.',
      technologies: ['TypeScript', 'React', 'Redux', 'Axios'],
      githubUrl: 'https://github.com/Tiago0507/proyecto-front-siscom',
    },
    {
      id: '3',
      title: 'Mobile Application for Object Rental - Usolo',
      description: 'Demo mobile application that allows you to rent objects for a certain amount of time and money.',
      technologies: ['Kotlin', 'Docker', 'PostgreSQL', 'Directus'],
      githubUrl: 'https://github.com/Tiago0507/usolo-project-appsmoviles',
    },
    {
      id: '4',
      title: 'Vasture - Ecommerce (In Progress)',
      description: 'Backend of an e-commerce project selling all kinds of products.',
      technologies: ['NestJS', 'TypeScript', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/Tiago0507/vasture-project-backend',
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-light mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A showcase of my technical projects demonstrating expertise in backend development, DevOps, and cloud technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-midnight-blue/50 backdrop-blur-sm rounded-xl border border-accent/10 overflow-hidden hover:border-accent/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors duration-300"
                      >
                        <Github size={16} className="text-accent" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors duration-300"
                      >
                        <ExternalLink size={16} className="text-accent" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/Tiago0507"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors duration-300 group"
          >
            <Github className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;