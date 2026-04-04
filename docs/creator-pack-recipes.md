# Creator Pack Recipes

These recipes show how to combine the new themed suites into practical OBS scene setups without inventing your own stack from scratch.

## Vertical Creator Recipe

Use this for mobile-first streams, short-form creator broadcasts, and portrait interview sessions.

### Recommended scene stack

1. `assets/themes/vertical-creator/scenes/start-screen.html`
2. `assets/themes/vertical-creator/overlays/live-frame.html`
3. Portrait camera or phone capture source
4. `assets/themes/vertical-creator/widgets/chat-panel.html`
5. `assets/themes/vertical-creator/widgets/goal-widget.html`
6. `assets/themes/vertical-creator/lower-thirds/cta-lower-third.html`

### Suggested OBS source sizes

- `start-screen.html`: `1080x1920`
- `live-frame.html`: `1080x1920`
- `chat-panel.html`: `540x1200`
- `goal-widget.html`: `900x260`
- `cta-lower-third.html`: `1080x320`

### Example URLs

```text
file:///C:/path/to/OBS-Scene-Assets/assets/themes/vertical-creator/scenes/start-screen.html?title=Night+Shift+Live&subtitle=Going+live+in+a+moment&timer=05:00&accent=%23f97316&items=Clip+review::Top+moments+from+this+week|Live+segment::Audience+Q%26A+and+creator+breakdowns|Final+CTA::Next+drop+goes+live+tomorrow
```

```text
file:///C:/path/to/OBS-Scene-Assets/assets/themes/vertical-creator/widgets/chat-panel.html?title=Live+Chat&headline=Drop+your+questions&items=%40clipqueen::Need+the+layout+recipe|%40hostmode::Saving+this+for+my+next+short-form+stream
```

## Live Show Recipe

Use this for podcasts, commentary shows, interview formats, sponsor beats, and recurring creator programs.

### Recommended scene stack

1. `assets/themes/live-show/scenes/dual-camera-scene.html`
2. Host camera source
3. Guest camera source
4. `assets/themes/live-show/lower-thirds/host-intro.html`
5. `assets/themes/live-show/lower-thirds/guest-intro.html`
6. `assets/themes/live-show/widgets/promo-card.html`

### Companion scenes

- `assets/themes/live-show/scenes/schedule-scene.html`
- `assets/themes/live-show/scenes/sponsor-slate.html`
- `assets/themes/live-show/scenes/break-screen.html`

### Suggested OBS source sizes

- `dual-camera-scene.html`: `1920x1080`
- `host-intro.html`: `1920x260`
- `guest-intro.html`: `1920x260`
- `promo-card.html`: `900x900`
- `sponsor-slate.html`: `1920x1080`
- `schedule-scene.html`: `1920x1080`
- `break-screen.html`: `1920x1080`

### Example URLs

```text
file:///C:/path/to/OBS-Scene-Assets/assets/themes/live-show/scenes/dual-camera-scene.html?title=Creator+Roundtable+Live&subtitle=Episode+12&headline=Platform+strategy+and+audience+systems&items=Cold+Open::This+week+in+creator+news|Guest+Spotlight::Interview+with+a+live+ops+builder|Final+Beat::Sponsor+segment+and+next+show+tease
```

```text
file:///C:/path/to/OBS-Scene-Assets/assets/themes/live-show/scenes/break-screen.html?title=Short+Intermission&headline=Back+in&timer=03:00&items=Next+segment::Guest+Q%26A+and+clip+breakdown|Sponsor+beat::Quick+partner+reminder+before+we+return
```

## Workflow Notes

- Use one Browser Source per asset so you can toggle pieces independently.
- When you want to reuse the same asset with different copy, duplicate the Browser Source in OBS and change only the URL params.
- Keep the gallery open while building scenes so you can quickly jump between related assets in the same collection.
