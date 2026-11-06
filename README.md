# MatScienceAI Website

Redesign work for [matscienceai.com](https://www.matscienceai.com/): a homepage prototype plus the research behind it.

## What's here

| Path | What it is |
|---|---|
| `index.html` | Homepage: company positioning, the three liquid coolants (MS-PG25, MS-DC6, MS-PG0), other lines of work, contact. |
| `magnesium.html` | Magnesium alloys page (expansion line, in development). Marked as a draft for team review. |
| `assets/site.css` | Shared styles for every page. |
| `assets/images/` | Product photos supplied by the team: `coolant-products.jpg`, `magnesium-rods.jpg`. |
| `docs/research.md` | Design research: what works on LiquidStack, gaps on the current site, tool choices, sources. |
| `docs/screenshots/` | Full-page captures of the current MatScienceAI homepage and of liquidstack.com, taken 2026-11-06. |

## Run it locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Content notes

Coolant copy, product details and figures come from the current matscienceai.com pages (home, Products, Partners, Blog). Nothing is invented. Before launch, confirm:

- The current homepage describes immersion cooling, while the Products page lists PG25 and DC6 as direct-to-chip cold plate coolants. The prototype follows the Products page.
- The development plans on `magnesium.html` (corrosion resistance, formability) are a draft and need team confirmation.
- `magnesium-rods.jpg` is only 386 px wide. Replace it with a higher-resolution photo when one is available.
- Chromium-free materials are intentionally left off the site for now.
- The validation partners can be named publicly, and whether real logos may be used.
