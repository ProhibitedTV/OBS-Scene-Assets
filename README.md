# OBS Scene Assets

OBS Scene Assets is a metadata-driven library of standalone HTML overlays, widgets, lower thirds, and complete scenes for [OBS Studio](https://obsproject.com/) Browser Sources.

The repo currently ships with **121 assets** across the core library and themed suites, including the new **Vertical Creator** and **Live Show** packs for general streamers.

## Quick Start

1. Clone the repo or download the ZIP and keep the folder structure intact.
2. Open [assets/index.html](assets/index.html) in a browser to browse the filterable gallery and copy the asset path you want.
3. In OBS, add a **Browser Source** and point it to the local file path, for example:
   `file:///C:/path/to/OBS-Scene-Assets/assets/scenes/starting-soon.html`
4. Match the Browser Source width and height to the resolution listed in [docs/asset-catalog.md](docs/asset-catalog.md).
5. Customize the asset either by editing the HTML file or by appending shared query params such as `title`, `subtitle`, `headline`, `accent`, `timer`, and `items`.

If you are new to OBS, start with [docs/obs-setup-guide.md](docs/obs-setup-guide.md).

## What's In The Repo

- `assets/index.html`: generated gallery with search, category filters, collection filters, aspect badges, and preview placeholders.
- `assets/catalog.json`: machine-readable catalog generated from the metadata block in each asset.
- `docs/asset-catalog.md`: generated markdown catalog grouped by collection and category.
- `assets/previews/`: mirrored preview image tree. New assets must ship with a PNG preview.
- `templates/asset-starter.html`: starter template for new assets with the required metadata block and shared query-param scaffold.
- `scripts/`: lightweight tooling for metadata backfill, preview generation, catalog generation, and validation.

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
npm run assets:backfill
npm run previews:generate
```

`assets:generate` rebuilds `assets/catalog.json`, `assets/index.html`, and `docs/asset-catalog.md` from the metadata embedded in each asset file.

## Contributing

1. Start from [templates/asset-starter.html](templates/asset-starter.html) or a nearby asset.
2. Add the required metadata block at the top of the file.
3. Save a mirrored PNG preview under `assets/previews/`.
4. Run the generation and validation commands.
5. Review the result in OBS before submitting changes.

Detailed contributor guidance lives in [docs/contribution-guide.md](docs/contribution-guide.md).
