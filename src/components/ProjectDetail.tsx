import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Zap,
  Target,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Lightbulb,
  Layers,
  Rocket,
  AlertTriangle,
  Activity,
  Brain,
} from "lucide-react";
import { mockProjects } from "../data/projects";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            This project seems to have vanished into the quantum void.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-pink-400 hover:to-orange-400 transition-all duration-300"
          >
            Return to Reality
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    return category === "Volatile Prototype"
      ? "from-purple-500 via-pink-500 to-red-500"
      : "from-cyan-500 via-blue-500 to-purple-500";
  };

  const getCategoryBg = (category: string) => {
    return category === "Volatile Prototype"
      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30"
      : "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
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
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(project.category)} opacity-20`}
                />
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
                <div className="text-gray-400 mb-2 uppercase tracking-wide text-sm font-medium">
                  Active Users
                </div>
                <div className="text-3xl font-bold text-white">
                  {project.metrics.users}
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-gray-400 mb-2 uppercase tracking-wide text-sm font-medium">
                  Performance
                </div>
                <div className="text-3xl font-bold text-white">
                  {project.metrics.performance}
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <div className="text-gray-400 mb-2 uppercase tracking-wide text-sm font-medium">
                  Impact
                </div>
                <div className="text-3xl font-bold text-white">
                  {project.metrics.impact}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Story / Narrative Expanded Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-gray-700/40 to-gray-600/20 border border-gray-500/30 mb-6">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-mono tracking-widest text-cyan-300">
                The Story Behind the Madness
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              How {project.title} Escaped The Idea Graveyard
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Single Column Narrative + Panels */}
          <div className="max-w-5xl mx-auto space-y-24 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-20"
            >
              {/* Genesis */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-2xl font-semibold text-white">Genesis Spark</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.category === 'Volatile Prototype'
                    ? 'Started as a borderline ridiculous experiment that somehow refused to die during refactors.'
                    : 'Born out of repeated pain points and the refusal to accept mediocre tooling any longer.'}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  The first proof-of-concept was duct-taped together in under 48 hours. It broke. A lot. But the
                  core loop felt magical enough to justify polishing instead of abandoning. That was the moment
                  it graduated from \"random script\" to \"this might become real\".
                </p>
              </div>

              {/* Problem & Insight */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-red-400" />
                  <h3 className="text-2xl font-semibold text-white">Core Problem & Insight</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Beneath the jokes sits a very real friction: people kept wrestling with inefficient, boring,
                  or psychologically draining workflows. That emotional tax became the design compass.
                </p>
                <ul className="space-y-3">
                  {(project.challenges || []).slice(0, 3).map((c, i) => (
                    <li key={i} className="flex gap-3 text-gray-400">
                      <span className="mt-1 w-2 h-2 rounded-full bg-red-500/60" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Philosophy */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Layers className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-semibold text-white">Architecture Philosophy</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Pragmatic modularity over premature perfection. Each subsystem is isolated enough to be
                  refactored ruthlessly, but integrated just enough to keep velocity absurdly high.
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-gradient-to-r from-gray-700/40 to-gray-600/30 border border-cyan-500/20"
                    >
                      <p className="text-sm font-mono tracking-wide text-cyan-300">{tech}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {i === 0 && 'Foundation & primary interaction layer'}
                        {i === 1 && 'Type safety + maintainable growth'}
                        {i === 2 && 'Core engine / heavy lifting'}
                        {i === 3 && 'Performance & scaling considerations'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Iteration Timeline */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-semibold text-white">Iteration Rhythm</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Prototype', desc: 'Throw ideas at the wall. Keep what survives user sarcasm.' },
                    { label: 'Stabilize', desc: 'Instrument everything. Kill flaky behavior without killing speed.' },
                    { label: 'Delight Layer', desc: 'Micro-animations, copy personality, friction removal.' },
                    { label: 'Scale Safety', desc: 'Hardening, perf profiling, graceful degradation paths.' },
                  ].map((phase, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                      <p className="text-sm font-semibold text-white tracking-wide">
                        {i + 1}. {phase.label}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{phase.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-semibold text-white">Impact So Far</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Early traction validated the intuition that humor + utility beats sterile tooling. People
                  stayed not just because it worked, but because it felt alive.
                </p>
                {project.metrics && (
                  <div className="grid sm:grid-cols-3 gap-5">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                      <p className="text-xs uppercase tracking-wide text-cyan-300 font-medium mb-1">
                        Users
                      </p>
                      <p className="text-sm text-white font-semibold">
                        {project.metrics.users}
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <p className="text-xs uppercase tracking-wide text-green-300 font-medium mb-1">
                        Performance
                      </p>
                      <p className="text-sm text-white font-semibold">
                        {project.metrics.performance}
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                      <p className="text-xs uppercase tracking-wide text-pink-300 font-medium mb-1">
                        Impact
                      </p>
                      <p className="text-sm text-white font-semibold">
                        {project.metrics.impact}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Forward Vision */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-orange-400" />
                  <h3 className="text-2xl font-semibold text-white">What Comes Next</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Short-term roadmap focuses on improving core stability while shipping experimental side
                  features behind feature flags. Long-term vision: evolve into an ecosystem of interoperable
                  micro-capabilities that feel playful yet production-grade.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {['Feature Flags', 'Observability', 'Delight API'].map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 rounded-lg bg-gradient-to-r from-gray-700/40 to-gray-600/30 border border-gray-500/30 text-sm text-gray-300 font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Context Panels */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-10"
            >
              <h3 className="text-center text-2xl font-semibold text-white">Context Panels</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Risk & Chaos */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-orange-300" />
                    <h4 className="text-lg font-semibold text-white">Known Chaos</h4>
                  </div>
                  <ul className="space-y-3 text-sm">
                    {[
                      'Edge-case explosions under weird input combos',
                      'Feature creep vs core simplicity tug-of-war',
                      'Users loving experimental modes a bit too much',
                    ].map((r, i) => (
                      <li key={i} className="flex gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-orange-400" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution Patterns */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-5 h-5 text-green-300" />
                    <h4 className="text-lg font-semibold text-white">Solutions</h4>
                  </div>
                  <ul className="space-y-3 text-sm">
                    {(project.solutions || []).slice(0, 3).map((s, i) => (
                      <li key={i} className="flex gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-green-400" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Principles Recap */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-5 h-5 text-cyan-300" />
                    <h4 className="text-lg font-semibold text-white">Principles</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2">
                      <span className="w-1.5 h-1.5 mt-2 rounded-full bg-cyan-400" />
                      Ship playful, keep production trust.
                    </li>
                    <li className="flex gap-2">
                      <span className="w-1.5 h-1.5 mt-2 rounded-full bg-cyan-400" />
                      Instrument first, optimize second.
                    </li>
                    <li className="flex gap-2">
                      <span className="w-1.5 h-1.5 mt-2 rounded-full bg-cyan-400" />
                      Humor is a feature, not an afterthought.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
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
              <h2 className="text-4xl font-bold text-white mb-4">
                Screenshots That Don't Lie
              </h2>
              <p className="text-xl text-gray-400">
                Visual proof that this thing actually works
              </p>
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
                <h2 className="text-3xl font-bold text-white">
                  Epic Challenges
                </h2>
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
                <h2 className="text-3xl font-bold text-white">
                  Genius Solutions
                </h2>
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
              <h2 className="text-4xl font-bold text-white">
                Tech Stack That Actually Works
              </h2>
            </div>
            <p className="text-xl text-gray-400">
              The tools that made this beautiful chaos possible
            </p>
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience the Magic?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Don't just read about it, go play with it! (We're not responsible
              for productivity loss)
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
                onClick={() => navigate("/")}
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
