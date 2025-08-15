import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
  const projects = useQuery(api.projects.getAllProjects);
  const seedProjects = useMutation(api.projects.seedProjects);

  // Seed projects if none exist (for demo purposes)
  useEffect(() => {
    if (projects && projects.length === 0) {
      seedProjects();
    }
  }, [projects, seedProjects]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20"></div>
        
        {/* Living mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-purple-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
              <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-cyan-300/20 rounded-full blur-xl animate-pulse delay-3000"></div>
              <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-blue-300/15 rounded-full blur-2xl animate-pulse delay-1500"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent animate-pulse delay-2000"></div>
          </div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6 animate-bounce">
              🧪 Caffeinated Chaos in Progress
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Welcome to the Doozy Lab
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Where my <span className="text-cyan-400 font-semibold">last functioning brain cell</span> meets 
            <span className="text-blue-400 font-semibold"> questionable coding decisions</span>. 
            Somehow, stuff actually works! 🤷‍♂️
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 font-semibold hover:rotate-1"
            >
              See the Madness
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 font-semibold text-cyan-400 hover:text-cyan-300 hover:-rotate-1"
            >
              Send Help (Please)
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Chaos Collection
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A wild assortment of digital experiments that somehow escaped the lab. 
              Some make money, others make me question my life choices. 🤪
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          {(!projects || projects.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">The lab is still brewing... ☕</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Got a wild idea? Let's make it even wilder! 🚀
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you want to collaborate on something ridiculous or just need someone to 
            turn your napkin sketch into actual software, I'm your slightly unhinged developer.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 font-semibold hover:rotate-2"
          >
            Let's Get Weird Together
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  const statusColors = {
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    development: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    archived: "bg-gray-500/20 text-gray-400 border-gray-500/30"
  };

  const statusEmojis = {
    live: "🚀",
    development: "🔨",
    archived: "💀"
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 hover:rotate-1">
      <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-2xl">🤖</span>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status as keyof typeof statusColors]} flex items-center gap-1`}>
            {statusEmojis[project.status as keyof typeof statusEmojis]}
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-yellow-400 text-sm animate-bounce">🌟 Proud of this one!</span>
          )}
        </div>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {project.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech: string) => (
            <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded hover:bg-cyan-600 transition-colors">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
              +{project.techStack.length - 3} more chaos
            </span>
          )}
        </div>
        
        {project.metrics && (
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            {project.metrics.users && <span>👥 {project.metrics.users} brave souls</span>}
            {project.metrics.revenue && <span>💰 {project.metrics.revenue}</span>}
            {project.metrics.stars && (
              <div className="flex items-center gap-1">
                {renderStars(project.metrics.stars)}
              </div>
            )}
          </div>
        )}
        
        <Link
          to={`/project/${project.slug}`}
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium group/link"
        >
          Dive into the madness
          <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
