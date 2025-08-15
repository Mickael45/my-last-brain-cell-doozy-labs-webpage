import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    type: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const submitContact = useMutation(api.contacts.submitContact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        message: formData.message,
        type: formData.type,
      });

      toast.success("Message launched into the void! 🚀 I'll get back to you soon!");
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        type: "general"
      });
    } catch (error) {
      toast.error("Oops! My brain cell malfunctioned. Please try again! 🤯");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Fun background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-2xl animate-bounce delay-300">📧</div>
          <div className="absolute top-40 right-20 text-3xl animate-bounce delay-700">💬</div>
          <div className="absolute bottom-32 left-20 text-2xl animate-bounce delay-1000">🤝</div>
          <div className="absolute bottom-20 right-40 text-3xl animate-bounce delay-500">☕</div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Send Help (Or Just Say Hi!) 👋
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Got a wild idea? Found a bug? Want to tell me my code is terrible? 
            Or just need someone to validate your questionable life choices? I'm here for it all! 🤪
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 hover:border-cyan-500/30 transition-colors">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    What should I call you? 🏷️ *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 hover:bg-gray-600 transition-colors"
                    placeholder="Your awesome name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email (so I can reply!) 📧 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 hover:bg-gray-600 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company/Organization 🏢
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 hover:bg-gray-600 transition-colors"
                  placeholder="Your fancy workplace (or just 'my couch')"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                  What's this madness about? 🤔
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white hover:bg-gray-600 transition-colors"
                >
                  <option value="general">Just Saying Hi 👋</option>
                  <option value="saas-inquiry">Your SaaS Looks Cool 🚀</option>
                  <option value="freelance">I Need Help With Code 💻</option>
                  <option value="project-purchase">I Want to Buy Your Stuff 💰</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Spill the tea ☕ *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 resize-none hover:bg-gray-600 transition-colors"
                  placeholder="Tell me about your brilliant/terrible/confusing idea, or just vent about your day. I'm here for all of it!"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:rotate-1"
              >
                {isSubmitting ? "Launching into the void... 🚀" : "Send This Chaos 📤"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-transform">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Response Speed</h3>
              <p className="text-gray-400">Usually within 24 hours (unless I'm debugging something impossible)</p>
            </div>

            <div className="p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-transform">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Availability</h3>
              <p className="text-gray-400">Powered by coffee and questionable sleep schedules</p>
            </div>

            <div className="p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-transform">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-400">Somewhere on Earth (probably)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
