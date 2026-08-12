/**
 * REGISTRATION PAGE — LOCALE DATA
 * --------------------------------
 * Same pattern as the other pages/*.js files (see submissions.js for
 * the closest analog — this page reuses its exact card+copy-link UI,
 * just for "register your team for a track" instead of "submit your
 * project").
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/registration.ar.json");
const contentEn = require("../copy/registration.en.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/registration.html",
      altHref: "registration-en.html",
      navActive: "registration",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/registration-en.html",
      altHref: "registration.html",
      navActive: "registration",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle
    }
  ]
};
