"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import AnimatedMesh from "./AnimatedMesh";

// Deterministic pseudo-random generator so that server & client render match
// (Using Math.random in the render path caused hydration mismatches.)
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const PARTICLE_COUNT = 6;
// Precompute particle layout once (module scope) so both server & client use identical values.
const particleConfigs = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const left = (pseudoRandom(i + 1) * 100).toFixed(4);
  const top = (pseudoRandom(i + 101) * 100).toFixed(4);
  return {
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${i * 0.5}s`,
    animationDuration: "4s",
  } as const;
});

const HeroSection: React.FC = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Animated Mesh Background */}
      <AnimatedMesh />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-900/40 to-gray-900/80"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-up [animation-delay:200ms]">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight animate-fade-up [animation-delay:400ms]">
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              My Last Brain Cell
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              Doozy
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up [animation-delay:600ms]">
            Where caffeine-fueled coding sessions meet questionable life
            choices. Building stuff that probably shouldn't exist, but somehow
            does.
          </p>

          <button
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-400 hover:via-purple-400 hover:to-cyan-400 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 animate-fade-up [animation-delay:800ms] hover:scale-105 active:scale-95"
          >
            Enter the Chaos
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particleConfigs.map((cfg, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-float-y"
              style={cfg}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-up [animation-delay:1500ms]">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-bob">
          <div
            className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bob"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
