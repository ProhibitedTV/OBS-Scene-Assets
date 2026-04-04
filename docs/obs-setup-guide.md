# OBS Setup Guide

This guide explains how to use the catalog, pick an asset, and load it into OBS Studio as a Browser Source.

## 1. Get The Repo Locally

1. Clone the repo with Git or download the ZIP from GitHub.
2. Keep the folder structure intact so asset paths and preview paths stay valid.

## 2. Browse The Catalog First

Open [../assets/index.html](../assets/index.html) in your browser.

The gallery lets you:

- search by title, description, and tags
- filter by category
- filter by collection or theme
- filter by aspect ratio
- see which assets already have preview images

If you want a machine-readable view of the same data, use [../assets/catalog.json](../assets/catalog.json).

## 3. Add A Browser Source In OBS

1. Open OBS Studio.
2. Pick the scene where the asset should live.
3. In **Sources**, click **+** and choose **Browser**.
4. Name it something descriptive, such as `Countdown - Launch Scene`.

## 4. Point OBS To The HTML File

Use a `file:///` URL or the **Local File** browser picker.

Examples:

- Windows: `file:///C:/path/to/OBS-Scene-Assets/assets/scenes/starting-soon.html`
- macOS: `file:///Users/you/OBS-Scene-Assets/assets/scenes/starting-soon.html`
- Linux: `file:///home/you/OBS-Scene-Assets/assets/scenes/starting-soon.html`

Set the width and height to the resolution shown in [asset-catalog.md](asset-catalog.md).

## 5. Add Query Params For Fast Customization

Many reusable assets now support shared query params. You can append them directly in OBS:

```text
file:///C:/path/to/OBS-Scene-Assets/assets/scenes/countdown-timer.html?headline=Launch+Countdown&title=Creator+Roundtable+Starts+Soon&timer=15:00&accent=%230ea5e9
```

See [customization-tips.md](customization-tips.md) for more examples.

## 6. Positioning Tips

- Put full-screen scenes at the bottom of the source stack.
- Place transparent overlays, lower thirds, and widgets above camera or gameplay sources.
- Lock the Browser Source after positioning it.
- Enable hardware acceleration in OBS when you are stacking several animated browser sources.

## 7. Suggested First-Time Workflow

1. Start with one full-scene layout.
2. Add one transparent overlay or lower third.
3. Add one widget, such as a goal bar or ticker.
4. Save a scene collection export after everything looks right.

If you want ready-made combinations, use [creator-pack-recipes.md](creator-pack-recipes.md).
