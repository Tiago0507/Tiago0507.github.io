import React from 'react';
import { GraduationCap, Target, Languages } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-light mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-midnight-blue/50 backdrop-blur-sm p-6 rounded-xl border border-accent/10">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-accent mr-3" size={24} />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <p className="text-gray-300">
                8th semester Systems & Telematics Engineering student at Universidad ICESI, Cali. 
                Specializing in backend development and transitioning into DevOps and Cloud Engineering.
              </p>
            </div>

            <div className="bg-midnight-blue/50 backdrop-blur-sm p-6 rounded-xl border border-accent/10">
              <div className="flex items-center mb-4">
                <Target className="text-accent mr-3" size={24} />
                <h3 className="text-xl font-semibold">Career Goals</h3>
              </div>
              <p className="text-gray-300">
                Aspiring DevOps Engineer and Cloud Architect. Currently learning Terraform, Jenkins, 
                Ansible, AWS, and Azure to build automated, scalable infrastructure solutions.
              </p>
            </div>

            <div className="bg-midnight-blue/50 backdrop-blur-sm p-6 rounded-xl border border-accent/10">
              <div className="flex items-center mb-4">
                <Languages className="text-accent mr-3" size={24} />
                <h3 className="text-xl font-semibold">Languages</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Spanish (Native)</span>
                  <span className="text-accent">●●●●●</span>
                </div>
                <div className="flex justify-between">
                  <span>English (B1-B2, preparing for IELTS)</span>
                  <span className="text-accent">●●●●○</span>
                </div>
                <div className="flex justify-between">
                  <span>German (A1)</span>
                  <span className="text-accent">●○○○○</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light rounded-xl blur-xl opacity-20"></div>
              <div className="relative bg-midnight-blue/80 backdrop-blur-sm p-8 rounded-xl border border-accent/20">
                <h3 className="text-2xl font-bold mb-6 text-accent">Technical Focus</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-accent-light mb-2">Backend Development</h4>
                    <p className="text-gray-300 text-sm">
                      Strong expertise in SpringBoot, NestJS, Next.js with TypeScript, Java, Kotlin, 
                      Python. Database management with MySQL, PostgreSQL, and MongoDB.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-light mb-2">DevOps & Cloud</h4>
                    <p className="text-gray-300 text-sm">
                      Learning infrastructure as code with Terraform, CI/CD with Jenkins, 
                      configuration management with Ansible, and cloud platforms AWS & Azure.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-light mb-2">Additional Skills</h4>
                    <p className="text-gray-300 text-sm">
                      Git/GitHub workflows, Agile methodologies (SCRUM, Kanban), 
                      networking protocols, and telecommunications fundamentals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;