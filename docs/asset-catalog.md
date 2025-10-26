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
| `digital-grid.html` | Futuristic cyan grid with gentle camera pan. | 1920×1080 | Designed to sit behind overlays; seamless loop. |
| `gradient-wave.html` | Abstract gradient ribbons flowing across screen. | 1920×1080 | Soft color palette for general chatting scenes. |
| `nature-leaves.html` | Botanical leaves with slow parallax motion. | 1920×1080 | Pair with minimalist overlays for a calm vibe. |
| `retro-sunset.html` | Retro synthwave horizon with sun animation. | 1920×1080 | Great for countdowns and retro streams. |
| `soft-bokeh.html` | Blurred bokeh lights floating gently. | 1920×1080 | Low contrast, ideal for text overlays. |
| `space-nebula.html` | Cosmic nebula clouds with star twinkle. | 1920×1080 | Works in sci-fi themes and BRB scenes. |

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

## Theme Collections (`assets/themes/`)

### Cyberpunk Broadcast Suite (`assets/themes/cyberpunk-broadcast/`)

| File | Purpose | Recommended Source Size | Notes |
| --- | --- | --- | --- |
| `control-room-overlay.html` | Full-frame layout for gameplay scenes with HUD accents. | 1920×1080 | Toggle modules by editing the HTML blocks. |
| `data-uplink-overlay.html` | Lower-third system metrics overlay with scrolling ticker. | 1920×360 (Transparent) | Position near the bottom of frame and resize to taste. |
| `dual-host-frame.html` | Split camera frame for co-hosts or guests. | 1920×1080 (Transparent) | Resize the webcam placeholders to match your sources. |
| `holographic-chat-overlay.html` | Neon chat panel with ticker marquee. | 700×900 (Transparent) | Best when paired with darker backgrounds for legibility. |
| `mission-briefing-intro.html` | Pre-show mission briefing slate with schedule timeline. | 1920×1080 | Deploy as an intro or recap loop between segments. |
| `neon-alert.html` | Alert widget featuring holographic badge animation. | 800×450 | Update copy to match the specific alert trigger. |
| `ops-status-dashboard.html` | Mission control stats board for status callouts. | 1920×1080 | Ideal for analyst scenes or between-game breakdowns. |
| `player-intro-lower-third.html` | Animated lower-third for player or guest introductions. | 1920×300 (Transparent) | Edit the accent colors to match team branding. |
| `stinger-transition.html` | High-energy transition with neon sweep. | 1920×1080 | Export as a WebM with alpha if you need animation in OBS. |
| `stream-countdown.html` | Circular countdown timer with orbiting accents. | 1080×1080 | Adjust the displayed time directly in the markup. |
| `synthwave-break-screen.html` | BRB slate with progress indicator and neon grid. | 1920×1080 | Pair with lo-fi audio during intermissions. |

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

