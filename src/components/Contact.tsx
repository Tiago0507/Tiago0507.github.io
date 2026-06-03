import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, ExternalLink, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useScrollAnimation();
  const { t } = useLanguage();
  const { contact: ct } = t;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.send(
        'service_zhe8kq6',
        'template_3k0yeji',
        { from_name: formData.name, from_email: formData.email, message: formData.message, to_name: 'Santiago Valencia' },
        'RA0SVeNYP5ZG-_wwk'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
    setIsLoading(false);
    setTimeout(() => setStatus('idle'), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactLinks = [
    {
      href: 'mailto:svalenciagarcia707@gmail.com',
      icon: <Mail size={18} />,
      label: 'Email',
      value: 'svalenciagarcia707@gmail.com',
      gradient: 'from-violet-600 to-purple-600',
    },
    {
      href: 'https://github.com/Tiago0507',
      icon: <Github size={18} />,
      label: 'GitHub',
      value: '@Tiago0507',
      gradient: 'from-slate-700 to-slate-900',
      external: true,
    },
    {
      href: 'https://www.linkedin.com/in/santiago-valencia-garc%C3%ADa-aab591251/',
      icon: <Linkedin size={18} />,
      label: 'LinkedIn',
      value: 'Santiago Valencia García',
      gradient: 'from-blue-500 to-blue-700',
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 px-6 bg-slate-50 dark:bg-[#04040F] overflow-hidden">
      <div ref={sectionRef} className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="inline-block px-4 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              {ct.badge}
            </span>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-4">
            {ct.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {ct.title.split(' ').slice(-1)[0]}
            </span>
          </h2>
          <div className="reveal reveal-delay-2 w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full mb-4" />
          <p className="reveal reveal-delay-2 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {ct.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="reveal reveal-delay-3 space-y-4 min-w-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white dark:bg-[#0D0D28] border border-violet-200 dark:border-violet-700/40 rounded-2xl p-5 sm:p-7 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6">
                  {ct.getInTouch}
                </h3>

                <div className="space-y-3">
                  {contactLinks.map(({ href, icon, label, value, gradient, external }) => (
                    <a
                      key={label}
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#080818] border border-slate-200 dark:border-violet-900/20 rounded-xl hover:border-violet-300 dark:hover:border-violet-500/40 hover:shadow-md hover:shadow-violet-500/10 card-hover overflow-hidden"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        {icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-0.5">
                          {label}
                        </div>
                        <div className="text-base font-medium text-slate-700 dark:text-slate-300 truncate">
                          {value}
                        </div>
                      </div>
                      {external && (
                        <ExternalLink size={14} className="ml-auto flex-shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-300" />
                      )}
                    </a>
                  ))}

                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#080818] border border-slate-200 dark:border-violet-900/20 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-0.5">
                        {ct.location}
                      </div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Cali, Colombia
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-4 bg-white dark:bg-[#0D0D28] border border-slate-200 dark:border-violet-900/20 rounded-2xl p-5 sm:p-7 shadow-sm min-w-0">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6">
              {ct.form.send}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                  {ct.form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={ct.form.namePlaceholder}
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#080818] border border-slate-200 dark:border-violet-900/30 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:border-violet-500 dark:focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                  {ct.form.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={ct.form.emailPlaceholder}
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#080818] border border-slate-200 dark:border-violet-900/30 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:border-violet-500 dark:focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                  {ct.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={ct.form.messagePlaceholder}
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#080818] border border-slate-200 dark:border-violet-900/30 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:border-violet-500 dark:focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || status === 'success'}
                className={`w-full py-3.5 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                  status === 'success'
                    ? 'bg-emerald-500 text-white cursor-default'
                    : status === 'error'
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : isLoading
                    ? 'bg-violet-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-md shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02]'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {ct.form.sending}
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={17} />
                    {ct.form.sent}
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={17} />
                    {ct.form.error}
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    {ct.form.send}
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center">
                  {ct.form.successNote}
                </p>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
