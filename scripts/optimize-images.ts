import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");
const PUBLIC_DIR = path.join(ROOT, "public");
const PROJECTS_DIR = path.join(PUBLIC_DIR, "projects");

const SOURCE_ICON = path.join(APP_DIR, "icon.png");
const APPLE_ICON = path.join(APP_DIR, "apple-icon.png");
const FAVICON_32 = path.join(PUBLIC_DIR, "favicon-32.png");
const OG_IMAGE = path.join(PUBLIC_DIR, "og.png");

const WEBP_QUALITY = 78;
const MAX_IMAGE_WIDTH = 1600;

async function ensureDir(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function listFilesRecursive(dirPath: string): Promise<string[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) return listFilesRecursive(fullPath);
      return [fullPath];
    }),
  );
  return files.flat();
}

function isRasterImage(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  return [".png", ".jpg", ".jpeg", ".webp", ".avif"].includes(ext);
}

function getWebpPath(inputPath: string) {
  const ext = path.extname(inputPath);
  return ext.toLowerCase() === ".webp"
    ? inputPath
    : inputPath.slice(0, -ext.length) + ".webp";
}

async function optimizeIcons() {
  const iconBuffer = await fs.readFile(SOURCE_ICON);

  await sharp(iconBuffer)
    .resize(512, 512, { fit: "cover" })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(SOURCE_ICON);

  await sharp(iconBuffer)
    .resize(180, 180, { fit: "cover" })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(APPLE_ICON);

  await ensureDir(FAVICON_32);
  await sharp(iconBuffer)
    .resize(32, 32, { fit: "cover" })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(FAVICON_32);

  const ogBackground = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617" />
          <stop offset="50%" stop-color="#111827" />
          <stop offset="100%" stop-color="#1e1b4b" />
        </linearGradient>
        <linearGradient id="title" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22d3ee" />
          <stop offset="50%" stop-color="#c084fc" />
          <stop offset="100%" stop-color="#f97316" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)" />
      <text x="360" y="280" fill="url(#title)" font-size="78" font-family="Inter,Arial,sans-serif" font-weight="700">Doozy Labs</text>
      <text x="360" y="360" fill="#d1d5db" font-size="34" font-family="Inter,Arial,sans-serif">Micro-SaaS experiments and shipped chaos</text>
    </svg>`,
  );

  const ogIcon = await sharp(iconBuffer)
    .resize(220, 220, { fit: "contain", background: "#00000000" })
    .png()
    .toBuffer();

  await ensureDir(OG_IMAGE);
  await sharp(ogBackground)
    .composite([{ input: ogIcon, left: 96, top: 205 }])
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(OG_IMAGE);
}

async function optimizeProjectImages() {
  const allFiles = await listFilesRecursive(PROJECTS_DIR);
  const imageFiles = allFiles.filter(isRasterImage);

  let converted = 0;
  for (const imageFile of imageFiles) {
    const webpPath = getWebpPath(imageFile);
    await ensureDir(webpPath);

    const optimized = await sharp(imageFile)
      .rotate()
      .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 5 })
      .toBuffer();

    await fs.writeFile(webpPath, optimized);
    converted += 1;
  }

  return { scanned: imageFiles.length, converted };
}

async function main() {
  await optimizeIcons();
  const projectStats = await optimizeProjectImages();

  console.log("Image optimization complete.");
  console.log(
    `Project images processed: ${projectStats.converted}/${projectStats.scanned}`,
  );
}

main().catch((error) => {
  console.error("Failed to optimize images.");
  console.error(error);
  process.exitCode = 1;
});
