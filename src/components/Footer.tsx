import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const links = [
    { href: 'https://github.com/Tiago0507', icon: <Github size={16} />, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/santiago-valencia-garc%C3%ADa-aab591251/', icon: <Linkedin size={16} />, label: 'LinkedIn' },
    { href: 'mailto:svalenciagarcia707@gmail.com', icon: <Mail size={16} />, label: 'Email' },
  ];

  return (
    <footer className="py-8 px-6 border-t border-slate-200 dark:border-violet-900/20 bg-white dark:bg-[#04040F]">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Santiago Valencia García
        </span>

        <div className="flex items-center gap-2">
          {links.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="p-2 text-slate-400 dark:text-slate-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20"
            >
              {icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
