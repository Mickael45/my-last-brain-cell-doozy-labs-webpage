import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { CATEGORIES } from "../lib/constants";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_sortOrder")
      .order("asc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Removed legacyId-based query (schema simplified).

export const featured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_isFeatured", (q) => q.eq("isFeatured", true))
      .order("asc")
      .collect();
  },
});

export const insert = mutation({
  args: {
    title: v.string(),
    tagline: v.string(),
    description: v.string(),
    projectUrl: v.string(),
    imageUrl: v.string(),
    screenshots: v.array(v.string()),
    challenges: v.array(v.string()),
    solutions: v.array(v.string()),
    metrics: v.optional(
      v.object({
        users: v.optional(v.number()),
        performance: v.optional(v.string()),
        impact: v.optional(v.string()),
        mrr: v.optional(v.number()),
      }),
    ),
    techStack: v.array(v.string()),
    isFeatured: v.boolean(),
    status: v.union(
      v.literal("Later...Maybe"),
      v.literal("Next In Line"),
      v.literal("Compiling..."),
      v.literal("Released"),
    ),
    type: v.union(v.literal("Forking Around"), v.literal("Sass-y Solution")),
    categories: v.array(v.union(...CATEGORIES.map((c) => v.literal(c)))),
    sortOrder: v.number(),
    githubRepo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("projects", args);
    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    patch: v.object({
      title: v.optional(v.string()),
      tagline: v.optional(v.string()),
      description: v.optional(v.string()),
      projectUrl: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      screenshots: v.optional(v.array(v.string())),
      challenges: v.optional(v.array(v.string())),
      solutions: v.optional(v.array(v.string())),
      metrics: v.optional(
        v.object({
          users: v.optional(v.number()),
          performance: v.optional(v.string()),
          impact: v.optional(v.string()),
          mrr: v.optional(v.number()),
        }),
      ),
      techStack: v.optional(v.array(v.string())),
      isFeatured: v.optional(v.boolean()),
      status: v.optional(
        v.union(
          v.literal("Later...Maybe"),
          v.literal("Next In Line"),
          v.literal("Compiling..."),
          v.literal("Released"),
        ),
      ),
      type: v.optional(
        v.union(v.literal("Forking Around"), v.literal("Sass-y Solution")),
      ),
      categories: v.optional(
        v.array(v.union(...CATEGORIES.map((c) => v.literal(c)))),
      ),
      sortOrder: v.optional(v.number()),
      githubRepo: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { id, patch }) => {
    await ctx.db.patch(id, patch);
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});

// Development helper: create up to 20 seed project documents if fewer exist.
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").collect();
    if (existing.length >= 20) {
      return { created: 0, total: existing.length, skipped: true };
    }
    const baseProjects = Array.from({ length: 20 - existing.length }).map(
      (_, i) => {
        const idx = existing.length + i + 1;
        const statusOptions = [
          "Later...Maybe",
          "Next In Line",
          "Compiling...",
          "Released",
        ] as const;
        const typeOptions = ["Forking Around", "Sass-y Solution"] as const;
        const categoryPool = CATEGORIES;
        return {
          title: `Seed Project ${idx}`,
          tagline: `Auto-generated seed project #${idx}`,
          description:
            "This is a seeded project used to populate the development database for UI testing.",
          projectUrl: "https://example.com/seed",
          imageUrl: `https://picsum.photos/seed/seed${idx}/1200/600`,
          screenshots: [
            `https://picsum.photos/seed/seed${idx}a/800/400`,
            `https://picsum.photos/seed/seed${idx}b/800/400`,
          ],
          challenges: ["Make seeding easy", "Respect schema changes"],
          solutions: ["Programmatic generator", "Strict schema mapping"],
          metrics: {
            users: 100 + idx,
            performance: `${50 + (idx % 50)}ms p95`,
            impact: `Demo impact metric ${idx}`,
            mrr: 10 + idx,
          },
          techStack: ["Next.js", "TypeScript", "Convex"],
          isFeatured: idx % 3 === 0,
          status: statusOptions[idx % statusOptions.length],
          type: typeOptions[idx % typeOptions.length],
          categories: [categoryPool[idx % categoryPool.length]],
          sortOrder: idx,
          githubRepo: "https://github.com/Mickael45/LinkedIn-JobLens-AI",
        };
      },
    );
    for (const p of baseProjects) {
      await ctx.db.insert("projects", p);
    }
    return {
      created: baseProjects.length,
      total: existing.length + baseProjects.length,
    };
  },
});

export const migrateCategories = mutation({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    let updatedCount = 0;

    const categoryMap: Record<string, (typeof CATEGORIES)[number]> = {
      web: "Web",
      ai: "AI",
      "Public Utility": "Productivity",
      "Chaos Experiment": "Web", // Or map to another valid category
      meh: "Web", // Or map to another valid category
    };

    for (const project of projects) {
      // @ts-ignore
      const oldCategories = project.categories || [];
      const newCategories = oldCategories
        .map((c: string) => categoryMap[c.toLowerCase()])
        .filter(Boolean); // Filter out any null/undefined values

      // Remove duplicates
      const uniqueNewCategories = [...new Set(newCategories)];

      // Check if there are actual changes to avoid unnecessary writes
      if (
        JSON.stringify(oldCategories.sort()) !==
        JSON.stringify(uniqueNewCategories.sort())
      ) {
        await ctx.db.patch(project._id, { categories: uniqueNewCategories });
        updatedCount++;
      }
    }
    return { updated: updatedCount };
  },
});
