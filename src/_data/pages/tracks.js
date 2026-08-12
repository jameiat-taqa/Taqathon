/**
 * TRACKS PAGE — LOCALE DATA
 * --------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/tracks.ar.json");
const contentEn = require("../copy/tracks.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/tracks.html",
      altHref: "tracks-en.html",
      navActive: "tracks",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/tracks-en.html",
      altHref: "tracks.html",
      navActive: "tracks",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
