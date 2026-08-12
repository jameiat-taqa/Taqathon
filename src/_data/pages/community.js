/**
 * COMMUNITY PAGE — LOCALE DATA
 * ------------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/community.ar.json");
const contentEn = require("../copy/community.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/community.html",
      altHref: "community-en.html",
      navActive: "community",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/community-en.html",
      altHref: "community.html",
      navActive: "community",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
