# Asset Expansion & Repository Hygiene Roadmap

This roadmap balances two goals:

1. Keep the repo clean, searchable, and reliable as it scales.
2. Rapidly increase the number of unique, animation-rich assets streamers can use immediately.

## North Star

Make this repository the easiest place for streamers to find, preview, customize, and ship high-quality animated white-label OBS assets in minutes, while growing toward thousands of assets across thousands of discoverable creator niches.

## Scale Architecture

To reach that size without making the repo unsearchable:

- Keep the top-level asset types intentionally small and stable.
- Expand breadth through suites, collections, and coordinated packs.
- Use tags to express long-tail niches, moods, workflows, and event types.
- Favor repeatable pack systems over isolated one-off additions.

See `docs/taxonomy-strategy.md` for the full model.

## Success Metrics

Track progress with metrics that tie directly to quality and growth:

- **Catalog growth:** total assets and assets per category/theme.
- **Coverage matrix:** number of packs across major lanes such as general creator, podcast, news, gaming, vertical, charity, and watchalong.
- **Coverage depth:** number of complete packs (scene set + overlays + lower thirds + alerts + transition).
- **Niche discoverability:** number of high-signal tags and collection combinations represented in the catalog.
- **Quality bar:** percentage of assets with metadata completeness, preview image, and validation passing.
- **Discovery speed:** time to find and launch an asset from `assets/index.html`.
- **Customization readiness:** percentage of assets supporting shared query parameters (`title`, `subtitle`, `headline`, `accent`, `timer`, `items`).

## Phase 0 (Now): Lock The Taxonomy

### 1) Protect the small top-level structure

- Treat `Category` as a stable list of asset jobs, not a catch-all for every niche idea.
- Add new breadth through `Collection`, folder structure, and tags before introducing a new top-level category.
- Keep `scripts/asset-library.js` collection labels current when new suites are added.

### 2) Define a coverage matrix

Track expansion by lane, not just by raw asset count:

- creator format
- event type
- genre or franchise
- monetization workflow
- platform or aspect ratio
- visual mood

### 3) Standardize what counts as a "pack"

Require new expansion efforts to target coordinated mini-libraries instead of isolated assets:

- minimum scene coverage
- at least one overlay or widget
- at least one lower third
- at least one alert or transition

## Phase 1 (Next 2 Weeks): Scale-Proof Hygiene Foundation

### 1) Enforce consistency automatically

- Add a CI workflow that runs:
  - `npm run assets:generate`
  - `npm run assets:validate`
  - a sorted-list check for `README.md`, `docs/asset-catalog.md`, and `assets/index.html`
- Block merges when generated files or alphabetical order drift.

### 2) Add an "asset quality gate" checklist

Require every new asset PR to include:

- metadata block completeness
- mirrored preview image in `assets/previews/`
- successful validation output
- short usage note (best scene type + recommended OBS dimensions)

### 3) Introduce naming conventions for long-term discoverability

Standardize filenames to be descriptive and searchable:

- `<theme>-<asset-purpose>.html` for themed packs where applicable
- kebab-case only
- avoid ambiguous names like `screen1.html` or `new.html`

## Phase 2 (Weeks 3-6): High-Value Asset Expansion

Focus on practical assets streamers use every broadcast.

### Priority category set A (highest demand)

1. **Lower thirds (animated):**
   - host intro
   - guest intro
   - social CTA
   - sponsor tag
2. **Alerts:**
   - follow, sub, raid, donation, gift, hype-train style celebration
3. **Scene utilities:**
   - starting soon variants
   - BRB variants
   - ending variants
   - multi-goal progress scene
4. **Transitions:**
   - stingers, wipes, glitch cuts, clean fades

### Priority category set B (stickiness and uniqueness)

1. **Match/game overlays:** scoreboards, objective trackers, round summaries.
2. **Podcast/live show kits:** split-screen frames, topic cards, quote cards.
3. **Vertical-first assets:** mobile-friendly lower thirds and alerts.
4. **Data widgets:** live poll, schedule timeline, rotating announcements.

