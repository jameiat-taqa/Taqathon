/**
 * YEAR ARCHIVE DISCOVERY (shared helper)
 * ---------------------------------------
 * Lives in src/_lib/, NOT src/_data/ — Eleventy automatically turns
 * every .js file under _data/ into global data (that's how
 * pages/home.js etc. become available as "pages.home" in templates).
 * This file isn't data itself, it's a plain helper function that OTHER
 * _data files (pages/years.js, pages/past-seasons.js) require() — if it
 * lived under _data/ instead, Eleventy would ALSO try to expose it as
 * its own bit of global data, which isn't what it's for.
 *
 * WHAT THIS SOLVES:
 * Every other page type in this site is a fixed, known pair of files
 * (e.g. src/_data/copy/gallery.ar.json + gallery.en.json). Year
 * archives are different — new ones get added over time, one per
 * completed season, and nobody wants to hand-edit a page's JS file
 * every single year just to register the new one. So instead, this
 * scans a folder and figures out which years actually exist by
 * looking at what files are there — the exact same "discover entries
 * from a folder" idea as the gallery_items Decap collection (see
 * admin/config.yml), just read directly by Node instead of by Decap.
 */
const fs = require("fs");
const path = require("path");

const YEARS_DIR = path.join(__dirname, "..", "_data", "copy", "years");

/**
 * Returns an array of years (as strings, e.g. "2025") that have BOTH a
 * "<year>.ar.json" and a "<year>.en.json" file in src/_data/copy/years/,
 * newest first. A year missing either language's file is skipped
 * entirely — this site never publishes one language without the
 * other, and a half-finished year (someone started the Arabic archive
 * but hasn't written the English one yet) shouldn't go live as an
 * English 404 or a lopsided page pair.
 */
function discoverYears() {
  if (!fs.existsSync(YEARS_DIR)) return [];

  const files = fs.readdirSync(YEARS_DIR);
  const years = new Set();

  for (const file of files) {
    const match = file.match(/^(\d{4})\.(ar|en)\.json$/);
    if (match) years.add(match[1]);
  }

  return Array.from(years)
    .filter((year) => {
      const hasAr = files.includes(`${year}.ar.json`);
      const hasEn = files.includes(`${year}.en.json`);
      return hasAr && hasEn;
    })
    .sort((a, b) => Number(b) - Number(a)); // newest first
}

/**
 * Loads both language files for one year and returns their parsed
 * content alongside the year string, for convenience.
 */
function loadYear(year) {
  const ar = require(path.join(YEARS_DIR, `${year}.ar.json`));
  const en = require(path.join(YEARS_DIR, `${year}.en.json`));
  return { year, ar, en };
}

module.exports = { discoverYears, loadYear };
