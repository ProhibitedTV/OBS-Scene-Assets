# Asset Catalog

The following tables summarize every HTML asset available in the repository. Use the **Recommended Source Size** values when configuring a Browser Source in OBS. Items marked as "Transparent" contain alpha backgrounds and should be layered above other sources.

## Alerts (`assets/alerts/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `donation-alert.html` | Donation animation with amount and donor name callout. | 800×450 | Supports manual trigger or third-party alert forwarding. |
| `facebook-stars.html` | Facebook Stars donation alert card. | 800×450 | Update the platform-specific copy to match your branding. |
| `follower-alert.html` | Celebrate new followers with animated confetti burst. | 800×450 | Works well stacked near webcam frames. |
| `raid-alert.html` | Animated welcome banner for incoming raid hosts. | 960×540 | Includes placeholder for raider count. |
| `tiktok-gift.html` | Acknowledges TikTok gifts with looping spark animations. | 800×450 | Replace icon with your preferred emote or logo. |
| `twitch-cheer.html` | Highlights bit cheers with purple particle burst. | 800×450 | Displays cheer amount and optional message snippet. |
| `twitch-subscription.html` | Recognizes new or returning subscribers. | 800×450 | Includes sub streak placeholder text. |
| `youtube-membership.html` | Alert for YouTube channel memberships. | 800×450 | Swap channel badge graphic in the markup. |
| `youtube-superchat.html` | Animated Super Chat notification. | 800×450 | Customize the gradient colors to match your theme. |

## Backgrounds (`assets/backgrounds/`)

| File | Style | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `aurora-borealis.html` | Northern lights gradient with slow shimmer. | 1920×1080 | Works well for calm pre-show loops. |
| `digital-grid.html` | Futuristic cyan grid with gentle camera pan. | 1920×1080 | Designed to sit behind overlays; seamless loop. |
| `gradient-wave.html` | Abstract gradient ribbons flowing across screen. | 1920×1080 | Soft color palette for general chatting scenes. |
| `nature-leaves.html` | Botanical leaves with slow parallax motion. | 1920×1080 | Pair with minimalist overlays for a calm vibe. |
| `retro-sunset.html` | Retro synthwave horizon with sun animation. | 1920×1080 | Great for countdowns and retro streams. |
| `soft-bokeh.html` | Blurred bokeh lights floating gently. | 1920×1080 | Low contrast, ideal for text overlays. |
| `space-nebula.html` | Cosmic nebula clouds with star twinkle. | 1920×1080 | Works in sci-fi themes and BRB scenes. |
| `tech-circuit.html` | Glowing circuit board animation. | 1920×1080 | Pair with tech or esports overlays. |
| `tropical-sunrise.html` | Warm sunrise with palm silhouettes. | 1920×1080 | Bright option for morning or travel streams. |

## Lower Thirds (`assets/lower-thirds/`)

| File | Use Case | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `gaming-angled.html` | Bold gamer tagplate with angled accent. | 1920×250 (Transparent) | Align to bottom-left; adjust animation delay for callouts. |
| `minimalist-bar.html` | Simple bar with name and title slots. | 1600×200 (Transparent) | Great for interviews or podcasts. |
| `modern-news.html` | News-style dual-line chyron. | 1920×250 (Transparent) | Includes ticker slot for additional info. |
| `stream-announcement.html` | Banner for highlights or schedule reminders. | 1920×260 (Transparent) | Includes optional CTA button element. |

## Overlays (`assets/overlays/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `camera-frame.html` | Stylized webcam frame with title header. | 1280×720 (Transparent) | Resize to match your camera crop; supports drop shadow. |
| `chat-box.html` | Browser chat display panel. | 500×900 (Transparent) | Set Browser Source to interact with chat widget embed URL. |
| `event-ticker.html` | Horizontal ticker for top supporters. | 1920×160 (Transparent) | Loop through events via embedded array. |

## Scenes (`assets/scenes/`)

