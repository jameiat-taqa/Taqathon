/**
 * ELEVENTY CONFIGURATION
 * ----------------------
 * Eleventy (11ty) reads this file every time the site is built — either
 * locally via `npm run build` / `npx eleventy`, or automatically in
 * GitHub Actions on every push (see .github/workflows/deploy.yml).
 *
 * What Eleventy actually does, in plain terms:
 *   1. It looks inside the "input" folder (src/) for template files
 *      (.njk, .html) and data files (_data/).
 *   2. For each template, it fills in {{ placeholders }} using data from
 *      the _data folder, wraps it in a layout if one is specified, and
 *      writes the final plain HTML into the "output" folder (_site/).
 *   3. _site/ is git-ignored (see .gitignore) — it's regenerated fresh
 *      on every build, never hand-edited, never committed.
 *
 * This project does NOT use Eleventy to copy static files (images, CSS,
 * the JSON files the client fetches, or the other pages that haven't
 * been migrated yet). That copying happens as a separate step in the
 * GitHub Actions workflow instead, to keep this config focused on just
 * the templating piece while Phase 0 only covers the Home page.
 *
 * TO CUSTOMIZE:
 *   - If you add a reusable formatting helper (e.g. "format this date
 *     as DD/MM/YYYY"), register it here with eleventyConfig.addFilter().
 *   - If you later want Eleventy itself to copy static files instead of
 *     the GitHub Actions workflow doing it, add
 *     eleventyConfig.addPassthroughCopy("src/assets") style calls here.
 */
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",           // Eleventy looks for templates/data starting here
      output: "_site",        // generated HTML is written here (git-ignored)
      includes: "_includes",  // shared layouts + partials, relative to "input"
      data: "_data"           // global data files (site.*.json, etc.), relative to "input"
    },
    // Only treat these file extensions as templates to process.
    // (We don't have any Markdown/Liquid/etc. files, so no need to enable them.)
    templateFormats: ["njk", "html"],
    // Nunjucks ("njk") is the templating language this project uses for
    // {{ variable }} placeholders, {% for %} loops, {% if %} conditions,
    // and the {% extends %} / {% block %} layout-inheritance system.
    htmlTemplateEngine: "njk"
  };
};
