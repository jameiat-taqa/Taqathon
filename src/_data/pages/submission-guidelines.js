/**
 * SUBMISSION GUIDELINES PAGE — LOCALE DATA
 * -------------------------------------------
 * Same pattern as the other pages/*.js files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/submission-guidelines.ar.json");
const contentEn = require("../copy/submission-guidelines.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/submission-guidelines.html",
      altHref: "submission-guidelines-en.html",
      navActive: "submissionGuidelines",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/submission-guidelines-en.html",
      altHref: "submission-guidelines.html",
      navActive: "submissionGuidelines",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
