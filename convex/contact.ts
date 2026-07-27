import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  returns: v.id("contactMessages"),
  handler: async (ctx, args) => {
    const name = args.name.trim().slice(0, 120);
    const email = args.email.trim().slice(0, 160);
    const message = args.message.trim().slice(0, 4000);
    if (!name || !email || !message) {
      throw new Error("Semua ruangan diperlukan.");
    }
    return await ctx.db.insert("contactMessages", {
      name,
      email,
      message,
      createdAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query("contactMessages").order("desc").take(100);
  },
});
