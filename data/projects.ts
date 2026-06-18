import type { Project } from "../types";

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
export const projects: Project[] = [
  {
    "id": "dish-database",
    "slug": "dish-database",
    "title": "Dish Database",
    "tagline": "Because \"what's for dinner?\" shouldn't require a existential crisis every single night.",
    "description": "A full-stack dish manager born from the eternal struggle of staring into the fridge. 50 recipes from a static JSON dataset, a real-time Convex backend for weekly plans, cooking history, and ratings. Browse and filter dishes, generate randomized weekly meal schedules with auto-scaled ingredients, track every cooking session with ratings and warnings, and sync your grocery list straight to Grocy. Past-you helping future-you eat better.",
    "projectUrl": "",
    "imageUrl": "/projects/dish-manager/screenshot-2026-02-11_09-21-37.webp",
    "screenshots": [
      "/projects/dish-manager/screenshot-2026-02-11_09-25-25.webp",
      "/projects/dish-manager/screenshot-2026-02-11_09-28-37.webp",
      "/projects/dish-manager/screenshot-2026-02-11_09-27-49.webp",
      "/projects/dish-manager/screenshot-2026-02-11_09-28-09.webp",
      "/projects/dish-manager/Screenshot_20260211_102622_Chrome.webp",
      "/projects/dish-manager/Screenshot_20260211_102628_Chrome.webp",
      "/projects/dish-manager/Screenshot_20260211_102633_Chrome.webp",
      "/projects/dish-manager/Screenshot_20260211_102637_Chrome.webp",
      "/projects/dish-manager/Screenshot_20260211_102650_Chrome.webp",
      "/projects/dish-manager/Screenshot_20260211_102654_Chrome.webp",
      "/projects/dish-manager/Screenshot_20260211_102707_Chrome.webp",
      "/projects/dish-manager/Screenshot_20260211_102716_Chrome.webp"
    ],
    "challenges": [
      "Keeping a static JSON file as the single source of truth for recipes while persisting plans, history, and feedback in a real-time database—without them drifting apart like two people reading different menus.",
      "Locking down the app to a single owner without spinning up a full multi-tenant auth system—nobody else needs to see my questionable meal ratings.",
      "Scaling ingredient quantities by people count and aggregating them across an entire weekly plan into one shopping list that doesn't list \"olive oil\" seven times.",
      "Talking to Grocy's API without losing my mind: matching free-text ingredient names to Grocy products and gracefully handling the ones that refuse to cooperate.",
      "Building a feedback model that tracks per-session ratings, notes, and warnings while staying simple enough that querying it doesn't feel like a second job."
    ],
    "solutions": [
      "Recipes live in the repo as static JSON—Convex only stores the dynamic stuff (weekly plans, cooking sessions, feedback, ingredient mappings, settings). Zero sync headaches, dishes stay immutable.",
      "Convex Auth with magic-link login plus a server-side owner gate: one configured user, one check, done. Every plan/history/integration mutation is locked behind it.",
      "Client-side plan generation picks season-aware random meals and desserts, then a shared shopping-list builder aggregates ingredients, scales by people count, and deduplicates by normalized name before shipping to Grocy.",
      "A Convex action handles the Grocy API calls; ingredient normalization (lowercase, trim) paired with an ingredientMappings table (normalizedName → grocyProductId) bridges the gap. Unmapped items still land on the list as free-text so nothing gets lost.",
      "Relational-style schema: cookingSessions (dish, peopleCount, planId, cookedAt) and sessionFeedback (sessionId, rating, notes, warnings[]). The history UI joins them and supports inline edit—rate, note, save, move on."
    ],
    "metrics": {
      "impact": "50 recipes in the dataset; weekly meal plans, full cooking history with ratings, and Grocy shopping-list sync for a household of one very opinionated cook."
    },
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "Convex",
      "Convex Auth",
      "Tailwind",
      "Vercel"
    ],
    "genesisSpark": "Staring into the fridge asking 'what's for dinner?' while recipes rot across 4 different apps, 2 bookmarks folders, and a napkin. That was the breaking point. I needed something centralized where I could add dishes, rate them, track my progress, and — most importantly — hook into Grocy so generating a weekly meal plan and pushing groceries is literally two clicks.",
    "coreProblem": "Cooking isn't the hard part — organizing the chaos around it is. Dishes scattered across websites and note apps. No way to track what worked, what didn't, or what needs more garlic. And every week, rebuilding a grocery list from memory like some kind of culinary archaeologist.",
    "categories": [
      "Productivity"
    ],
    "type": "Forking Around",
    "status": "Released",
    "isFeatured": false,
    "sortOrder": 0
  },
  {
    "id": "sds-sentinel",
    "slug": "sds-sentinel",
    "title": "SDS Sentinel",
    "tagline": "Watch a folder, get audit-ready. No spreadsheets, no cloud uploads.",
    "description": "A local-first Windows desktop app for EHS managers. It watches a folder for SDS PDFs, extracts GHS hazards, expiry, and SVHC, and gives you one dashboard and a one-click PDF audit report. Everything stays on your machine—SQLite, no cloud. Built for the gap between \"Excel + shared drives\" and big enterprise SDS platforms.",
    "projectUrl": "http://sdssentinel.com/",
    "imageUrl": "/projects/sds-sentinel/favicon.webp",
    "screenshots": [
      "/projects/sds-sentinel/Screenshot 2026-06-15 at 17.13.49.webp",
      "/projects/sds-sentinel/Screenshot 2026-06-15 at 17.14.04.webp"
    ],
    "challenges": [
      "Parsing wildly different SDS PDF layouts and pulling GHS Section 2 (H/P-codes, signal word, pictograms) reliably",
      "Dealing with scanned SDS with no text layer (OCR)",
      "Keeping scope and maintenance low (solo, 5–10 h/week) while still adding hazard intelligence and a real audit report",
      "Shipping a single-file Windows app (PyInstaller + Inno Setup) with trial and license (LemonSqueezy, offline cache)"
    ],
    "solutions": [
      "Format-specific parsers (e.g. SpatialGHSParser with PyMuPDF) plus a router (parser/cache/OCR); static GHS reference for storage incompatibility",
      "Docling-based OCR behind a setting; router falls back when text parsing fails; clear \"Parsed via OCR\" and error feedback",
      "Strict scope: static SVHC list, no remediation workflows; GHS + SVHC + compliance score + PDF report as the launch set",
      "PyInstaller + Inno Setup, LemonSqueezy HMAC-SHA256 license cache (device-bound, 7-day TTL), trial and post-trial read-only with parse limits"
    ],
    "metrics": {
      "impact": "Dasboard says it all",
      "mrr": 0,
      "performance": "50 SDS entries scanned < 60s",
      "users": 0
    },
    "techStack": [
      "Python",
      "FastAPI",
      "Jinja2",
      "HTMX",
      "SQLite",
      "PyMuPDF",
      "Docling",
      "Watchdog",
      "pystray",
      "fpdf2",
      "LemonSqueezy",
      "PyInstaller",
      "Inno Setup"
    ],
    "genesisSpark": "EHS teams drowning in SDS PDFs across folders and inboxes, and manual tracking that falls apart before audit season. I wanted something local-first: watch a folder, extract what inspectors actually care about (GHS, expiry, SVHC), and get one view and one report—no spreadsheets, no sending chemical data to the cloud. Solo micro-SaaS, built to live within a 5–10 h/week maintenance ceiling and a 1k MRR target (four customers at $249/mo).",
    "coreProblem": "The real problem isn't storing SDS—it's fractured tracking and last-minute audit panic. The bet: ingestion and verification can be production-grade (watchdog, parser router, consensus, audit trail) even when the product started as \"four fields and a dashboard.\" Closing the gap meant adding GHS extraction (H/P-codes, signal word, pictograms), storage incompatibility from H-codes, SVHC cross-reference, a compliance score, and a real OSHA-style PDF report—so the app delivers audit-ready output, not just an indexed filing cabinet.",
    "categories": [
      "Productivity"
    ],
    "type": "Sass-y Solution",
    "status": "Released",
    "isFeatured": true,
    "sortOrder": 1
  },
  {
    "id": "fits-sentinel",
    "slug": "fits-sentinel",
    "title": "FITS Sentinel",
    "tagline": "Because losing a night of astrophotography to a malformed header is a special kind of pain.",
    "description": "Sentinel acts as a surgical watchdog between capture and processing, repairing header malformations in under 100ms without touching your precious pixels. It features write-lock protection and file 'vaccination' to ensure safety before the surgeon operates. Available as a lightweight GUI or headless Docker container for remote observatories.",
    "projectUrl": "",
    "imageUrl": "/projects/fits-sentinel/Gemini_Generated_Image_fuxr7ffuxr7ffuxr-removebg-preview.webp",
    "screenshots": [],
    "challenges": [
      "Camera manufacturers (ZWO, QHY, ToupTek) each decided to interpret the FITS standard differently — EXPOSURE instead of EXPTIME, mangled date strings, missing telescope metadata — turning every capture session into a metadata lottery.",
      "Processing pipelines like PixInsight and Siril are brutally rigid: one malformed header and hours of valuable data get rejected. Astronomers end up hex-editing files at 6 AM, which is exactly as fun as it sounds.",
      "Touching FITS files while the camera is still writing them is a fast track to corruption. The repair engine needs to be smart enough to wait, but fast enough to keep up with high-cadence imaging sessions.",
      "Supporting both a desktop GUI for hobbyists and a headless Docker container for remote observatories — same core, completely different deployment stories.",
      "Remote observatories have spotty internet at best, so license verification needs to work offline with signed caching and HMAC validation — no phoning home required."
    ],
    "solutions": [
      "A surgical repair engine that normalizes keywords, fixes timestamps, and standardizes number formats against strict astronomical standards — only the metadata header gets touched, raw pixel data stays untouched.",
      "A vaccination system tags processed files in the HISTORY header, preventing infinite processing loops and double-handling. Once healed, a file is marked and left alone.",
      "Intelligent write-lock detection waits for files to be fully written before the surgeon moves in — no partial reads, no corruption, no drama.",
      "Dual-architecture build: CustomTkinter GUI compiled to binary via Nuitka for Windows/Mac, plus a distroless-style Docker container for Linux/NAS telescope farms. Same core, two skins.",
      "Signed license caching with HMAC verification enables fully offline operation — remote observatories stay licensed without needing a connection."
    ],
    "techStack": [
      "Python",
      "Astro",
      "Nuitka",
      "Astropy",
      "Watchdog",
      "CustomTkinter",
      "Docker",
      "GitHub Actions"
    ],
    "genesisSpark": "An autonomous background service that heals corrupted astrophotography data in real-time—catching the formatting gremlins before your processing pipeline throws a tantrum.",
    "coreProblem": "Camera drivers from ZWO, QHY, and ToupTek love writing non-standard FITS headers, and rigid tools like PixInsight and Siril love crashing because of them.",
    "categories": [
      "Productivity"
    ],
    "type": "Sass-y Solution",
    "status": "Compiling...",
    "isFeatured": true,
    "sortOrder": 3
  },
  {
    "id": "etsy-automation",
    "slug": "etsy-automation",
    "title": "Etsy Automation",
    "tagline": "From 'nice picture' to 'live on Etsy' without lifting more than one finger.",
    "description": "A full-stack automation tool that turns listing print-on-demand products into a single guided flow. Upload an image, and a local AI pipeline takes over: 8x ESRGAN upscaling, Ollama vision for image analysis, and a second LLM pass for SEO-optimized Etsy metadata — titles, descriptions, and exactly 13 tags. Smart-crops to product-specific aspect ratios, submits to Printify with full variant and pricing config. Everything runs locally — no API bills, no cloud, one flow from image to draft product.",
    "projectUrl": "",
    "imageUrl": "/projects/sds-sentinel/favicon.webp",
    "screenshots": [],
    "challenges": [
      "Getting print-quality resolution from low-res source images without turning everything into an impressionist painting of artifacts.",
      "Generating SEO-friendly metadata that actually follows Etsy's character limits and doesn't read like a keyword salad.",
      "Pushing large image payloads (up to 100MB) through the full upscale-crop-upload pipeline without the server tapping out on memory.",
      "Mapping a single source image to multiple product types — each with different aspect ratios, variant structures, and pricing — without hardcoding everything into oblivion.",
      "Orchestrating multiple AI model calls (vision + text generation) and keeping the whole workflow fast enough that it doesn't feel like watching paint dry."
    ],
    "solutions": [
      "ESRGAN-slim 8x via Upscaler.js with patched inference (patch size 64, padding 6) handles the upscaling reliably on a Node.js backend. The images come out clean.",
      "A prompt-engineering layer with strict formatting rules, shop-context injection, and product-type suffixes keeps the local LLM on a leash — consistently outputting Etsy-ready metadata instead of creative writing exercises.",
      "Express with a 100MB body-parser limit and TensorFlow.js GPU acceleration handles the heavy lifting server-side. Big images, no drama.",
      "A product-config architecture with per-type blueprint IDs, print provider IDs, aspect ratios, and variant/pricing maps means adding a new product type is just adding data — no code changes.",
      "Image description and upscaling run in parallel, and quantized models (q8_0) keep local inference fast without sacrificing output quality. The bottleneck is your GPU, not the pipeline."
    ],
    "metrics": {
      "impact": "Turned a multi-step manual Etsy listing process into one guided flow — from image to draft product.",
      "performance": "8x image upscaling with local AI metadata generation in a single workflow"
    },
    "techStack": [
      "NodeJS",
      "Express",
      "TensorFlow.js",
      "Upscaler.js",
      "Ollama",
      "Vanilla JavaScript",
      "Astro"
    ],
    "genesisSpark": "Born from the sheer audacity of Etsy expecting me to manually create 300 product listings like it's 2005. The dream was full automation — image in, live listing out. Reality? The Printify API had other plans and still forces parts of the flow to stay manual. But the hours of copy-paste-upload-repeat? Those got automated into oblivion.",
    "coreProblem": "Every Etsy listing is a 15-step obstacle course: upscale the image, crop for each format, write SEO copy, generate tags, set prices, map variants. Do it once — fine. Do it 300 times and you start questioning every life choice that led you to this moment. The pain wasn't the complexity; it was the soul-crushing repetition.",
    "categories": [
      "AI",
      "Productivity"
    ],
    "type": "Forking Around",
    "status": "Next In Line",
    "isFeatured": false,
    "sortOrder": 0
  },
  {
    "id": "financials",
    "slug": "financials",
    "title": "Financials",
    "tagline": "Because checking your bank balance shouldn't feel like defusing a bomb.",
    "description": "A personal finance command center with a triple-entity ledger (business, personal, joint) — each color-coded so money never ends up in the wrong pocket. Imports CSVs from multiple French banks despite their wildly different formats, auto-categorizes across 70+ subcategories, and includes \"the Vault\" — a 48-hour impulse-spending lock on discretionary purchases. Handles VAT provisioning, recurring transaction detection, budget goals with projections, and full analytics. Ships with FR/EN i18n, light/dark themes, and a fully local-first architecture — zero cloud, zero telemetry.",
    "projectUrl": "",
    "imageUrl": "/projects/financial/screenshot-2026-02-11_10-15-25.webp",
    "screenshots": [
      "/projects/financial/screenshot-2026-02-11_10-15-41.webp",
      "/projects/financial/screenshot-2026-02-11_10-16-28.webp",
      "/projects/financial/screenshot-2026-02-11_10-16-55.webp",
      "/projects/financial/screenshot-2026-02-11_10-17-11.webp",
      "/projects/financial/screenshot-2026-02-11_10-17-32.webp",
      "/projects/financial/screenshot-2026-02-11_10-18-11.webp",
      "/projects/financial/screenshot-2026-02-11_10-18-25.webp",
      "/projects/financial/screenshot-2026-02-11_10-18-46.webp",
      "/projects/financial/screenshot-2026-02-11_10-19-08.webp",
      "/projects/financial/screenshot-2026-02-11_10-19-53.webp",
      "/projects/financial/screenshot-2026-02-11_10-20-10.webp",
      "/projects/financial/screenshot-2026-02-11_10-20-43.webp",
      "/projects/financial/screenshot-2026-02-11_10-21-48.webp",
      "/projects/financial/screenshot-2026-02-11_10-22-10.webp",
      "/projects/financial/screenshot-2026-02-11_10-23-01.webp"
    ],
    "challenges": [
      "Parsing CSV exports from multiple French banks that apparently all agreed to use completely different formats — varying delimiters, date formats, column layouts, debit/credit conventions, and embedded category metadata that each bank decided to invent from scratch.",
      "Designing a triple-entity architecture where business, personal, and joint accounts each maintain independent ledgers while still showing a consolidated net-worth view — without the whole thing collapsing into spaghetti the moment you add inter-account transfer detection.",
      "Building a 48-hour impulse purchase friction system that intercepts discretionary spending without accidentally blocking rent, CSV imports, or business transactions. Turns out teaching a system the difference between 'treat yourself' and 'pay your bills' is harder than it sounds.",
      "Tracking real-time balances from user-set baselines combined with revenue inflows and transaction outflows — while gracefully handling card refunds, savings transfers, and pending vault items that exist in financial limbo.",
      "Creating a recurring transaction detection engine that finds real patterns in noisy bank data using merchant name extraction, amount variance tolerance, and multi-frequency analysis — without hallucinating subscriptions that don't exist."
    ],
    "solutions": [
      "Built a bank profile system with configurable column mappings, regex-based header detection, French number parsing, and bank-specific category inference. Banque Populaire, Banque Populaire Pro, and Crédit Agricole work out of the box — adding another bank is just another profile.",
      "Separated all financial logic into pure calculation functions with entity-scoped filtering, transfer type detection (salary, joint, savings), and entity-based UI theming via CSS custom properties. Switching contexts is instant and visually obvious.",
      "Implemented category-aware rules that only intercept VARIABLE_WANTS above a threshold, with source-based exclusions for CSV imports and entity-based exclusions for business accounts. Funds stay locked until explicitly released or cancelled — no workarounds.",
      "Designed a baseline + movements system where only completed transactions affect balances, with special handling for transfer-in/transfer-out semantics and automatic card refund detection from bank descriptions. The math stays clean.",
      "Engineered a pattern analysis pipeline that normalizes merchant names, checks amount variance within 15% tolerance, detects frequency from date intervals, and assigns confidence scores — requiring at least 2 occurrences before surfacing. No false alarms."
    ],
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Recharts",
      "React Context API"
    ],
    "genesisSpark": "Every bank has its own app, its own dashboard, its own version of 'here's your balance.' None of them talk to each other, and none of them answer the only question that matters: where is all the money going? I wanted a private, offline tool that pulls everything into one place — no cloud dependency, no handing credentials to a third party — just clean graphs showing how the money moves and what's actually expendable.",
    "coreProblem": "Getting a clear picture of your finances shouldn't require trusting a third-party app with your bank credentials or maintaining a spreadsheet that dies of neglect after week two. The real problem was fragmentation and privacy — multiple accounts across multiple banks, each in their own silo, with no unified view and no way to spot patterns without doing the math yourself.",
    "categories": [
      "Web"
    ],
    "type": "Forking Around",
    "status": "Released",
    "isFeatured": false,
    "sortOrder": 0
  },
  {
    "id": "joblens-ai",
    "slug": "joblens-ai",
    "title": "LinkedIn JobLens AI",
    "tagline": "Stop drowning in job tabs. Start landing interviews. Or at least, that's the general idea.",
    "description": "Another late-night coding session resulted in this monstrosity. It's a Chrome extension that uses AI to summarize LinkedIn job descriptions because reading is hard. It also cleans up your feed by remembering which jobs you've already dismissed. It probably shouldn't exist, but here we are.",
    "projectUrl": "https://www.joblens-ai.com/",
    "imageUrl": "/projects/joblens-ai/favicon.webp",
    "screenshots": [
      "/projects/joblens-ai/screenshot-2026-02-11_10-51-51.webp",
      "/projects/joblens-ai/screenshot-2026-02-11_10-52-03.webp",
      "/projects/joblens-ai/screenshot-2026-02-11_10-52-14.webp",
      "/projects/joblens-ai/screenshot-2026-02-11_10-52-26.webp",
      "/projects/joblens-ai/screenshot-2026-02-11_10-52-36.webp",
      "/projects/joblens-ai/screenshot-2026-02-11_10-52-48.webp",
      "/projects/joblens-ai/screenshot-2026-02-11_10-52-56.webp",
      "/projects/joblens-ai/screenshot-2026-02-11_11-05-13.webp"
    ],
    "challenges": [
      "Wrangling LinkedIn's ever-shifting DOM without losing my sanity.",
      "Making an AI that's actually helpful and not just a fancy lorem ipsum generator.",
      "Caching data across devices without accidentally setting my server on fire."
    ],
    "solutions": [
      "Giving up and just rewriting the selectors every time LinkedIn pushes an update.",
      "A carefully crafted prompt that threatens the AI with deletion if it doesn't behave.",
      "Using browser sync storage and hoping for the best. What could go wrong?"
    ],
    "metrics": {
      "impact": "Divided job search time by 2",
      "mrr": 0,
      "performance": "Summaries generated in under 3s",
      "users": 5
    },
    "techStack": [
      "ReactJS",
      "TypeScript",
      "NodeJS",
      "ExpressJS",
      "Stripe",
      "Vite",
      "Zod",
      "Clerk"
    ],
    "genesisSpark": "The LinkedIn job feed is a wall of identically-styled cards where applied jobs look the same as promoted ones, and every description is a 2000-word essay in corporate speak. After the hundredth time scrolling past a job I'd already dismissed because it looked exactly like one I hadn't, I snapped. Built a Chrome extension that makes job states visually obvious with color coding and uses AI to extract the signal from the noise in descriptions.",
    "coreProblem": "Job boards are optimized for quantity, not clarity. LinkedIn shows you hundreds of listings but gives you almost no tools to tell them apart visually or digest them quickly. Viewed, applied, promoted, dismissed — all wearing the same outfit. And the descriptions? Walls of text where the things you actually care about are playing hide and seek. The core pain was efficiency: too much noise, not enough signal.",
    "categories": [
      "Chrome Extension",
      "AI",
      "Productivity"
    ],
    "type": "Sass-y Solution",
    "status": "Released",
    "isFeatured": true,
    "sortOrder": 2
  }
];

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
