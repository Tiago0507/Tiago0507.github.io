import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Medical Management Backend Project (Backend) - Oncologic',
      description: 'Web-based platform designed to optimize the administrative and operational management of Oncologic Clinic in Cali - Backend.',
      technologies: ['Spring Boot', 'JWT', 'Docker', 'Java', 'PostgreSQL'],
      githubUrl: 'https://github.com/Tiago0507/proyecto-final-siscom',
      imageUrl: '/images/OncologicBackend.png',
    },
    {
      id: '2',
      title: 'Medical Management Frontend Project (Frontend) - Oncologic',
      description: 'Web-based platform designed to optimize the administrative and operational management of Oncologic Clinic in Cali - Frontend.',
      technologies: ['TypeScript', 'React', 'Redux', 'Axios'],
      githubUrl: 'https://github.com/Tiago0507/proyecto-front-siscom',
      imageUrl: '/images/OncologicFrontend.png',
    },
    {
      id: '3',
      title: 'Mobile Application for Object Rental - Usolo',
      description: 'Demo mobile application that allows you to rent objects for a certain amount of time and money.',
      technologies: ['Kotlin', 'Docker', 'PostgreSQL', 'Directus'],
      githubUrl: 'https://github.com/Tiago0507/usolo-project-appsmoviles',
      imageUrl: '/images/UsoloApp.png',
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
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-light mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A showcase of my technical projects demonstrating expertise in backend development, DevOps, and cloud technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-midnight/50 backdrop-blur-sm rounded-2xl border border-accent/10 overflow-hidden hover:border-accent/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/10"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Section */}
              {project.imageUrl ? (
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/5 to-accent-light/10 flex items-center justify-center">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Action buttons overlay */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-midnight/80 backdrop-blur-sm hover:bg-accent/90 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <Github size={18} className="text-white" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-midnight/80 backdrop-blur-sm hover:bg-accent/90 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink size={18} className="text-white" />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                // Fallback for projects without images
                <div className="relative h-48 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl text-accent/30 mb-2">💻</div>
                    <p className="text-accent/60 text-sm font-medium">In Development</p>
                  </div>
                  
                  {/* Action buttons for no-image projects */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-midnight/60 backdrop-blur-sm hover:bg-accent/90 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <Github size={18} className="text-white" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-midnight/60 backdrop-blur-sm hover:bg-accent/90 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink size={18} className="text-white" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 mb-3 leading-tight">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-all duration-300"
                      style={{ animationDelay: `${(index * 150) + (techIndex * 50)}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom action area for projects with images */}
                {project.imageUrl && (
                  <div className="flex justify-between items-center pt-4 border-t border-accent/10">
                    <div className="flex space-x-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-accent transition-colors duration-300 text-sm font-medium flex items-center gap-2"
                        >
                          <Github size={16} />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-accent transition-colors duration-300 text-sm font-medium flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date().getFullYear()}
                    </div>
                  </div>
                )}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent-light/0 group-hover:from-accent/5 group-hover:via-accent/0 group-hover:to-accent-light/5 transition-all duration-500 pointer-events-none rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent-light/10 backdrop-blur-sm p-8 rounded-2xl border border-accent/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Want to see more?</h3>
            <p className="text-gray-400 mb-6">
              Check out my GitHub for additional projects and contributions to open source
            </p>
            <a
              href="https://github.com/Tiago0507"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white font-semibold rounded-xl transition-all duration-300 group shadow-lg hover:shadow-accent/20 hover:scale-105"
            >
              <Github className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={20} />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;