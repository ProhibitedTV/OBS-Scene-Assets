const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

const REQUIRED_METADATA_FIELDS = [
  'Title',
  'Category',
  'Collection',
  'UseCase',
  'Resolution',
  'Transparent',
  'Description',
  'Tags',
  'Preview',
];

const CATEGORY_LABELS = {
  alerts: 'Alerts',
  backgrounds: 'Backgrounds',
  'lower-thirds': 'Lower Thirds',
  news: 'News',
  overlays: 'Overlays',
  scenes: 'Scenes',
  transitions: 'Transitions',
  widgets: 'Widgets',
};

const COLLECTION_LABELS = {
  'civic-broadcast': 'Civic Broadcast Suite',
  'charity-marathon': 'Charity Marathon Suite',
  'cozy-campfire': 'Cozy Campfire Suite',
  core: 'Core Library',
  'creator-commerce': 'Creator Commerce Suite',
  'cyberpunk-broadcast': 'Cyberpunk Broadcast Suite',
  'education-workshop': 'Education Workshop Suite',
  'fantasy-legends': 'Fantasy Legends Suite',
  'games/apex-legends': 'Games / Apex Legends',
  'games/fortnite': 'Games / Fortnite',
  'games/halo': 'Games / Halo',
  'games/league-of-legends': 'Games / League of Legends',
  'games/valorant': 'Games / Valorant',
  'holiday-celebration': 'Holiday Celebration Suite',
  'launch-event': 'Launch Event Suite',
  'live-show': 'Live Show Suite',
  'maker-garage': 'Maker Garage Suite',
  'music-pulse': 'Music Pulse Suite',
  newsroom: 'Newsroom Suite',
  'podcast-studio': 'Podcast Studio Suite',
  'sports-watchalong': 'Sports Watchalong Suite',
  'study-session': 'Study Session Suite',
  'tournament-desk': 'Tournament Desk Suite',
  'travel-vlog': 'Travel Vlog Suite',
  'vertical-creator': 'Vertical Creator Suite',
  'vtuber-spotlight': 'VTuber Spotlight Suite',
  'wellness-retreat': 'Wellness Retreat Suite',
};

function titleCase(value) {
  return value
    .split(/[\s/-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function formatCollectionLabel(collection) {
  return COLLECTION_LABELS[collection] || titleCase(collection);
}

function formatCategoryLabel(category) {
  return CATEGORY_LABELS[category] || titleCase(category);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function getLineEnding(content) {
  return content.includes('\r\n') ? '\r\n' : '\n';
}

function getAssetFiles() {
  const files = [];

  function visit(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    entries.forEach((entry) => {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'previews') {
          return;
        }
        visit(fullPath);
        return;
      }

      if (!entry.name.endsWith('.html')) {
        return;
      }

      const relativeToAssets = path.relative(ASSETS_DIR, fullPath).replace(/\\/g, '/');
      if (relativeToAssets === 'index.html') {
        return;
      }

      files.push(fullPath);
    });
  }

  visit(ASSETS_DIR);
  return files.sort((left, right) => left.localeCompare(right));
}

function parseMetadataBlock(content) {
  const match = content.match(/^\s*<!--\s*\r?\n([\s\S]*?)\r?\n-->\s*/);
  if (!match) {
    return null;
  }

  const fields = {};
  match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) {
        return;
      }
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      fields[key] = value;
    });

  return {
    fields,
    raw: match[0],
  };
}

