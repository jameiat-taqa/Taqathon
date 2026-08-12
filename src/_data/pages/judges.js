/**
 * JUDGES/MENTORS PAGE — LOCALE DATA
 * -----------------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/judges.ar.json");
const contentEn = require("../copy/judges.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/judges.html",
      altHref: "judges-en.html",
      navActive: "judges",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/judges-en.html",
      altHref: "judges.html",
      navActive: "judges",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
