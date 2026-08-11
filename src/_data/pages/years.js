/**
 * YEAR ARCHIVE PAGES — LOCALE DATA
 * ---------------------------------
 * Same pagination-over-a-"locales"-array pattern as every other
 * src/_data/pages/*.js file (see home.js/gallery.js for the simplest
 * examples) — except every other page produces exactly ONE AR/EN pair,
 * while this one produces a PAIR PER YEAR, however many years exist.
 * src/_lib/years.js does the actual "which years exist" discovery;
 * this file just turns that list into the same locale-object shape
 * src/pages/years.njk's pagination front matter expects.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const { discoverYears, loadYear } = require("../../_lib/years");

const locales = [];

for (const year of discoverYears()) {
  const { ar, en } = loadYear(year);

  locales.push({
    lang: "ar",
    dir: "rtl",
    permalink: `/years/${year}.html`,
    altHref: `${year}-en.html`,
    navActive: "pastSeasons",
    // This page lives one directory below the site root (years/), so
    // every relative link/asset the shared layout+navbar render needs
    // an extra "go up one" — see layouts/base.njk's header comment.
    pathPrefix: "../",
    site: siteAr,
    content: ar,
    pageTitle: ar.pageTitle
  });

  locales.push({
    lang: "en",
    dir: "ltr",
    permalink: `/years/${year}-en.html`,
    altHref: `${year}.html`,
    navActive: "pastSeasons",
    pathPrefix: "../",
    site: siteEn,
    content: en,
    pageTitle: en.pageTitle
  });
}

module.exports = { locales };
