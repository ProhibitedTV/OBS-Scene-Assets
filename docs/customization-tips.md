# Customization Tips

Every asset in this repo is still a single HTML file, but the fastest way to customize many of them is now through shared query params in the OBS Browser Source URL.

## 1. Shared Query Params

Use these names whenever the asset supports them:

| Param | Typical meaning | Example |
| --- | --- | --- |
| `title` | Main title, presenter name, or card title | `title=Stream+Starts+Soon` |
| `subtitle` | Secondary copy or support line | `subtitle=Live+Q%26A+at+7+PM` |
| `headline` | Small status line, CTA chip, or short banner label | `headline=Episode+12` |
| `accent` | Primary color override | `accent=%23f97316` |
| `timer` | Countdown length in seconds or `MM:SS` / `HH:MM:SS` | `timer=15:00` |
| `items` | Pipe-separated content list for repeating UI | `items=One|Two|Three` |

## 2. OBS URL Examples

Replace the base file path with your local path.

### Twitch Subscription Alert

```text
file:///C:/path/to/OBS-Scene-Assets/assets/alerts/twitch-subscription.html?title=New+Subscriber&headline=PixelPilot+just+subscribed!&subtitle=Month+12+streak&accent=%239146ff
```

### Countdown Timer Scene

```text
file:///C:/path/to/OBS-Scene-Assets/assets/scenes/countdown-timer.html?headline=Launch+Countdown&title=Creator+Roundtable+Begins+Soon&subtitle=Doors+open+when+the+timer+hits+zero&timer=10:00&accent=%230ea5e9
```

### News Ticker

```text
file:///C:/path/to/OBS-Scene-Assets/assets/news/news-ticker.html?headline=Live+Updates&items=Guest+joins+at+8+PM|Merch+drop+after+the+show|Replay+clips+go+live+tomorrow&speed=20&accent=%23ef4444
```

### Multistream Status Scene

```text
file:///C:/path/to/OBS-Scene-Assets/assets/scenes/multistream-status.html?subtitle=Live+distribution+board&title=Creator+Control+Room&headline=Track+your+show+status+across+every+destination&items=twitch::Twitch.tv/YourChannel::Live+Now::Community+night::online|youtube::YouTube.com/@YourChannel::Premiere+Live::Episode+watch+party::starting|tiktok::@YourShortsName::Clip+push::Short-form+teaser+running::rerun
```

### Stream Announcement Lower Third

```text
file:///C:/path/to/OBS-Scene-Assets/assets/lower-thirds/stream-announcement.html?title=Tonight%27s+Special+Guest&subtitle=Live+breakdown+and+community+Q%26A+after+the+main+segment&headline=7:00+PM+Mountain&accent=%232563eb
```

## 3. Working With `items`

`items` is intentionally lightweight. Each asset decides how it interprets the entries, but the common pattern is:

- split entries with `|`
- split structured fields inside each entry with `::`

Examples:

- ticker items: `Headline One|Headline Two|Headline Three`
- rundown items: `Segment 01::Cold open and recap|Segment 02::Guest discussion`
- multistream items: `twitch::Handle::Status::Note::online`
- chat messages: `@viewer::Loved the intro layout|@host::See you in segment two`

## 4. When To Edit The HTML Directly

Use direct file edits when:

- you want to change layout structure
- you need more than a few content overrides
- you are changing fonts, shadows, spacing, or animation timing
- the asset does not yet expose the param you want

For maintainers, prefer adding the shared query-param names when you extend runtime customization to more assets.

## 5. Color Overrides

Most assets define CSS variables near the top of the file. If `accent` is not enough, edit the variables directly in the HTML and keep the variable names descriptive.

Example:

```css
:root {
  --accent: #38bdf8;
  --accent-secondary: #f97316;
}
```

## 6. Preview And Catalog Flow

When you customize an asset for the repo itself rather than for a local OBS scene:

1. update the metadata block if the description or resolution changed
2. add or update the mirrored preview PNG
3. run `npm run assets:generate`
4. run `npm run assets:validate`

That keeps the gallery, catalog JSON, and markdown catalog aligned with the actual asset behavior.
