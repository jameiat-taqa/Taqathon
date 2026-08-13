# Taqathon — Project Log

A running, dated record of what's been done on this project and why. Newest entries at the top. This exists so the history lives in the repo itself, not only in a chat transcript — anyone (human or AI) picking this project up cold should be able to read this and understand the current state and how it got here.

**Convention going forward:** after every meaningful checkpoint (a PR opened or merged, a phase completed, a real bug found and fixed, a significant decision made), add a short dated bullet entry here — what changed, why (if not obvious), what's still open. Committed in the same PR as the work it describes.

---

## 2026-08-12 — Added Cursor project rules for shared Claude Code / Cursor workflow

- Decided to split work between Claude Code and Cursor by task type (Cursor for quick inline edits, Claude Code for multi-file features and the git/PR/deploy workflow) rather than a one-time handoff between the two.
- Added `.cursor/rules/taqathon-conventions.mdc` (loads automatically in every Cursor session) covering: read PROGRESS.md first, the branch → PR → explicit-merge-approval workflow, the thorough-comments preference, AR/EN parity discipline, the Netlify OAuth dead end + other Decap CMS gotchas (folder collection `extension`/`format`, `media_folder` size limit, `editorial_workflow` + `local_backend` incompatibility), which pages are still placeholder-only, and the deferred `verify.njk` security fix — so either tool picks up consistent with the other.
- **Open:** no code changes, just shared context. Rest of Phase 3 still not started.
- PR [#16](https://github.com/jameiat-taqa/Taqathon/pull/16), → `dev` → `main`.

## 2026-08-12 — Phase 3 started: nav restructured into grouped dropdowns, About page added

- The navbar had grown to 16 flat items after Phase 2 (unusable on mobile). Restructured per explicit user spec into: **Home · About ▾** (About, Tracks, Judges & Mentors, Sponsors, Past Seasons, FAQ) **· Participants ▾** (Contract, Schedule & Workshops, Submissions, Submission Guidelines, Rules & Resources) **· Community ▾** (Gallery, Community, Newsletter) **· Contact Us · Register** (standalone highlighted button, not in a dropdown).
- `site.ar.json`/`site.en.json`'s `nav` array gained a `type` field (`link` / `dropdown` / `button`) instead of being a flat list; `navbar.njk` branches on it using plain Bootstrap dropdowns — no new JS needed.
- Added the **About** page (`about.njk`) since the "About" dropdown needed a real destination, not just a menu label. Association overview first, then Taqathon's own story/mission below it, per instruction. **All body text is draft placeholder** — the "Official Status" sub-section is flagged with extra care in the copy files' own comments: that specifically has to come from the Association, never invented.
- Verified extensively: dropdowns work on desktop and in the mobile collapsed menu, active-state highlights correctly at both the group and item level (landing on Tracks highlights the "About" toggle too), RTL renders correctly, and the `pathPrefix` mechanism (see 2026-08-11 entry) correctly applies to every nested dropdown link.
- **Open:** rest of Phase 3 not started — visual system (colors/typography/spacing), icons, illustration, dark mode, site search (Pagefind), accessibility/mobile-first pass.
- PR [#14](https://github.com/jameiat-taqa/Taqathon/pull/14), merged → `dev` → `main`, live.

## 2026-08-12 — Remaining 7 Phase 2 pages built at once, all placeholder content

- Per explicit instruction ("do all at once, just put placeholders"): FAQ, Tracks, Sponsors, Judges/Mentors, Submission Guidelines, Community, Newsletter.
- Tracks' 3 placeholder track names are deliberately identical to Registration's placeholder tracks (same underlying data, kept in sync) — **update both together** once the real tracks file arrives.
- **Submission Guidelines is an interpretation call, not just placeholder text.** The original plan's "Structured Submissions" page risked duplicating either the existing Submissions page (upload links) or Rules & Resources (real, detailed submission rules), so it was built as a short checklist + links to both instead of a third page repeating either. If that reading turns out to be wrong, the whole approach may need to change, not just the wording.
- Nav ballooned to 16 items as a direct result — flagged, not fixed here (see next day's entry, where it got fixed).
- PR [#13](https://github.com/jameiat-taqa/Taqathon/pull/13), merged → `dev` → `main`, live.

## 2026-08-12 — Registration page added, placeholder tracks

- User's own idea: "unify it all like the Submissions page" — link-out cards to real external Google Forms (one per track), not a custom-built form. Same UI pattern Submissions already used.
- Team registration = one submission per team, one card per track (confirmed with user before building).
- **3 placeholder tracks, `href="#"` links** — user: "put placeholders, I'll send more detailed file as soon as I receive it." Flagged via a visible on-page warning banner plus code comments, not just buried in a data file, so this can't be mistaken for finished content.
- The registration **deadline shown is real** (Sept 28, 2026 — matches the Home page countdown from the day before).
- PR [#12](https://github.com/jameiat-taqa/Taqathon/pull/12), merged → `dev` → `main`, live.

## 2026-08-11 — Phase 2 kickoff: Year Archive system + "important" announcement flag

- User restructured the original Phase 2 plan mid-session: dropped **Team Formation** entirely; merged the planned standalone **Winners** and **Project Showcase** pages into a new **Year Archive** page type (one page per completed season, e.g. `/years/2025.html`, built together in a dev session when a season ends — not self-serve via the CMS) **+ a Past Seasons index page**.
- `src/_lib/years.js` discovers year-archive files by scanning `src/_data/copy/years/` and only publishes a year once **both** its `.ar.json` and `.en.json` exist — matches the site-wide AR/EN parity discipline.
- Backfilled a **real Taqathon 2025 archive** using only verified existing data: the final ranked-winners announcement text and the closing-ceremony date/time/location already in `schedule.*.json` — no invented content. Confirmed with user before using this data.
- Once that captured the only real signal worth keeping, **cleared the live `announcements.json`/`announcements-ar.json` to `[]`** (user's explicit go-ahead) so Taqathon 2026's feed starts fresh instead of showing stale 2025 items.
- Added an `important` checkbox (unchecked by default) to the Decap CMS's Announcements collections, and `years_en`/`years_ar` folder collections (`create: false` — editing existing years only; building a *new* year's archive is a dev-session task, not self-serve).
- **Real bug found and fixed:** Year Archive is the first page ever nested in a subdirectory (`/years/`) — every other page lives flat at the root. This broke every relative asset/nav link on that page (resolved against `/years/` instead of site root). Fixed with `locale.pathPrefix`, empty by default via Nunjucks' `default` filter (zero changes needed to any existing page's data file), set to `"../"` only for year-archive pages.
- **Open at this point:** the other 8 original Phase 2 pages (Registration, FAQ, Tracks, Sponsors, Judges/Mentors, Structured Submissions, Communication, Newsletter) not yet built.
- PR [#11](https://github.com/jameiat-taqa/Taqathon/pull/11), merged → `dev` → `main`, live.

## 2026-08-11 — Phase 1: real countdown date + gallery compressed 92%

- Countdown was frozen at Taqathon 2025's already-past submission deadline (2025-11-22). Updated to Taqathon 2026's real registration deadline: **Sept 28, 2026, 23:59:59 Riyadh time** (exact time wasn't given by the user, end-of-day assumed and flagged in a code comment for correction if a precise time surfaces).
- Gallery: all 224 photos resized (max width 1600px) and re-encoded (JPEG quality 78, mozjpeg). **478MB → 39MB (92% smaller)**, visually verified against originals at full size — the real saving was re-encoding, since the originals were saved at near-lossless quality for their resolution.
- **Explicit scope boundary, confirmed with user:** this only replaces the files going forward — it does **not** rewrite git history, so the repo's actual `.git` size is still bloated from the old blobs. A `git filter-repo` pass to reclaim that is a separate, deliberately-not-bundled decision for later.
- Certificate-verification security fix (the plain-JS array in `verify.njk` that ships every judge's real data to anyone viewing page source) was discussed and **explicitly deferred to LAST, after all other phases** — not forgotten, just intentionally last in the queue.
- PR [#10](https://github.com/jameiat-taqa/Taqathon/pull/10), merged → `dev` → `main`, live.

## 2026-08-11 — Decap CMS OAuth: Netlify dead end found and replaced with a Cloudflare Worker

- The original Phase 0.5 plan (see 2026-08-10 entry) pointed the CMS's OAuth `base_url` at a blank placeholder Netlify site, on the documented-sounding assumption that Netlify's OAuth-provider feature works for any site in a Netlify account.
- **It doesn't.** That feature only works for sites Netlify is actually building and deploying — a blank placeholder 404s. Confirmed by hitting the site's `/auth` endpoint directly (no login needed) and getting Netlify's own generic 404 page, before the request ever reached GitHub. This cost a full round of "it's still broken" with the user before the real cause was found.
- Replaced entirely with **`cloudflare-worker/decap-oauth-worker.js`** — a small, self-hosted OAuth proxy on Cloudflare Workers' free tier. The token-exchange and `postMessage` handoff logic was built against a verified working reference implementation (not guessed), since that handshake is easy to get subtly wrong.
- **Real gotcha hit during setup:** adding the `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET` secrets via Cloudflare's dashboard did not take effect on the already-deployed Worker until clicking **Deploy** again. Worth remembering if these secrets are ever rotated.
- User confirmed login works end-to-end after this fix.
- PRs [#8](https://github.com/jameiat-taqa/Taqathon/pull/8) (the failed Netlify base_url attempt) and [#9](https://github.com/jameiat-taqa/Taqathon/pull/9) (the working Cloudflare Worker replacement), both merged directly to `main` given the live-site urgency, then reconciled back into `dev`.

## 2026-08-10 — Phase 0.5: Decap CMS added (announcements, schedule, gallery photos)

- Added a CMS at `/admin/` so non-technical organizers can edit content through a web form: **Announcements** (AR+EN), **Schedule**'s Workshops/Key Dates tables (AR+EN), **Gallery photos** (add/remove).
- Auth: GitHub backend, access = repo collaborators (no separate CMS user system). Saves go through `editorial_workflow` — opens a draft PR for review rather than committing straight to `main`.
- **Real structural change required:** Decap's "files" collection type can only read/write a named field inside an object, not a bare top-level array — so `announcements.json`/`announcements-ar.json` were restructured from `[...]` to `{"announcements": [...]}`, with a matching one-line fix to `home.njk`'s fetch code.
- **`gallery.json` became a generated build artifact**, not a hand-edited file — `scripts/generate-gallery-json.js` builds it from `src/_data/gallery-items/` (one tiny JSON file per photo), so the CMS can add/remove a single photo as one clean git commit instead of editing one shared 224-item array.
- Fixed along the way: a missing `extension`/`format` declaration silently made the Gallery collection show zero entries (Decap defaults folder collections to Markdown otherwise, not an error, just an empty list); the default `media_folder` initially pointed at the 478MB gallery folder, which crashed the editor for *every* collection, not just photos (fixed by pointing the top-level default elsewhere and letting only the Gallery collection use the large folder).
- **Open at this point:** OAuth login didn't actually work yet — see the next day's entry for how that got resolved.
- PR [#7](https://github.com/jameiat-taqa/Taqathon/pull/7), merged → `dev`, later folded into `main` alongside the OAuth fix.

## 2026-08-09 to 2026-08-10 — Phase 0: migrated to Eleventy, all 15 static pages → 8 templated page types

- The site used to be 15 hand-duplicated static HTML files (one per page, per language) — editing anything meant finding and fixing it in two nearly-identical files, and they'd already drifted apart in places (missing `aria-label`s, inconsistent classes) purely from human copy-paste error.
- Migrated to **Eleventy + Nunjucks**: one template per page type, Arabic/English content split into JSON data files, built by GitHub Actions into the same flat static HTML GitHub Pages already served (zero URL/SEO breakage). The AR/EN split uses Eleventy's *pagination-over-a-data-array* feature — one template, two output files.
- Done deliberately incrementally, proven on Home first (PR [#3](https://github.com/jameiat-taqa/Taqathon/pull/3)), verified byte-for-byte equivalent to the live site before touching anything else, **then** the remaining 7 page types (Contract [#4](https://github.com/jameiat-taqa/Taqathon/pull/4), then Schedule/Submissions/Rules/Gallery/Contact/Verify together [#5](https://github.com/jameiat-taqa/Taqathon/pull/5)) once the pattern was trusted.
- Real bugs caught and fixed during migration (not introduced by it — found by diffing normalized output against the live pages): a hardcoded `fw-bold` instead of the data-driven `headingClass` on Schedule; a completely missing `<body class="bg-light text-dark">` on Submissions; a misplaced-parenthesis logic bug in the original Contact-EN JS; HTML-entity-escaping corrupting literal text inside `<script>`/`<style>` blocks (Nunjucks auto-escapes `{{ }}` by default, fixed globally via the `| safe` filter with explanatory comments).
- All 15 old static HTML files deleted once the new pipeline was confirmed working in production; GitHub Pages switched from "deploy from branch" to "GitHub Actions" as the build source.
- **Follow-up fix, same window:** the Arabic Contact form was behind the English one in features and used a different, less tolerant success/failure check against the same backend. Unified both to one shared handler (PR [#6](https://github.com/jameiat-taqa/Taqathon/pull/6)).
- **Open at this point:** no CMS yet (all content still required a git commit to change) — addressed the next day, see above.

## Before this project's Eleventy era (2025-11-13 → 2025-12-31)

- The original hand-written static site (15 HTML files, Bootstrap 5, AR/EN pairs maintained by hand) was built and run through Taqathon 2025's actual season — contract signing, schedule, submissions, rules, gallery, contact, and certificate verification all existed and worked, just without any build tooling or CMS. This history is preserved in git but predates this log.
