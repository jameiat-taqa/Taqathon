/**
 * HOME PAGE — LOCALE DATA
 * -----------------------
 * This file lives at src/_data/pages/home.js. Because of where it sits,
 * Eleventy automatically exposes whatever it exports as global data
 * under the name `pages.home` — that's why src/pages/home.njk can write
 * `pages.home.locales` without any extra setup. (The folder name
 * "pages" and the file name "home" both become part of that path.)
 *
 * WHY THIS FILE EXISTS (the core Phase 0 idea):
 * The old site had two separate hand-written files — index.html and
 * index-en.html — with nearly identical markup and only the text
 * swapped. That's exactly the duplication Eleventy is meant to remove.
 *
 * Instead, there is ONE template (home.njk) and TWO small JSON files
 * of content (one per language, in ../copy/). This file's job is just
 * to load those JSON files and package them into a single list called
 * "locales" — one entry per language — with everything the template
 * needs to render that language's version:
 *   - lang / dir      → for <html lang="ar" dir="rtl">
 *   - permalink       → where Eleventy should write the output file
 *   - altHref         → where that language's "switch language" link goes
 *   - navActive       → which navbar link gets the "active" highlight
 *   - site            → shared chrome text (navbar/footer/social links)
 *   - content         → this page's own text (hero, countdown, etc.)
 *
 * home.njk then loops over this "locales" array using Eleventy's
 * pagination feature (see the front matter at the top of home.njk) to
 * generate index.html AND index-en.html from the same template.
 */

// require() reads a JSON file and gives us back a normal JS object.
// site.*.json holds text that's shared across every page (once more
// pages are migrated) — navbar links, footer, social links.
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");

// copy/home.*.json holds text specific to the Home page only (hero
// heading, countdown labels, about-section copy, etc.). The folder is
// named "copy" instead of "content" on purpose — Eleventy reserves the
// word "content" internally (it's the variable a layout uses to receive
// the rendered page), so a global data folder literally named "content"
// would collide with that and make the build fail.
const contentAr = require("../copy/home.ar.json");
const contentEn = require("../copy/home.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/index.html",     // Arabic keeps the original bare filename
      altHref: "index-en.html",     // the "EN" button in the navbar links here
      navActive: "home",            // matches the {key: "home", ...} entry in site.ar.json's nav list
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/index-en.html",  // English keeps the existing "-en" suffix convention
      altHref: "index.html",        // the "AR" button in the navbar links here
      navActive: "home",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