| File | Scene Type | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `be-right-back.html` | Quick BRB slate with countdown. | 1920×1080 | Timer duration configurable in script block. |
| `countdown-timer.html` | Countdown overlay with customizable target time. | 1920×1080 | Update `targetDate` variable for specific events. |
| `ending-soon.html` | Wrap-up screen with socials and credits. | 1920×1080 | Replace social icons and text with your handles. |
| `intermission.html` | Mid-stream intermission layout with schedule. | 1920×1080 | Contains optional chat and now playing modules. |
| `just-chatting.html` | Conversational layout with webcam placeholder. | 1920×1080 | Adjust grid columns to fit your camera aspect. |
| `multistream-status.html` | Shows multi-platform online status. | 1920×1080 | Update platform list inside the data array. |
| `schedule-board.html` | Weekly schedule board. | 1920×1080 | Edit schedule entries in the HTML list. |
| `starting-soon.html` | Pre-stream countdown and highlight reel. | 1920×1080 | Pair with alert widgets for incoming events. |
| `support-goals.html` | Donation/subscriber goals and milestones. | 1920×1080 | Connect to manual updates or chatbot integrations. |

## News (`assets/news/`)

| File | Use Case | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `breaking-news-stinger.html` | Quick animated stinger for transitions. | 1920×1080 | Export to WebM for use as a stinger source. |
| `election-results.html` | Election race results board. | 1920×1080 | Update candidate data in the inline script. |
| `live-location-bug.html` | Live location lower-right identifier. | 600×200 (Transparent) | Layer on top of footage for remote hits. |
| `news-anchor-lower-third.html` | Primary presenter lower third. | 1920×250 (Transparent) | Swap headline and subtext for each story. |
| `news-countdown.html` | Countdown intro slate. | 1920×1080 | Adjust timer length to match your rundown. |
| `news-desk-scene.html` | Main news desk layout. | 1920×1080 | Includes panels for headlines, ticker, and webcam feeds. |
| `news-headlines-stack.html` | Vertical stack of top stories. | 1080×1920 | Ideal for vertical or portrait outputs. |
| `news-ticker.html` | Scrolling headline ticker. | 1920×160 (Transparent) | Populate the headlines array in the script block. |
| `over-the-shoulder.html` | Anchor over-the-shoulder graphic. | 1280×720 (Transparent) | Position above shoulder and update the imagery. |
| `press-conference.html` | Podium scene layout. | 1920×1080 | Customize speaker nameplates and logos. |
| `split-screen-interview.html` | Dual-guest interview layout. | 1920×1080 | Update guest names and adjust camera placeholders. |
| `weather-update.html` | Weather segment scene with forecast data. | 1920×1080 | Edit the daily forecast details in the table. |
| `world-map-background.html` | Animated world map background. | 1920×1080 | Loop behind newsroom overlays for global coverage. |

## Theme Collections (`assets/themes/`)

### Cyberpunk Broadcast Suite (`assets/themes/cyberpunk-broadcast/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `backgrounds/neon-grid.html` | Loopable neon grid background for transparent overlays. | 1920×1080 | Works as a base layer behind widget stacks. |
| `overlays/control-room-overlay.html` | Full-frame layout for gameplay scenes with HUD accents. | 1920×1080 | Toggle modules by editing the HTML blocks. |
| `overlays/data-uplink-overlay.html` | Lower-third system metrics overlay with scrolling ticker. | 1920×360 (Transparent) | Position near the bottom of frame and resize to taste. |
| `overlays/dual-host-frame.html` | Split camera frame for co-hosts or guests. | 1920×1080 (Transparent) | Resize the webcam placeholders to match your sources. |
| `overlays/holographic-chat-overlay.html` | Neon chat panel with ticker marquee. | 700×900 (Transparent) | Best when paired with darker backgrounds for legibility. |
| `overlays/ops-status-dashboard.html` | Mission control stats board for status callouts. | 1920×1080 | Ideal for analyst scenes or between-game breakdowns. |
| `alerts/new-follower.html` | Holographic follower alert widget with refreshed animation. | 800×450 (Transparent) | Update copy to match the specific alert trigger. |
| `lower-thirds/player-intro.html` | Animated lower-third for player or guest introductions. | 1920×300 (Transparent) | Edit the accent colors to match team branding. |
| `scenes/mission-briefing-intro.html` | Pre-show mission briefing slate with schedule timeline. | 1920×1080 | Deploy as an intro or recap loop between segments. |
| `scenes/start-screen.html` | Starting soon scene with mission diagnostics and chat preview. | 1920×1080 | Pair with countdown audio or ambient loops. |
| `scenes/live-screen.html` | Live gameplay layout with modular stat panels. | 1920×1080 | Adjust source placeholders to match your capture setup. |
| `scenes/brb-screen.html` | BRB slate with animated status readout. | 1920×1080 | Ideal for short intermissions. |
| `scenes/end-screen.html` | Stream ending card with credits grid. | 1920×1080 | Update text layers with supporter shout-outs. |
| `scenes/stream-countdown.html` | Circular countdown timer with orbiting accents. | 1080×1080 | Adjust the displayed time directly in the markup. |
| `scenes/synthwave-break-screen.html` | BRB slate with progress indicator and neon grid. | 1920×1080 | Pair with lo-fi audio during intermissions. |
| `transitions/stinger-transition.html` | High-energy transition with neon sweep. | 1920×1080 | Export as a WebM with alpha if you need animation in OBS. |

