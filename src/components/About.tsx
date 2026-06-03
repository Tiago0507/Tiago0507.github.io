import React from "react";
import { Code2, Cloud, GitBranch } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";

const focusIcons = [
  { icon: <Code2 size={18} />, gradient: "from-violet-600 to-purple-600" },
  { icon: <Cloud size={18} />, gradient: "from-cyan-500 to-blue-500" },
  { icon: <GitBranch size={18} />, gradient: "from-emerald-500 to-teal-500" },
];

const About: React.FC = () => {
  const sectionRef = useScrollAnimation();
  const { t } = useLanguage();
  const { about } = t;

  return (
    <section id="about" className="py-16 md:py-24 px-6 bg-white dark:bg-[#080818] overflow-hidden">
      <div ref={sectionRef} className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-semibold uppercase tracking-widest rounded-full mb-4">
              {about.badge}
            </span>
          </div>
          <div className="reveal reveal-delay-2 w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full" />
        </div>

        {/* Bio narrative */}
        <div className="reveal reveal-delay-2 max-w-3xl mx-auto mb-16 space-y-5">
          {about.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Technical Focus */}
        <div className="flex justify-center">
          {/* Technical Focus card */}
          <div className="reveal reveal-delay-4 relative w-full max-w-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-white dark:bg-[#0D0D28] border border-violet-200 dark:border-violet-700/40 rounded-2xl p-5 sm:p-7 shadow-xl shadow-violet-500/5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
                {about.technicalFocus.title}
              </h3>

              <div className="space-y-5">
                {about.technicalFocus.items.map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${focusIcons[i].gradient} flex items-center justify-center text-white shadow-md`}
                    >
                      {focusIcons[i].icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
