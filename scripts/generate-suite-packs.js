const fs = require('fs');
const path = require('path');
const { ROOT_DIR, buildMetadataBlock } = require('./asset-library');

const SUITES = [
  {
    collection: 'charity-marathon',
    name: 'Charity Marathon',
    label: 'Charity Marathon Suite',
    eyebrow: 'Community-first broadcast kit',
    audience: 'fundraising streams, milestone pushes, and community challenge events',
    colors: {
      accent: '#fb7185',
      accentSecondary: '#f59e0b',
      accentTertiary: '#f97316',
      text: '#fff7ed',
      muted: 'rgba(255, 247, 237, 0.78)',
      line: 'rgba(255, 247, 237, 0.16)',
      surface: 'rgba(38, 15, 24, 0.72)',
      surfaceStrong: 'rgba(38, 15, 24, 0.9)',
      backdropStart: '#1a0d17',
      backdropMid: '#2e1220',
      backdropEnd: '#12060a',
    },
    startTitle: 'Countdown to the next donation push',
    startHeadline: 'Keep milestone pacing clear while the pre-show warms up.',
    breakTitle: 'Quick reset. The mission stays active.',
    breakHeadline: 'Use this scene for hydration breaks, guest swaps, or tally resets.',
    scheduleTitle: 'Tonight\'s milestone ladder',
    closingTitle: 'Thanks for pushing the campaign forward',
    backgroundTitle: 'Warm stage glow for community events',
    alertTitle: 'Supporter surge detected',
    alertHeadline: 'A fresh milestone just landed.',
    goalTitle: 'Unlock the next stretch goal',
    promoTitle: 'Tonight\'s big checkpoint',
    promoHeadline: 'Share the next challenge tier',
    promoDescription: 'Use the square card for sponsor shout-outs, donation goals, guest call-ins, or campaign updates.',
    scheduleItems: [
      'Pre-show countdown and opening context',
      'Guest drop-in plus campaign update',
      'Stretch goal challenge unlock',
      'Wrap-up thank you and next checkpoint',
    ],
    promoItems: [
      'Highlight the next challenge threshold',
      'Swap in sponsor copy without redesigning the scene',
      'Works in OBS, Discord stages, or socials',
    ],
    overlayItems: [
      'Current goal',
      'Latest supporter',
      'Next unlock',
    ],
    tags: ['charity', 'community', 'fundraising', 'marathon', 'milestone', 'white-label'],
  },
  {
    collection: 'cozy-campfire',
    name: 'Cozy Campfire',
    label: 'Cozy Campfire Suite',
    eyebrow: 'Soft ambience for slower streams',
    audience: 'cozy chats, book clubs, craft streams, and low-pressure community hangs',
    colors: {
      accent: '#f59e0b',
      accentSecondary: '#f97316',
      accentTertiary: '#84cc16',
      text: '#fff7ed',
      muted: 'rgba(255, 247, 237, 0.76)',
      line: 'rgba(255, 247, 237, 0.14)',
      surface: 'rgba(47, 28, 17, 0.72)',
      surfaceStrong: 'rgba(47, 28, 17, 0.9)',
      backdropStart: '#140d08',
      backdropMid: '#2a1a11',
      backdropEnd: '#0f1208',
    },
    startTitle: 'Warm-up time before the cozy hang',
    startHeadline: 'A soft countdown scene for slow intros and calm pacing.',
    breakTitle: 'Tea refill and comfort break',
    breakHeadline: 'Keep the atmosphere warm while the stream resets for a moment.',
    scheduleTitle: 'Tonight\'s cozy rundown',
    closingTitle: 'Thanks for spending the evening here',
    backgroundTitle: 'Soft glow loop for calm creator sets',
    alertTitle: 'Fresh community wave',
    alertHeadline: 'A new guest just wandered into camp.',
    goalTitle: 'Build toward the next comfy milestone',
    promoTitle: 'Tonight\'s warm little plan',
    promoHeadline: 'Use the card for drop-ins, prompts, or a quiet CTA',
    promoDescription: 'White-label enough for study streams, bedtime routines, journaling nights, or any calm creator format.',
    scheduleItems: [
      'Soft countdown and check-in prompt',
      'Main cozy segment or deep-dive chat',
      'Break for tea, stretch, or scene swap',
      'Gentle wrap-up with tomorrow\'s theme',
    ],
    promoItems: [
      'Great for book club notes or prompt cards',
      'Swap colors fast with the shared accent param',
      'Keeps the stream branded without feeling loud',
    ],
    overlayItems: [
      'Mood board',
      'Live prompt',
      'Community note',
    ],
    tags: ['ambient', 'calm', 'cozy', 'craft', 'lifestyle', 'white-label'],
  },
  {
    collection: 'education-workshop',
    name: 'Education Workshop',
    label: 'Education Workshop Suite',
    eyebrow: 'Clean framing for lessons and coaching',
    audience: 'tutorial streams, live classes, coaching sessions, and build-along workshops',
    colors: {
      accent: '#38bdf8',
      accentSecondary: '#14b8a6',
      accentTertiary: '#a3e635',
      text: '#ecfeff',
      muted: 'rgba(236, 254, 255, 0.78)',
      line: 'rgba(236, 254, 255, 0.16)',
      surface: 'rgba(8, 31, 46, 0.72)',
      surfaceStrong: 'rgba(8, 31, 46, 0.92)',
      backdropStart: '#051018',
      backdropMid: '#0b2232',
      backdropEnd: '#0b1717',
    },
    startTitle: 'Workshop opens in a moment',
    startHeadline: 'Stage the lesson clearly before you switch to live teaching.',
    breakTitle: 'Pause for notes and a quick regroup',
    breakHeadline: 'Useful for Q-and-A resets, lesson transitions, or slide changes.',
    scheduleTitle: 'Session plan at a glance',
    closingTitle: 'Thanks for building along with us',
    backgroundTitle: 'Structured loop for training and demos',
    alertTitle: 'Question queue updated',
    alertHeadline: 'A new audience prompt is ready.',
    goalTitle: 'Complete the next learning checkpoint',
    promoTitle: 'What we cover next',
    promoHeadline: 'Share a module, worksheet, or live challenge',
    promoDescription: 'Built for workshops, tutorials, office hours, and coaching formats that need calm structure.',
    scheduleItems: [
      'Opening context and key outcomes',
      'Main walkthrough or live build',
      'Short question block and recap',
      'Next-step resources and sign-off',
    ],
    promoItems: [
      'Drop module links or challenge prompts',
      'Great for course launches and office hours',
      'Clean enough for business, maker, or classroom streams',
    ],
    overlayItems: [
      'Lesson focus',
      'Question queue',
      'Resource links',
    ],
    tags: ['classroom', 'coaching', 'education', 'learning', 'tutorial', 'white-label'],
  },
  {
    collection: 'launch-event',
    name: 'Launch Event',
    label: 'Launch Event Suite',
    eyebrow: 'High-clarity assets for reveal moments',
    audience: 'product launches, channel rebrands, premiere nights, and announcement streams',
    colors: {
      accent: '#a855f7',
      accentSecondary: '#ec4899',
      accentTertiary: '#f97316',
      text: '#fdf4ff',
      muted: 'rgba(253, 244, 255, 0.78)',
      line: 'rgba(253, 244, 255, 0.16)',
      surface: 'rgba(34, 12, 44, 0.74)',
      surfaceStrong: 'rgba(34, 12, 44, 0.92)',
      backdropStart: '#12051a',
      backdropMid: '#230b34',
      backdropEnd: '#1a0912',
    },
    startTitle: 'Launch countdown is live',
    startHeadline: 'Built for reveal streams where pacing and anticipation matter.',
    breakTitle: 'Reset before the next drop',
    breakHeadline: 'Use this between reveal beats, demos, or guest intros.',
    scheduleTitle: 'Launch night sequence',
    closingTitle: 'The drop is out in the world now',
    backgroundTitle: 'Hero backdrop for countdowns and reveal beats',
    alertTitle: 'Announcement pulse incoming',
    alertHeadline: 'A new reveal moment just opened.',
    goalTitle: 'Push toward the next launch milestone',
    promoTitle: 'The next big reveal',
    promoHeadline: 'Frame sponsor moments, drops, or roadmap notes',
    promoDescription: 'Sharp enough for launch campaigns while staying generic enough for any creator or brand update.',
    scheduleItems: [
      'Warm-up countdown and pre-show context',
      'Core reveal or featured announcement',
      'Demo, guest reaction, or behind-the-scenes beat',
      'Final CTA and post-launch wrap-up',
    ],
    promoItems: [
      'Great for release notes or drop timing',
      'Swap copy fast without breaking the look',
      'Works for creator launches and brand premieres alike',
    ],
    overlayItems: [
      'Reveal lane',
      'Key update',
      'Next CTA',
    ],
    tags: ['announcement', 'countdown', 'launch', 'premiere', 'reveal', 'white-label'],
  },
  {
    collection: 'music-pulse',
    name: 'Music Pulse',
    label: 'Music Pulse Suite',
    eyebrow: 'Performance-ready motion for music streams',
    audience: 'DJ sets, beat-making sessions, listening parties, and performance-led creator streams',
    colors: {
      accent: '#22d3ee',
      accentSecondary: '#8b5cf6',
      accentTertiary: '#f43f5e',
      text: '#f5f3ff',
      muted: 'rgba(245, 243, 255, 0.78)',
      line: 'rgba(245, 243, 255, 0.16)',
      surface: 'rgba(17, 16, 44, 0.72)',
      surfaceStrong: 'rgba(17, 16, 44, 0.9)',
      backdropStart: '#090711',
      backdropMid: '#151339',
      backdropEnd: '#130816',
    },
    startTitle: 'Set opens in just a minute',
    startHeadline: 'Give the stream a pulse before the first track hits.',
    breakTitle: 'Quick reset between sets',
    breakHeadline: 'Perfect for scene changes, guest swaps, or a short tempo reset.',
    scheduleTitle: 'Tonight\'s set flow',
    closingTitle: 'Thanks for riding the whole set',
    backgroundTitle: 'Stage-ready loop for music-led scenes',
    alertTitle: 'Audience energy spike',
    alertHeadline: 'The room just got louder.',
    goalTitle: 'Push toward the next set milestone',
    promoTitle: 'What drops next',
    promoHeadline: 'Use this for guest sets, releases, or merch pushes',
    promoDescription: 'A broad music-first pack that still works for talk-led creator moments around performance culture.',
    scheduleItems: [
      'Opening countdown and crowd warm-up',
      'Main set, showcase, or live breakdown',
      'Short transition between segments',
      'Closing CTA and next-release plug',
    ],
    promoItems: [
      'Built for episodes, drops, and community mixes',
      'Square format is easy to reuse off-stream',
      'Reads well in neon-heavy or dark scenes',
    ],
    overlayItems: [
      'Now playing',
      'Next up',
      'Live signal',
    ],
    tags: ['dj', 'music', 'performance', 'release', 'set', 'white-label'],
  },
  {
    collection: 'sports-watchalong',
    name: 'Sports Watchalong',
    label: 'Sports Watchalong Suite',
    eyebrow: 'Scoreboard-minded coverage for live reactions',
    audience: 'watchalong streams, postgame shows, fan coverage, and creator-led sports analysis',
    colors: {
      accent: '#22c55e',
      accentSecondary: '#0ea5e9',
      accentTertiary: '#f97316',
      text: '#f0fdf4',
      muted: 'rgba(240, 253, 244, 0.78)',
      line: 'rgba(240, 253, 244, 0.16)',
      surface: 'rgba(10, 28, 20, 0.72)',
      surfaceStrong: 'rgba(10, 28, 20, 0.92)',
      backdropStart: '#07110d',
      backdropMid: '#113025',
      backdropEnd: '#091321',
    },
    startTitle: 'Coverage begins in a minute',
    startHeadline: 'Designed for creator-led watchalongs, score checks, and reaction beats.',
    breakTitle: 'Halftime reset and quick analysis',
    breakHeadline: 'Use this during intermissions, between events, or before the next kickoff.',
    scheduleTitle: 'Coverage rundown',
    closingTitle: 'Thanks for watching the whole match with us',
    backgroundTitle: 'Field-inspired backdrop for analysis scenes',
    alertTitle: 'Momentum swing incoming',
    alertHeadline: 'Something big just happened on the board.',
    goalTitle: 'Hit the next watchalong milestone',
    promoTitle: 'Next matchup on deck',
    promoHeadline: 'Frame schedules, polls, or sponsor reads cleanly',
    promoDescription: 'Works for fan-led sports streams without locking the design to one league, team, or broadcast partner.',
    scheduleItems: [
      'Pre-game setup and matchup context',
      'Live reaction block or analysis window',
      'Intermission breakdown and chat poll',
      'Postgame recap and next event tease',
    ],
    promoItems: [
      'Useful for brackets, polls, or match cards',
      'Generic enough for many sports formats',
      'Keeps a sporty feel without licensing baggage',
    ],
    overlayItems: [
      'Current matchup',
      'Score pulse',
      'Next segment',
    ],
    tags: ['analysis', 'sports', 'watchalong', 'matchup', 'scoreboard', 'white-label'],
  },
  {
    collection: 'travel-vlog',
    name: 'Travel Vlog',
    label: 'Travel Vlog Suite',
    eyebrow: 'Bright utility assets for location-first streaming',
    audience: 'IRL streams, travel updates, walking tours, and creator-led city guides',
    colors: {
      accent: '#38bdf8',
      accentSecondary: '#f97316',
      accentTertiary: '#facc15',
      text: '#f8fafc',
      muted: 'rgba(248, 250, 252, 0.78)',
      line: 'rgba(248, 250, 252, 0.16)',
      surface: 'rgba(12, 27, 42, 0.72)',
      surfaceStrong: 'rgba(12, 27, 42, 0.9)',
      backdropStart: '#081119',
      backdropMid: '#143148',
      backdropEnd: '#2f1a0f',
    },
    startTitle: 'Route opens in a moment',
    startHeadline: 'Built for location updates, itinerary streams, and broad IRL creator workflows.',
    breakTitle: 'Quick reset before the next stop',
    breakHeadline: 'Use this during scene swaps, transport gaps, or a battery break.',
    scheduleTitle: 'Today\'s route plan',
    closingTitle: 'Thanks for tagging along today',
    backgroundTitle: 'Postcard-style loop for location streams',
    alertTitle: 'Fresh stop on the route',
    alertHeadline: 'A new location beat is ready.',
    goalTitle: 'Reach the next route milestone',
    promoTitle: 'Next stop coming up',
    promoHeadline: 'Share sponsor reads, route notes, or live check-ins',
    promoDescription: 'Generic enough for travel, IRL, event-floor coverage, and city guide formats.',
    scheduleItems: [
      'Opening route check and live conditions',
      'Main stop, walkthrough, or interview',
      'Transit break and viewer questions',
      'Wrap-up with the next route note',
    ],
    promoItems: [
      'Works for maps, route cards, and stop notes',
      'Feels mobile-first without being locked to vertical video',
      'Easy to adapt for sponsor-friendly travel moments',
    ],
    overlayItems: [
      'Current stop',
      'Route note',
      'Next move',
    ],
    tags: ['irl', 'location', 'mobile', 'travel', 'vlog', 'white-label'],
  },
  {
    collection: 'wellness-retreat',
    name: 'Wellness Retreat',
    label: 'Wellness Retreat Suite',
    eyebrow: 'Calm presentation for reflection-led broadcasts',
    audience: 'wellness streams, guided sessions, habit tracking, and soft-focus community check-ins',
    colors: {
      accent: '#2dd4bf',
      accentSecondary: '#84cc16',
      accentTertiary: '#f59e0b',
      text: '#f0fdfa',
      muted: 'rgba(240, 253, 250, 0.78)',
      line: 'rgba(240, 253, 250, 0.16)',
      surface: 'rgba(8, 33, 31, 0.7)',
      surfaceStrong: 'rgba(8, 33, 31, 0.9)',
      backdropStart: '#061412',
      backdropMid: '#0e2b2a',
      backdropEnd: '#172612',
    },
    startTitle: 'Session begins in a calm minute',
    startHeadline: 'Keep the energy clear and gentle before the live session starts.',
    breakTitle: 'Breathing room before the next segment',
    breakHeadline: 'Useful for resets between guided blocks, prompts, or quiet Q-and-A.',
    scheduleTitle: 'Session flow and checkpoints',
    closingTitle: 'Thanks for sharing this moment with us',
    backgroundTitle: 'Breathing-space loop for calm creator sessions',
    alertTitle: 'Fresh check-in moment',
    alertHeadline: 'A new reflection prompt just arrived.',
    goalTitle: 'Reach the next wellness checkpoint',
    promoTitle: 'Today\'s gentle focus',
    promoHeadline: 'Use the card for prompts, challenges, or next-step guidance',
    promoDescription: 'Ideal for calm, trust-building streams that need structure without harsh broadcast energy.',
    scheduleItems: [
      'Soft opening and focus-setting prompt',
      'Main guided block or creator check-in',
      'Pause for breath and viewer reflection',
      'Closing notes and tomorrow\'s next step',
    ],
    promoItems: [
      'Great for reflection prompts and habits',
      'Clean enough for health, journaling, or mindfulness creators',
      'Lets the stream stay calm without feeling plain',
    ],
    overlayItems: [
      'Focus note',
      'Breath cue',
      'Next prompt',
    ],
    tags: ['calm', 'guided', 'mindfulness', 'retreat', 'wellness', 'white-label'],
  },
];