### Fantasy Legends Suite (`assets/themes/fantasy-legends/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `alerts/summoning-circle-alert.html` | Magical alert with arcane circle animation. | 800×450 (Transparent) | Replace runes or sigils with your guild branding. |
| `overlays/quest-lower-third.html` | Quest-themed lower third. | 1920×300 (Transparent) | Update quest title and subtitle in the markup. |
| `scenes/adventure-countdown.html` | Adventure countdown intro. | 1920×1080 | Adjust the countdown length in the script block. |
| `scenes/enchanted-map-briefing.html` | Map briefing scene with party roster. | 1920×1080 | Edit party list and objective text for each session. |
| `transitions/arcane-portal.html` | Portal-themed wipe transition. | 1920×1080 | Export to WebM for chroma-transparent stinger. |

### Games Collection (`assets/themes/games/`)

#### Apex Legends (`assets/themes/games/apex-legends/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `apex-drop-ship-countdown.html` | Drop ship countdown overlay. | 1920×1080 | Sync the countdown timer to match match start. |
| `apex-ring-alert.html` | Ring closure alert banner. | 1920×300 (Transparent) | Update ring timing text for each round. |
| `apex-squad-overview.html` | Squad roster card. | 1920×1080 | Populate legend picks and loadouts in the table. |

#### Fortnite (`assets/themes/games/fortnite/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `fortnite-battle-bus-start.html` | Battle Bus intro scene. | 1920×1080 | Update drop location tips in the sidebar. |
| `fortnite-loadout-showcase.html` | Loadout showcase panel. | 1920×1080 | Replace weapon and item icons with current selections. |
| `fortnite-storm-alert.html` | Storm alert warning overlay. | 1920×360 (Transparent) | Adjust warning copy for each storm phase. |

