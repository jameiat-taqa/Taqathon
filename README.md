# Taqathon — Energy Hackathon Website

A bilingual (English/Arabic) website for the Taqathon Energy Hackathon, built with Bootstrap 5. Features a modern, responsive design with RTL support for Arabic pages.

## 🌟 Features

- **Bilingual Support**: Complete English and Arabic versions of all pages
- **RTL Layout**: Proper right-to-left support for Arabic pages using Bootstrap RTL
- **Responsive Design**: Fully responsive across all device sizes
- **Dynamic Content**: 
  - Countdown timer for submission deadlines
  - Dynamic announcements loaded from JSON
  - Progressive image gallery with "Load More" functionality
- **Form Integration**: Contact and contract forms with Google Apps Script integration
- **Certificate Verification**: Standalone certificate verification system
- **Modern UI**: Clean design with gradient accents, smooth animations, and Bootstrap Icons

## 📁 Project Structure

As of the Eleventy migration (Phase 0 of the site overhaul), the 15
HTML pages you used to edit directly no longer exist as hand-written
files — they're generated at build time from shared templates plus
Arabic/English data files. If you're looking for where a piece of text
actually lives, it's almost always in `src/_data/`, not in a `.html`
file.

```
Taqathon/
├── eleventy.config.js          # Eleventy build configuration
├── package.json                 # npm scripts + the @11ty/eleventy dependency
├── src/
│   ├── _includes/
│   │   ├── layouts/base.njk     # Shared page shell (<head>, nav, footer, scripts)
│   │   └── partials/            # navbar.njk, footer.njk — reused by every page
│   ├── _data/
│   │   ├── site.ar.json         # Shared nav/footer/social text (Arabic)
│   │   ├── site.en.json         # Shared nav/footer/social text (English)
│   │   ├── config.json          # Site-wide config (Apps Script URLs, etc.)
│   │   ├── copy/                # Per-page, per-language content
│   │   │   ├── home.ar.json / home.en.json
│   │   │   ├── contract.ar.json / contract.en.json
│   │   │   └── ... one pair per page (see src/pages/ below)
│   │   └── pages/                # Wires each page's site+copy+config into
│   │       ├── home.js           # a "locales" list the pagination front
│   │       └── ...               # matter in src/pages/*.njk loops over
│   └── pages/
│       ├── home.njk              # → generates index.html AND index-en.html
│       ├── contract.njk          # → contract.html / contract-en.html
│       ├── schedule.njk, submissions.njk, rules.njk, gallery.njk, contact.njk
│       └── verify.njk            # → verify.html (standalone, no EN version)
├── _site/                        # Build OUTPUT — git-ignored, never hand-edited
├── announcements.json           # English announcements (unchanged — still
├── announcements-ar.json        # fetched client-side by the Home page's JS,
├── gallery.json                  # not templated by Eleventy)
├── assets/
│   ├── common.css               # Shared styles (navbar, footer, utilities)
│   ├── common.js                # Shared JavaScript (footer year update)
│   ├── logos/ / sponsors/ / icons/ / docs/ / gallery/ / images/
├── .github/workflows/deploy.yml # Builds with Eleventy + deploys to Pages on push to main
└── README.md
```

**Why one template can output two languages:** each page's `.njk`
file uses Eleventy's *pagination* feature over a small list built in
its matching `src/_data/pages/*.js` file — one list entry per language,
each with its own output filename. See the comments at the top of
`src/pages/home.njk` and `src/_data/pages/home.js` for the full
walkthrough; every other page follows the same pattern.

## 🚀 Quick Start

### Local Development

This is now a build step, not just "open the HTML file":

1. Clone this repository
2. Install dependencies: `npm install` (needs Node.js)
3. Build the site: `npx eleventy` — generates the 15 pages into `_site/`
4. Serve `_site/` with any static file server, e.g. `npx http-server _site`,
   and copy `assets/`, `announcements*.json`, and `gallery.json` into
   `_site/` first (the same step `.github/workflows/deploy.yml` does
   automatically in CI — see that file for the exact commands)
5. For live-reload while editing templates: `npx eleventy --serve`

### Deployment

#### GitHub Pages (current setup)

Deployment is automatic: `.github/workflows/deploy.yml` runs on every
push to `main`, builds the site with Eleventy, and publishes it via
GitHub's official Pages Actions. The repo's **Settings → Pages →
Build and deployment → Source** must be set to **"GitHub Actions"**
(not "Deploy from a branch") for this to work.

#### Other Hosting

Run `npx eleventy`, then upload the contents of `_site/` (plus
`assets/`, `announcements*.json`, `gallery.json` copied alongside it)
to any static host.

## 🎨 Customization

### Updating Announcements

Edit `announcements.json` (English) or `announcements-ar.json` (Arabic):

```json
[
  {
    "date": "2025-01-15",
    "type": "deadline",
    "text": "Submission deadline extended to January 20"
  },
  {
    "date": "2025-01-10",
    "type": "update",
    "text": "New workshop added to schedule"
  }
]
```

**Types**: `deadline`, `update`, `schedule`, `general`

### Adding Gallery Images

1. Add image files to `assets/gallery/` folder
2. Update `gallery.json` with the filenames:
   ```json
   ["image1.jpg", "image2.jpg", "image3.jpg"]
   ```
3. Images load in batches of 24 (configurable in gallery HTML files)

### Changing Countdown Deadline

Edit the `deadline` field in `src/_data/copy/home.ar.json` AND
`home.en.json` (both — they're independent data files, not derived
from each other):
```json
"countdown": { "deadline": "2025-12-31T23:59:59+03:00", ... }
```

