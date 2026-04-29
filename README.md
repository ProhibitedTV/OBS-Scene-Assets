# OBS Scene Assets

OBS Scene Assets is a metadata-driven library of standalone HTML overlays, widgets, lower thirds, and complete scenes for [OBS Studio](https://obsproject.com/) Browser Sources.

The repo currently ships with **387 assets** across the core library and themed suites, including broad white-label packs such as **Charity Marathon**, **Civic Broadcast**, **Creator Commerce**, **Holiday Celebration**, **Maker Garage**, **Music Pulse**, **Podcast Studio**, **Study Session**, **Tournament Desk**, **Travel Vlog**, **VTuber Spotlight**, **Wellness Retreat**, **Vertical Creator**, and **Live Show**.

The long-term target is a scale-ready, white-label library with thousands of animated assets spanning thousands of discoverable creator niches. To keep that breadth usable, the repo keeps a compact set of stable asset types and expands depth through themed suites, coordinated packs, and strong tagging.

## Quick Start

1. Clone the repo or download the ZIP and keep the folder structure intact.
2. Open [assets/index.html](assets/index.html) in a browser to browse the filterable gallery and copy the asset path you want.
3. In OBS, add a **Browser Source** and point it to the local file path, for example:
   `file:///C:/path/to/OBS-Scene-Assets/assets/scenes/starting-soon.html`
4. Match the Browser Source width and height to the resolution listed in [docs/asset-catalog.md](docs/asset-catalog.md).
5. Customize the asset either by editing the HTML file or by appending shared query params such as `title`, `subtitle`, `headline`, `accent`, `timer`, and `items`.

If you are new to OBS, start with [docs/obs-setup-guide.md](docs/obs-setup-guide.md).

## What's In The Repo

- `assets/catalog.json`: machine-readable catalog generated from the metadata block in each asset.
- `assets/index.html`: generated gallery with search, category filters, collection filters, aspect badges, and preview placeholders.
- `assets/previews/`: mirrored preview image tree. New assets must ship with a PNG preview.
- `docs/asset-catalog.md`: generated markdown catalog grouped by collection and category.
- `docs/taxonomy-strategy.md`: scaling model for growing into thousands of assets without losing discoverability.
- `scripts/`: lightweight tooling for metadata backfill, preview generation, catalog generation, and validation.
- `templates/asset-starter.html`: starter template for new assets with the required metadata block and shared query-param scaffold.

## Repository Layout

```text
assets/
  alerts/
  backgrounds/
  catalog.json
  index.html
  lower-thirds/
  news/
  overlays/
  previews/
  scenes/
  themes/
  widgets/
docs/
scripts/
templates/
```

## Scale Strategy

- Keep the top-level asset types stable: alerts, backgrounds, lower thirds, news, overlays, scenes, transitions, and widgets.
- Grow breadth through themed suites and collections for audiences, formats, franchises, and visual styles.
- Use tags to capture long-tail niches such as podcast, charity, esports, mobile-first, watchalong, cozy, or tournament.
- Ship coordinated packs so each niche gets a usable set of scenes, overlays, alerts, lower thirds, and transitions instead of isolated one-offs.

See [docs/taxonomy-strategy.md](docs/taxonomy-strategy.md) for the full scaling model.

## Best Starter Assets

- `assets/scenes/starting-soon.html`
- `assets/scenes/just-chatting.html`
- `assets/scenes/countdown-timer.html`
- `assets/themes/vertical-creator/scenes/start-screen.html`
- `assets/themes/live-show/scenes/dual-camera-scene.html`
- `assets/themes/live-show/scenes/break-screen.html`

For pack-level recipes, see [docs/creator-pack-recipes.md](docs/creator-pack-recipes.md).

## Shared Customization Pattern

The repo now standardizes a lightweight query-param convention for reusable assets:

- `title`: main label, presenter name, or scene title
- `subtitle`: supporting copy or secondary label
- `headline`: compact status line, CTA chip, or short banner text
- `accent`: primary color override
- `timer`: countdown length in seconds or `MM:SS` / `HH:MM:SS`
- `items`: pipe-separated content list for tickers, chats, rundowns, and card stacks

See [docs/customization-tips.md](docs/customization-tips.md) for copy-paste OBS URL examples.

## Catalog Workflow

Run these commands after adding, renaming, or updating assets:

```bash
npm run assets:generate
npm run assets:validate
```

Useful helpers:

```bash
npm run assets:add -- <category> <slug> [collection]
npm run assets:backfill
npm run packs:generate
npm run previews:generate
npm run previews:sync
```

`assets:generate` rebuilds `assets/catalog.json`, `assets/index.html`, and `docs/asset-catalog.md` from the metadata embedded in each asset file.

## Contributing

1. Start from [templates/asset-starter.html](templates/asset-starter.html) or a nearby asset.
2. Add the required metadata block at the top of the file.
3. Save a mirrored PNG preview under `assets/previews/`.
4. Run the generation and validation commands.
5. Review the result in OBS before submitting changes.

Detailed contributor guidance lives in [docs/contribution-guide.md](docs/contribution-guide.md).
For the taxonomy and coverage model behind long-term expansion, see [docs/taxonomy-strategy.md](docs/taxonomy-strategy.md).
For roadmap priorities focused on repository hygiene and rapid asset expansion, see [docs/expansion-roadmap.md](docs/expansion-roadmap.md).
