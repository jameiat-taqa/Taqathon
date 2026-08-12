/**
 * NEWSLETTER PAGE — LOCALE DATA
 * -------------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/newsletter.ar.json");
const contentEn = require("../copy/newsletter.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/newsletter.html",
      altHref: "newsletter-en.html",
      navActive: "newsletter",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/newsletter-en.html",
      altHref: "newsletter.html",
      navActive: "newsletter",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
