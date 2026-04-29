#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { ASSETS_DIR, loadAssets } = require('./asset-library');

function getPreviewPath(relativePath) {
  return path.join(ASSETS_DIR, 'previews', relativePath.replace(/\//g, path.sep).replace(/\.html$/i, '.png'));
}

async function generate(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const asset = loadAssets().find((entry) => path.resolve(entry.filePath) === absolutePath);
  if (!asset) {
    console.error(`Not an asset file under assets/: ${filePath}`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const width = Math.max(320, asset.resolutionInfo.width || 1920);
  const height = Math.max(180, asset.resolutionInfo.height || 1080);
  await page.setViewport({ width, height });
  await page.goto(`file://${absolutePath}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 350)));
  const previewPath = getPreviewPath(asset.relativePath);
  const previewDir = path.dirname(previewPath);
  fs.mkdirSync(previewDir, { recursive: true });
  await page.screenshot({ path: previewPath, omitBackground: asset.transparent });
  await page.close();
  await browser.close();
  console.log(`Generated preview: ${path.relative(process.cwd(), previewPath)}`);
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node scripts/generate-preview-for.js <path/to/asset.html>');
  process.exit(1);
}
generate(args[0]).catch(err => {
  console.error(err);
  process.exit(1);
});
