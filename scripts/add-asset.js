#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {
  ROOT_DIR,
  buildMetadataBlock,
  formatCollectionLabel,
  formatCategoryLabel,
  readFile,
  titleCase,
  writeFile,
} = require('./asset-library');

const TEMPLATE_PATH = path.join(ROOT_DIR, 'templates', 'asset-starter.html');
const VALID_CATEGORIES = new Set([
  'alerts',
  'backgrounds',
  'lower-thirds',
  'news',
  'overlays',
  'scenes',
  'transitions',
  'widgets',
]);

function usage() {
  process.stderr.write('Usage: node scripts/add-asset.js <category> <slug> [collection]\n');
  process.stderr.write('Example: node scripts/add-asset.js scenes starting-soon charity-marathon\n');
  process.exit(1);
}

function humanizeSlug(slug) {
  return titleCase(slug.replace(/-/g, ' '));
}

function buildTargetPath(category, slug, collection) {
  if (collection === 'core') {
    return path.join(ROOT_DIR, 'assets', category, `${slug}.html`);
  }
  return path.join(ROOT_DIR, 'assets', 'themes', collection, category, `${slug}.html`);
}

function buildPreviewPath(category, slug, collection) {
  if (collection === 'core') {
    return `previews/${category}/${slug}.png`;
  }
  return `previews/themes/${collection}/${category}/${slug}.png`;
}

function buildTemplate(title, category, collection, preview) {
  const content = readFile(TEMPLATE_PATH);
  const metadata = buildMetadataBlock({
    Title: title,
    Category: category,
    Collection: collection,
    UseCase: `Reusable ${title.toLowerCase()} asset for ${formatCollectionLabel(collection).toLowerCase()}.`,
    Resolution: category === 'widgets' ? '900x900' : '1920x1080',
    Transparent: String(['alerts', 'lower-thirds', 'overlays', 'widgets'].includes(category)),
    Description: `Starter scaffold for a ${formatCategoryLabel(category).toLowerCase()} asset in the ${formatCollectionLabel(collection)}.`,
    Tags: [collection.replace(/\//g, '-'), category, slug].join(', '),
    Preview: preview,
  });

  return content.replace(/^<!--[\s\S]*?-->\s*/, metadata);
}

function main() {
  const [, , category, slug, collectionArg] = process.argv;
  if (!category || !slug) {
    usage();
  }

  if (!VALID_CATEGORIES.has(category)) {
    process.stderr.write(`Unsupported category "${category}".\n`);
    process.stderr.write(`Choose one of: ${Array.from(VALID_CATEGORIES).join(', ')}\n`);
    process.exit(1);
  }

  const collection = collectionArg || 'core';
  const filePath = buildTargetPath(category, slug, collection);
  if (fs.existsSync(filePath)) {
    process.stderr.write(`Asset already exists: ${filePath}\n`);
    process.exit(1);
  }

  const preview = buildPreviewPath(category, slug, collection);
  const title = humanizeSlug(slug);
  const content = buildTemplate(title, category, collection, preview);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  writeFile(filePath, content);
  process.stdout.write(`Created asset scaffold: ${path.relative(ROOT_DIR, filePath)}\n`);
}

main();