const ASSET_DEFINITIONS = [
  {
    category: 'alerts',
    slug: 'supporter-surge-alert',
    resolution: '800x450',
    transparent: 'true',
    title: (suite) => `${suite.name} Supporter Surge Alert`,
    useCase: (suite) => `Animated alert card for ${suite.audience}.`,
    description: (suite) => `Compact alert with layered motion and white-label framing for ${suite.name.toLowerCase()} broadcasts.`,
    extraTags: ['alert', 'supporter', 'surge'],
    render: renderAlert,
  },
  {
    category: 'backgrounds',
    slug: 'ambient-loop',
    resolution: '1920x1080',
    transparent: 'false',
    title: (suite) => `${suite.name} Ambient Background`,
    useCase: (suite) => `Looping full-screen background for ${suite.audience}.`,
    description: (suite) => `Animated backdrop built to carry ${suite.name.toLowerCase()} scenes without locking the design to one creator brand.`,
    extraTags: ['ambient', 'background', 'loop'],
    render: renderBackground,
  },
  {
    category: 'lower-thirds',
    slug: 'segment-intro',
    resolution: '1920x260',
    transparent: 'true',
    title: (suite) => `${suite.name} Segment Intro Lower Third`,
    useCase: (suite) => `Reusable lower third for names, topics, or CTAs in ${suite.audience}.`,
    description: (suite) => `Transparent lower third with a strong headline lane and flexible copy blocks for ${suite.name.toLowerCase()} segments.`,
    extraTags: ['cta', 'intro', 'lower-third', 'segment'],
    render: renderLowerThird,
  },
  {
    category: 'overlays',
    slug: 'live-frame',
    resolution: '1920x1080',
    transparent: 'true',
    title: (suite) => `${suite.name} Live Frame Overlay`,
    useCase: (suite) => `Full-frame overlay for commentary, facecam, or main presentation scenes in ${suite.audience}.`,
    description: (suite) => `Transparent live frame with a modular header and sidebar notes tailored to ${suite.name.toLowerCase()} coverage.`,
    extraTags: ['frame', 'live', 'overlay'],
    render: renderOverlay,
  },
  {
    category: 'scenes',
    slug: 'break-screen',
    resolution: '1920x1080',
    transparent: 'false',
    title: (suite) => `${suite.name} Break Screen`,
    useCase: (suite) => `Intermission scene for ${suite.audience}.`,
    description: (suite) => `Break layout with timer space, helper copy, and a structured side rail for ${suite.name.toLowerCase()} streams.`,
    extraTags: ['break', 'intermission', 'scene'],
    render: renderBreakScene,
  },
  {
    category: 'scenes',
    slug: 'closing-screen',
    resolution: '1920x1080',
    transparent: 'false',
    title: (suite) => `${suite.name} Closing Screen`,
    useCase: (suite) => `Wrap-up scene for sign-offs, thank-yous, and next-step CTAs in ${suite.audience}.`,
    description: (suite) => `Closing scene that keeps the final call to action readable and polished for ${suite.name.toLowerCase()} creators.`,
    extraTags: ['closing', 'outro', 'scene'],
    render: renderClosingScene,
  },
  {
    category: 'scenes',
    slug: 'schedule-board',
    resolution: '1920x1080',
    transparent: 'false',
    title: (suite) => `${suite.name} Schedule Board Scene`,
    useCase: (suite) => `Schedule and run-of-show scene for ${suite.audience}.`,
    description: (suite) => `Planner-style scene for outlining a live session, route, or milestone ladder in ${suite.name.toLowerCase()} formats.`,
    extraTags: ['agenda', 'schedule', 'scene'],
    render: renderScheduleScene,
  },
  {
    category: 'scenes',
    slug: 'starting-soon',
    resolution: '1920x1080',
    transparent: 'false',
    title: (suite) => `${suite.name} Starting Soon Scene`,
    useCase: (suite) => `Pre-show countdown scene for ${suite.audience}.`,
    description: (suite) => `Starting-soon scene with timer-ready framing and flexible agenda copy for ${suite.name.toLowerCase()} broadcasts.`,
    extraTags: ['countdown', 'pre-show', 'scene', 'starting-soon'],
    render: renderStartingSoonScene,
  },
  {
    category: 'transitions',
    slug: 'scene-sweep',
    resolution: '1920x1080',
    transparent: 'false',
    title: (suite) => `${suite.name} Scene Sweep Transition`,
    useCase: (suite) => `Stylized transition asset for moving between ${suite.audience} scenes.`,
    description: (suite) => `Bold sweep transition with enough motion to sell a scene change while staying adaptable to many ${suite.name.toLowerCase()} use cases.`,
    extraTags: ['sweep', 'transition', 'wipe'],
    render: renderTransition,
  },
  {
    category: 'widgets',
    slug: 'goal-widget',
    resolution: '900x260',
    transparent: 'true',
    title: (suite) => `${suite.name} Goal Widget`,
    useCase: (suite) => `Progress widget for milestones, checkpoints, or audience targets in ${suite.audience}.`,
    description: (suite) => `Compact goal tracker with fast text overrides for ${suite.name.toLowerCase()} campaigns or creator milestones.`,
    extraTags: ['goal', 'progress', 'widget'],
    render: renderGoalWidget,
  },
  {
    category: 'widgets',
    slug: 'promo-card',
    resolution: '900x900',
    transparent: 'true',
    title: (suite) => `${suite.name} Promo Card`,
    useCase: (suite) => `Square promo panel for announcements, sponsor notes, or segment teases in ${suite.audience}.`,
    description: (suite) => `Reusable square card that carries the ${suite.name.toLowerCase()} look across stream scenes, socials, and promo moments.`,
    extraTags: ['card', 'promo', 'widget'],
    render: renderPromoCard,
  },
];

