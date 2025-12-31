/* ===== TAQATHON SHARED JAVASCRIPT ===== */
/*
 * This file contains JavaScript code shared across all pages.
 * Page-specific scripts should be kept in individual HTML files' <script> blocks.
 */

/**
 * Updates the copyright year in the footer automatically.
 * Looks for an element with id="year" and sets it to the current year.
 * This ensures the copyright year stays current without manual updates.
 */
(function() {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