#### Halo (`assets/themes/games/halo/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `alerts/orbital-strike-alert.html` | Emergency broadcast alert with UNSC priority messaging. | 1920×1080 | Update location, threat level, and contact info in the text blocks. |
| `backgrounds/halo-ring-orbit.html` | Animated Halo ring vista background with drifting stars. | 1920×1080 | Adjust the glyph text in the pseudo-element to match your installation. |
| `lower-thirds/unsc-fireteam-intro.html` | Lower third introducing fireteam squads. | 1920×320 (Transparent) | Replace squad roster entries and designations in the list items. |
| `overlays/covenant-threat-monitor.html` | Tactical sidebar overlay tracking Covenant signatures. | 1080×1080 (Transparent) | Update threat entries and progress bars for each contact. |
| `overlays/fireteam-status-hud.html` | Horizontal HUD overlay for squad vitals and ammunition. | 1920×500 (Transparent) | Adjust health, shield, and ammunition values directly in the markup. |
| `scenes/armory-loadout-screen.html` | Armory showcase for weapons and equipment. | 1920×1080 | Swap the weapon names and stats for your current loadout. |
| `scenes/brb-screen.html` | BRB slate styled as a shield recharge status display. | 1920×1080 | Change recharge percentage and status text as needed. |
| `scenes/drop-pod-countdown.html` | Drop pod launch countdown with mission brief. | 1920×1080 | Sync timer value and update the objective list per mission. |
| `scenes/end-screen.html` | Stream ending scene with mission debrief summary. | 1920×1080 | Update commendations and closing messaging before export. |
| `scenes/live-screen.html` | Live operations control screen with mission feed and intel panels. | 1920×1080 | Edit mission feed entries and spectator counts for your broadcast. |
| `scenes/mission-briefing-hologrid.html` | Holographic mission briefing with squad assignments. | 1920×1080 | Replace operation title, objective text, and roster chips. |
| `scenes/operations-command-screen.html` | Command center dashboard with tactical overlays. | 1920×1080 | Update tasking directives and map markers to match your event. |
| `scenes/postgame-debrief-screen.html` | Post-match debrief screen summarizing outcomes. | 1920×1080 | Modify after-action report bullet points and statistics. |
| `scenes/start-screen.html` | Starting soon slate styled as a UNSC broadcast relay. | 1920×1080 | Set the emblem SVG or replace copy for your channel branding. |
| `transitions/slipspace-burst.html` | Slipspace burst stinger transition. | 1920×1080 | Export as a WebM with alpha for use as a stinger source. |

#### League of Legends (`assets/themes/games/league-of-legends/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `league-draft-desk.html` | Draft desk scene with ban/pick columns. | 1920×1080 | Update team names and champion pools per match. |
| `league-objective-tracker.html` | Objective tracking widget. | 600×600 (Transparent) | Edit timers for Baron, Dragon, and turret status. |
| `league-victory-screen.html` | Victory celebration scene. | 1920×1080 | Customize animation colors for each team. |

#### Valorant (`assets/themes/games/valorant/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `valorant-match-intro.html` | Match intro slate. | 1920×1080 | Update agent lineup and event branding. |
| `valorant-round-history.html` | Round history tracker. | 1920×1080 | Populate round wins and economy icons. |
| `valorant-spike-status.html` | Spike status widget. | 600×600 (Transparent) | Toggle planted/defused states via provided variables. |

### Newsroom Suite (`assets/themes/newsroom/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `alerts/breaking-news-stinger.html` | Breaking news transition. | 1920×1080 | Render as WebM with alpha for stinger transitions. |
| `alerts/election-results-flip.html` | Election results reveal animation. | 1920×1080 | Customize candidate data and party colors. |
| `overlays/live-location-bug.html` | Live location identifier. | 600×200 (Transparent) | Display city and reporter details. |
| `overlays/news-lower-third.html` | News lower third overlay. | 1920×250 (Transparent) | Update story headline and kicker text. |
| `overlays/news-ticker.html` | Scrolling news ticker. | 1920×160 (Transparent) | Maintain headline list in the script array. |
| `scenes/news-desk-main.html` | Main news desk scene. | 1920×1080 | Replace placeholder video frames with live feeds. |
| `scenes/world-map-background.html` | World map loop background. | 1920×1080 | Use as a base behind other newsroom overlays. |
| `transitions/headline-swipe.html` | Headline swipe transition. | 1920×1080 | Export to WebM for use as a stinger. |

## Widgets (`assets/widgets/`)

| File | Function | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `live-poll.html` | Interactive poll results visualization. | 800×600 (Transparent) | Update poll options array with your question. |
| `multi-event-feed.html` | Rotating list of latest events. | 600×800 (Transparent) | Feeds events from JSON array inside script. |
| `now-playing.html` | Displays current track metadata. | 600×200 (Transparent) | Bind to your music bot via custom JavaScript. |
| `progress-goal.html` | Progress bar with milestone stats. | 800×300 (Transparent) | Update `current` and `goal` values as needed. |
| `social-rotator.html` | Rotating social media handles. | 600×240 (Transparent) | Adjust rotation interval in the script. |

### Catalog maintenance

Whenever you add or rename assets:

1. Update this document with the new entry.
2. Add a thumbnail and description to `assets/index.html` so users can preview it quickly.
3. Confirm the recommended Browser Source size by testing in OBS or referencing the CSS dimensions.

