"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Grid, Filter } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { useRouter } from "next/navigation";
import { Project } from "../types";

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Public Utility", "Chaos Experiment"];

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  const hasMoreProjects = filteredProjects.length > 4;

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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

          {/* Category Filters */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <Filter className="w-5 h-5 text-gray-400 mr-2" />
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg shadow-pink-500/25"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              layout
            >
              <ProjectCard
                project={project}
                onClick={(p) => router.push(`/project/${p.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {hasMoreProjects && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-400 hover:via-pink-400 hover:to-purple-400 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/25"
            >
              Show Me More Chaos
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Grid className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
