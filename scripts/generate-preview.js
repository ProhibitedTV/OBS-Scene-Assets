const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { ASSETS_DIR, loadAssets } = require('./asset-library');

function getPreviewPath(asset) {
  return path.join(ASSETS_DIR, 'previews', asset.relativePath.replace(/\//g, path.sep).replace(/\.html$/i, '.png'));
}

async function generateForAsset(asset, browser) {
  const url = 'file://' + path.resolve(asset.filePath);
  const page = await browser.newPage();
  const width = Math.max(320, asset.resolutionInfo.width || 1920);
  const height = Math.max(180, asset.resolutionInfo.height || 1080);
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 350)));
  const previewPath = getPreviewPath(asset);
  fs.mkdirSync(path.dirname(previewPath), { recursive: true });
  await page.screenshot({
    path: previewPath,
    omitBackground: asset.transparent,
  });
  await page.close();
  console.log(`Generated preview: ${path.relative(process.cwd(), previewPath)}`);
}

async function main() {
  const regenerateAll = process.argv.includes('--all');
  const assets = loadAssets().filter((asset) => regenerateAll || !fs.existsSync(getPreviewPath(asset)));
  const browser = await puppeteer.launch({ headless: true });
  for (const asset of assets) {
    try {
      await generateForAsset(asset, browser);
    } catch (err) {
      console.error(`Failed to generate preview for ${asset.relativePath}:`, err.message);
    }
  }
  await browser.close();
  console.log(`Preview generation completed for ${assets.length} assets.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
