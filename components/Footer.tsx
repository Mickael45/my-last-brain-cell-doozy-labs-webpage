import React from "react";
import { Beaker, Github, Linkedin, Briefcase } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Mickael45", label: "GitHub" },
    {
      icon: Briefcase,
      href: "https://www.mickael-gomes.com",
      label: "Portfolio",
    },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and tagline */}
          <div
            data-reveal="up"
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30 animate-rotate-slow">
                <Beaker className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">Doozy Labs</div>
                <div className="text-xs text-gray-400 font-mono">
                  Chaos Engineering Dept.
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0">
              Where good ideas go to become questionable reality, powered by
              caffeine and poor life choices.
            </p>
          </div>

          {/* Social links */}
          <div
            data-reveal="up"
            className="flex justify-center space-x-6"
            style={{ transitionDelay: "100ms" }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 group hover:-translate-y-1 hover:scale-110 active:scale-95"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>

          {/* Quick links */}
          <div
            data-reveal="up"
            className="text-center md:text-right"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="space-y-2">
              <a
                href="#projects"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Projects
              </a>
              <a
                href="#about"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                About
              </a>
              <a
                href="#contact"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          data-reveal="up"
          className="border-t border-gray-800 mt-12 pt-8 text-center"
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 ML-BCD-Labs - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
