/**
 * FAQ PAGE — LOCALE DATA
 * -----------------------
 * Same pattern as the other pages/*.js files (see rules.js — this
 * page reuses its exact accordion content shape and template).
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/faq.ar.json");
const contentEn = require("../copy/faq.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/faq.html",
      altHref: "faq-en.html",
      navActive: "faq",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/faq-en.html",
      altHref: "faq.html",
      navActive: "faq",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
