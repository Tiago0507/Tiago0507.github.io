import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight-blue to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-accent-light to-accent bg-clip-text text-transparent">
          Santiago Valencia García
        </h1>
        
        <div className="text-xl md:text-2xl mb-8 text-gray-300">
          <span className="block mb-2">Systems & Telematics Engineering Student</span>
          <span className="text-accent font-semibold">Future DevOps & Cloud Engineer</span>
        </div>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Passionate about backend development, cloud technologies, and infrastructure automation. 
          Building scalable solutions with modern technologies and DevOps practices.
        </p>

        <div className="flex justify-center space-x-6 mb-16">
          <a
            href="https://github.com/Tiago0507"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors duration-300"
          >
            <Github size={24} className="text-accent" />
          </a>
          <a
            href="https://www.linkedin.com/in/santiago-valencia-garc%C3%ADa-aab591251/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors duration-300"
          >
            <Linkedin size={24} className="text-accent" />
          </a>
          <a
            href="mailto:svalenciagarcia707@gmail.com"
            className="p-3 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors duration-300"
          >
            <Mail size={24} className="text-accent" />
          </a>
        </div>

        <button
          onClick={scrollToNext}
          className="animate-bounce p-2 text-accent hover:text-accent-light transition-colors duration-300"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;