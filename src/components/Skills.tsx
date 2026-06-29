import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ClipboardList, Globe, Database, Layers, Users, GitBranch, Server, Code2, Cpu, Workflow } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.13, ease: 'easeIn' } },
};

const TechIcon = ({ iconUrl, alt, invert }: { iconUrl: string; alt: string; invert?: boolean }) => (
  <img
    src={iconUrl}
    alt={alt}
    className={`w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 ${
      invert ? 'dark:invert dark:brightness-200' : ''
    }`}
    loading="lazy"
  />
);

const techCategories = {
  languages: {
    gradient: 'from-amber-500 to-orange-600',
    skills: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    ],
  },
  backend: {
    gradient: 'from-violet-600 to-purple-600',
    skills: [
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'NestJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', invert: true },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
    ],
  },
  frontend: {
    gradient: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
    ],
  },
  devops: {
    gradient: 'from-emerald-500 to-teal-600',
    skills: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
      { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg' },
      { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg' },
      { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
      { name: 'Ansible', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg', invert: true },
      { name: 'Prometheus', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg' },
      { name: 'Grafana', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true },
    ],
  },
};

const softSkillIcons = [
  { icon: <ClipboardList size={22} />, gradient: 'from-violet-500 to-purple-500' },
  { icon: <Globe size={22} />, gradient: 'from-blue-500 to-cyan-500' },
  { icon: <Database size={22} />, gradient: 'from-emerald-500 to-teal-500' },
  { icon: <Layers size={22} />, gradient: 'from-orange-500 to-amber-500' },
  { icon: <Cpu size={22} />, gradient: 'from-pink-500 to-rose-500' },
  { icon: <Users size={22} />, gradient: 'from-indigo-500 to-violet-500' },
  { icon: <Server size={22} />, gradient: 'from-cyan-500 to-blue-600' },
  { icon: <Workflow size={22} />, gradient: 'from-teal-500 to-emerald-600' },
  { icon: <Code2 size={22} />, gradient: 'from-violet-600 to-cyan-500' },
  { icon: <GitBranch size={22} />, gradient: 'from-slate-600 to-slate-800' },
];

type TechTabKey = keyof typeof techCategories;
type TabKey = TechTabKey | 'skills';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('languages');
  const sectionRef = useScrollAnimation();
  const { t } = useLanguage();
  const { skills } = t;

  const tabs: { key: TabKey; label: string; gradient: string }[] = [
    { key: 'languages', label: skills.tabs.languages.name, gradient: techCategories.languages.gradient },
    { key: 'backend', label: skills.tabs.backend.name, gradient: techCategories.backend.gradient },
    { key: 'frontend', label: skills.tabs.frontend.name, gradient: techCategories.frontend.gradient },
    { key: 'devops', label: skills.tabs.devops.name, gradient: techCategories.devops.gradient },
    { key: 'skills', label: skills.tabs.skills.name, gradient: 'from-pink-500 to-violet-600' },
  ];

  const tabLabels: { key: TabKey; shortLabel: string }[] = [
    { key: 'languages', shortLabel: skills.tabs.languages.label },
    { key: 'backend', shortLabel: skills.tabs.backend.label },
    { key: 'frontend', shortLabel: skills.tabs.frontend.label },
    { key: 'devops', shortLabel: skills.tabs.devops.label },
    { key: 'skills', shortLabel: skills.tabs.skills.label },
  ];

  const activeGradient = tabs.find(t => t.key === activeTab)?.gradient ?? 'from-violet-600 to-cyan-500';
  const activeName = tabs.find(t => t.key === activeTab)?.label ?? '';

  const softSkills = softSkillIcons.map((meta, i) => ({
    ...meta,
    name: skills.softSkills[i],
  }));

  return (
    <section id="skills" className="py-16 md:py-24 px-6 bg-slate-50 dark:bg-[#04040F] overflow-hidden">
      <div ref={sectionRef} className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              {skills.badge}
            </span>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-4">
            {skills.title.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {skills.title.split(' ').slice(-2).join(' ')}
            </span>
          </h2>
          <div className="reveal reveal-delay-2 w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-4" />
          <p className="reveal reveal-delay-2 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {skills.subtitle}
          </p>
        </div>

        {/* Tab selector */}
        <div className="reveal reveal-delay-3 flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white dark:bg-[#0D0D28] border border-slate-200 dark:border-violet-900/30 rounded-2xl shadow-sm">
            {tabs.map(({ key, label, gradient }, i) => (
              <button type="button"
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative px-3 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === key
                    ? 'text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {activeTab === key && (
                  <span className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} -z-0`} />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="hidden sm:inline text-xs font-bold opacity-60">
                    {tabLabels[i].shortLabel}
                  </span>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content panel */}
        <div className="reveal reveal-delay-3 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-cyan-500/10 rounded-3xl blur-2xl" />
          <div className="relative bg-white dark:bg-[#0D0D28] border border-slate-200 dark:border-violet-900/20 rounded-2xl p-4 sm:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <h3
                  className={`text-lg font-bold bg-gradient-to-r ${activeGradient} bg-clip-text text-transparent mb-8`}
                >
                  {activeName}
                </h3>

                {activeTab !== 'skills' ? (
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {techCategories[activeTab as TechTabKey].skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative grow-0 shrink-0 basis-[calc(50%_-_0.5rem)] sm:basis-[calc(33.333%_-_0.75rem)] md:basis-[calc(25%_-_0.8rem)] lg:basis-[calc(16.666%_-_0.9rem)]"
                      >
                        <div className="bg-slate-50 dark:bg-[#080818] border border-slate-200 dark:border-violet-900/20 rounded-xl p-4 text-center hover:border-violet-400 dark:hover:border-violet-500/60 hover:shadow-lg hover:shadow-violet-500/10 card-hover cursor-default">
                          <div className="flex justify-center mb-2.5">
                            <TechIcon iconUrl={skill.icon} alt={skill.name} invert={(skill as { invert?: boolean }).invert} />
                          </div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 leading-tight block">
                            {skill.name}
                          </span>
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-r ${techCategories[activeTab as TechTabKey].gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 -z-10 blur-lg`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {softSkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative grow-0 shrink-0 basis-[calc(50%_-_0.5rem)] sm:basis-[calc(33.333%_-_0.75rem)] md:basis-[calc(25%_-_0.8rem)] lg:basis-[calc(20%_-_0.9rem)]"
                      >
                        <div className="bg-slate-50 dark:bg-[#080818] border border-slate-200 dark:border-violet-900/20 rounded-xl p-4 text-center hover:border-violet-400 dark:hover:border-violet-500/60 hover:shadow-lg hover:shadow-violet-500/10 card-hover cursor-default">
                          <div className={`w-10 h-10 mx-auto mb-2.5 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            {skill.icon}
                          </div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 leading-tight block">
                            {skill.name}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-violet-600/0 group-hover:from-pink-500/10 group-hover:to-violet-600/10 rounded-xl transition-all duration-300 -z-10 blur-lg" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
