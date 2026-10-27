# Dollar / Thrifty St. Maarten redesign

A responsive, buildless HTML/CSS/JavaScript redesign based on the company website and the supplied visual reference. The hero uses a warm neutral canvas, two-line oversized heading, floating six-field booking search, an AI-assisted cutout/upscale of an original fleet Jeep Wrangler photograph, and an angled Thrifty-blue band.

## Run

Use Node 20+ (no package installation required):

```sh
npm run dev
```

Open http://127.0.0.1:4173. `npm run build` validates content, syntax, page and asset references. The deployable site is `dist/`.

## Deployment

Vercel: import this repository, use Other framework, build command `node verify.mjs`, output directory `dist`. `vercel.json` supplies these settings. No environment variables or secrets are required. The original business domain is not modified by this project.

## Pages and content

- Homepage: priority hero and booking search, verified service benefits, featured real vehicles, airport location and original booking explanation.
- Fleet: all 54 active source models, category and text search, passenger filtering, full original vehicle descriptions and specifications in accessible dialogs.
- Locations: all 10 directory entries, addresses, listed hours, telephone numbers and map links; all six original booking locations are retained in search.
- About: original story and service wording, original six-image gallery and 13 staff entries.
- Services: original company feature descriptions, six optional extras and quantity limits; historical promotion and prices only as attributed unverified notes.
- Contact: labeled email composer plus original reCAPTCHA form destination; all original phone/email/social channels.
- Reservations: original lookup destination, preserving original modification/cancellation workflow.
- Policies: original authoritative PDF destinations. Cookie policy: original text with a note distinguishing original analytics from this redesign.
- Content checklist: full inventory and outstanding integration/content notes.

## Operational limits

Search filters a verified fleet catalogue; it does not claim live availability. Original booking depends on origin-scoped sessionStorage and has no discovered URL handoff. Visitors are clearly told to re-enter their details on the original website. A documented booking API or same-origin integration is needed for seamless transfer. No booking, cancellation, email, or payment transaction was submitted during development.

Original location counts (9 versus 10), hours (directory 08:00–18:00 versus booking 08:00–17:00), duplicate payment FAQ and unavailable Simpson Bay location photo are documented on the content checklist. No rates, discounts or availability are invented.

## Data handling and assets

`dist/data.json` contains allowlisted public fleet, staff and location content only. It contains no reservations, customer records, prices or credentials. Audit source downloads are excluded from Git and deployment. Never fetch or embed the raw original fleet API response: it includes unrelated operational data. Source photos belong to their respective owners. The hero cutout was created using the built-in ImageGen tool from `dist/assets/fleet-87.jpg`; prompt: remove gray background, preserve the exact lime green four-door Wrangler and original plate, upscale, output genuine transparency. A high-resolution licensed original is preferable for final production.
