const path = require('path');
const {
  ASSETS_DIR,
  buildMetadataBlock,
  getAssetFiles,
  getLineEnding,
  parseMetadataBlock,
  readFile,
  writeFile,
} = require('./asset-library');

function getDerivedPreview(relativePath) {
  return `previews/${relativePath.replace(/\\/g, '/').replace(/\.html$/i, '.png')}`;
}

function previewExists(preview) {
  return readFileIfExists(path.join(ASSETS_DIR, preview.replace(/\//g, path.sep)));
}

function readFileIfExists(filePath) {
  try {
    return require('fs').existsSync(filePath);
  } catch (error) {
    return false;
  }
}

function main() {
  let updated = 0;

  getAssetFiles().forEach((filePath) => {
    const content = readFile(filePath);
    const metadataBlock = parseMetadataBlock(content);
    if (!metadataBlock) {
      return;
    }

    const relativePath = path.relative(ASSETS_DIR, filePath).replace(/\\/g, '/');
    const metadata = metadataBlock.fields;
    const derivedPreview = getDerivedPreview(relativePath);
    const previewPath = path.join(ASSETS_DIR, derivedPreview.replace(/\//g, path.sep));

    if (!readFileIfExists(previewPath)) {
      return;
    }

    if (metadata.Preview === derivedPreview) {
      return;
    }

    metadata.Preview = derivedPreview;
    const lineEnding = getLineEnding(content);
    const nextBlock = buildMetadataBlock(metadata, lineEnding);
    const updatedContent = `${nextBlock}${content.slice(metadataBlock.raw.length)}`;
    writeFile(filePath, updatedContent);
    updated += 1;
  });

  process.stdout.write(`Updated preview metadata for ${updated} assets.\n`);
}

main();
