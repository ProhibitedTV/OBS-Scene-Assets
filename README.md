# OBS-Scene-Assets

A curated catalog of standalone HTML files that can be imported into OBS Studio as browser sources. Every asset uses self-contained HTML, CSS, and optional JavaScript so you can drop it straight into your scenes without extra dependencies.

## Folder structure

```
assets/
├── alerts/           # Alerts for followers, donations, raids, and more
├── backgrounds/      # Animated and static scene backdrops
├── index.html        # Human-friendly catalog of all assets
├── lower-thirds/     # Lower third nameplates and announcement banners
├── overlays/         # Webcam frames, tickers, chat panels
├── scenes/           # Complete scene layouts (starting soon, intermission, etc.)
└── widgets/          # Supplemental UI elements like polls and goals
```

## Using the assets

1. Clone or download this repository.
2. In OBS Studio, add a **Browser Source**.
3. Point the browser source to the file you want to use. You can use the local file path or host the files from a web server.
4. Adjust the browser source width/height to match the resolution of the asset (most scenes are full-screen at 1920×1080 by default).
5. Customize text by editing the HTML directly—each file contains clear placeholder text.

## Quick browsing

Open [`assets/index.html`](assets/index.html) in a browser to explore previews of the available backgrounds, lower thirds, overlays, scenes, widgets, and alerts.

## Contributions

Have an idea for another overlay or widget? Contributions are welcome—open a PR with new standalone HTML files and include them in the catalog.
