# OBS Setup Guide

This guide explains how to import the assets into OBS Studio on Windows, macOS, and Linux. It assumes you already installed OBS Studio version 28 or later.

## 1. Get the assets locally

1. **Clone via Git**
   ```bash
   git clone https://github.com/your-org/OBS-Scene-Assets.git
   ```
   or
2. **Download the ZIP** from GitHub → Code → Download ZIP, then extract it into a convenient folder (e.g., `Documents/OBS-Scene-Assets`).

Keep the folder structure intact because each Browser Source references a single HTML file.

## 2. Add a Browser Source

1. Open OBS Studio and choose the scene where you want to place the asset.
2. In the **Sources** dock, click the `+` button and select **Browser**.
3. Enter a descriptive name (e.g., `Starting Soon Screen`) and click **OK**.

## 3. Point to the HTML file

1. In the Browser Source properties window, set the **URL** field to the local file path.
   - **Windows** – use the format `file:///C:/full/path/to/OBS-Scene-Assets/assets/scenes/starting-soon.html`
   - **macOS/Linux** – use the format `file:///Users/<you>/OBS-Scene-Assets/assets/...`
2. Adjust **Width** and **Height** to match the recommendation listed in the [Asset Catalog](asset-catalog.md). Full-screen scenes use 1920×1080 by default.
3. Leave **Local File** unchecked if you are entering the `file:///` URL manually. Alternatively, enable **Local File** and browse to the HTML file using the file picker.
4. Click **OK** to confirm.

## 4. Tweak the Browser Source

- **Hardware acceleration** – Keep “Control audio via OBS” disabled for visual overlays unless the asset includes sound.
- **Refresh behavior** – Check “Refresh browser when scene becomes active” if you want timers and animations to restart each time you switch scenes.
- **Custom CSS** – Leave this field blank unless you need to override styling at the OBS level. All assets are already styled internally.

## 5. Layering and positioning

- Use the preview canvas to resize or reposition overlays.
- Lock the source once it is placed to prevent accidental movement.
- For lower thirds and widgets, layer them above your webcam or gameplay captures.

## 6. Customizing assets

Follow the [Customization Tips](customization-tips.md) to update colors, fonts, text, timers, and data feeds. Most files have comments that indicate where to make edits.

## 7. Hosting assets remotely (optional)

If you prefer to host the files on a web server:

1. Upload the `assets/` folder to any static host (GitHub Pages, Netlify, personal VPS).
2. Replace the Browser Source URL with the hosted URL, such as `https://example.com/assets/scenes/starting-soon.html`.
3. Keep a local copy for quick editing and version control.

## 8. Troubleshooting checklist

- **Blank source** – Confirm the `file:///` path is correct and that OBS has permission to read the folder.
- **Fonts not loading** – Some assets reference Google Fonts. Ensure OBS has internet access or replace with local fonts.
- **Timer not updating** – Refresh the browser source or check the JavaScript variables described in each HTML file.
- **Animations stutter** – Enable hardware acceleration and reduce the number of concurrent browser sources if your system is under heavy load.

Once the asset appears correctly, repeat the same process for any additional overlays, alerts, or widgets.
