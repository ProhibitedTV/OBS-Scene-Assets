const path = require('path');
const {
  ASSETS_DIR,
  buildMetadataBlock,
  extractTitleTag,
  getAssetFiles,
  getLineEnding,
  parseMetadataBlock,
  readFile,
  titleCase,
  writeFile,
} = require('./asset-library');

const catalogPath = path.join(__dirname, '..', 'docs', 'asset-catalog.md');
const catalogText = readFile(catalogPath);

const STOP_WORDS = new Set([
  'and',
  'for',
  'from',
  'into',
  'that',
  'this',
  'with',
  'your',
  'the',
  'obs',
  'html',
]);

const EXPLICIT_CATEGORY_OVERRIDES = {
  'themes/games/apex-legends/apex-drop-ship-countdown.html': 'scenes',
  'themes/games/apex-legends/apex-ring-alert.html': 'overlays',
  'themes/games/apex-legends/apex-squad-overview.html': 'scenes',
  'themes/games/fortnite/fortnite-battle-bus-start.html': 'scenes',
  'themes/games/fortnite/fortnite-loadout-showcase.html': 'scenes',
  'themes/games/fortnite/fortnite-storm-alert.html': 'overlays',
  'themes/games/league-of-legends/league-draft-desk.html': 'scenes',
  'themes/games/league-of-legends/league-objective-tracker.html': 'widgets',
  'themes/games/league-of-legends/league-victory-screen.html': 'scenes',
  'themes/games/valorant/valorant-match-intro.html': 'scenes',
  'themes/games/valorant/valorant-round-history.html': 'overlays',
  'themes/games/valorant/valorant-spike-status.html': 'widgets',
};

function humanizeTitle(relativePath) {
  return titleCase(relativePath.replace(/\.html$/i, '').split('/').pop().replace(/-/g, ' '));
}

function slugifyWords(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function parseCatalogEntries(markdown) {
  const entries = new Map();
  const lines = markdown.split(/\r?\n/);
  let currentCollection = 'core';
  let currentBasePath = '';

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }

    const coreMatch = trimmed.match(/^##\s+.+\(`assets\/([^`]+)\/`\)/);
    if (coreMatch && !trimmed.startsWith('## Theme Collections')) {
      currentCollection = 'core';
      currentBasePath = coreMatch[1];
      return;
    }

    const suiteMatch = trimmed.match(/^###\s+.+\(`assets\/themes\/([^`]+)\/`\)/);
    if (suiteMatch) {
      currentCollection = suiteMatch[1];
      currentBasePath = `themes/${suiteMatch[1]}`;
      return;
    }

    const gameMatch = trimmed.match(/^####\s+.+\(`assets\/themes\/games\/([^`]+)\/`\)/);
    if (gameMatch) {
      currentCollection = `games/${gameMatch[1]}`;
      currentBasePath = `themes/games/${gameMatch[1]}`;
      return;
    }

    if (!trimmed.startsWith('|') || trimmed.startsWith('| ---')) {
      return;
    }

    const columns = trimmed
      .slice(1, -1)
      .split('|')
      .map((value) => value.trim());

    if (columns[0] === 'File' || columns.length < 4) {
      return;
    }

    const [fileCell, useCase, resolutionCell, description] = columns;
    const transparent = /\(Transparent\)/i.test(resolutionCell);
    const resolution = resolutionCell.replace(/\s*\(Transparent\)\s*/i, '').trim().replace(/×/g, 'x');
    const fileCellPath = fileCell.replace(/`/g, '');
    const relativePath = `${currentBasePath}/${fileCellPath}`;

    entries.set(relativePath, {
      relativePath,
      collection: currentCollection,
      useCase,
      resolution,
      transparent,
      description,
    });
  });

  return entries;
}

function inferCollection(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  if (!normalized.startsWith('themes/')) {
    return 'core';
  }

  const segments = normalized.split('/');
  if (segments[1] === 'games') {
    return `games/${segments[2]}`;
  }

  return segments[1];
}

function inferCategory(relativePath, title, description) {
  const normalized = relativePath.replace(/\\/g, '/');
  if (EXPLICIT_CATEGORY_OVERRIDES[normalized]) {
    return EXPLICIT_CATEGORY_OVERRIDES[normalized];
  }

  const segments = normalized.split('/');
  if (!normalized.startsWith('themes/')) {
    return segments[0];
  }

  if (segments.length >= 5) {
    return segments[3];
  }

  const fingerprint = `${title} ${description}`.toLowerCase();
  if (fingerprint.includes('transition') || fingerprint.includes('stinger') || fingerprint.includes('wipe')) {
    return 'transitions';
  }
  if (fingerprint.includes('background')) {
    return 'backgrounds';
  }
  if (fingerprint.includes('lower third')) {
    return 'lower-thirds';
  }
  if (fingerprint.includes('widget') || fingerprint.includes('tracker')) {
    return 'widgets';
  }
  if (fingerprint.includes('overlay') || fingerprint.includes('frame') || fingerprint.includes('hud') || fingerprint.includes('ticker')) {
    return 'overlays';
  }
  if (fingerprint.includes('alert')) {
    return 'alerts';
  }
  return 'scenes';
}

function buildTags(relativePath, category, collection, title, useCase, description) {
  const fileStem = relativePath.replace(/\.html$/i, '').split('/').pop();
  const tags = new Set([
    ...slugifyWords(fileStem.replace(/-/g, ' ')),
    ...slugifyWords(title),
    ...slugifyWords(useCase),
    ...slugifyWords(description),
    category,
    collection.replace(/\//g, '-'),
  ]);

  return Array.from(tags).sort().join(', ');
}

function main() {
  const catalogEntries = parseCatalogEntries(catalogText);
  let updatedCount = 0;

  getAssetFiles().forEach((filePath) => {
    const relativePath = path.relative(ASSETS_DIR, filePath).replace(/\\/g, '/');
    const content = readFile(filePath);

    if (parseMetadataBlock(content)) {
      return;
    }

    const title = extractTitleTag(content) || humanizeTitle(relativePath);
    const catalogEntry = catalogEntries.get(relativePath);
    const collection = catalogEntry ? catalogEntry.collection : inferCollection(relativePath);
    const description = catalogEntry ? catalogEntry.description : 'Metadata backfilled from the legacy catalog.';
    const useCase = catalogEntry ? catalogEntry.useCase : `Reusable ${title.toLowerCase()} asset.`;
    const category = inferCategory(relativePath, title, `${useCase} ${description}`);
    const resolution = catalogEntry ? catalogEntry.resolution : '1920x1080';
    const transparent = catalogEntry ? String(catalogEntry.transparent) : 'false';
    const tags = buildTags(relativePath, category, collection, title, useCase, description);
    const lineEnding = getLineEnding(content);

    const metadata = buildMetadataBlock({
      Title: title,
      Category: category,
      Collection: collection,
      UseCase: useCase,
      Resolution: resolution,
      Transparent: transparent,
      Description: description,
      Tags: tags,
      Preview: 'none',
    }, lineEnding);

    writeFile(filePath, `${metadata}${content}`);
    updatedCount += 1;
  });

  process.stdout.write(`Backfilled metadata for ${updatedCount} assets.\n`);
}

main();
