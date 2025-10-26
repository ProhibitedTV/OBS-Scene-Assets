# OBS-Scene-Assets

A curated catalog of standalone HTML files that can be imported into OBS Studio as browser sources. Every asset uses self-contained HTML, CSS, and optional JavaScript so you can drop it straight into your scenes without extra dependencies. The collection now includes platform-aware alerts, multistream dashboards, configurable widgets, newsroom kits, and game-specific scene packs tailored for Twitch, YouTube, Facebook Gaming, TikTok Live, and other ecosystems.

## Folder structure

```
assets/
├── alerts/           # Alerts for followers, donations, raids, and more
├── backgrounds/      # Animated and static scene backdrops
├── index.html        # Human-friendly catalog of all assets
├── lower-thirds/     # Lower third nameplates and announcement banners
├── overlays/         # Webcam frames, tickers, chat panels
├── scenes/           # General purpose scene layouts (starting soon, intermission, etc.)
├── themes/
│   ├── newsroom/     # News broadcast collection of scenes, graphics, and widgets
│   └── games/
│       ├── apex-legends/       # Drop ship countdowns, squad status boards, ring alerts
│       ├── fortnite/           # Battle Bus launchers, elimination feeds, storm warnings
│       ├── halo/               # Mission briefings, fireteam dashboards, UNSC overlays
│       ├── league-of-legends/  # Draft desks, objective trackers, victory layouts
│       └── valorant/           # Match intros, spike alerts, round history panels
└── widgets/          # Supplemental UI elements like polls and goals
```

## Using the assets

1. Clone or download this repository.
2. In OBS Studio, add a **Browser Source**.
3. Point the browser source to the file you want to use. You can use the local file path or host the files from a web server.
4. Adjust the browser source width/height to match the resolution of the asset (most scenes are full-screen at 1920×1080 by default).
5. Customize text by editing the HTML directly—each file contains clear placeholder text. Many alerts, scenes, and widgets also accept URL query parameters so you can update names, colors, and values without editing files (see below).

## Quick browsing

Open [`assets/index.html`](assets/index.html) in a browser to explore previews of the available backgrounds, lower thirds, overlays, scenes, widgets, newsroom graphics, and the new game-specific packs.

## Newsroom & esports-ready toolkits

Need broadcast-ready graphics? The [`assets/themes/newsroom/`](assets/themes/newsroom) directory bundles lower thirds, tickers, stingers, countdowns, interview layouts, weather boards, election dashboards, and more for professional coverage. For competitive streams, the `assets/themes/games/` collection ships with themed scene packs inspired by Apex Legends, Fortnite, Halo, League of Legends, Valorant, and more as the library grows. Every file is OBS-ready and exposes URL query parameters so you can instantly swap player names, squad compositions, sponsors, or headline text for your production.

## Dynamic customization via URL parameters

Several assets can be personalized by appending a query string to the local file path or hosted URL. A few examples:

```text
assets/alerts/twitch-subscription.html?user=NinjaFox&tier=Tier%203&months=12
assets/themes/games/halo/halo-mission-briefing.html?title=Operation%20Morning%20Star&fireteam=Blue%20Team|Kelly;Linda;Fred
assets/themes/newsroom/news-countdown.html?title=Breaking%20Update&minutes=5
assets/widgets/multi-event-feed.html?title=Live%20Feed&events=Twitch;Prime%20Sub;StreamerFan%20subscribed;moments%20ago|TikTok;Galaxy%20Gift;ShortFormStar%20sent%20a%20Galaxy;just%20now
```

Each page documents the supported parameters in its inline comments or JavaScript block, so you can match the experience to whichever streaming service or automation tool you use.

## Contributions

Have an idea for another overlay or widget? Contributions are welcome—open a PR with new standalone HTML files and include them in the catalog.
