import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface BurstParticle {
  id: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [burstPos, setBurstPos] = useState<{ x: number; y: number } | null>(null);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);
  const [burstActive, setBurstActive] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const el = document.documentElement;
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(isNaN(progress) ? 0 : progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleThemeToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const toDark = !isDark;

    const particles: BurstParticle[] = Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const dist = 40 + Math.random() * 70;
      return {
        id: i,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: toDark
          ? `hsl(${260 + Math.floor(Math.random() * 60)}, 85%, ${65 + Math.floor(Math.random() * 20)}%)`
          : `hsl(${28 + Math.floor(Math.random() * 30)}, 100%, ${60 + Math.floor(Math.random() * 20)}%)`,
        size: 3 + Math.random() * 5,
      };
    });

    setBurstParticles(particles);
    setBurstPos({ x, y });
    setBurstActive(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setBurstActive(true));
    });

    setTimeout(() => {
      setBurstPos(null);
      setBurstParticles([]);
      setBurstActive(false);
    }, 850);

    toggleTheme();
  }, [isDark, toggleTheme]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#04040F]/90 backdrop-blur-xl shadow-sm shadow-violet-500/5 border-b border-violet-100/60 dark:border-violet-900/20'
          : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.1s linear' }}
      />

      <nav aria-label="Main navigation" className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-1">
            {navItems.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button type="button"
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group ${
                    isActive
                      ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20'
                  }`}
                >
                  {label}
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-300 ${
                    isActive ? 'w-4' : 'w-0 group-hover:w-4'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              <button type="button"
                onClick={() => lang !== 'en' && toggleLang()}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                  lang === 'en'
                    ? 'bg-white dark:bg-violet-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                EN
              </button>
              <button type="button"
                onClick={() => lang !== 'es' && toggleLang()}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                  lang === 'es'
                    ? 'bg-white dark:bg-violet-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                ES
              </button>
            </div>

            {/* Theme toggle */}
            <button type="button"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 hover:bg-violet-200 dark:hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isDark
                    ? 'translate-x-7 bg-violet-600 text-white'
                    : 'translate-x-0 bg-white text-amber-500'
                }`}
              >
                {isDark ? <Moon size={13} /> : <Sun size={13} />}
              </span>
            </button>

            {/* Mobile menu button */}
            <button type="button"
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-2 bg-white/90 dark:bg-[#0D0D28]/90 backdrop-blur-xl rounded-2xl border border-violet-100 dark:border-violet-900/30 shadow-lg">
            {navItems.map(({ id, label }) => (
              <button type="button"
                key={id}
                onClick={() => scrollTo(id)}
                className={`block w-full text-left px-5 py-3 text-sm font-medium transition-all duration-200 ${
                  activeSection === id
                    ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Theme burst particles portal */}
      {burstPos && ReactDOM.createPortal(
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9998 }}>
          {burstParticles.map(p => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: burstPos.x,
                top: burstPos.y,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                transform: burstActive
                  ? `translate(calc(-50% + ${p.dx}px), calc(-50% + ${p.dy}px)) scale(0.1)`
                  : 'translate(-50%, -50%) scale(1)',
                opacity: burstActive ? 0 : 1,
                transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease-out',
              }}
            />
          ))}
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;
