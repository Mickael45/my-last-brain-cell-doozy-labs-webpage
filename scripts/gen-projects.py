#!/usr/bin/env python3
"""Generate data/projects.ts from the Convex snapshot (single source of truth)."""
import json, sys, os

SNAP = os.path.join(os.path.dirname(__file__), "..", "data",
                    "snapshot_vibrant-condor-44_1781788629065623499",
                    "projects", "documents.jsonl")

# Data corrections applied on top of the raw snapshot:
# Etsy Automation borrowed SDS Sentinel's favicon as its imageUrl in Convex —
# it has no real hero image, so blank it to fall back to the status placeholder.
IMAGE_OVERRIDES = {
    "Etsy Automation": "",
}

# Stable, human-readable slugs (match existing /public/projects/* folders).
SLUGS = {
    "Dish Database": "dish-database",
    "SDS Sentinel": "sds-sentinel",
    "FITS Sentinel": "fits-sentinel",
    "Etsy Automation": "etsy-automation",
    "Financials": "financials",
    "LinkedIn JobLens AI": "joblens-ai",
}

def num(v):
    """Convert integer-valued floats (0.0, 5.0) to ints for clean TS output."""
    if isinstance(v, float) and v.is_integer():
        return int(v)
    return v

def norm(v):
    if isinstance(v, dict):
        return {k: norm(x) for k, x in v.items()}
    if isinstance(v, list):
        return [norm(x) for x in v]
    return num(v)

docs = [json.loads(l) for l in open(SNAP) if l.strip()]

projects = []
for d in docs:
    title = d["title"]
    p = {
        "id": SLUGS[title],
        "slug": SLUGS[title],
        "title": title,
        "tagline": d.get("tagline", ""),
        "description": d.get("description", ""),
        "projectUrl": d.get("projectUrl", ""),
        "imageUrl": IMAGE_OVERRIDES.get(title, d.get("imageUrl", "")),
        "screenshots": d.get("screenshots", []),
        "challenges": d.get("challenges", []),
        "solutions": d.get("solutions", []),
    }
    if "metrics" in d:
        p["metrics"] = norm(d["metrics"])
    p["techStack"] = d.get("techStack", [])
    if d.get("genesisSpark"):
        p["genesisSpark"] = d["genesisSpark"]
    if d.get("coreProblem"):
        p["coreProblem"] = d["coreProblem"]
    p["categories"] = d.get("categories", [])
    p["type"] = d["type"]
    p["status"] = d["status"]
    p["isFeatured"] = bool(d.get("isFeatured", False))
    p["sortOrder"] = num(d.get("sortOrder", 0))
    projects.append(norm(p))

body = json.dumps(projects, indent=2, ensure_ascii=False)
# JSON object/array literals are valid TS; keys stay quoted (fine in TS).

out = '''import type { Project } from "../types";

/** Status display order: furthest from release → already released. */
const STATUS_ORDER: Record<Project["status"], number> = {
  "Later...Maybe": 0,
  "Compiling...": 1,
  "Next In Line": 2,
  "Released": 3,
};

/**
 * Single source of truth for all projects. Generated from the production
 * Convex snapshot via scripts/gen-projects.py (Convex itself was removed —
 * the site is now pure-static SSG).
 */
export const projects: Project[] = ''' + body + ''';

/**
 * All projects sorted by release closeness (ascending), then by `sortOrder`
 * within the same status group. (Preserved from the old Convex `getProjects`.)
 */
export function getProjects(): Project[] {
  return [...projects].sort(
    (a, b) =>
      STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
      a.sortOrder - b.sortOrder,
  );
}

/** Look up a single project by its `id`. Returns `null` if not found. */
export function getProjectById(id: string): Project | null {
  return projects.find((p) => p.id === id) ?? null;
}

/** Look up a single project by its URL `slug`. Returns `null` if not found. */
export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
'''

dst = os.path.join(os.path.dirname(__file__), "..", "data", "projects.ts")
open(dst, "w").write(out)
print(f"Wrote {dst} with {len(projects)} projects:",
      ", ".join(p["slug"] for p in projects))