function hexToRgba(hex, alpha) {
  const normalized = hex.replace('#', '');
  const safe = normalized.length === 3
    ? normalized.split('').map((character) => character + character).join('')
    : normalized;
  const value = Number.parseInt(safe, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function suiteVars(suite) {
  return `
      --accent: ${suite.colors.accent};
      --accent-secondary: ${suite.colors.accentSecondary};
      --accent-tertiary: ${suite.colors.accentTertiary};
      --text: ${suite.colors.text};
      --muted: ${suite.colors.muted};
      --line: ${suite.colors.line};
      --surface: ${suite.colors.surface};
      --surface-strong: ${suite.colors.surfaceStrong};
      --shadow: ${hexToRgba('#020617', 0.42)};
      --glow: ${hexToRgba(suite.colors.accent, 0.32)};
      --bg-start: ${suite.colors.backdropStart};
      --bg-mid: ${suite.colors.backdropMid};
      --bg-end: ${suite.colors.backdropEnd};
      --wash-a: ${hexToRgba(suite.colors.accent, 0.22)};
      --wash-b: ${hexToRgba(suite.colors.accentSecondary, 0.18)};
      --wash-c: ${hexToRgba(suite.colors.accentTertiary, 0.18)};
  `;
}

function renderBadgeList(items, className) {
  return items.map((item) => `<span class="${className}">${escapeHtml(item)}</span>`).join('\n');
}

function renderCardItems(items, className) {
  return items.map((item) => `<div class="${className}">${escapeHtml(item)}</div>`).join('\n');
}

function renderListItems(items, className) {
  return items.map((item) => `<li class="${className}">${escapeHtml(item)}</li>`).join('\n');
}

function buildBodyBackground() {
  return `
      background:
        radial-gradient(circle at 16% 18%, var(--wash-a), transparent 28%),
        radial-gradient(circle at 82% 18%, var(--wash-b), transparent 30%),
        radial-gradient(circle at 70% 78%, var(--wash-c), transparent 28%),
        linear-gradient(145deg, var(--bg-start), var(--bg-mid) 58%, var(--bg-end));
  `;
}

function renderAlert(suite) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(`${suite.name} Supporter Surge Alert`)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {${suiteVars(suite)}
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: transparent;
      color: var(--text);
      font-family: "Segoe UI", Tahoma, sans-serif;
    }

    .alert {
      position: relative;
      width: min(92vw, 760px);
      padding: 1.35rem;
      border-radius: 1.5rem;
      border: 1px solid var(--line);
      background:
        linear-gradient(135deg, ${hexToRgba(suite.colors.accent, 0.18)}, ${hexToRgba(suite.colors.accentSecondary, 0.12)}),
        var(--surface-strong);
      box-shadow: 0 22px 48px var(--shadow);
      overflow: hidden;
      display: grid;
      gap: 1rem;
    }

    .alert::before,
    .alert::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: auto;
      pointer-events: none;
    }

    .alert::before {
      width: 240px;
      height: 240px;
      top: -90px;
      right: -60px;
      background: ${hexToRgba(suite.colors.accent, 0.2)};
      animation: pulse 3s ease-in-out infinite;
    }

    .alert::after {
      width: 170px;
      height: 170px;
      bottom: -60px;
      left: -40px;
      background: ${hexToRgba(suite.colors.accentSecondary, 0.18)};
      animation: pulse 3s ease-in-out infinite 0.7s;
    }

    .eyebrow,
    .headline {
      position: relative;
      z-index: 1;
      width: fit-content;
      padding: 0.5rem 0.8rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.07);
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    h1 {
      position: relative;
      z-index: 1;
      margin: 0;
      max-width: 12ch;
      font-size: clamp(2rem, 5vw, 3.1rem);
      line-height: 0.96;
      letter-spacing: -0.05em;
    }

    p {
      position: relative;
      z-index: 1;
      margin: 0;
      max-width: 44ch;
      color: var(--muted);
      line-height: 1.6;
    }

    .meter {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.45rem;
    }

    .meter span {
      height: 0.6rem;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      animation: rise 1.4s ease-in-out infinite;
    }

    .meter span:nth-child(2) { animation-delay: 0.12s; }
    .meter span:nth-child(3) { animation-delay: 0.24s; }
    .meter span:nth-child(4) { animation-delay: 0.36s; }

    @keyframes pulse {
      0%, 100% { transform: scale(0.92); opacity: 0.65; }
      50% { transform: scale(1.08); opacity: 1; }
    }

    @keyframes rise {
      0%, 100% { transform: scaleY(0.7); opacity: 0.7; }
      50% { transform: scaleY(1); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="alert">
    <div class="eyebrow" id="subtitle">${escapeHtml(suite.label)}</div>
    <h1 id="title">${escapeHtml(suite.alertTitle)}</h1>
    <div class="headline" id="headline">${escapeHtml(suite.alertHeadline)}</div>
    <p id="description">Built for ${escapeHtml(suite.audience)} while staying broad enough to reuse across many white-label creator brands.</p>
    <div class="meter" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const subtitle = params.get('subtitle');
    const headline = params.get('headline');
    const accent = params.get('accent');
    if (title) document.getElementById('title').textContent = title;
    if (subtitle) document.getElementById('subtitle').textContent = subtitle;
    if (headline) document.getElementById('headline').textContent = headline;
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-secondary', accent);
    }
  </script>
</body>
</html>`;
}

function renderBackground(suite) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(`${suite.name} Ambient Background`)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {${suiteVars(suite)}
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
${buildBodyBackground()}
      color: var(--text);
      font-family: "Segoe UI", Tahoma, sans-serif;
      overflow: hidden;
      display: grid;
      place-items: center;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(8px);
      opacity: 0.82;
      animation: drift 16s ease-in-out infinite;
    }

    .orb-a {
      width: 320px;
      height: 320px;
      top: 8%;
      left: 8%;
      background: ${hexToRgba(suite.colors.accent, 0.22)};
    }

    .orb-b {
      width: 260px;
      height: 260px;
      bottom: 12%;
      right: 12%;
      background: ${hexToRgba(suite.colors.accentSecondary, 0.18)};
      animation-delay: 1s;
    }

    .orb-c {
      width: 220px;
      height: 220px;
      top: 34%;
      right: 20%;
      background: ${hexToRgba(suite.colors.accentTertiary, 0.18)};
      animation-delay: 2s;
    }

    .panel {
      position: relative;
      z-index: 1;
      width: min(88vw, 1040px);
      padding: 2rem 2.2rem;
      border-radius: 2rem;
      border: 1px solid var(--line);
      background: ${hexToRgba('#020617', 0.14)};
      backdrop-filter: blur(16px);
      box-shadow: 0 24px 48px var(--shadow);
      display: grid;
      gap: 1rem;
    }

    .eyebrow {
      margin: 0;
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.24em;
      color: var(--muted);
    }

    h1 {
      margin: 0;
      font-size: clamp(2.5rem, 7vw, 5rem);
      line-height: 0.94;
      letter-spacing: -0.06em;
      max-width: 11ch;
    }

    p {
      margin: 0;
      max-width: 48ch;
      color: var(--muted);
      line-height: 1.7;
      font-size: 1.02rem;
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
    }

    .badge {
      padding: 0.55rem 0.8rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.07);
      font-size: 0.82rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    @keyframes drift {
      0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
      50% { transform: translate3d(0, -18px, 0) scale(1.04); }
    }
  </style>
</head>
<body>
  <div class="orb orb-a" aria-hidden="true"></div>
  <div class="orb orb-b" aria-hidden="true"></div>
  <div class="orb orb-c" aria-hidden="true"></div>
  <div class="panel">
    <p class="eyebrow" id="subtitle">${escapeHtml(suite.eyebrow)}</p>
    <h1 id="title">${escapeHtml(suite.backgroundTitle)}</h1>
    <p id="headline">A white-label full-screen loop for ${escapeHtml(suite.audience)}.</p>
    <div class="badges" id="items">
      ${renderBadgeList(suite.overlayItems, 'badge')}
    </div>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const subtitle = params.get('subtitle');
    const headline = params.get('headline');
    const accent = params.get('accent');
    const items = params.get('items');
    if (title) document.getElementById('title').textContent = title;
    if (subtitle) document.getElementById('subtitle').textContent = subtitle;
    if (headline) document.getElementById('headline').textContent = headline;
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-secondary', accent);
    }
    if (items) {
      const container = document.getElementById('items');
      container.innerHTML = '';
      items.split('|').map((entry) => entry.trim()).filter(Boolean).forEach((entry) => {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = entry;
        container.appendChild(badge);
      });
    }
  </script>
</body>
</html>`;
}

function renderLowerThird(suite) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(`${suite.name} Segment Intro Lower Third`)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {${suiteVars(suite)}
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      background: transparent;
      color: var(--text);
      font-family: "Segoe UI", Tahoma, sans-serif;
      display: grid;
      align-items: end;
      padding: 0 3vw 3vw;
    }

    .lower-third {
      width: min(90vw, 1420px);
      padding: 1rem;
      border-radius: 1.6rem;
      border: 1px solid var(--line);
      background: linear-gradient(90deg, ${hexToRgba(suite.colors.accent, 0.16)}, ${hexToRgba(suite.colors.accentSecondary, 0.1)}), var(--surface-strong);
      box-shadow: 0 22px 48px var(--shadow);
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
    }

    .accent {
      width: 0.8rem;
      align-self: stretch;
      border-radius: 999px;
      background: linear-gradient(180deg, var(--accent), var(--accent-secondary), var(--accent-tertiary));
    }

    .eyebrow {
      margin: 0 0 0.35rem;
      font-size: 0.78rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
    }

    h1 {
      margin: 0;
      font-size: clamp(1.8rem, 4vw, 2.7rem);
      line-height: 1;
      letter-spacing: -0.05em;
    }

    p {
      margin: 0.45rem 0 0;
      color: var(--muted);
      line-height: 1.55;
    }

    .headline {
      padding: 0.9rem 1rem;
      border-radius: 1.1rem;
      background: rgba(255, 255, 255, 0.07);
      min-width: 240px;
      font-size: 0.84rem;
      line-height: 1.5;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="lower-third">
    <div class="accent" aria-hidden="true"></div>
    <div>
      <p class="eyebrow" id="subtitle">${escapeHtml(suite.label)}</p>
      <h1 id="title">${escapeHtml(suite.scheduleTitle)}</h1>
      <p id="description">A flexible lower third for ${escapeHtml(suite.audience)}.</p>
    </div>
    <div class="headline" id="headline">${escapeHtml(suite.promoHeadline)}</div>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const subtitle = params.get('subtitle');
    const headline = params.get('headline');
    const accent = params.get('accent');
    if (title) document.getElementById('title').textContent = title;
    if (subtitle) document.getElementById('subtitle').textContent = subtitle;
    if (headline) document.getElementById('headline').textContent = headline;
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-secondary', accent);
      document.documentElement.style.setProperty('--accent-tertiary', accent);
    }
  </script>
</body>
</html>`;
}

function renderOverlay(suite) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(`${suite.name} Live Frame Overlay`)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {${suiteVars(suite)}
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      background: transparent;
      color: var(--text);
      font-family: "Segoe UI", Tahoma, sans-serif;
    }

    .shell {
      min-height: 100vh;
      padding: 2.2rem;
      display: grid;
      grid-template-columns: 1fr 0.32fr;
      grid-template-rows: auto 1fr auto;
      gap: 1rem;
      grid-template-areas:
        "header sidebar"
        "frame sidebar"
        "footer sidebar";
    }

    .panel {
      border-radius: 1.4rem;
      border: 1px solid var(--line);
      background: ${hexToRgba('#020617', 0.12)};
      box-shadow: 0 18px 42px ${hexToRgba('#020617', 0.18)};
      backdrop-filter: blur(14px);
    }

    .header {
      grid-area: header;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      padding: 1rem 1.15rem;
    }

    .eyebrow {
      margin: 0;
      font-size: 0.78rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
    }

    h1 {
      margin: 0.3rem 0 0;
      font-size: clamp(1.8rem, 4vw, 2.9rem);
      letter-spacing: -0.05em;
    }

    .headline {
      padding: 0.75rem 0.9rem;
      border-radius: 999px;
      background: linear-gradient(90deg, ${hexToRgba(suite.colors.accent, 0.16)}, ${hexToRgba(suite.colors.accentSecondary, 0.12)});
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .frame {
      grid-area: frame;
      position: relative;
      overflow: hidden;
      border-radius: 1.9rem;
      border: 2px solid ${hexToRgba(suite.colors.accent, 0.6)};
      box-shadow: inset 0 0 0 1px ${hexToRgba(suite.colors.accentSecondary, 0.45)};
    }

    .frame::before {
      content: "";
      position: absolute;
      inset: 1.1rem;
      border-radius: 1.3rem;
      border: 1px dashed ${hexToRgba(suite.colors.accentSecondary, 0.38)};
      background:
        radial-gradient(circle at top left, ${hexToRgba(suite.colors.accent, 0.14)}, transparent 28%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
    }

    .frame-title {
      position: absolute;
      top: 1.4rem;
      left: 1.4rem;
      padding: 0.65rem 0.8rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-size: 0.78rem;
    }

    .sidebar {
      grid-area: sidebar;
      padding: 1rem;
      display: grid;
      gap: 0.8rem;
      align-content: start;
    }

    .sidebar-item {
      padding: 0.9rem;
      border-radius: 1.1rem;
      border: 1px solid ${hexToRgba(suite.colors.accent, 0.18)};
      background: rgba(255, 255, 255, 0.05);
      line-height: 1.5;
    }

    .footer {
      grid-area: footer;
      padding: 0.9rem 1.1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
    }

    .footer-chip {
      padding: 0.55rem 0.8rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--muted);
      font-size: 0.8rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="shell">
    <div class="header panel">
      <div>
        <p class="eyebrow" id="subtitle">${escapeHtml(suite.label)}</p>
        <h1 id="title">${escapeHtml(suite.name + ' Live Frame')}</h1>
      </div>
      <div class="headline" id="headline">${escapeHtml(suite.eyebrow)}</div>
    </div>
    <div class="frame" aria-label="${escapeHtml(suite.name)} live frame overlay">
      <div class="frame-title">${escapeHtml(suite.name)}</div>
    </div>
    <div class="sidebar panel" id="items">
      ${renderCardItems(suite.scheduleItems.slice(0, 3), 'sidebar-item')}
    </div>
    <div class="footer panel" id="chips">
      ${renderBadgeList(suite.overlayItems, 'footer-chip')}
    </div>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const subtitle = params.get('subtitle');
    const headline = params.get('headline');
    const accent = params.get('accent');
    const items = params.get('items');
    if (title) document.getElementById('title').textContent = title;
    if (subtitle) document.getElementById('subtitle').textContent = subtitle;
    if (headline) document.getElementById('headline').textContent = headline;
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-secondary', accent);
      document.documentElement.style.setProperty('--accent-tertiary', accent);
    }
    if (items) {
      const list = items.split('|').map((entry) => entry.trim()).filter(Boolean);
      const sidebar = document.getElementById('items');
      const chips = document.getElementById('chips');
      sidebar.innerHTML = '';
      chips.innerHTML = '';
      list.forEach((entry) => {
        const card = document.createElement('div');
        card.className = 'sidebar-item';
        card.textContent = entry;
        sidebar.appendChild(card);
        const chip = document.createElement('span');
        chip.className = 'footer-chip';
        chip.textContent = entry;
        chips.appendChild(chip);
      });
    }
  </script>
</body>
</html>`;
}

