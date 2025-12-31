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

```
Taqathon/
├── index.html              # Arabic home page
├── index-en.html           # English home page
├── contract.html           # Arabic participation agreement
├── contract-en.html        # English participation agreement
├── schedule.html           # Arabic schedule & workshops
├── schedule-en.html        # English schedule & workshops
├── submissions.html        # Arabic submissions page
├── submissions-en.html     # English submissions page
├── rules.html              # Arabic rules & resources
├── rules-en.html           # English rules & resources
├── contact.html            # Arabic contact page
├── contact-en.html         # English contact page
├── gallery.html            # Arabic photo gallery
├── gallery-en.html         # English photo gallery
├── verify.html             # Certificate verification page
├── announcements.json      # English announcements data
├── announcements-ar.json   # Arabic announcements data
├── gallery.json            # Gallery image filenames
├── assets/
│   ├── common.css          # Shared styles (navbar, footer, utilities)
│   ├── common.js           # Shared JavaScript (footer year update)
│   ├── logos/              # Organization logos
│   ├── sponsors/           # Sponsor logos
│   ├── icons/              # SVG icons
│   ├── docs/               # PDF documents
│   ├── gallery/            # Gallery images
│   └── images/             # Other images
└── README.md
```

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open any HTML file in a web browser
3. For full functionality, serve via a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```
4. Navigate to `http://localhost:8000`

### Deployment

#### GitHub Pages

1. Create a repository on GitHub
2. Upload all files to the repository
3. Go to **Settings** → **Pages**
4. Under **Source**, select:
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
5. Your site will be available at `https://<username>.github.io/<repository-name>/`

#### Other Hosting

Upload all files to any static web hosting service (Netlify, Vercel, etc.). No build process required.

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

In `index.html` or `index-en.html`, find the countdown section and update:
```html
<div id="deadline" data-deadline="2025-12-31T23:59:59">
```

### Updating Form URLs

#### Contact Form
Edit `CONTACT_SCRIPT_URL` in `contact.html` or `contact-en.html`:
```javascript
const CONTACT_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
```

#### Contract Form
Edit `SCRIPT_URL` in `contract.html` or `contract-en.html`:
```javascript
var SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
```

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

Edit the `CERTIFICATES` object in `verify.html`:
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

- **Bootstrap 5.3.3**: CSS framework (RTL version for Arabic)
- **Bootstrap Icons 1.11.3**: Icon library
- **Google Fonts**: Cairo (Arabic) and Poppins (English)
- **Vanilla JavaScript**: No frameworks required
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

Each HTML file contains:
- Page-specific CSS in `<style>` tags
- Page-specific JavaScript in `<script>` tags
- Comprehensive comments explaining functionality

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
4. Update the script URLs in the HTML files

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
