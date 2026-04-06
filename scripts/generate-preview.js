const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

function walk(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let htmlFiles = [];
  for (const f of files) {
    const fullPath = path.join(dir, f.name);
    if (f.isDirectory()) {
      htmlFiles = htmlFiles.concat(walk(fullPath));
    } else if (f.isFile() && f.name.endsWith('.html')) {
      if (fullPath.endsWith('index.html') || fullPath.endsWith('catalog.json')) continue;
      htmlFiles.push(fullPath);
    }
  }
  return htmlFiles;
}

async function generateForFile(filePath, browser) {
  const url = 'file://' + path.resolve(filePath);
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  const relative = path.relative(process.cwd(), filePath);
  const previewPath = path.join('assets', 'previews', relative.replace(/\.html$/i, '.png'));
  const previewDir = path.dirname(previewPath);
  fs.mkdirSync(previewDir, { recursive: true });
  await page.screenshot({ path: previewPath, fullPage: true });
  await page.close();
  console.log(`Generated preview: ${previewPath}`);
}

async function main() {
  const assetDir = path.join(process.cwd(), 'assets');
  const files = walk(assetDir);
  const browser = await puppeteer.launch({ headless: true });
  for (const file of files) {
    try {
      await generateForFile(file, browser);
    } catch (err) {
      console.error(`Failed to generate preview for ${file}:`, err.message);
    }
  }
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
