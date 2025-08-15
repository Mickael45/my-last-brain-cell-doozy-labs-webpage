import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
  },
});

export const getAllContacts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contacts")
      .order("desc")
      .collect();
  },
});
