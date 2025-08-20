import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface FeaturedProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, onProjectClick }) => {
  const featuredProjects = projects.filter(p => p.isFeatured);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard project={project} onClick={onProjectClick} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;