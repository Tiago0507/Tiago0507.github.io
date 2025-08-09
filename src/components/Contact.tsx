import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Download, ExternalLink, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await emailjs.send(
        'service_zhe8kq6',
        'template_3k0yeji',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Santiago Valencia',
        },
        'RA0SVeNYP5ZG-_wwk'
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
    
    setIsLoading(false);
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-midnight-blue/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-light mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Ready to collaborate on exciting projects or discuss opportunities in DevOps and Cloud Engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-midnight/50 backdrop-blur-sm p-6 rounded-xl border border-accent/10">
              <h3 className="text-2xl font-bold mb-6 text-accent">Let's Connect</h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:santiago.valencia@ejemplo.com"
                  className="flex items-center p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors duration-300 group"
                >
                  <Mail className="text-accent mr-4 group-hover:scale-110 transition-transform duration-300" size={20} />
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-gray-400 text-sm">svalenciagarcia707@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://github.com/Tiago0507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors duration-300 group"
                >
                  <Github className="text-accent mr-4 group-hover:scale-110 transition-transform duration-300" size={20} />
                  <div>
                    <div className="font-semibold text-white">GitHub</div>
                    <div className="text-gray-400 text-sm">@Tiago0507</div>
                  </div>
                  <ExternalLink className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/in/santiago-valencia-garc%C3%ADa-aab591251/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors duration-300 group"
                >
                  <Linkedin className="text-accent mr-4 group-hover:scale-110 transition-transform duration-300" size={20} />
                  <div>
                    <div className="font-semibold text-white">LinkedIn</div>
                    <div className="text-gray-400 text-sm">Santiago Valencia García</div>
                  </div>
                  <ExternalLink className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={16} />
                </a>

                <div className="flex items-center p-4 bg-accent/10 rounded-lg">
                  <MapPin className="text-accent mr-4" size={20} />
                  <div>
                    <div className="font-semibold text-white">Location</div>
                    <div className="text-gray-400 text-sm">Cali, Colombia</div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-midnight/50 backdrop-blur-sm p-6 rounded-xl border border-accent/10">
              <button className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white font-semibold rounded-lg transition-all duration-300 group">
                <Download className="mr-2 group-hover:animate-bounce" size={20} />
                Download Resume
              </button>
            </div> */}
          </div>

          {/* Message Form */}
          <div className="bg-midnight/50 backdrop-blur-sm p-6 rounded-xl border border-accent/10">
            <h3 className="text-2xl font-bold mb-6 text-accent">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 bg-midnight-blue/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 bg-midnight-blue/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your Message"
                  required
                  className="w-full p-3 bg-midnight-blue/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isLoading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : status === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : status === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-accent hover:bg-accent-light'
                } text-white`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : status === 'success' ? (
                  '✓ Message Sent!'
                ) : status === 'error' ? (
                  '✗ Error - Try Again'
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {status === 'success' && (
              <div className="mt-4 p-3 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 text-sm">
                Thanks! I'll get back to you soon.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-accent/20 text-center">
          <p className="text-gray-400">
            © 2025 Santiago Valencia García. Built with React, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Open to DevOps, Cloud Engineering, and Backend Development opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;