## Phase 3 (Weeks 7-10): Pack Strategy for "Tons and Tons" of Assets

Ship in repeatable, complete packs rather than random one-offs.

### Pack template (target 12-20 assets per pack)

- 4 scene backgrounds (starting, live, BRB, ending)
- 3 lower thirds (name/title, topic, CTA)
- 3 alerts (follow, sub/membership, donation)
- 2 overlays (camera frame + chat/ticker)
- 1 transition
- optional widgets (goal, poll, now-playing)

### Suggested pack pipeline

- **General creator packs:** clean minimal, neon, retro, cozy, esports desk
- **Genre packs:** FPS tactical, MOBA draft, RPG fantasy, sports studio
- **Event packs:** charity marathon, tournament finals, launch stream, holiday

## Long-Horizon Coverage Lanes

Use these lanes as the parent map for long-term expansion:

- **Charity and fundraising:** donation goals, milestone alerts, sponsor slates, donor walls.
- **Cozy and lifestyle:** soft scenes, ambient overlays, journaling or study layouts.
- **Education and coaching:** lesson title cards, session goals, whiteboard overlays, Q&A prompts.
- **Esports and tournament desk:** scoreboards, bracket scenes, analyst layouts, match intros.
- **General creator essentials:** broad-use packs that work for almost any streamer out of the box.
- **IRL and travel:** route cards, map overlays, sponsor check-ins, mobile-friendly alerts.
- **Music and DJ:** now-playing, track IDs, crowd hype alerts, set-break slates.
- **News and politics:** desk scenes, tickers, result boards, remote guest formats.
- **Podcast and live show:** guest intros, topic cards, split-screen frames, schedule scenes.
- **Sports and watchalong:** score bugs, period clocks, matchup intros, halftime scenes.
- **Vertical and mobile-first:** portrait scenes, stacked chat, CTA strips, compact alerts.
- **VTuber and avatar-first:** reactive frames, collab layouts, debut assets, lore-themed alerts.

## Operating Model

### Weekly cadence

- **Monday:** choose 1-2 pack targets + assign asset count goals.
- **Midweek:** create assets and previews in batches.
- **Friday:** run generation/validation, fix ordering drift, publish changelog summary.

### Intake and prioritization

Use a simple score for new asset ideas:

`Impact x Reusability x Visual uniqueness x Build speed`

Ship highest-scoring assets first.

## Repo Cleanliness Rules to Keep Forever

- Generated outputs are always committed together (`catalog.json`, `index.html`, docs catalog).
- Lists in `README.md`, `docs/asset-catalog.md`, and `assets/index.html` remain alphabetized within categories.
- Every asset includes metadata + preview before merge.
- No orphaned previews and no uncataloged asset files.

## Suggested Immediate Backlog (Top 15)

1. Add CI workflow for generation + validation + alphabetical checks.
2. Add PR template with asset quality gate checklist.
3. Create contributor naming convention section in `docs/contribution-guide.md`.
4. Add 5 new animated lower thirds (host, guest, CTA, sponsor, segment).
5. Add 5 new animated alerts (sub, raid, donation, milestone, special event).
6. Add 3 transition assets (stinger, glitch, soft wipe).
7. Add 2 new vertical-first assets.
8. Expand `docs/customization-tips.md` with copy/paste URL recipes per asset type.
9. Add "new this week" block in `README.md` for discoverability.
10. Add script check for missing previews.
11. Add script check for duplicate metadata IDs/titles.
12. Add a "pack completeness" score in generated docs.
13. Add asset tags for mood/use-case (clean, hype, cinematic, cozy, esports).
14. Create first "Creator Essentials" mega-pack (15+ assets).
15. Publish a short monthly roadmap update in `docs/operations-playbook.md`.

## What to Build First (Recommendation)

If you want immediate momentum, start with this sequence:

1. CI and quality gate automation.
2. 10 high-demand animated lower thirds and alerts.
3. One complete, coherent 15-asset pack.

This gives you fast volume growth without turning the repo into chaos.
