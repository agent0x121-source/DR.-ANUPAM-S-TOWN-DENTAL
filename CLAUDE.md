# Dr. Anupam's Town Dental — project notes

Website for **Dr. Anupam's Town Dental (Dr. Anupam Purwar)**, a dental clinic in Prem Nagar,
Bareilly. Built from an in-house de-branded Webflow-derived template; every design
token, image and animation is inherited unchanged from that base — **only content was rebranded**.

> **Separate project.** This repo is an independent copy. The earlier client sites
> (`the-dental-solutions.vercel.app`, `dr-patil-dental-care.vercel.app`,
> `dental-clinica-rouge.vercel.app`) are different codebases and must never be touched from here.

## Clinic facts (source: Google Business Profile)
- Profile: https://maps.google.com/?cid=3426945284530272874 — **4.9★, 397 reviews**
- Full listing name: *DR. ANUPAM'S TOWN DENTAL (An Exclusive Dental Implant, Braces &
  Root Canal Treatment Clinic)*
- Address: 127/89, Macnair Rd, near Sood Dharam Kanta, opp. Major Nursing Home,
  Prem Nagar, Bareilly, Uttar Pradesh 243005 (Plus code 9CGC+97)
- Phone / WhatsApp: **+91 81266 43459** (`918126643459`)
- Website listed on the profile: `dranupamstowndental.in` — **the domain is now a
  GoDaddy parking page**; the clinic's own content was recovered from the Wayback Machine
  (snapshots of `/`, `/about`, `/services`, `/contact-us`) and is the source for the
  doctor bios and the service copy.
- Email: `dranupamstowndental111@gmail.com` (from the clinic's own contact page)
- Hours: **Mon–Wed 10:00–20:00, Thursday CLOSED, Fri–Sat 10:00–20:00, Sunday 10:00–18:00**
  (single shift, no break window). Note the clinic's old website listed different hours;
  the Google profile is newer (updated by the business) and is what the site uses.
- Established **2017**.

### Doctors (source: the clinic's own `/about` page)
- **Dr. Anupam Purwar** — MDS (Prosthodontics, Crown & Bridge and Maxillofacial Prosthetics),
  BDS (Gold Medal, Kothiwal Dental College Moradabad 2005; MDS M.S. Ramaiah, Bangalore 2011).
  Prosthodontist, maxillofacial prosthodontist and oral implantologist. Founder.
- **Dr. Shally Khanna** — MDS (Oral & Maxillofacial Pathology), BDS (Kothiwal 2008 / 2011),
  with certificate courses in Advanced Endodontics and Laser Dentistry. Co-founder.
- The remaining two team cards are **role-titled only** (Consultant Orthodontist, Consultant
  Oral Surgeon). The clinic's own site states it employs orthodontists and a team of oral
  surgeons but names neither — **do not invent names**.

## Structure
- `index.html` — home; `about.html`, `service.html`, `blog.html`, `booking.html`
- `privacy/terms/cookies/licenses/404.html` — hand-built legal pages
- `admin/` — clinic management panel (dashboard, appointments, patients, doctors, revenue, settings)
- `assets/css/lumora.css` — the design system (filename kept; do not rename, all `url()`s depend on it)
- `assets/js/` — jQuery + Webflow IX2 runtime + GSAP/ScrollTrigger/SplitText. **Do not delete.**
  - `lumora-db.js` — the seed database (clinic, doctors, services, appointments) + auth
  - `booking-data.js` / `booking.js` — booking flow (booking-data.js overrides the lumora-db bridge)
  - `website-sync.js` — pushes admin edits onto the public pages
- `assets/img/` — all photos plus brand assets (`lumora-logo.svg`, `lumora-logo-dark.svg`,
  `lumora-logo-nav.svg`, `favicon.svg`). The three logo SVGs are the tooth mark plus a
  three-line wordmark (`DR.` / `ANUPAM'S` / `TOWN DENTAL`) — only the `<text>` contents were
  changed; geometry, gradient and colours are the template's.
- `variant-blue/` — full copy recoloured teal → blue; it has **no** `lumora-db.js` and keeps its own
  `CLINIC`, `SERVICES` and `DOCTORS` constants inside `booking-data.js`, plus its **own copy of
  `assets/img/`** — so clinic data and brand assets must be edited in both places
- `.bak/` — original template exports, reference only

## Hard invariants
- **Never change design, colours, fonts, spacing, images or animations.** Content only.
- Do not reintroduce `filter: blur(...)` in reveals — it leaves images permanently blurred.
- Keep the "Lumora reveal engine v2" script and the image-guard script before `</body>` on every page.

## Opening-hours model
`hours[day]` / `doctor.schedule[day]` support an optional `brk: { start, end }`. The slot generators
in both `lumora-db.js` (`getAvailability`) and `booking-data.js` (`windowFor` + its loop) skip any
slot overlapping that window — this is what produced the two-shift day on an earlier client.
This clinic has `brk: null` on every open day, so the break logic is dormant but intact.

**The closed day is Thursday, not Sunday** (day index `4`). It is `closed: true` in
`lumora-db.js` and `null` in both `booking-data.js` files. Day `0` (Sunday) is now an
**open** short day, 10:00–18:00.

## Service and doctor ids
Public pages, the booking flow and the admin panel all key off these ids, so renaming one
means updating every file that references it:
`dental-implants`, `root-canal`, `cosmetic-dentistry`, `orthodontics`, `prosthodontics`,
`preventive-dentistry`, `general-consultation`, `follow-up`; and
`anupam-purwar`, `shally-khanna`, `consultant-orthodontist`, `consultant-oral-surgeon`.

On `index.html` and `service.html` the four service cards get their **title and body text
injected from the database by `website-sync.js`**, but their **tag chips are static HTML**.
The injected order is implants → root canal → cosmetic → orthodontics, so the static tags
must be kept in that same order or the chips will describe the wrong card.

## Local storage note
Seed data is cached in `localStorage` under `atd_db_v1`. After changing seed data, bump that key
or clear storage, otherwise stale content keeps rendering.

## Run locally
```
node local-server.js
# http://localhost:8123
```

## Open items
- Service `price` is `0` on every entry — the clinic publishes no prices anywhere, so none were
  invented. Prices are admin-only (never shown to patients) and the clinic can fill them in
  from the panel.
- Per-doctor login addresses (`dr.anupam@…`, `dr.shally@…`, `orthodontist@…`, `oralsurgeon@…`)
  are internal panel credentials on the clinic's own domain, not published contact addresses.
- Real social profile URLs (currently `#`) and a real OG image.
- Swap the two role-titled team cards for real names when the client provides them.
- Some inherited template claims were left as-is because they are not Google-profile facts and
  were present in the base template: the "92% / 3-4 / 7 Mi / 85%", "10k+ Smiles",
  "50K+ Patient Visits", "15+ Community Programs" and awards blocks, and the FAQ line about
  accepting insurance. **Confirm or replace these with the client.**
