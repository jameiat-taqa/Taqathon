/**
 * SCHEDULE PAGE — LOCALE DATA
 * ---------------------------
 * Same pattern as home.js / contract.js. See home.js for the full
 * explanation of why this file exists and how pagination uses it.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/schedule.ar.json");
const contentEn = require("../copy/schedule.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/schedule.html",
      altHref: "schedule-en.html",
      navActive: "schedule",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/schedule-en.html",
      altHref: "schedule.html",
      navActive: "schedule",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
