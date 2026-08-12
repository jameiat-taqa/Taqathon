/**
 * ABOUT PAGE — LOCALE DATA
 * -------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/about.ar.json");
const contentEn = require("../copy/about.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/about.html",
      altHref: "about-en.html",
      navActive: "about",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/about-en.html",
      altHref: "about.html",
      navActive: "about",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
