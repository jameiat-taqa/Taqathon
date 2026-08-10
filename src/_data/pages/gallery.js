/**
 * GALLERY PAGE — LOCALE DATA
 * --------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/gallery.ar.json");
const contentEn = require("../copy/gallery.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/gallery.html",
      altHref: "gallery-en.html",
      navActive: "gallery",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/gallery-en.html",
      altHref: "gallery.html",
      navActive: "gallery",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