function renderSceneShell(suite, options) {
  const listMarkup = renderListItems(options.items, 'list-item');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(options.documentTitle)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {${suiteVars(suite)}
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
${buildBodyBackground()}
      color: var(--text);
      font-family: "Segoe UI", Tahoma, sans-serif;
    }

    .layout {
      min-height: 100vh;
      padding: 2.8rem;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 1rem;
      align-items: stretch;
    }

    .panel {
      border-radius: 1.8rem;
      border: 1px solid var(--line);
      background: ${hexToRgba('#020617', 0.18)};
      backdrop-filter: blur(18px);
      box-shadow: 0 24px 48px var(--shadow);
    }

    .hero {
      padding: 2rem;
      display: grid;
      gap: 1.1rem;
      align-content: space-between;
    }

    .eyebrow {
      margin: 0;
      font-size: 0.82rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--muted);
    }

    h1 {
      margin: 0;
      max-width: 12ch;
      font-size: clamp(2.9rem, 7vw, 5.4rem);
      line-height: 0.92;
      letter-spacing: -0.07em;
    }

    .headline {
      margin: 0;
      max-width: 44ch;
      color: var(--muted);
      line-height: 1.75;
      font-size: 1.02rem;
    }

    .timer {
      width: fit-content;
      padding: 0.85rem 1rem;
      border-radius: 1.2rem;
      background: linear-gradient(90deg, ${hexToRgba(suite.colors.accent, 0.24)}, ${hexToRgba(suite.colors.accentSecondary, 0.14)});
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 700;
      letter-spacing: -0.05em;
    }

    .side {
      padding: 1.6rem;
      display: grid;
      gap: 1rem;
      align-content: start;
    }

    .side-title {
      margin: 0;
      font-size: 0.82rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 0.75rem;
    }

    .list-item {
      padding: 0.95rem 1rem;
      border-radius: 1.15rem;
      border: 1px solid ${hexToRgba(suite.colors.accent, 0.16)};
      background: rgba(255, 255, 255, 0.05);
      line-height: 1.55;
      color: var(--muted);
    }

    .footer-note {
      padding: 0.9rem 1rem;
      border-radius: 1.15rem;
      background: rgba(255, 255, 255, 0.05);
      color: var(--muted);
      line-height: 1.65;
    }
  </style>
