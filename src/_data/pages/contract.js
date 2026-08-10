/**
 * CONTRACT PAGE — LOCALE DATA
 * ---------------------------
 * Same pattern as src/_data/pages/home.js (read that one first if this
 * is confusing) — this builds the "locales" list that contract.njk's
 * pagination front matter loops over to generate contract.html and
 * contract-en.html from one template.
 *
 * The one thing new here compared to home.js: this page also needs
 * `config.contractScriptUrl` (the Google Apps Script endpoint the form
 * POSTs to) — same URL for both languages, which is exactly why it
 * lives in config.json instead of being duplicated inside
 * contract.ar.json / contract.en.json.
 */
const siteAr = require("../site.ar.json");
const siteEn = require("../site.en.json");
const contentAr = require("../copy/contract.ar.json");
const contentEn = require("../copy/contract.en.json");
const config = require("../config.json");

module.exports = {
  locales: [
    {
      lang: "ar",
      dir: "rtl",
      permalink: "/contract.html",
      altHref: "contract-en.html",
      navActive: "contract",
      site: siteAr,
      content: contentAr,
      pageTitle: contentAr.pageTitle,
      config: config
    },
    {
      lang: "en",
      dir: "ltr",
      permalink: "/contract-en.html",
      altHref: "contract.html",
      navActive: "contract",
      site: siteEn,
      content: contentEn,
      pageTitle: contentEn.pageTitle,
      config: config
    }
  ]
};
