"use client";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Zap,
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  Clock,
  Layers,
  Lightbulb,
  Rocket,
  Target,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import type { Project, GitHubIssue } from "../types";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import DetailBackground from "./DetailBackground";
import ProjectTasks from "./ProjectTasks";

export default function ProjectDetailClient({
  project,
  tasks,
}: {
  project: Project;
  tasks: GitHubIssue[];
}) {
  const router = useRouter();

  const getTypeColor = (type: string) => {
    return type === "Forking Around"
      ? "from-purple-500 via-pink-500 to-red-500"
      : "from-cyan-500 via-blue-500 to-purple-500";
  };

  const getTypeBg = (type: string) => {
    return type === "Forking Around"
      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30"
      : "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30";
  };

  const getTypeShadow = (type: string) => {
    return type === "Forking Around"
      ? "hover:shadow-purple-500/25"
      : "hover:shadow-cyan-500/25";
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      {/* Ambient animated background */}
      <DetailBackground />
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group hover:-translate-x-1 hover:scale-105 active:scale-95 transform duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              <span className="font-medium">Back to the Lab</span>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-right">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 text-white ${getTypeBg(
                    project.type,
                  )}`}
                >
                  <Zap className="w-4 h-4 text-white" />
                  {project.type}
                </div>

                <h1
                  className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${getTypeColor(
                    project.type,
                  )} bg-clip-text text-transparent`}
                  style={{ viewTransitionName: `project-title-${project.id}` }}
                >
                  {project.title}
                </h1>

                <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                  {project.tagline}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative overflow-hidden inline-flex items-center justify-center gap-2 flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${getTypeColor(
                      project.type,
                    )} text-white rounded-xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 animate-scale-in [animation-delay:80ms]`}
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <ExternalLink className="w-5 h-5" />
                    Launch Project
                  </a>

                  <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center gap-2 flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 animate-scale-in [animation-delay:140ms]">
                    <Github className="w-5 h-5" />
                    View Code
                    <span className="absolute inset-0 rounded-xl ring-0 hover:animate-border-pulse" />
                  </a>
                </div>
              </div>

              <div className="relative animate-fade-left [animation-delay:200ms]">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={1200}
                    height={600}
                    priority
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      viewTransitionName: `project-image-${project.id}`,
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${getTypeColor(
                      project.type,
                    )} opacity-20 group-hover:opacity-30 transition-opacity`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        {project.metrics && (
          <section className="py-16 bg-gray-800/30">
            <div className="max-w-7xl mx-auto px-4">
              <div
                className={`grid md:grid-cols-2 lg:grid-cols-${project.metrics.mrr ? 4 : 3} gap-8 animate-fade-up`}
              >
                <InteractiveCard className="group text-center p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 animate-fade-up-scale">
                  <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <div className="text-gray-400 mb-2 uppercase tracking-wide text-sm font-medium">
                    Active Users
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {project.metrics.users}
                  </div>
                </InteractiveCard>

                <InteractiveCard className="group text-center p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20 animate-fade-up-scale [animation-delay:120ms]">
                  <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-gray-400 mb-2 uppercase tracking-wide text-sm font-medium">
                    Performance
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {project.metrics.performance}
                  </div>
                </InteractiveCard>

                <InteractiveCard className="group text-center p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 animate-fade-up-scale [animation-delay:240ms]">
                  <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-gray-400 mb-2 uppercase tracking-wide text-sm font-medium">
                    Impact
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {project.metrics.impact}
                  </div>
                </InteractiveCard>
                {project.metrics.mrr && (
                  <InteractiveCard className="group text-center p-8 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-2xl border border-yellow-500/20 animate-fade-up-scale [animation-delay:360ms]">
                    <DollarSign className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <div className="text-gray-400 mb-2 uppercase tracking-wide text-sm font-medium">
                      MRR
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {typeof project.metrics.mrr === "number"
                        ? `${project.metrics.mrr.toLocaleString()}`
                        : project.metrics.mrr}
                    </div>
                  </InteractiveCard>
                )}
              </div>
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
            <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-up">
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
            </div>

            {/* Single Column Narrative + Panels */}
            <div className="max-w-5xl mx-auto space-y-24 mb-10">
              <div className="space-y-20 animate-fade-up">
                {/* Genesis */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-2xl font-semibold text-white">
                      Genesis Spark
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.type === "Forking Around"
                      ? "Started as a borderline ridiculous experiment that somehow refused to die during refactors."
                      : "Born out of repeated pain points and the refusal to accept mediocre tooling any longer."}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    The first proof-of-concept was duct-taped together in under
                    48 hours. It broke. A lot. But the core loop felt magical
                    enough to justify polishing instead of abandoning. That was
                    the moment it graduated from \"random script\" to \"this
                    might become real\".
                  </p>
                </div>

                {/* Problem & Insight */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-red-400" />
                    <h3 className="text-2xl font-semibold text-white">
                      Core Problem & Insight
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Beneath the jokes sits a very real friction: people kept
                    wrestling with inefficient, boring, or psychologically
                    draining workflows. That emotional tax became the design
                    compass.
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
                    <h3 className="text-2xl font-semibold text-white">
                      Architecture Philosophy
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Pragmatic modularity over premature perfection. Each
                    subsystem is isolated enough to be refactored ruthlessly,
                    but integrated just enough to keep velocity absurdly high.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <InteractiveCard
                        key={i}
                        className="group p-4 rounded-xl bg-gradient-to-r from-gray-700/40 to-gray-600/30 border border-cyan-500/20 animate-fade-up-scale"
                        style={{ animationDelay: `${i * 90}ms` }}
                      >
                        <p className="text-sm font-mono tracking-wide text-cyan-300">
                          {tech}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {i === 0 && "Foundation & primary interaction layer"}
                          {i === 1 && "Type safety + maintainable growth"}
                          {i === 2 && "Core engine / heavy lifting"}
                          {i === 3 && "Performance & scaling considerations"}
                        </p>
                      </InteractiveCard>
                    ))}
                  </div>
                </div>

                {/* Iteration Timeline */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-green-400" />
                    <h3 className="text-2xl font-semibold text-white">
                      Iteration Rhythm
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Prototype",
                        desc: "Throw ideas at the wall. Keep what survives user sarcasm.",
                      },
                      {
                        label: "Stabilize",
                        desc: "Instrument everything. Kill flaky behavior without killing speed.",
                      },
                      {
                        label: "Delight Layer",
                        desc: "Micro-animations, copy personality, friction removal.",
                      },
                      {
                        label: "Scale Safety",
                        desc: "Hardening, perf profiling, graceful degradation paths.",
                      },
                    ].map((phase, i) => (
                      <div
                        key={i}
                        className="relative pl-8 animate-fade-up-scale"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                        <p className="text-sm font-semibold text-white tracking-wide">
                          {i + 1}. {phase.label}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {phase.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    <h3 className="text-2xl font-semibold text-white">
                      Impact So Far
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Early traction validated the intuition that humor + utility
                    beats sterile tooling. People stayed not just because it
                    worked, but because it felt alive.
                  </p>
                  {project.metrics && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <InteractiveCard className="group p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 animate-fade-up-scale">
                        <p className="text-xs uppercase tracking-wide text-cyan-300 font-medium mb-1">
                          Users
                        </p>
                        <p className="text-sm text-white font-semibold">
                          {project.metrics.users}
                        </p>
                      </InteractiveCard>
                      <InteractiveCard className="group p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 animate-fade-up-scale [animation-delay:120ms]">
                        <p className="text-xs uppercase tracking-wide text-green-300 font-medium mb-1">
                          Performance
                        </p>
                        <p className="text-sm text-white font-semibold">
                          {project.metrics.performance}
                        </p>
                      </InteractiveCard>
                      <InteractiveCard className="group p-5 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 animate-fade-up-scale [animation-delay:240ms]">
                        <p className="text-xs uppercase tracking-wide text-pink-300 font-medium mb-1">
                          Impact
                        </p>
                        <p className="text-sm text-white font-semibold">
                          {project.metrics.impact}
                        </p>
                      </InteractiveCard>
                      {project.metrics.mrr && (
                        <InteractiveCard className="group p-5 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 animate-fade-up-scale [animation-delay:360ms]">
                          <p className="text-xs uppercase tracking-wide text-yellow-300 font-medium mb-1">
                            MRR
                          </p>
                          <p className="text-sm text-white font-semibold">
                            {typeof project.metrics.mrr === "number"
                              ? `${project.metrics.mrr.toLocaleString()}`
                              : project.metrics.mrr}
                          </p>
                        </InteractiveCard>
                      )}
                    </div>
                  )}
                </div>

                {/* Forward Vision */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Rocket className="w-6 h-6 text-orange-400" />
                    <h3 className="text-2xl font-semibold text-white">
                      What Comes Next
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Short-term roadmap focuses on improving core stability while
                    shipping experimental side features behind feature flags.
                    Long-term vision: evolve into an ecosystem of interoperable
                    micro-capabilities that feel playful yet production-grade.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {["Feature Flags", "Observability", "Delight API"].map(
                      (item, i) => (
                        <InteractiveCard
                          key={i}
                          className="group px-4 py-3 rounded-lg bg-gradient-to-r from-gray-700/40 to-gray-600/30 border border-gray-500/30 text-sm text-gray-300 font-medium animate-fade-up-scale"
                          style={{ animationDelay: `${i * 120}ms` }}
                          intensity={5}
                        >
                          {item}
                        </InteractiveCard>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Context Panels */}
              <div className="space-y-10 animate-fade-up [animation-delay:100ms]">
                <h3 className="text-center text-2xl font-semibold text-white">
                  Context Panels
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Risk & Chaos */}
                  <InteractiveCard
                    className="group p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg/10 animate-fade-up-scale"
                    intensity={6}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="w-5 h-5 text-orange-300" />
                      <h4 className="text-lg font-semibold text-white">
                        Known Chaos
                      </h4>
                    </div>
                    <ul className="space-y-3 text-sm">
                      {[
                        "Edge-case explosions under weird input combos",
                        "Feature creep vs core simplicity tug-of-war",
                        "Users loving experimental modes a bit too much",
                      ].map((r, i) => (
                        <li key={i} className="flex gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-orange-400" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </InteractiveCard>

                  {/* Solution Patterns */}
                  <InteractiveCard
                    className="group p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg/10 animate-fade-up-scale [animation-delay:120ms]"
                    intensity={6}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-5 h-5 text-green-300" />
                      <h4 className="text-lg font-semibold text-white">
                        Solutions
                      </h4>
                    </div>
                    <ul className="space-y-3 text-sm">
                      {(project.solutions || []).slice(0, 3).map((s, i) => (
                        <li key={i} className="flex gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-green-400" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </InteractiveCard>

                  {/* Principles Recap */}
                  <InteractiveCard
                    className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg/10 animate-fade-up-scale [animation-delay:240ms]"
                    intensity={6}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-5 h-5 text-cyan-300" />
                      <h4 className="text-lg font-semibold text-white">
                        Principles
                      </h4>
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
                  </InteractiveCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Section */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="py-20 bg-gray-800/30">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16 animate-fade-up">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Screenshots That Don't Lie
                </h2>
                <p className="text-xl text-gray-400">
                  Visual proof that this thing actually works
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer opacity-0 animate-fade-up hover:scale-[1.02] transition-transform duration-500"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/5 before:via-transparent before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">
                      <Image
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="py-20 bg-gray-800/30">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
                <h2 className="text-4xl font-bold text-white">
                  Tech Stack That Actually Works
                </h2>
              </div>
              <p className="text-xl text-gray-400">
                The tools that made this beautiful chaos possible
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {project.techStack.map((tech, index) => (
                <div
                  key={index}
                  className={`px-6 py-3 bg-gradient-to-r ${getTypeColor(
                    project.type,
                  )} rounded-full text-white font-semibold shadow-lg ${getTypeShadow(
                    project.type,
                  )} transition-all duration-300 opacity-0 animate-fade-up-scale hover:-translate-y-1 hover:scale-110`}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Tasks Section */}
        {tasks && tasks.length > 0 && <ProjectTasks tasks={tasks} />}

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="animate-fade-up">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience the Magic?
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Don't just read about it, go play with it! (We're not
                responsible for productivity loss)
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex items-center justify-center gap-3 flex-1 sm:flex-none px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r ${getTypeColor(
                    project.type,
                  )} text-white rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 animate-scale-in`}
                >
                  <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity bg-white/10" />
                  <ExternalLink className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Launch {project.title}</span>
                </a>

                <button
                  onClick={() => router.push("/")}
                  className="relative inline-flex items-center justify-center gap-3 flex-1 sm:flex-none px-6 sm:px-10 py-3 sm:py-5 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 animate-scale-in [animation-delay:120ms]"
                >
                  <ArrowLeft className="w-6 h-6" />
                  Back to Lab
                  <span className="absolute inset-0 rounded-2xl ring-0 hover:animate-border-pulse" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
