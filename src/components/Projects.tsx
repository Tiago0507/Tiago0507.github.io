import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Clock, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import { useTilt } from '../hooks/useTilt';
import type { Translations } from '../translations';

interface Repo {
  label: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  repos?: Repo[];
  liveUrl?: string;
  imageUrl?: string;
  status: 'completed' | 'in-progress';
  category: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Medical Management Platform — Oncologic',
    shortTitle: 'Oncologic Platform',
    description: 'Full-stack platform to optimize administrative and operational management for Oncologic Clinic in Cali. REST API with JWT auth and role-based access on the backend; React SPA with role-specific dashboards for admins, doctors, and patients on the frontend.',
    technologies: ['Spring Boot', 'Java', 'React', 'TypeScript', 'Redux', 'PostgreSQL', 'Docker', 'JWT'],
    repos: [
      { label: 'Backend', url: 'https://github.com/Tiago0507/proyecto-final-siscom' },
      { label: 'Frontend', url: 'https://github.com/Tiago0507/proyecto-front-siscom' },
    ],
    imageUrl: '/images/OncologicFrontend.png',
    status: 'completed',
    category: 'Full Stack',
  },
  {
    id: '2',
    title: 'Usolo — Mobile Object Rental App',
    shortTitle: 'Usolo App',
    description: 'Mobile application that enables peer-to-peer object rental with time and price flexibility. Includes Directus CMS for content management and Docker-based deployment pipeline.',
    technologies: ['Kotlin', 'PostgreSQL', 'Docker', 'Directus'],
    githubUrl: 'https://github.com/Tiago0507/usolo-project-appsmoviles',
    imageUrl: '/images/UsoloApp.png',
    status: 'completed',
    category: 'Mobile',
  },
  {
    id: '3',
    title: 'TicketHub — AWS Cloud Infrastructure',
    shortTitle: 'TicketHub',
    description: 'Production-ready AWS infrastructure for an event ticketing platform, built entirely with CloudFormation. Multi-AZ VPC with ALB and Auto Scaling Groups, RDS PostgreSQL with automated backups, and EC2-hosted Next.js/NestJS services under PM2. Includes CloudWatch alarms and dashboards, SNS alert routing, and CloudTrail audit logging.',
    technologies: ['AWS CloudFormation', 'EC2', 'RDS PostgreSQL', 'Auto Scaling', 'CloudWatch', 'SNS', 'NestJS', 'Next.js'],
    githubUrl: 'https://github.com/Juanmadiaz45/aws-scalable-ecommerce',
    imageUrl: '/images/ImagenRepo1.jpeg',
    status: 'completed',
    category: 'Cloud',
  },
  {
    id: '4',
    title: 'Polyglot Microservices — Azure DevOps Pipeline',
    shortTitle: 'Microservices Pipeline',
    description: 'Fully automated DevOps pipeline for deploying polyglot microservices on Azure. Five services in Go, Java, Node.js, Python, and Vue.js with zero-touch deployment via GitHub Actions. Infrastructure as Code with Terraform and Ansible, Cache-Aside with Redis, Circuit Breaker for resilience, and distributed tracing with Zipkin.',
    technologies: ['Azure', 'Terraform', 'Ansible', 'Docker', 'GitHub Actions', 'Redis', 'PostgreSQL', 'Go', 'Vue.js'],
    githubUrl: 'https://github.com/Tiago0507/microservice-app-example',
    imageUrl: '/images/ImagenRepo2.jpeg',
    status: 'completed',
    category: 'DevOps',
  },
];

const categoryColors: Record<string, string> = {
  'Full Stack': 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  Backend: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  Frontend: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  Mobile: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  Cloud: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  DevOps: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
};

