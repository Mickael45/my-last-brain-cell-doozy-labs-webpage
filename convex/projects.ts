import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .order("desc")
      .collect();
  },
});

export const getFeaturedProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .collect();
  },
});

export const getProjectBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const getProjectsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .order("desc")
      .collect();
  },
});

// Seed data function (for development)
export const seedProjects = mutation({
  args: {},
  handler: async (ctx) => {
    const projects = [
      {
        title: "TaskFlow Pro",
        slug: "taskflow-pro",
        shortDescription: "AI-powered task management that somehow doesn't make you want to throw your laptop out the window",
        fullDescription: "TaskFlow Pro is what happens when you combine my ADHD brain with machine learning algorithms. It's a task management app that actually learns from your chaotic work patterns and somehow makes sense of them. Built during a 3-week caffeine bender, it now helps over 2,500 people pretend they have their lives together. Features include smart task prioritization, team collaboration tools, and a panic button for when everything goes wrong (which is often).",
        techStack: ["React", "Node.js", "PostgreSQL", "OpenAI API", "Stripe"],
        category: "SaaS",
        status: "live",
        imageUrl: "/api/placeholder/600/400",
        galleryImages: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"],
        liveUrl: "https://taskflow-pro.com",
        githubUrl: "https://github.com/ml-bcd/taskflow-pro",
        featured: true,
        metrics: {
          users: 2500,
          revenue: "$15k MRR",
          stars: 4
        },
        createdAt: Date.now(),
      },
      {
        title: "CodeSnap Analytics",
        slug: "codesnap-analytics",
        shortDescription: "Developer productivity insights that don't make you feel bad about your 3am coding sessions",
        fullDescription: "Born from my desperate need to understand why I write better code at 2am than at 2pm, CodeSnap Analytics tracks your coding patterns without judging your life choices. It provides actionable insights into productivity trends, identifies your peak coding hours, and even tells you when you're about to write spaghetti code (spoiler: it's usually after lunch). The dashboard is designed to make you feel accomplished even when you've spent 4 hours debugging a missing semicolon.",
        techStack: ["Vue.js", "Python", "MongoDB", "D3.js", "Docker"],
        category: "SaaS",
        status: "live",
        imageUrl: "/api/placeholder/600/400",
        galleryImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
        liveUrl: "https://codesnap-analytics.com",
        featured: true,
        metrics: {
          users: 850,
          revenue: "$8k MRR",
          stars: 5
        },
        createdAt: Date.now() - 86400000,
      },
      {
        title: "Local Biz Booster",
        slug: "local-biz-booster",
        shortDescription: "Marketing automation for small businesses who think 'going viral' means getting the flu",
        fullDescription: "Created for my neighbor who runs a bakery and thought Instagram was a type of scale. Local Biz Booster handles social media posting, email campaigns, and customer retention without requiring a marketing degree or selling your soul to Facebook. It's like having a marketing intern who actually shows up and doesn't eat all your snacks. The interface is so simple, even my technophobic aunt could use it (and she still uses Internet Explorer).",
        techStack: ["Next.js", "Supabase", "Tailwind CSS", "Zapier API"],
        category: "Client Work",
        status: "live",
        imageUrl: "/api/placeholder/600/400",
        liveUrl: "https://localbizbooster.com",
        featured: false,
        metrics: {
          users: 120,
          revenue: "One-time $5k",
          stars: 3
        },
        createdAt: Date.now() - 172800000,
      },
      {
        title: "Expense Ninja",
        slug: "expense-ninja",
        shortDescription: "Expense tracking so simple, even your accountant might crack a smile",
        fullDescription: "Currently brewing in the lab - a mobile-first expense tracking app that uses AI to categorize your questionable spending habits. It's designed for people who buy coffee with their credit card and then forget about it until tax season. Features will include receipt scanning (because who keeps paper receipts anymore?), automatic categorization, and gentle judgment about your impulse purchases. The AI is trained on my own chaotic spending patterns, so it understands the struggle.",
        techStack: ["React Native", "Firebase", "TensorFlow.js", "Plaid API"],
        category: "SaaS",
        status: "development",
        imageUrl: "/api/placeholder/600/400",
        featured: false,
        metrics: {
          users: 0,
          revenue: "$0 (but dreams are priceless)",
          stars: 2
        },
        createdAt: Date.now() - 259200000,
      }
    ];

    for (const project of projects) {
      await ctx.db.insert("projects", project);
    }
    
    return "Projects seeded with maximum chaos! 🌱";
  },
});
