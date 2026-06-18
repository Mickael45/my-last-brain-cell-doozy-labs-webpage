/**
 * Per-project Open Graph image generator (SEO-HANDOFF §5).
 *
 * Why this exists: the interim OG setup pointed `og:image` at each project's
 * raw `.webp` screenshot. WebP is NOT rendered by LinkedIn / Facebook link
 * previews, and the screenshots aren't 1200×630 — so social cards were broken
 * or badly cropped. This emits a branded 1200×630 **PNG** per project
 * (title + tagline + status + screenshot thumbnail) into `public/og/<slug>.png`.
 *
 * Output is committed and served statically, so `astro build` stays pure-static
 * and offline (no build-time network dependency). Re-run after editing project
 * data:  bun run gen:og
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import sharp from "sharp";
import { getProjects } from "../data/projects";
import type { Project } from "../types";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const CACHE = path.join(ROOT, "scripts/.cache");
const OUT = path.join(ROOT, "public/og");
const PUBLIC = path.join(ROOT, "public");

const FONTS = {
  regular: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff",
  bold: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff",
};

/** Download a font once and cache it locally so repeat runs are offline. */
async function loadFont(url: string, file: string): Promise<Buffer> {
  const cached = path.join(CACHE, file);
  try {
    return await fs.readFile(cached);
  } catch {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Font download failed (${res.status}): ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(CACHE, { recursive: true });
    await fs.writeFile(cached, buf);
    return buf;
  }
}

/** Decode a local `/projects/...` screenshot into a PNG data URI for satori. */
async function screenshotDataUri(imageUrl: string): Promise<string | null> {
  if (!imageUrl || !imageUrl.startsWith("/")) return null;
  const abs = path.join(PUBLIC, imageUrl.replace(/^\//, ""));
  try {
    const png = await sharp(abs)
      .resize(560, 520, { fit: "cover", position: "top" })
      .png()
      .toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    return null; // missing/unreadable image → text-only card
  }
}

const clamp = (s: string, n: number) =>
  s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;

function titleSize(title: string): number {
  if (title.length > 24) return 52;
  if (title.length > 15) return 62;
  return 74;
}

/** Build the satori element tree (plain objects — no JSX needed in a .ts script). */
function card(project: Project, shot: string | null) {
  const accent = "linear-gradient(90deg,#22d3ee 0%,#ec4899 50%,#f97316 100%)";
  const left = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingRight: shot ? 44 : 0,
      },
      children: [
        // Wordmark
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", marginBottom: 28 },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    marginRight: 14,
                    backgroundImage: accent,
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: { fontSize: 26, fontWeight: 700, color: "#e2e8f0", letterSpacing: -0.5 },
                  children: "Doozy Labs",
                },
              },
            ],
          },
        },
        // Title
        {
          type: "div",
          props: {
            style: {
              fontSize: titleSize(project.title),
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#f8fafc",
            },
            children: project.title,
          },
        },
        // Tagline
        {
          type: "div",
          props: {
            style: {
              fontSize: 28,
              color: "#94a3b8",
              lineHeight: 1.3,
              marginTop: 22,
            },
            children: clamp(project.tagline, 130),
          },
        },
        // Status chip
        {
          type: "div",
          props: {
            style: { display: "flex", marginTop: 34 },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#0b1020",
                    backgroundImage: accent,
                    padding: "10px 22px",
                    borderRadius: 999,
                  },
                  children: project.status,
                },
              },
            ],
          },
        },
      ],
    },
  };

  const right = shot && {
    type: "div",
    props: {
      style: {
        display: "flex",
        width: 560,
        height: 520,
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(148,163,184,0.25)",
      },
      children: [
        {
          type: "img",
          props: { src: shot, width: 560, height: 520, style: { objectFit: "cover" } },
        },
      ],
    },
  };

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#0b1020",
        backgroundImage:
          "radial-gradient(1000px 500px at 85% -10%, rgba(236,72,153,0.18), transparent), radial-gradient(900px 500px at 0% 120%, rgba(34,211,238,0.16), transparent)",
        fontFamily: "Inter",
      },
      children: [
        // Top accent bar
        { type: "div", props: { style: { display: "flex", height: 14, width: "100%", backgroundImage: accent } } },
        // Body
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              padding: "0 72px",
            },
            children: [left, ...(right ? [right] : [])],
          },
        },
      ],
    },
  };
}

async function main() {
  const [regular, bold] = await Promise.all([
    loadFont(FONTS.regular, "Inter-400.woff"),
    loadFont(FONTS.bold, "Inter-700.woff"),
  ]);
  const fonts = [
    { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
  ];

  await fs.mkdir(OUT, { recursive: true });
  const projects = getProjects();

  for (const project of projects) {
    const shot = await screenshotDataUri(project.imageUrl);
    const svg = await satori(card(project, shot) as never, { width: 1200, height: 630, fonts });
    const out = path.join(OUT, `${project.slug}.png`);
    await sharp(Buffer.from(svg)).png().toFile(out);
    console.log(`  ✓ ${project.slug}.png${shot ? "" : "  (text-only — no screenshot)"}`);
  }
  console.log(`\nGenerated ${projects.length} OG images → public/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
