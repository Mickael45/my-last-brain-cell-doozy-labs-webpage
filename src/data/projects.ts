import { Project } from "../types";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "TaskFlow Pro",
    tagline: "Because your brain gave up on organizing things",
    description:
      "A task management app so smart, it probably judges your life choices. Uses AI to predict when you'll actually do that thing you've been putting off for 3 months. Spoiler alert: it's not today.",
    projectUrl: "https://taskflow-pro.example.com",
    imageUrl:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    screenshots: [
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    challenges: [
      "Users kept procrastinating even with AI reminders",
      "The AI became too judgmental and started roasting users",
      "Task completion predictions were depressingly accurate",
    ],
    solutions: [
      'Added a "Gentle Disappointment" mode for sensitive users',
      "Implemented reverse psychology notifications",
      'Created a "Fake Productivity" dashboard for self-deception',
    ],
    metrics: {
      users: "10K+ procrastinators",
      performance: "99.9% uptime (unlike user productivity)",
      impact: "47% increase in guilt-driven task completion",
    },
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "TensorFlow.js",
      "PostgreSQL",
    ],
    category: "Public Utility",
    isFeatured: true,
    isIncoming: true,
    sortOrder: 1,
  },
  {
    id: "2",
    title: "CodeSnap Analytics",
    tagline: "Making your spaghetti code look fancy with charts",
    description:
      "Turns your messy codebase into beautiful visualizations that make you feel like a data scientist. Warning: May cause existential crisis when you realize how many TODO comments you have.",
    projectUrl: "https://codesnap.example.com",
    imageUrl:
      "https://images.pexels.com/photos/6424589/pexels-photo-6424589.jpeg?auto=compress&cs=tinysrgb&w=800",
    screenshots: [
      "https://images.pexels.com/photos/6424589/pexels-photo-6424589.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    challenges: [
      "Developers cried when they saw their code quality scores",
      "The dependency graph looked like abstract art",
      "Performance metrics were too honest",
    ],
    solutions: [
      'Added a "Rose-Colored Glasses" filter for fragile egos',
      'Implemented "Artistic Interpretation" mode for dependency graphs',
      "Created motivational quotes for bad code metrics",
    ],
    metrics: {
      users: "5K+ developers in denial",
      performance: "Faster than your build pipeline",
      impact: '73% reduction in "it works on my machine" incidents',
    },
    techStack: ["Vue.js", "D3.js", "Python", "FastAPI", "Redis"],
    category: "Public Utility",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: "3",
    title: "Neural Garden",
    tagline: "Where AI goes to have existential crises",
    description:
      "A digital playground where neural networks experiment with creativity and occasionally achieve sentience. Results may include abstract art that looks suspiciously like your childhood trauma.",
    projectUrl: "https://neural-garden.example.com",
    imageUrl:
      "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800",
    screenshots: [
      "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    challenges: [
      "AI started creating art better than humans",
      "Neural networks developed artistic preferences",
      "The music generator only produced death metal",
    ],
    solutions: [
      'Added a "Humble AI" mode to protect human feelings',
      "Implemented taste training with classical art",
      "Created genre diversity enforcement algorithms",
    ],
    metrics: {
      users: "2K+ digital artists and AI enthusiasts",
      performance: 'Generates art faster than you can say "NFT"',
      impact: "156% increase in AI-human collaboration anxiety",
    },
    techStack: ["Python", "PyTorch", "Streamlit", "CUDA"],
    category: "Volatile Prototype",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    id: "4",
    title: "Quantum Notes",
    tagline:
      "Notes that exist in multiple dimensions (and none of them make sense)",
    description:
      "A note-taking app that uses quantum physics principles to organize your thoughts. Your notes might be in superposition until you observe them. Schrödinger's productivity app.",
    projectUrl: "https://quantum-notes.example.com",
    imageUrl:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    screenshots: [
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    challenges: [
      "Users couldn't find their notes in quantum space",
      "Entangled notes changed when other notes were edited",
      "The uncertainty principle applied to deadlines",
    ],
    solutions: [
      'Added a "Classical Physics" fallback mode',
      "Implemented quantum search algorithms",
      'Created a "Probability of Remembering" indicator',
    ],
    metrics: {
      users: "1.5K+ confused but intrigued users",
      performance: "Exists in all possible states simultaneously",
      impact: "42% increase in philosophical note-taking",
    },
    techStack: ["React Native", "TypeScript", "Graph Database", "WebAssembly"],
    category: "Public Utility",
    isFeatured: false,
    sortOrder: 4,
  },
  {
    id: "5",
    title: "Emotion Parser",
    tagline: "AI therapist that judges your feelings",
    description:
      "An emotion detection system so advanced, it can tell you're dead inside just from your typing patterns. Now with 47 different types of existential dread classification!",
    projectUrl: "https://emotion-parser.example.com",
    imageUrl:
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    screenshots: [
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    challenges: [
      "AI became too emotionally intelligent",
      "Started offering unsolicited life advice",
      "Detected emotions users didn't know they had",
    ],
    solutions: [
      "Added emotional boundaries for the AI",
      'Implemented a "Mind Your Own Business" mode',
      "Created emotion discovery notifications with therapy recommendations",
    ],
    metrics: {
      users: "3K+ emotionally confused individuals",
      performance: "Processes feelings faster than you can suppress them",
      impact: "89% accuracy in detecting Monday morning depression",
    },
    techStack: ["Python", "TensorFlow", "NLTK", "Web Audio API"],
    category: "Volatile Prototype",
    isFeatured: false,
    sortOrder: 5,
  },
  {
    id: "6",
    title: "Data Dreamscape",
    tagline: "Where spreadsheets go to become art",
    description:
      "Transforms boring data into trippy visualizations that look like they belong in a sci-fi movie. Your quarterly reports have never looked so psychedelic.",
    projectUrl: "https://data-dreamscape.example.com",
    imageUrl:
      "https://images.pexels.com/photos/8439087/pexels-photo-8439087.jpeg?auto=compress&cs=tinysrgb&w=800",
    screenshots: [
      "https://images.pexels.com/photos/8439087/pexels-photo-8439087.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    challenges: [
      "Data visualizations were too beautiful to be taken seriously",
      "Users got lost in the aesthetic and forgot about insights",
      "Executives wanted to hang the charts on their walls",
    ],
    solutions: [
      'Added a "Boring Business Mode" for serious meetings',
      "Implemented insight highlighting with neon arrows",
      'Created printable "Data Art" export feature',
    ],
    metrics: {
      users: "800+ data scientists and artists",
      performance: "Renders beauty at 60fps",
      impact: "234% increase in data presentation engagement",
    },
    techStack: ["Three.js", "WebGL", "D3.js", "WebWorkers"],
    category: "Volatile Prototype",
    isFeatured: false,
    sortOrder: 6,
  },
];