const ProjectCard: React.FC<{ project: Project; index: number; expandedId: string | null; onToggle: (id: string) => void; pt: Translations['projects'] }> = ({
  project, index, expandedId, onToggle, pt,
}) => {
  const { ref, tiltStyle, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      className={`reveal reveal-delay-${Math.min(index + 2, 5)} group bg-slate-50 dark:bg-[#0D0D28] border border-slate-200 dark:border-violet-900/20 rounded-2xl overflow-hidden hover:border-violet-300 dark:hover:border-violet-500/50 transition-colors duration-300`}
    >
      {/* Image or placeholder */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-violet-50 to-cyan-50 dark:from-violet-950/30 dark:to-cyan-950/30">
        {project.imageUrl ? (
          <>
            <img
              src={project.imageUrl}
              alt={project.shortTitle}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-violet-300/30 dark:border-violet-700/30 flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-500">{pt.inDevelopment}</p>
            </div>
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${categoryColors[project.category] ?? 'bg-slate-100 text-slate-600'}`}>
            {project.category}
          </span>
          {project.status === 'in-progress' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full border border-amber-200 dark:border-amber-700/40">
              <Clock size={10} />
              {pt.inProgress}
            </span>
          )}
        </div>

        {/* Hover action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {project.repos
            ? project.repos.map(repo => (
                <a
                  key={repo.label}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900/80 dark:bg-[#0D0D28]/90 backdrop-blur-sm rounded-lg text-white hover:bg-violet-600 transition-colors duration-200 text-xs font-medium"
                  onClick={e => e.stopPropagation()}
                >
                  <Github size={13} />
                  {repo.label}
                </a>
              ))
            : project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900/80 dark:bg-[#0D0D28]/90 backdrop-blur-sm rounded-lg text-white hover:bg-violet-600 transition-colors duration-200"
                  onClick={e => e.stopPropagation()}
                >
                  <Github size={15} />
                </a>
              )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900/80 dark:bg-[#0D0D28]/90 backdrop-blur-sm rounded-lg text-white hover:bg-cyan-500 transition-colors duration-200"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 leading-snug">
            {pt.items[project.id]?.title ?? project.title}
          </h3>
          {project.repos ? (
            <div className="flex gap-1 flex-shrink-0">
              {project.repos.map(repo => (
                <a
                  key={repo.label}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg border border-slate-200 dark:border-violet-900/30 transition-all duration-200"
                >
                  {repo.label}
                  <ArrowUpRight size={11} />
                </a>
              ))}
            </div>
          ) : project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-1.5 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-all duration-200"
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        <p className={`text-base text-slate-500 dark:text-slate-400 leading-relaxed transition-all duration-300 ${expandedId === project.id ? 'mb-3' : 'mb-2 line-clamp-3'}`}>
          {pt.items[project.id]?.description ?? project.description}
        </p>
        <button type="button"
          onClick={() => onToggle(project.id)}
          className="flex items-center gap-1 text-xs font-semibold text-violet-500 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 mb-4 transition-colors duration-200"
        >
          {expandedId === project.id ? pt.seeLess : pt.seeMore}
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${expandedId === project.id ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-white dark:bg-[#080818] border border-slate-200 dark:border-violet-900/30 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-lg hover:border-violet-300 dark:hover:border-violet-600/50 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useScrollAnimation();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t } = useLanguage();
  const { projects: pt } = t;

  const handleToggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <section id="projects" className="py-16 md:py-24 px-6 bg-white dark:bg-[#080818]">
      <div ref={sectionRef} className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              {pt.badge}
            </span>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-4">
            {pt.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {pt.title.split(' ').slice(-1)[0]}
            </span>
          </h2>
          <div className="reveal reveal-delay-2 w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-4" />
          <p className="reveal reveal-delay-2 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {pt.subtitle}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              expandedId={expandedId}
              onToggle={handleToggle}
              pt={pt}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="reveal reveal-delay-4 mt-12 text-center">
          <div className="inline-block bg-slate-50 dark:bg-[#0D0D28] border border-violet-200 dark:border-violet-700/40 rounded-2xl p-8 max-w-lg w-full shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">{pt.cta.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {pt.cta.subtitle}
            </p>
            <a
              href="https://github.com/Tiago0507"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-violet-600 dark:hover:bg-violet-400 dark:hover:text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105"
            >
              <Github size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              {pt.cta.button}
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
