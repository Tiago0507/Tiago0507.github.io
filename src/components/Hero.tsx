import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import StarField from './StarField';
import MatrixRain from './MatrixRain';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setDisplayed('');
    setIsDeleting(false);
    setIsPaused(false);
    setRoleIndex(0);
  }, [t]);

  useEffect(() => {
    const roles = t.hero.roles;
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }

    const current = roles[roleIndex];
    const speed = isDeleting ? 45 : 95;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) setIsPaused(true);
      } else {
        const next = current.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === '') {
          setIsDeleting(false);
          setRoleIndex(i => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, roleIndex, isPaused, t]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
      setSpotlight({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Matrix code-rain — decorative accent in the empty side gutters only
          (wide screens, dark mode), fading toward the centered content so it
          never sits over the text. */}
      <MatrixRain
        className="hidden xl:block absolute top-0 bottom-0 left-0 w-[12%]"
        style={{
          zIndex: 2,
          opacity: 0.55,
          maskImage: 'linear-gradient(to right, #000 45%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, #000 45%, transparent 100%)',
        }}
      />
      <MatrixRain
        className="hidden xl:block absolute top-0 bottom-0 right-0 w-[12%]"
        style={{
          zIndex: 2,
          opacity: 0.55,
          maskImage: 'linear-gradient(to left, #000 45%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, #000 45%, transparent 100%)',
        }}
      />

      {/* Starfield (night) / interactive constellation (day) */}
      <StarField />

      {/* Light mode animated mesh gradient background */}
      {!isDark && (
        <div className="absolute inset-0 hero-mesh-bg pointer-events-none" style={{ zIndex: 1 }} />
      )}

      {/* Cursor spotlight — light mode */}
      {!isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: `radial-gradient(650px circle at ${spotlight.x}% ${spotlight.y}%, rgba(124, 58, 237, 0.09), transparent 60%)`,
            transition: 'background 0.05s ease',
          }}
        />
      )}

      {/* Animated background orbs with mouse parallax */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <div
          className="absolute top-1/4 right-1/5"
          style={{
            transform: `translate(${mouse.x * 0.5}px, ${mouse.y * 0.35}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <div className="w-[500px] h-[500px] bg-violet-600/[0.15] dark:bg-violet-600/[0.13] rounded-full blur-3xl animate-float" />
        </div>
        <div
          className="absolute bottom-1/5 left-1/5"
          style={{
            transform: `translate(${mouse.x * -0.35}px, ${mouse.y * -0.25}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="w-[400px] h-[400px] bg-cyan-500/[0.15] dark:bg-cyan-500/[0.13] rounded-full blur-3xl animate-float-delay" />
        </div>
        <div
          className="absolute top-2/3 right-1/3"
          style={{
            transform: `translate(${mouse.x * 0.2}px, ${mouse.y * 0.2}px)`,
            transition: 'transform 0.25s ease-out',
          }}
        >
          <div className="w-72 h-72 bg-purple-500/[0.09] dark:bg-purple-500/[0.09] rounded-full blur-2xl animate-pulse-slow" />
        </div>
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid-dots opacity-50" style={{ zIndex: 3 }} />

      {/* Content */}
      <div className="relative text-center px-6 max-w-4xl mx-auto pt-20" style={{ zIndex: 10 }}>
        {/* Name */}
        <h1 className="mb-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="block text-4xl md:text-6xl lg:text-7xl font-black gradient-text-animated pb-1">
            Santiago Valencia
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-slate-900 dark:text-slate-100">
            García
          </span>
        </h1>

        {/* Typing role */}
        <div
          className="flex items-center justify-center gap-1 text-lg md:text-xl font-mono mb-6 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-violet-500 dark:text-violet-400 font-semibold select-none">$ </span>
          <span className="text-slate-700 dark:text-slate-300 min-w-[150px] sm:min-w-[220px] text-left">
            {displayed}
          </span>
          <span aria-hidden="true" className="animate-blink text-violet-500 dark:text-violet-400 font-bold text-xl">|</span>
        </div>

        {/* Bio */}
        <p
          className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          {t.hero.bio}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-12 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <button type="button"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
          >
            {t.hero.viewWork}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-violet-600 dark:border-violet-400 text-violet-600 dark:text-violet-400 font-semibold rounded-xl hover:bg-violet-600 dark:hover:bg-violet-400 hover:text-white dark:hover:text-slate-900 transition-all duration-300 hover:scale-105"
          >
            {t.hero.getInTouch}
          </button>
        </div>

        {/* Social links */}
        <div
          className="flex justify-center gap-4 mb-16 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          {[
            { href: 'https://github.com/Tiago0507', icon: <Github size={20} />, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/santiago-valencia-garc%C3%ADa-aab591251/', icon: <Linkedin size={20} />, label: 'LinkedIn' },
            { href: 'mailto:svalenciagarcia707@gmail.com', icon: <Mail size={20} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="group flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0D0D28] border border-slate-200 dark:border-violet-900/30 rounded-xl text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-md hover:shadow-violet-500/10 transition-all duration-300 hover:scale-105"
            >
              {icon}
              <span className="text-sm font-medium hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <button type="button"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-bounce text-slate-400 dark:text-slate-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