### Updating Form URLs

Both the Contact and Contract forms' Google Apps Script endpoints are
centralized in one place now: `src/_data/config.json`.
```json
{
  "contractScriptUrl": "YOUR_GOOGLE_APPS_SCRIPT_URL",
  "contactScriptUrl": "YOUR_GOOGLE_APPS_SCRIPT_URL"
}
```
Change it once here — it's shared by both the Arabic and English
version of whichever page uses it, instead of needing to be updated in
two (or four) separate `<script>` blocks.

### Modifying Colors

Edit CSS variables in `assets/common.css`:
```css
:root {
  --brand-blue: #007DFD;
  --brand-green: #09C899;
  --brand-dark: #00284C;
  --text: #1d2733;
  --muted: #66768a;
}
```

### Adding Certificates

Edit the `CERTIFICATES` object directly in `src/pages/verify.njk`
(this one page's data intentionally wasn't extracted into a separate
data file — see the comment at the top of that template for why, and
note the security caveat documented there too: this data currently
ships to every visitor's browser, unencrypted, and that's a known,
separately-tracked issue, not something to casually add more real
personal data to without reading that note first):
```javascript
const CERTIFICATES = {
  "TAQ-2025-P-001": {
    arName: "الاسم بالعربية",
    enName: "Name in English",
    roleAr: "الدور",
    roleEn: "Role",
    type: "participant",
    eventAr: "طاقَثون الطاقة 2025",
    eventEn: "Taqathon 2025 – Energy Hackathon",
    issueDateAr: "5 ديسمبر 2025",
    issueDateEn: "5 December 2025",
    periodAr: "خلال الفترة من...",
    periodEn: "during the period..."
  }
};
```

## 🛠️ Technologies Used

- **Eleventy (11ty)**: Static site generator — turns the templates in
  `src/pages/` + data in `src/_data/` into the plain HTML GitHub Pages
  serves. No client-side framework; the build step only runs at
  build/deploy time, not in the visitor's browser.
- **Nunjucks**: The templating language used in `.njk` files
  (`{{ variable }}`, `{% for %}` loops, `{% extends %}` layouts).
- **GitHub Actions**: Runs the Eleventy build and deploys to Pages
  automatically on every push to `main` (`.github/workflows/deploy.yml`).
- **Bootstrap 5.3.3**: CSS framework (RTL version for Arabic)
- **Bootstrap Icons 1.11.3**: Icon library
- **Google Fonts**: Cairo (Arabic) and Poppins (English)
- **Vanilla JavaScript**: No client-side frameworks required
- **Google Apps Script**: Form submission handling

## 📝 File Organization

### Assets Structure

- **`assets/logos/`**: Organization logos (Taqathon, Association)
- **`assets/sponsors/`**: Sponsor and partner logos
- **`assets/icons/`**: SVG icons (currency symbols, etc.)
- **`assets/docs/`**: PDF documents (contracts, presentations)
- **`assets/gallery/`**: Gallery images (referenced in `gallery.json`)
- **`assets/images/`**: Other images (hero images, etc.)

### Shared Files

- **`assets/common.css`**: All shared styles (navbar, footer, utilities, variables)
- **`assets/common.js`**: Shared JavaScript (footer year update)

### Page-Specific Code

Each `src/pages/*.njk` template contains:
- Page-specific CSS in a `{% block pageStyle %}` (rendered into the
  shared layout's `<style>` tag)
- Page-specific JavaScript in a `{% block pageScript %}` (rendered
  into the shared layout's closing `<script>` tag)
- Comprehensive comments explaining both the page's own logic AND any
  Eleventy/Nunjucks-specific mechanics used (pagination, the extends/
  block system, data-driven loops) — written for someone learning this
  stack, not shorthand for someone who already knows it

## 📄 Pages Overview

| Page | Description |
|------|-------------|
| **Home** | Landing page with countdown, announcements, and about section |
| **Contract** | Participation agreement form with PDF upload |
| **Schedule** | Workshop schedule and key dates table |
| **Submissions** | Project submission forms and guidelines |
| **Rules** | Hackathon rules, criteria, and resources |
| **Contact** | Contact form and organization information |
| **Gallery** | Photo gallery with progressive loading |
| **Verify** | Certificate verification system |

## 🔧 Configuration

### Google Apps Script Setup

1. Create a new Google Apps Script project
2. Write a script to handle form submissions
3. Deploy as a Web App with "Anyone" access
4. Update the URLs in `src/_data/config.json` (one file, not per-page)

### Announcements

Announcements are loaded dynamically from JSON files. The system supports:
- Automatic sorting by date (newest first)
- Type-based icons and styling
- Localized date formatting

### Gallery

Gallery images are loaded progressively:
- Initial batch loads on page load
- "Load More" button loads additional batches
- Default batch size: 24 images (configurable)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Documentation

All code is thoroughly commented:
- File header comments explain each page's purpose
- JavaScript functions have JSDoc-style documentation
- CSS sections are organized with clear comments
- Configuration points are clearly marked

## 🤝 Contributing

This is a project-specific website. For modifications:
1. Follow the existing code structure
2. Maintain bilingual consistency
3. Test on both English and Arabic pages
4. Ensure RTL layout works correctly for Arabic

## 📄 License

This project is proprietary and created for the Energy Association for Sustainable Development.

## 📞 Support

For questions or issues, contact the development team or refer to the inline code comments for implementation details.

---

**Built with ❤️ for Taqathon 2025**
