import React, { createContext, useContext, useState, useEffect } from 'react';
import translations, { Lang, Translations } from '../translations';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: Translations;
  /** True briefly while the UI crossfades during a language switch. */
  fading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');
  const [fading, setFading] = useState(false);

  // Fade the content out, swap the text, then fade back in — a smooth crossfade.
  const toggleLang = () => {
    setFading(true);
    window.setTimeout(() => {
      setLang(l => (l === 'en' ? 'es' : 'en'));
      window.setTimeout(() => setFading(false), 30);
    }, 160);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang], fading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