</head>
<body>
  <div class="layout">
    <section class="hero panel">
      <div>
        <p class="eyebrow" id="subtitle">${escapeHtml(options.subtitle)}</p>
        <h1 id="title">${escapeHtml(options.title)}</h1>
        <p class="headline" id="headline">${escapeHtml(options.headline)}</p>
      </div>
      <div class="timer" id="timer">${escapeHtml(options.timer)}</div>
    </section>
    <aside class="side panel">
      <p class="side-title">${escapeHtml(options.sideTitle)}</p>
      <ul class="list" id="items">
        ${listMarkup}
      </ul>
      <div class="footer-note">${escapeHtml(options.footer)}</div>
    </aside>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const subtitle = params.get('subtitle');
    const headline = params.get('headline');
    const accent = params.get('accent');
    const timer = params.get('timer');
    const items = params.get('items');
    if (title) document.getElementById('title').textContent = title;
    if (subtitle) document.getElementById('subtitle').textContent = subtitle;
    if (headline) document.getElementById('headline').textContent = headline;
    if (timer) document.getElementById('timer').textContent = timer;
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-secondary', accent);
      document.documentElement.style.setProperty('--accent-tertiary', accent);
    }
    if (items) {
      const list = document.getElementById('items');
      list.innerHTML = '';
      items.split('|').map((entry) => entry.trim()).filter(Boolean).forEach((entry) => {
        const item = document.createElement('li');
        item.className = 'list-item';
        item.textContent = entry;
        list.appendChild(item);
      });
    }
  </script>
