"use client";
import React, { useState } from "react";
import { Grid, Filter } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "../types";
import { useReveal } from "../lib/useReveal";
import { CATEGORIES } from "@/lib/constants";

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>("All");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");

  const typeOptions = ["All", "Forking Around", "Sass-y Solution"];
  const categoryOptions = ["All", ...CATEGORIES];

  const filteredProjects = projects.filter((project) => {
    const typeMatch = activeTypeFilter === "All" || project.type === activeTypeFilter;
    const categoryMatch =
      activeCategoryFilter === "All" ||
      project.categories.includes(activeCategoryFilter as typeof CATEGORIES[number]);
    return typeMatch && categoryMatch;
  });

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  const hasMoreProjects = filteredProjects.length > 4;

  const header = useReveal<HTMLDivElement>();
  const ProjectCardWrapper: React.FC<{ project: Project; index: number }> = ({
    project,
    index,
  }) => {
    const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.1 });
    return (
      <div
        ref={ref}
        className={`opacity-0 ${visible && "animate-fade-up"}`}
        style={{ animationDelay: `${index * 75}ms` }}
      >
        <ProjectCard project={project} href={`/project/${project.id}`} />
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={header.ref}
          className={`text-center mb-16 opacity-0 ${header.visible && "animate-fade-up"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Grid className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400 tracking-wider uppercase">
              The Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Digital Experiments Gone Wild
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Where good ideas go to become questionable reality
          </p>

          {/* Filters */}
          <div className="flex flex-col items-center justify-center gap-6 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-400 font-semibold mr-2">Type:</span>
              {typeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTypeFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                    activeTypeFilter === type
                      ? "bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg shadow-pink-500/25"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-400 font-semibold mr-2">Category:</span>
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategoryFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                    activeCategoryFilter === category
                      ? "bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/25"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <ProjectCardWrapper
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {hasMoreProjects && !showAll && (
          <div className="text-center animate-fade-up">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-400 hover:via-pink-400 hover:to-purple-400 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 hover:scale-105 active:scale-95"
            >
              Show Me More Chaos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
