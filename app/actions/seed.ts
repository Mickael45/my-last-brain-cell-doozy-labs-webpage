"use server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { assertConvexEnv } from "../../lib/projects";

export async function createSeedData() {
  assertConvexEnv();
  const res = await fetchMutation(api.projects.seed, {});
  return res;
}
