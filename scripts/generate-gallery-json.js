/**
 * GENERATE gallery.json FROM CMS ENTRY FILES
 * -------------------------------------------
 * The gallery page (src/pages/gallery.njk) fetches a plain JSON array of
 * image filenames at runtime, in the browser — it always has, even before
 * Decap CMS existed. What changed in Phase 0.5 is WHERE that array comes
 * from: instead of being a single hand-edited file committed to git, it's
 * now generated from a folder of tiny per-photo files that Decap CMS
 * reads and writes one at a time (src/_data/gallery-items/*.json, each
 * holding just one photo's path, e.g. {"image": "assets/gallery/x.jpg"}).
 *
 * Splitting one photo per file is what lets the CMS's "add a photo" /
 * "delete a photo" actions work as independent, single-file git commits
 * (via a folder collection) — Decap has no concept of "edit one item
 * inside a big shared array" the way a "files" collection could handle a
 * single shared object. See admin/config.yml's "gallery_items" collection.
 *
 * This script is NOT run by Eleventy itself (Eleventy only turns
 * templates into HTML, it doesn't write extra static files like this
 * one) — it's a separate step that runs right after the Eleventy build,
 * both locally (see package.json's "build" script) and in CI (see
 * .github/workflows/deploy.yml), so the output always reflects whatever
 * photos currently exist in src/_data/gallery-items/.
 *
 * Usage: node scripts/generate-gallery-json.js [output-path]
 *   output-path defaults to _site/gallery.json (where the built site
 *   expects to find it, matching gallery.njk's `fetch('gallery.json')`).
 */
const fs = require("fs");
const path = require("path");

const ITEMS_DIR = path.join(__dirname, "..", "src", "_data", "gallery-items");
const outPath = process.argv[2] || path.join(__dirname, "..", "_site", "gallery.json");

const entryFiles = fs.readdirSync(ITEMS_DIR).filter((f) => f.endsWith(".json"));

// Each entry file holds one photo's path (e.g. "assets/gallery/x.jpg").
// The gallery page only needs the bare filename — it builds the full
// "assets/gallery/<name>" path itself — so we strip the folder part here.
const filenames = entryFiles
  .map((f) => {
    const entry = JSON.parse(fs.readFileSync(path.join(ITEMS_DIR, f), "utf8"));
    return path.basename(entry.image);
  })
  .sort();

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(filenames, null, 2) + "\n");

console.log(`generate-gallery-json: wrote ${filenames.length} filenames to ${outPath}`);
