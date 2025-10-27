# OBS Scene Assets

This repository is a curated library of standalone HTML overlays, widgets, and complete scenes that can be loaded directly into [OBS Studio](https://obsproject.com/) as **Browser Sources**. Each asset is self-contained (HTML, CSS, and optional JavaScript in a single file) so you can use it without running a web server or installing extra packages.

## Quick start

1. **Download the files** – Clone the repository or grab a ZIP from GitHub and extract it locally.
2. **Open OBS Studio** and add a new **Browser Source** to any scene.
3. **Browse to the asset** you want to use (for example `assets/scenes/starting-soon.html`). On Windows you can use a `file:///C:/path/to/repo/...` URL; on macOS/Linux use the absolute path.
4. **Match the resolution** – Most full-scene layouts are designed for 1920×1080. Set the Browser Source width/height accordingly to avoid stretching.
5. **Customize the text and colors** by editing the HTML/CSS inside each file. Every asset ships with comments and placeholder copy so you can quickly adapt it to your stream.

If you are new to OBS, the [detailed setup guide](docs/obs-setup-guide.md) walks through the same process with screenshots and extra tips.

## Repository layout

```
assets/
├── alerts/           # Alerts for followers, donations, raids, and more
├── backgrounds/      # Animated and static scene backdrops
├── index.html        # Human-friendly catalog of all assets
├── lower-thirds/     # Lower third nameplates and announcement banners
├── news/             # Broadcast-style scenes, tickers, and live inserts
├── overlays/         # Webcam frames, tickers, chat panels
├── scenes/           # Complete scene layouts (starting soon, intermission, etc.)
├── themes/           # Coordinated asset suites grouped by visual theme
└── widgets/          # Supplemental UI elements like polls and goals
```

Open [`assets/index.html`](assets/index.html) in any browser to preview thumbnails and descriptions for everything in the catalog. Each folder also contains a `README` section inside the [Asset Catalog](docs/asset-catalog.md) with usage notes and recommended source settings.

## Customization checklist

- **Text content** – Replace placeholder names, schedule items, social handles, and alerts with your own.
- **Brand colors & fonts** – Update CSS variables at the top of each file. If you reference external fonts (Google Fonts, Adobe Fonts) ensure the Browser Source has network access.
- **Timing** – Some widgets include simple timers or animation intervals. Adjust the values in the embedded JavaScript to match your needs.
- **Localization** – All copy is plain text inside the markup, so you can translate it directly.
- **File hosting** – Assets can be loaded locally or hosted via any static file host (GitHub Pages, Netlify, personal web server). Hosting makes it easier to reuse across multiple computers.

Refer to [docs/customization-tips.md](docs/customization-tips.md) for a deeper dive into modifying colors, fonts, animation speeds, and browser source properties.

## Best practices in OBS

- Use **separate browser sources** for distinct overlays so you can toggle them independently.
- Lock the source after positioning to prevent accidental movement.
- Prefer **hardware accelerated rendering** (Settings → Advanced → Video) for smoother animations.
- When stacking multiple browser sources, order them like any other scene item so foreground widgets appear above background scenes.
- For alerts, configure your bot/service (Streamlabs, StreamElements, etc.) to open the corresponding HTML file when events trigger.

More operational guidance is available in the [operations playbook](docs/operations-playbook.md), including scene organization strategies, backup suggestions, and integration ideas.

## Contributing

Want to add a new overlay or improve an existing one?

1. Follow the design conventions in [docs/contribution-guide.md](docs/contribution-guide.md).
2. Add your asset under the appropriate folder and update `assets/index.html` with a preview entry.
3. Submit a pull request with screenshots or short videos so maintainers can verify the look and feel.

We welcome bug reports and feature requests via GitHub issues.
