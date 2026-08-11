/**
 * PAST SEASONS INDEX PAGE — LOCALE DATA
 * ---------------------------------------
 * Unlike years.js (which generates ONE page PER year), this is a
 * single fixed AR/EN page pair — same simple shape as home.js,
 * gallery.js, etc. — whose only job is to list links to whichever
 * year archives currently exist, using the same src/_lib/years.js
 * discovery helper so this list updates itself automatically as new
 * Year Archive pages get added, with zero code changes here.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/past-seasons.ar.json");
const contentEn = require("../copy/past-seasons.en.json");
const { discoverYears, loadYear } = require("../../_lib/years");

const years = discoverYears().map((year) => {
  const { ar, en } = loadYear(year);
  return { year, ar, en };
});

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/past-seasons.html",
      altHref: "past-seasons-en.html",
      navActive: "pastSeasons",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle,
      // {year, title, href} per discovered year, ready for a plain
      // {% for %} loop in past-seasons.njk — the template doesn't need
      // to know anything about how years were discovered or loaded.
      years: years.map(({ year, ar }) => ({
        year,
        title: ar.hero.heading,
        href: `years/${year}.html`
      }))
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/past-seasons-en.html",
      altHref: "past-seasons.html",
      navActive: "pastSeasons",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle,
      years: years.map(({ year, en }) => ({
        year,
        title: en.hero.heading,
        href: `years/${year}-en.html`
      }))
    }
  ]
};
