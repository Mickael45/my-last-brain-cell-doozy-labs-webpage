import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Zap, Target, TrendingUp, Users, Clock, BarChart3 } from 'lucide-react';
import { mockProjects } from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">This project seems to have vanished into the quantum void.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-pink-400 hover:to-orange-400 transition-all duration-300"
          >
            Return to Reality
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    return category === 'Volatile Prototype' 
      ? 'from-purple-500 via-pink-500 to-red-500' 
      : 'from-cyan-500 via-blue-500 to-purple-500';
  };

  const getCategoryBg = (category: string) => {
    return category === 'Volatile Prototype' 
      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30' 
      : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium">Back to the Lab</span>
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${getCategoryBg(project.category)}`}>
                <Zap className="w-4 h-4" />
                {project.category}
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${getCategoryColor(project.category)} bg-clip-text text-transparent`}>
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
                  <ExternalLink className="w-5 h-5" />
                  Launch Project
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  View Code
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
                <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(project.category)} opacity-20`} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      {project.metrics && (
        <section className="py-16 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="text-center p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
                <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{project.metrics.users}</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{project.metrics.performance}</div>
                <div className="text-gray-400">Performance</div>
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{project.metrics.impact}</div>
                <div className="text-gray-400">Impact</div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Description Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <h2 className="text-4xl font-bold text-white mb-8">The Story Behind the Madness</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Screenshots Section */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="py-20 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Screenshots That Don't Lie</h2>
              <p className="text-xl text-gray-400">Visual proof that this thing actually works</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.screenshots.map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Target className="w-8 h-8 text-red-400" />
                <h2 className="text-3xl font-bold text-white">Epic Challenges</h2>
              </div>
              
              <div className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/20"
                  >
                    <p className="text-gray-300 leading-relaxed">{challenge}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-8 h-8 text-green-400" />
                <h2 className="text-3xl font-bold text-white">Genius Solutions</h2>
              </div>
              
              <div className="space-y-6">
                {project.solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
                  >
                    <p className="text-gray-300 leading-relaxed">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              <h2 className="text-4xl font-bold text-white">Tech Stack That Actually Works</h2>
            </div>
            <p className="text-xl text-gray-400">The tools that made this beautiful chaos possible</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {project.techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor(project.category)} bg-opacity-20 border border-cyan-500/30 rounded-full text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300`}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience the Magic?</h2>
            <p className="text-xl text-gray-400 mb-12">
              Don't just read about it, go play with it! (We're not responsible for productivity loss)
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r ${getCategoryColor(project.category)} text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300`}
              >
                <ExternalLink className="w-6 h-6" />
                Launch {project.title}
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-3 px-10 py-5 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-2xl font-bold text-xl transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
                Back to Lab
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;