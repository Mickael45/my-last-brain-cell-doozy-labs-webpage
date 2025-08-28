"use node";

import { v } from "convex/values";
import { internalAction, internalMutation } from "./_generated/server";
import Stripe from "stripe";
import { internal } from "./_generated/api";

export const pay = internalAction({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });
    const domain = process.env.HOSTING_URL ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      mode: "payment",
      success_url: `${domain}`,
      cancel_url: `${domain}`,
      automatic_tax: { enabled: true },
      metadata: {
        text,
      },
    });

    await ctx.runMutation(internal.stripe.add, {
      text,
      checkoutId: session.id,
    });

    return session.url!;
  },
});

export const add = internalMutation({
  args: { text: v.string(), checkoutId: v.string() },
  handler: async (ctx, { text, checkoutId }) => {
    await ctx.db.insert("messages", {
      text,
      checkoutId,
    });
  },
});

export const fulfill = internalMutation({
  args: { checkoutId: v.string() },
  handler: async (ctx, { checkoutId }) => {
    const { _id } = (await ctx.db
      .query("messages")
      .withIndex("by_checkoutId", (q) => q.eq("checkoutId", checkoutId))
      .unique())!;
    await ctx.db.patch(_id, { paid: true });
  },
});
