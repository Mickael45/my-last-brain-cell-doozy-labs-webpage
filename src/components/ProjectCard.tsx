import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code, Sparkles } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getCategoryIcon = (category: string) => {
    return category === "Volatile Prototype" ? (
      <Sparkles className="w-4 h-4 text-white" />
    ) : (
      <Code className="w-4 h-4 text-white" />
    );
  };

  const getCategoryColor = (category: string) => {
    return category === "Volatile Prototype"
      ? "from-purple-500/20 via-pink-500/20 to-red-500/20 border-purple-500/30"
      : "from-cyan-500/20 via-blue-500/20 to-purple-500/20 border-cyan-500/30";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      className="cursor-pointer group"
    >
      <div
        className={`
        relative overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm
        ${getCategoryColor(project.category)}
        hover:border-opacity-60 transition-all duration-300
        hover:shadow-2xl hover:shadow-cyan-500/20
      `}
      >
        {/* Featured badge */}
        {project.isFeatured && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 rounded-full px-2 py-1 backdrop-blur-sm">
              <span className="text-xs font-medium text-pink-300">🔥 Hot</span>
            </div>
          </div>
        )}
        {project.isIncoming && (
          <div className="absolute top-3 left-3 z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500/40 blur animate-ping" />
              <div className="relative bg-green-500/20 border border-green-400/40 rounded-full px-2 py-1 backdrop-blur-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-semibold tracking-wide text-green-300 uppercase">
                  Incoming
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Project image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="flex items-center gap-2 mb-3">
            {getCategoryIcon(project.category)}
            <span className="text-sm font-medium text-white">
              {project.category}
            </span>
          </div>

          {/* Title and tagline */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.tagline}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.techStack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/30"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/30">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Action */}
          <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">
            <span>Dive Deeper</span>
            <ExternalLink className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
