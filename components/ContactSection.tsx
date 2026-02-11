"use client";
import React from "react";
import { useReveal } from "../lib/useReveal";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "mickaelgomesconsulting@gmail.com"; // Change if needed
const SUBJECT = encodeURIComponent("Project / Collaboration Inquiry");
const BODY = encodeURIComponent(
  `Hey Doozy Labs team,%0D%0A%0D%0AI'd like to chat about ...%0D%0A%0D%0A—`,
);

const ContactSection: React.FC = () => {
  const header = useReveal<HTMLDivElement>();
  const panel = useReveal<HTMLDivElement>();
  return (
    <section className="py-20 bg-gray-900" id="contact">
      <div className="max-w-4xl mx-auto px-4">
        <div
          ref={header.ref}
          className={`text-center mb-16 opacity-0 ${header.visible && "animate-fade-up"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-lime-400" />
            <span className="text-sm font-mono text-lime-400 tracking-wider uppercase">
              Let's Chat
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 bg-clip-text text-transparent">
              Let's Create Some Digital Chaos Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Got a wild idea? Need someone to turn your "what if" into "oh no,
            it's real"? Just shoot an email — no forms, no waiting, straight to
            the lab.
          </p>
        </div>
        <div
          ref={panel.ref}
          className={`bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-10 flex flex-col items-center text-center gap-8 hover:border-lime-500/30 transition-all duration-300 opacity-0 ${panel.visible && "animate-fade-up"}`}
          style={{ animationDelay: panel.visible ? "200ms" : undefined }}
        >
          <div className="space-y-4 max-w-xl">
            <h3 className="text-2xl font-semibold text-white">
              Old-school email. Still undefeated.
            </h3>
            <p className="text-gray-400">
              Click the button below and your mail client opens. Add context,
              hit send, and the lab will get back to you.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${SUBJECT}&body=${BODY}`}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-lg bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 hover:from-lime-400 hover:via-green-400 hover:to-emerald-400 text-white shadow-xl shadow-lime-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-105 active:scale-95"
          >
            <Mail className="w-6 h-6" /> Compose Email
          </a>
          <div className="text-sm text-gray-500 font-mono select-text">
            Or copy & paste:{" "}
            <span className="text-gray-300">{CONTACT_EMAIL}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
