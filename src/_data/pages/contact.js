/**
 * CONTACT PAGE — LOCALE DATA
 * --------------------------
 * Same pattern as contract.js — see that file for the full explanation
 * of why config.json is separate from the per-language content files.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/contact.ar.json");
const contentEn = require("../copy/contact.en.json");
const config = require("../config.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/contact.html",
      altHref: "contact-en.html",
      navActive: "contact",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle,
      config: config
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/contact-en.html",
      altHref: "contact.html",
      navActive: "contact",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle,
      config: config
    }
  ]
};
