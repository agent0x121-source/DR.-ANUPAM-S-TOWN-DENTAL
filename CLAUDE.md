# Dr. Patil's Dental Care — project notes

Website for **Dr. Patil's Dental Care (Dr. Vishwas Patil)**, a dental clinic in Pimpri Colony,
Pimpri-Chinchwad, Pune. Built from an in-house de-branded Webflow-derived template; every design
token, image and animation is inherited unchanged from that base — **only content was rebranded**.

> **Separate project.** This repo is an independent copy. The earlier client site
> (`dental-clinica-rouge.vercel.app`) is a different codebase and must never be touched from here.

## Clinic facts (source: Google Business Profile)
- Profile: https://maps.google.com/?cid=1481562831782819169 — 4.9★, 260 reviews
- Address: Office No. 6, B-Wing, First Floor, Above Punjab National Bank, Kamla Cross Road,
  Opp. PCMC Building, Pimpri Colony, Pune 411018 (Plus code JRH3+5H)
- Phone / WhatsApp: **+91 91460 29424** (`919146029424`)
- Email: `hello@drpatilsdentalcare.com` (placeholder — confirm with client)
- Hours: **Mon–Sat 10:30–14:30 and 17:00–21:00; Sunday closed**

## Structure
- `index.html` — home; `about.html`, `service.html`, `blog.html`, `booking.html`
- `privacy/terms/cookies/licenses/404.html` — hand-built legal pages
- `admin/` — clinic management panel (dashboard, appointments, patients, doctors, revenue, settings)
- `assets/css/lumora.css` — the design system (filename kept; do not rename, all `url()`s depend on it)
- `assets/js/` — jQuery + Webflow IX2 runtime + GSAP/ScrollTrigger/SplitText. **Do not delete.**
  - `lumora-db.js` — the seed database (clinic, doctors, services, appointments) + auth
  - `booking-data.js` / `booking.js` — booking flow (booking-data.js overrides the lumora-db bridge)
  - `website-sync.js` — pushes admin edits onto the public pages
- `assets/img/` — all photos plus brand assets (`lumora-logo.svg`, `lumora-logo-dark.svg`, `favicon.svg`)
- `variant-blue/` — full copy recoloured teal → blue; it has **no** `lumora-db.js` and keeps its own
  `CLINIC` constant inside `booking-data.js`, so clinic data must be edited in both places
- `.bak/` — original template exports, reference only

## Hard invariants
- **Never change design, colours, fonts, spacing, images or animations.** Content only.
- Brand apostrophe is the typographic `’` (U+2019), never `'` — the ASCII one breaks the many
  single-quoted JS strings that hold the brand name.
- Do not reintroduce `filter: blur(...)` in reveals — it leaves images permanently blurred.
- Keep the "Lumora reveal engine v2" script and the image-guard script before `</body>` on every page.

## Opening-hours model
`hours[day]` / `doctor.schedule[day]` support an optional `brk: { start, end }`. The slot generators
in both `lumora-db.js` (`getAvailability`) and `booking-data.js` (`windowFor` + its loop) skip any
slot overlapping that window — this is what produces the two-shift 10:30–14:30 / 17:00–21:00 day.
Sunday is `closed: true` (root) / `null` (variant-blue).

## Local storage note
Seed data is cached in `localStorage` under `drpatils_db_v1`. After changing seed data, bump that key
or clear storage, otherwise stale content keeps rendering.

## Run locally
```
node local-server.js
# http://localhost:8123
```

## Open items
- Confirm the real clinic email with the client (currently a placeholder).
- Real social profile URLs (currently `#`) and a real OG image.
- Team page shows Dr. Vishwas Patil plus three role-titled staff cards (no invented names) —
  swap in real names when the client provides them.
