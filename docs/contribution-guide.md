# Contribution Guide

This repo is maintained as a metadata-driven asset library. New assets are still standalone HTML files, but the catalog, JSON output, and gallery are generated from the metadata block at the top of each asset.

## 1. Start With The Asset Contract

Every asset file must begin with this required metadata block:

```html
<!--
Title: Example Asset Title
Category: overlays
Collection: core
UseCase: Short sentence describing the broadcast job this asset performs.
Resolution: 1920x1080
Transparent: true
Description: One sentence that explains the visual style and where the asset fits in a scene.
Tags: example, overlay, starter, template
Preview: previews/example/example-asset.png
-->
```

Field notes:

- `Category`: use the stable asset group that should appear in the gallery filter (`alerts`, `backgrounds`, `lower-thirds`, `news`, `overlays`, `scenes`, `transitions`, or `widgets`); do not create a new top-level category casually
- `Collection`: use `core` for the base library or the suite slug such as `vertical-creator`, `live-show`, or `games/halo`; new collections should represent reusable suites or themed families, not one-off variants
- `Resolution`: use `WIDTHxHEIGHT`
- `Transparent`: `true` or `false`
- `Tags`: use concise discoverability cues for format, mood, workflow, franchise, event type, or audience
- `Preview`: mirrored preview path under `assets/previews/`, or `none` for legacy assets that have not been backfilled yet

## 2. Use The Starter Template

Start from [templates/asset-starter.html](../templates/asset-starter.html) when possible. It already includes:

- the required metadata block
- CSS variable placeholders
- editable content markers
- a shared query-param scaffold for `title`, `subtitle`, `accent`, and optional `items`

## 3. Keep Assets Lightweight

- Keep each asset self-contained in a single HTML file.
- Prefer lightweight CSS animation over heavy libraries.
- Treat `1920x1080` as the default for landscape scenes unless the pack or use case clearly requires another size.
- For portrait workflows, prefer `1080x1920` or another clearly documented vertical resolution.
- When you use external fonts, make sure the asset still degrades gracefully if OBS has limited network access.

## 4. Preview Convention

New assets must include a static PNG preview. The preview path should mirror the asset path beneath `assets/previews/`.

Examples:

- `assets/themes/live-show/scenes/break-screen.html`
- `assets/previews/themes/live-show/scenes/break-screen.png`

Animated GIF previews are optional, but the PNG is the required baseline artifact for new assets.

## 5. Shared Query Params

If the asset supports runtime customization, use the shared conventions whenever they make sense:

- `title`
- `subtitle`
- `headline`
- `accent`
- `timer`
- `items`

You can still expose asset-specific params, but the shared names should be the first choice for common tasks.

## 6. Generation And Validation

After adding or editing assets, run:

```bash
npm run assets:generate
npm run assets:validate
```

If you are backfilling legacy files or need placeholder previews for the new suite assets, these helpers are also available:

```bash
npm run assets:add -- <category> <slug> [collection]
npm run assets:backfill
npm run packs:generate
npm run previews:generate
npm run previews:sync
```

Validation checks:

- missing metadata fields
- missing preview files when `Preview` is not `none`
- duplicate titles inside the same collection/category
- out-of-date generated outputs

## 7. Taxonomy For Large-Scale Growth

- Keep `Category` small and stable so the gallery filter stays usable at scale.
- Add breadth through `Collection`, folder structure, and tags rather than inventing new top-level categories.
- Use tags for long-tail discoverability such as `charity`, `cozy`, `podcast`, `scoreboard`, `tournament`, `vertical`, or `watchalong`.
- If you add a new collection, update the label map in `scripts/asset-library.js` so generated outputs stay readable.
- When in doubt, prefer building a coherent pack for a niche instead of a single isolated asset.

## 8. Sorting And Generated Files

- Keep human-edited listings alphabetized when you touch them.
- Do not hand-edit `assets/index.html`, `assets/catalog.json`, or `docs/asset-catalog.md`; regenerate them instead.
- When you add a new collection or category, make sure the asset names themselves are still easy to scan alphabetically inside that group.

## 9. Review Checklist

- Load the asset in OBS and confirm the source size matches the metadata.
- Verify there are no console errors on refresh.
- Test any query-param customization you added.
- Confirm the preview PNG exists in the mirrored path.
- Run the generation and validation commands before submitting changes.
