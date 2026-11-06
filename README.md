# MatScienceAI Website

Redesign work for [matscienceai.com](https://www.matscienceai.com/): a homepage prototype plus the research behind it.

## What's here

| Path | What it is |
|---|---|
| `index.html` | Homepage prototype. One self-contained file: HTML, CSS and the animated cooling-loop diagram. Fonts load from Google Fonts. |
| `docs/research.md` | Design research: what works on LiquidStack, gaps on the current site, tool choices, sources. |
| `docs/screenshots/` | Full-page captures of the current MatScienceAI homepage and of liquidstack.com, taken 2026-11-06. |

## Run it locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Content notes

All copy, product details and figures in the prototype come from the current matscienceai.com pages (home, Products, Partners, Blog). Nothing is invented. Before launch, confirm:

- The current homepage describes immersion cooling, while the Products page lists PG25 and DC6 as direct-to-chip cold plate coolants. The prototype follows the Products page.
- The validation partners can be named publicly, and whether real logos may be used.
