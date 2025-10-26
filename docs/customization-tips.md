# Customization Tips

Every asset is a single HTML file so you can customize it with any text editor. The sections below highlight common adjustments and explain how to keep assets performant once you start modifying them.

## 1. Editing text and copy

- Look for placeholder text such as `Your Name`, `@Handle`, or `Event Title` within the HTML.
- Replace these values directly while keeping the surrounding tags intact.
- For repeating items (e.g., schedule entries), duplicate the `<li>` or `<div>` block and update the content.

## 2. Updating colors

Most files define CSS variables near the top of the `<style>` block. Example:

```css
:root {
  --primary: #38bdf8;
  --accent: #f472b6;
}
```

Change the hex values to match your brand. When no variables are present, search for color codes (e.g., `#0f172a`) and update them consistently.

## 3. Switching fonts

- Assets that use Google Fonts include `@import` statements. Replace the URL with your preferred typeface from Google Fonts or another provider.
- To use a local font, install it on your system and override the `font-family` declarations.
- Keep fallback fonts in the list for better cross-platform rendering.

## 4. Adjusting timers and animation speed

- Countdown scenes expose a `targetDate` or duration variable in the embedded JavaScript. Update it to the date/time you need.
- CSS animations typically use the `animation-duration` property. Increase the number for slower movement, decrease for faster.
- If you need the animation to run once, set `animation-iteration-count: 1`.

## 5. Linking to live data

Some widgets contain placeholder arrays:

```js
const events = [
  { name: 'SampleUser', value: '$5 Tip' }
];
```

Replace the array with your own data source or wire it up to a local web socket / chatbot script. Because these are static HTML files, you can embed additional JavaScript to fetch JSON endpoints or listen to `window.obsstudio` messages.

## 6. Responsiveness and scaling

- Most designs target 1920×1080. If you stream at a different resolution, adjust the CSS container sizes or use OBS transforms to scale the Browser Source.
- To maintain crisp text when scaling, enable **High DPI scaling** (OBS Settings → Advanced → General).

## 7. Performance considerations

- Avoid embedding very large images or unoptimized video backgrounds; they can increase CPU/GPU usage.
- When adding external scripts, host them locally whenever possible to avoid latency.
- Test each asset after modifications to confirm animations remain smooth.

## 8. Version control

- Commit your changes in Git to keep a history of edits.
- Store customized copies in a separate branch or fork so you can pull future updates from the upstream project.

By following these tips you can tailor every overlay, widget, and scene to match your channel’s branding without breaking the underlying layout.
