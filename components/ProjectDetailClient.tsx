"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Zap } from "lucide-react";
import type { Project } from "../types";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const router = useRouter();
  const getCategoryColor = (category: string) =>
    category === "Volatile Prototype"
      ? "from-purple-500 via-pink-500 to-red-500"
      : "from-cyan-500 via-blue-500 to-purple-500";
  const getCategoryBg = (category: string) =>
    category === "Volatile Prototype"
      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30"
      : "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30";
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium">Back to the Lab</span>
          </motion.button>
        </div>
      </nav>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 text-white ${getCategoryBg(project.category)}`}
              >
                <Zap className="w-4 h-4 text-white" />
                {project.category}
              </div>
              <h1
                className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${getCategoryColor(project.category)} bg-clip-text text-transparent`}
              >
                {project.title}
              </h1>
              <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                {project.tagline}
              </p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${getCategoryColor(project.category)} text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300`}
                >
                  <ExternalLink className="w-5 h-5" /> Launch Project
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  <Github className="w-5 h-5" /> View Code
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(project.category)} opacity-20`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Project Description</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-gray-800/60 text-xs border border-gray-700/50"
              >
                {t}
              </span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-xl font-semibold text-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </motion.button>
        </div>
      </section>
    </div>
  );
}
