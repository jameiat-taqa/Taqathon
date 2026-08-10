/**
 * SUBMISSIONS PAGE — LOCALE DATA
 * ------------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/submissions.ar.json");
const contentEn = require("../copy/submissions.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/submissions.html",
      altHref: "submissions-en.html",
      navActive: "submissions",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle,
      bodyClass: "bg-light text-dark"
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/submissions-en.html",
      altHref: "submissions.html",
      navActive: "submissions",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle,
      bodyClass: "bg-light text-dark"
    }
  ]
};
