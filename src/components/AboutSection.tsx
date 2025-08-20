import React from "react";
import { motion } from "framer-motion";
import { Brain, Lightbulb, Rocket, Code2 } from "lucide-react";

const AboutSection: React.FC = () => {
  const principles = [
    {
      icon: Brain,
      title: "Curiosity-Driven",
      description:
        'Every project starts with a "what if?" and ends with a "why not?"',
    },
    {
      icon: Lightbulb,
      title: "Reckless Innovation",
      description:
        "I poke the impossible until it either breaks or becomes a feature",
    },
    {
      icon: Rocket,
      title: "Prototype Goblin Mode",
      description:
        "Idea at breakfast, scrappy build by lunch, mildly stable by midnight",
    },
    {
      icon: Code2,
      title: "Shameless Over‑Engineering",
      description:
        "Clean, typed, modular & benchmarked—half for performance, half so future me thinks past me was a genius",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-orange-400" />
            <span className="text-sm font-mono text-orange-400 tracking-wider uppercase">
              Origin Story
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              The Madness Behind the Method
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              This digital playground was born at 3 AM during a particularly
              questionable energy drink binge. The name? It's literally what
              happens when you're down to your last functioning brain cell but
              still somehow manage to ship code that doesn't immediately catch
              fire.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Here, I turn shower thoughts into actual products and somehow
              convince people to use them. My specialty? Building things that
              make you go "wait, someone actually made this?" followed
              immediately by "...but I kinda need it though."
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              I've got two flavors:{" "}
              <strong className="text-cyan-400">Public Utilities</strong> (stuff
              that actually works and won't break your workflow) and{" "}
              <strong className="text-purple-400">Volatile Prototypes</strong>{" "}
              (experimental chaos that might achieve sentience or crash
              spectacularly - no guarantees either way).
            </p>
          </motion.div>

          {/* Principles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/30 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <principle.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-400">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
