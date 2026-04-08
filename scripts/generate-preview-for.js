#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function generate(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  const relative = path.relative(process.cwd(), absolutePath);
  const previewPath = path.join('assets', 'previews', relative.replace(/\.html$/i, '.png'));
  const previewDir = path.dirname(previewPath);
  fs.mkdirSync(previewDir, { recursive: true });
  await page.screenshot({ path: previewPath, fullPage: true });
  await page.close();
  await browser.close();
  console.log(`Generated preview: ${previewPath}`);
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
