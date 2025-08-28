"use client";
import React from "react";
import { useReveal } from "../lib/useReveal";
import { Beaker } from "lucide-react";
import { FaGithub, FaLinkedin, FaBriefcase } from "react-icons/fa";

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaBriefcase, href: "https://www.mickael-gomes.com", label: "Portfolio" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const left = useReveal<HTMLDivElement>();
  const middle = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>();
  const bottom = useReveal<HTMLDivElement>();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and tagline */}
          <div
            ref={left.ref}
            className={`text-center md:text-left opacity-0 ${left.visible && "animate-fade-up"}`}
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
            ref={middle.ref}
            className={`flex justify-center space-x-6 opacity-0 ${middle.visible && "animate-fade-up"}`}
            style={{ animationDelay: middle.visible ? "100ms" : undefined }}
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
            ref={right.ref}
            className={`text-center md:text-right opacity-0 ${right.visible && "animate-fade-up"}`}
            style={{ animationDelay: right.visible ? "200ms" : undefined }}
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
          ref={bottom.ref}
          className={`border-t border-gray-800 mt-12 pt-8 text-center opacity-0 ${bottom.visible && "animate-fade-up"}`}
          style={{ animationDelay: bottom.visible ? "300ms" : undefined }}
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
