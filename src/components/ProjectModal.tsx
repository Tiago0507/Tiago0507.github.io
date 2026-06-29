import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, ArrowUpRight, Check, Clock } from 'lucide-react';
import type { Translations } from '../translations';
import type { Project } from './Projects';

interface ProjectModalProps {
  project: Project;
  pt: Translations['projects'];
  categoryClass: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, pt, categoryClass, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const content = pt.items[project.id];
  const title = content?.title ?? project.title;
  const description = content?.description ?? project.description;
  const highlights = content?.highlights ?? [];

  // Lock body scroll, manage focus, handle Esc + focus trap
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button once the panel is mounted
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const repoLinks = project.repos
    ? project.repos.map(r => ({ label: r.label, url: r.url }))
    : project.githubUrl
    ? [{ label: pt.viewCode, url: project.githubUrl }]
    : [];

  return ReactDOM.createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0D0D28] border border-slate-200 dark:border-violet-800/40 shadow-2xl shadow-violet-900/20"
        initial={{ opacity: 0, scale: 0.94, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-48 sm:h-60 overflow-hidden bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-950/40 dark:to-cyan-950/40">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={content?.shortTitle ?? project.shortTitle}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl">💻</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0D0D28] via-white/20 dark:via-[#0D0D28]/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryClass}`}>
              {project.category}
            </span>
            {project.status === 'in-progress' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-full border border-amber-200 dark:border-amber-700/40">
                <Clock size={11} />
                {pt.inProgress}
              </span>
            )}
          </div>

          {/* Close button */}
          <button
            type="button"
            ref={closeBtnRef}
            onClick={onClose}
            aria-label={pt.close}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white backdrop-blur-sm hover:bg-violet-600 hover:rotate-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 -mt-6 relative">
          <h2
            id="project-modal-title"
            className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-4 leading-tight"
          >
            {title}
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-7">
            {description}
          </p>

          {/* Key highlights */}
          {highlights.length > 0 && (
            <div className="mb-7">
              <h3 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
                {pt.keyHighlights}
              </h3>
              <ul className="space-y-2.5">
                {highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              {pt.techStack}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-[#080818] border border-slate-200 dark:border-violet-900/40 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {repoLinks.map((repo, i) => (
              <a
                key={repo.label}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  i === 0
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40'
                    : 'border-2 border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-500'
                }`}
              >
                <Github size={17} />
                {repo.label}
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            ))}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-xl border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
              >
                <ExternalLink size={17} />
                {pt.liveDemo}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default ProjectModal;
