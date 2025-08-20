"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "../types";
import { useReveal } from "../lib/useReveal";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const featuredProjects = projects.filter((p) => p.isFeatured);

  const header = useReveal<HTMLDivElement>();

  const FeaturedCard: React.FC<{ project: Project; index: number }> = ({
    project,
    index,
  }) => {
    const { ref, visible } = useReveal<HTMLDivElement>();
    return (
      <div
        ref={ref}
        className={`opacity-0 ${visible && "animate-fade-up"}`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <ProjectCard project={project} href={`/project/${project.id}`} />
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={header.ref}
          className={`text-center mb-16 opacity-0 ${header.visible && "animate-fade-up"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-pink-400" />
            <span className="text-sm font-mono text-pink-400 tracking-wider uppercase">
              Hall of Fame
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              The Greatest Hits
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The projects that somehow didn't crash and burn (yet)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