</body>
</html>`;
}

function renderStartingSoonScene(suite) {
  return renderSceneShell(suite, {
    documentTitle: `${suite.name} Starting Soon Scene`,
    subtitle: suite.label,
    title: suite.startTitle,
    headline: suite.startHeadline,
    timer: '12:00',
    sideTitle: 'Session setup',
    items: suite.scheduleItems,
    footer: `Built for ${suite.audience}. Shared params: title, subtitle, headline, accent, timer, items.`,
  });
}

function renderBreakScene(suite) {
  return renderSceneShell(suite, {
    documentTitle: `${suite.name} Break Screen`,
    subtitle: suite.label,
    title: suite.breakTitle,
    headline: suite.breakHeadline,
    timer: '05:00',
    sideTitle: 'While we reset',
    items: suite.scheduleItems.slice(1),
    footer: 'Use the timer override for short resets, sponsor blocks, or between-segment pauses.',
  });
}

function renderScheduleScene(suite) {
  return renderSceneShell(suite, {
    documentTitle: `${suite.name} Schedule Board Scene`,
    subtitle: suite.label,
    title: suite.scheduleTitle,
    headline: `A readable run-of-show scene for ${suite.audience}.`,
    timer: 'Run of show',
    sideTitle: 'Agenda blocks',
    items: suite.scheduleItems,
    footer: 'Swap the list with the items query param to turn the board into a daily plan, event ladder, or route map.',
  });
}

function renderClosingScene(suite) {
  return renderSceneShell(suite, {
    documentTitle: `${suite.name} Closing Screen`,
    subtitle: suite.label,
    title: suite.closingTitle,
    headline: `A calm closing frame for ${suite.audience}.`,
    timer: 'See you next time',
    sideTitle: 'Closing beats',
    items: suite.promoItems,
    footer: 'Use this outro for thank-yous, final CTAs, social reminders, or a clean handoff to the next event.',
  });
}

function renderTransition(suite) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(`${suite.name} Scene Sweep Transition`)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {${suiteVars(suite)}
    }

    body {
      margin: 0;
      min-height: 100vh;
${buildBodyBackground()}
      display: grid;
      place-items: center;
      overflow: hidden;
      color: var(--text);
      font-family: "Segoe UI", Tahoma, sans-serif;
      text-transform: uppercase;
    }

    .panel {
      position: relative;
      width: min(86vw, 900px);
      padding: 3rem 2rem;
      border-radius: 2rem;
      border: 2px solid ${hexToRgba(suite.colors.accent, 0.45)};
      background: ${hexToRgba('#020617', 0.22)};
      backdrop-filter: blur(18px);
      box-shadow: 0 24px 56px var(--shadow);
      text-align: center;
      overflow: hidden;
    }

    .panel::before,
    .panel::after {
      content: "";
      position: absolute;
      inset: -20%;
      background: linear-gradient(90deg, transparent, ${hexToRgba(suite.colors.accent, 0.22)}, transparent);
      animation: sweep 2.1s ease-in-out infinite;
      transform: rotate(18deg);
    }

    .panel::after {
      background: linear-gradient(90deg, transparent, ${hexToRgba(suite.colors.accentSecondary, 0.18)}, transparent);
      animation-delay: 0.55s;
      transform: rotate(-18deg);
    }

    h1 {
      position: relative;
      margin: 0;
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      letter-spacing: 0.18em;
    }

    p {
      position: relative;
      margin: 1rem 0 0;
      font-size: 0.88rem;
      letter-spacing: 0.22em;
      color: var(--muted);
    }

    @keyframes sweep {
      0% { transform: translateX(-45%) rotate(18deg); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(45%) rotate(18deg); opacity: 0; }
    }
  </style>
</head>
<body>
  <div class="panel">
    <h1 id="title">${escapeHtml(suite.name + ' Scene Sweep')}</h1>
    <p id="headline">${escapeHtml(suite.eyebrow)}</p>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const headline = params.get('headline');
    const accent = params.get('accent');
    if (title) document.getElementById('title').textContent = title;
    if (headline) document.getElementById('headline').textContent = headline;
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-secondary', accent);
    }
  </script>
</body>
</html>`;
}

