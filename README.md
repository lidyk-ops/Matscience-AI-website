# MatScienceAI Website

Redesign work for [matscienceai.com](https://www.matscienceai.com/): a homepage prototype plus the research behind it.

## What's here

| Path | What it is |
|---|---|
| `index.html` | Homepage: company positioning, the three liquid coolants (MS-PG25, MS-DC6, MS-PG0), other lines of work, contact. |
| `magnesium.html` | Magnesium alloys page (expansion line, in development). Marked as a draft for team review. |
| `assets/site.css` | Shared styles for every page. |
| `assets/site.js` | Shared behaviour: coolant finder, contact form, copy button. |
| `assets/fonts/` | Self-hosted fonts (IBM Plex Sans, Schibsted Grotesk; SIL OFL 1.1). No Google Fonts, so pages load reliably in mainland China. |
| `assets/images/` | Product photos supplied by the team: `coolant-products.jpg`, `magnesium-rods.jpg`. Team headshots in `team/` (cropped from the team slide, about 230 px wide; replace with originals when available). |
| `about.html` | About page: team stats, the four team members, how research becomes product, contact form. |
| `404.html` | Page-not-found page. Uses root-relative paths, so it works at any URL. |
| `vercel.json` | Hosting config for Vercel (long-term caching for fonts). |
| `robots.txt`, `sitemap.xml` | Search engine files. They assume the site lives at https://www.matscienceai.com. |
| `assets/favicon.svg` | Browser tab icon (placeholder mark until the real logo is in). |
| `docs/research.md` | Design research: what works on LiquidStack, gaps on the current site, tool choices, sources. |
| `docs/screenshots/` | Full-page captures of the current MatScienceAI homepage and of liquidstack.com, taken 2026-11-06. |

## Run it locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy (Vercel)

The site is plain HTML, CSS and JS with no build step, so it deploys as-is.

1. Sign in at https://vercel.com, ideally with the account that already hosts matscienceai.com.
2. Add New → Project → Import the `lidyk-ops/Matscience-AI-website` repository (grant Vercel access to it if asked).
3. Framework preset: **Other**. Leave Build Command and Output Directory empty. Click Deploy.

After that, every push to `main` goes live automatically within about a minute, and every other branch gets its own preview URL. Any earlier version can be restored from the project's Deployments tab with "Promote to Production".

To serve it on www.matscienceai.com, add the domain under the project's Settings → Domains. If the domain is attached to the old site's project, remove it there first. Do this only once the new site has been reviewed.

## Contact form

Both pages post to Formspree at `https://formspree.io/f/mvkkngyq` (set in the form's `data-endpoint` attribute). Each request arrives with a subject like `Website request: MS-PG25, Datasheet and safety data sheet (Acme)` and the visitor's address as reply-to.

- The first submission to a new Formspree form may ask you to confirm the inbox. Send one test request after deploying and check sales@matscienceai.com.
- If a submission fails, visitors see a link that opens a pre-filled email to sales@matscienceai.com, so no request is lost.
- Fields sent: `name`, `email`, `company`, `product`, `need`, `message`, `page`, plus Formspree's `_subject`, `_replyto` and the `_gotcha` spam trap.
- If most leads come from mainland China, test a submission from there; switch `data-endpoint` to another JSON endpoint if Formspree is unreliable.

## Content notes

Coolant copy, product details and figures come from the current matscienceai.com pages (home, Products, Partners, Blog). Nothing is invented. Before launch, confirm:

- The current homepage describes immersion cooling, while the Products page lists PG25 and DC6 as direct-to-chip cold plate coolants. The prototype follows the Products page.
- The development plans on `magnesium.html` (corrosion resistance, formability) are a draft and need team confirmation.
- `magnesium-rods.jpg` is only 386 px wide. Replace it with a higher-resolution photo when one is available.
- Chromium-free materials are intentionally left off the site for now.
- The validation partners can be named publicly, and whether real logos may be used.
