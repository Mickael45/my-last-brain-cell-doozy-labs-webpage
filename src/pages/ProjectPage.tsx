import { useParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = useQuery(api.projects.getProjectBySlug, { slug: slug || "" });

  if (project === undefined) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading the chaos... 🌪️</p>
        </div>
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Oops! 404 Brain Cell Not Found 🧠</h1>
          <p className="text-gray-400 mb-8">This project seems to have escaped from the lab!</p>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:rotate-2"
          >
            Back to the Lab
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    development: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    archived: "bg-gray-500/20 text-gray-400 border-gray-500/30"
  };

  const statusEmojis = {
    live: "🚀 Actually Works!",
    development: "🔨 Work in Progress",
    archived: "💀 RIP (Maybe)"
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6 hover:-translate-x-1 transform duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Escape back to the lab
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[project.status as keyof typeof statusColors]} whitespace-nowrap`}>
              {statusEmojis[project.status as keyof typeof statusEmojis]}
            </span>
          </div>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 font-semibold hover:rotate-1"
              >
                🚀 Launch This Baby
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300 font-semibold text-gray-300 hover:text-white hover:-rotate-1"
              >
                👨‍💻 Peek at the Code
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-6">The Story Behind This Madness 📖</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {project.fullDescription}
                </p>

                {/* Gallery */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-xl font-bold text-white mb-6">Screenshots (Proof it exists!) 📸</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.galleryImages.map((image: string, index: number) => (
                        <div key={index} className="aspect-video bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                          <img
                            src={image}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-colors">
                <h3 className="text-lg font-bold text-white mb-4">🛠️ Built With These Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-lg hover:bg-cyan-600 hover:text-white transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-4">📊 The Numbers Game</h3>
                  <div className="space-y-3">
                    {project.metrics.users && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Brave Users</span>
                        <span className="text-cyan-400 font-semibold">{project.metrics.users.toLocaleString()} 👥</span>
                      </div>
                    )}
                    {project.metrics.revenue && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Money Made</span>
                        <span className="text-green-400 font-semibold">{project.metrics.revenue} 💰</span>
                      </div>
                    )}
                    {project.metrics.stars && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">User Happiness</span>
                        <div className="flex items-center gap-1">
                          {renderStars(project.metrics.stars)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-colors">
                <h3 className="text-lg font-bold text-white mb-4">🏷️ Project Deets</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chaos Level</span>
                    <span className="text-white font-semibold">
                      {project.status === 'live' ? '🟢 Controlled' : 
                       project.status === 'development' ? '🟡 Moderate' : '🔴 Maximum'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current State</span>
                    <span className="text-white font-semibold capitalize">{project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Born On</span>
                    <span className="text-white font-semibold">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Want to chat about this beautiful disaster? 🤔
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you want to roast my code, suggest improvements, or just share your own 
            coding horror stories, I'm always down for a good conversation!
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 font-semibold hover:rotate-2"
          >
            Let's Talk Nonsense
          </Link>
        </div>
      </section>
    </div>
  );
}
