/**
 * RULES PAGE — LOCALE DATA
 * ------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/rules.ar.json");
const contentEn = require("../copy/rules.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/rules.html",
      altHref: "rules-en.html",
      navActive: "rules",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/rules-en.html",
      altHref: "rules.html",
      navActive: "rules",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
