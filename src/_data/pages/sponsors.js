/**
 * SPONSORS PAGE — LOCALE DATA
 * ----------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/sponsors.ar.json");
const contentEn = require("../copy/sponsors.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/sponsors.html",
      altHref: "sponsors-en.html",
      navActive: "sponsors",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/sponsors-en.html",
      altHref: "sponsors.html",
      navActive: "sponsors",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