function renderGoalWidget(suite) {
  const current = Math.round(68 * (suite.name.length + 10));
  const goal = current + 420;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(`${suite.name} Goal Widget`)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {${suiteVars(suite)}
      --progress: 0.68;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      background: transparent;
      display: grid;
      place-items: center;
      color: var(--text);
      font-family: "Segoe UI", Tahoma, sans-serif;
    }

    .widget {
      width: min(92vw, 860px);
      padding: 1rem 1.1rem;
      border-radius: 1.35rem;
      border: 1px solid var(--line);
      background: linear-gradient(90deg, ${hexToRgba(suite.colors.accent, 0.14)}, ${hexToRgba(suite.colors.accentSecondary, 0.08)}), var(--surface-strong);
      box-shadow: 0 18px 42px var(--shadow);
      display: grid;
      gap: 0.8rem;
    }

    .head,
    .foot {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
    }

    .subtitle,
    .foot {
      color: var(--muted);
      font-size: 0.82rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .title {
      margin-top: 0.25rem;
      font-size: 1.28rem;
      font-weight: 700;
      letter-spacing: -0.04em;
    }

    .numbers strong {
      display: block;
      font-size: 1.28rem;
      letter-spacing: -0.04em;
      text-align: right;
    }

    .track {
      height: 1rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .fill {
      width: calc(var(--progress) * 100%);
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary), var(--accent-tertiary));
    }
  </style>
</head>
<body>
  <div class="widget">
    <div class="head">
      <div>
        <div class="subtitle" id="subtitle">${escapeHtml(suite.label)}</div>
        <div class="title" id="title">${escapeHtml(suite.goalTitle)}</div>
      </div>
      <div class="numbers">
        <strong id="numbers">${current} / ${goal}</strong>
        <div class="subtitle" id="headline">68% complete</div>
      </div>
    </div>
    <div class="track"><div class="fill"></div></div>
    <div class="foot">
      <span>${escapeHtml(suite.eyebrow)}</span>
      <span>Shared params ready</span>
    </div>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const subtitle = params.get('subtitle');
    const headline = params.get('headline');
    const accent = params.get('accent');
    const current = Number(params.get('current'));
    const goal = Number(params.get('goal'));
    if (title) document.getElementById('title').textContent = title;
    if (subtitle) document.getElementById('subtitle').textContent = subtitle;
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-secondary', accent);
      document.documentElement.style.setProperty('--accent-tertiary', accent);
    }
    if (!Number.isNaN(current) && !Number.isNaN(goal) && goal > 0) {
      const progress = Math.min(1, current / goal);
      document.documentElement.style.setProperty('--progress', String(progress));
      document.getElementById('numbers').textContent = current.toLocaleString() + ' / ' + goal.toLocaleString();
      document.getElementById('headline').textContent = Math.round(progress * 100) + '% complete';
    } else if (headline) {
      document.getElementById('headline').textContent = headline;
    }
  </script>