function extractTitleTag(content) {
  const match = content.match(/<title>([^<]+)<\/title>/i);
  return match ? decodeHtml(match[1].trim()) : null;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeTags(value) {
  return value
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeBoolean(value) {
  return /^true$/i.test(value);
}

function parseResolution(value) {
  const match = value.match(/(\d+)\s*x\s*(\d+)/i);
  if (!match) {
    return {
      width: 0,
      height: 0,
      label: 'custom',
      aspectRatio: '1 / 1',
      aspectKey: 'custom',
    };
  }

  const width = Number(match[1]);
  const height = Number(match[2]);
  let label = 'landscape';
  let aspectKey = 'landscape';

  if (height > width) {
    label = 'portrait';
    aspectKey = 'portrait';
  } else if (width === height) {
    label = 'square';
    aspectKey = 'square';
  }

  return {
    width,
    height,
    label,
    aspectKey,
    aspectRatio: `${width} / ${height}`,
  };
}

function humanizePath(value) {
  return value
    .split('/')
    .map((segment) => titleCase(segment.replace(/\.html$/i, '').replace(/-/g, ' ')))
    .join(' / ');
}

function loadAssets() {
  return getAssetFiles().map((filePath) => {
    const content = readFile(filePath);
    const relativePath = path.relative(ASSETS_DIR, filePath).replace(/\\/g, '/');
    const metadataBlock = parseMetadataBlock(content);
    if (!metadataBlock) {
      return {
        filePath,
        relativePath,
        content,
        metadata: null,
      };
    }

    const metadata = metadataBlock.fields;
    const resolution = parseResolution(metadata.Resolution || '');
    const preview = metadata.Preview || 'none';
    const previewPath = preview === 'none' ? null : path.join(ASSETS_DIR, preview.replace(/\//g, path.sep));

    return {
      filePath,
      relativePath,
      content,
      metadata,
      title: metadata.Title,
      category: metadata.Category,
      categoryLabel: formatCategoryLabel(metadata.Category),
      collection: metadata.Collection,
      collectionLabel: formatCollectionLabel(metadata.Collection),
      useCase: metadata.UseCase,
      resolution: metadata.Resolution,
      resolutionInfo: resolution,
      transparent: normalizeBoolean(metadata.Transparent),
      description: metadata.Description,
      tags: normalizeTags(metadata.Tags || ''),
      preview,
      previewPath,
      previewExists: Boolean(previewPath && fs.existsSync(previewPath)),
      hasPreview: preview !== 'none' && Boolean(previewPath && fs.existsSync(previewPath)),
      titleTag: extractTitleTag(content),
    };
  });
}

function buildMetadataBlock(fields, lineEnding = '\n') {
  const orderedLines = REQUIRED_METADATA_FIELDS.map((key) => `${key}: ${fields[key]}`);
  return `<!--${lineEnding}${orderedLines.join(lineEnding)}${lineEnding}-->${lineEnding}`;
}

function compareAssets(left, right) {
  const collectionComparison = left.collectionLabel.localeCompare(right.collectionLabel);
  if (collectionComparison !== 0) {
    return collectionComparison;
  }

  const categoryComparison = left.categoryLabel.localeCompare(right.categoryLabel);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  const titleComparison = left.title.localeCompare(right.title);
  if (titleComparison !== 0) {
    return titleComparison;
  }

  return left.relativePath.localeCompare(right.relativePath);
}

function groupAssets(assets) {
  const collectionMap = new Map();

  assets
    .slice()
    .sort(compareAssets)
    .forEach((asset) => {
      if (!collectionMap.has(asset.collection)) {
        collectionMap.set(asset.collection, {
          collection: asset.collection,
          label: asset.collectionLabel,
          categories: new Map(),
        });
      }

      const collection = collectionMap.get(asset.collection);
      if (!collection.categories.has(asset.category)) {
        collection.categories.set(asset.category, {
          category: asset.category,
          label: asset.categoryLabel,
          assets: [],
        });
      }

      collection.categories.get(asset.category).assets.push(asset);
    });

  return Array.from(collectionMap.values())
    .sort((left, right) => left.label.localeCompare(right.label))
    .map((collection) => ({
      ...collection,
      categories: Array.from(collection.categories.values()).sort((left, right) => left.label.localeCompare(right.label)),
    }));
}

function getCollectionPathLabel(collection) {
  if (collection === 'core') {
    return '`assets/`';
  }
  return `\`assets/themes/${collection}/\``;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeForScript(value) {
  return value.replace(/</g, '\\u003c');
}

function formatPreviewLabel(asset) {
  return asset.hasPreview ? 'PNG' : 'Placeholder';
}

module.exports = {
  ASSETS_DIR,
  CATEGORY_LABELS,
  COLLECTION_LABELS,
  DOCS_DIR,
  REQUIRED_METADATA_FIELDS,
  ROOT_DIR,
  buildMetadataBlock,
  compareAssets,
  decodeHtml,
  escapeForScript,
  escapeHtml,
  extractTitleTag,
  formatCategoryLabel,
  formatCollectionLabel,
  formatPreviewLabel,
  getAssetFiles,
  getCollectionPathLabel,
  getLineEnding,
  groupAssets,
  humanizePath,
  loadAssets,
  normalizeBoolean,
  normalizeTags,
  parseMetadataBlock,
  parseResolution,
  readFile,
  titleCase,
  writeFile,
};