</body>
</html>`;
}

function renderPromoCard(suite) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(`${suite.name} Promo Card`)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {${suiteVars(suite)}
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      background: transparent;
      color: var(--text);
      display: grid;
      place-items: center;
      font-family: "Segoe UI", Tahoma, sans-serif;
    }

    .card {
      width: min(92vw, 860px);
      aspect-ratio: 1;
      padding: 2rem;
      border-radius: 1.9rem;
      border: 1px solid var(--line);
      background:
        radial-gradient(circle at top right, ${hexToRgba(suite.colors.accentSecondary, 0.22)}, transparent 24%),
        linear-gradient(145deg, ${hexToRgba(suite.colors.accent, 0.16)}, rgba(255, 255, 255, 0.03)),
        var(--surface-strong);
      box-shadow: 0 24px 48px var(--shadow);
      display: grid;
      align-content: space-between;
      gap: 1rem;
    }

    .eyebrow {
      margin: 0;
      font-size: 0.78rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--muted);
    }

    h1 {
      margin: 0.55rem 0 1rem;
      max-width: 10ch;
      font-size: clamp(2rem, 4.8vw, 3.5rem);
      line-height: 0.96;
      letter-spacing: -0.06em;
    }

    .description {
      margin: 0;
      max-width: 30ch;
      color: var(--muted);
      line-height: 1.7;
    }

    .headline {
      width: fit-content;
      padding: 0.75rem 0.95rem;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-size: 0.82rem;
      font-weight: 700;
    }

    .items {
      display: grid;
      gap: 0.75rem;
    }

    .item {
      padding: 0.9rem 1rem;
      border-radius: 1.15rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid ${hexToRgba(suite.colors.accent, 0.16)};
      color: var(--muted);
      line-height: 1.55;
    }
  </style>
</head>
<body>
  <div class="card">
    <div>
      <p class="eyebrow" id="subtitle">${escapeHtml(suite.label)}</p>
      <h1 id="title">${escapeHtml(suite.promoTitle)}</h1>
      <p class="description" id="description">${escapeHtml(suite.promoDescription)}</p>
    </div>
    <div class="headline" id="headline">${escapeHtml(suite.promoHeadline)}</div>
    <div class="items" id="items">
      ${renderCardItems(suite.promoItems, 'item')}
    </div>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const subtitle = params.get('subtitle');
    const headline = params.get('headline');
    const accent = params.get('accent');
    const description = params.get('description');
    const items = params.get('items');
    if (title) document.getElementById('title').textContent = title;
    if (subtitle) document.getElementById('subtitle').textContent = subtitle;
    if (headline) document.getElementById('headline').textContent = headline;
    if (description) document.getElementById('description').textContent = description;
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-secondary', accent);
    }
    if (items) {
      const container = document.getElementById('items');
      container.innerHTML = '';
      items.split('|').map((entry) => entry.trim()).filter(Boolean).forEach((entry) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.textContent = entry;
        container.appendChild(item);
      });
    }
  </script>
</body>
</html>`;
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function buildTags(suite, definition) {
  const tags = new Set([...suite.tags, ...definition.extraTags, definition.category, suite.collection]);
  return Array.from(tags).join(', ');
}

function main() {
  let created = 0;
  SUITES.forEach((suite) => {
    ASSET_DEFINITIONS.forEach((definition) => {
      const relativePath = path.join('assets', 'themes', suite.collection, definition.category, `${definition.slug}.html`);
      const filePath = path.join(ROOT_DIR, relativePath);
      const preview = `previews/themes/${suite.collection}/${definition.category}/${definition.slug}.png`;
      const metadata = buildMetadataBlock({
        Title: definition.title(suite),
        Category: definition.category,
        Collection: suite.collection,
        UseCase: definition.useCase(suite),
        Resolution: definition.resolution,
        Transparent: definition.transparent,
        Description: definition.description(suite),
        Tags: buildTags(suite, definition),
        Preview: preview,
      });

      writeFile(filePath, `${metadata}${definition.render(suite)}\n`);
      created += 1;
    });
  });

  process.stdout.write(`Generated ${created} suite assets across ${SUITES.length} collections.\n`);
}

main();
