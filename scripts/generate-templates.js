#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Load constants from asset-library
const { ASSETS_DIR, DOCS_DIR, REQUIRED_METADATA_FIELDS, CATEGORY_LABELS, COLLECTION_LABELS } = require('./asset-library');

// Helper to slugify names -> a-z0-9- without spaces
function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Build metadata block from spec
function buildMeta(spec) {
  const lines = ['<!-- Asset Metadata Block -->', '<!--'];
  REQUIRED_METADATA_FIELDS.forEach(key => {
    const val = spec[key] ?? '';
    lines.push(`${key}: ${val}`);
  });
  lines.push('-->', '--');
  return lines.join('\n') + '\n';
}

// Main generator
program
  .option('-b, --blueprints <dir>', 'directory of blueprint JSON files', 'blueprints')
  .parse(process.argv);

const opts = program.opts();
const bpDir = path.resolve(process.cwd(), opts.blueprints);
if (!fs.existsSync(bpDir)) {
  console.error(`Blueprint directory not found: ${bpDir}`);
  process.exit(1);
}

const files = fs.readdirSync(bpDir)
  .filter(f => f.endsWith('.json'))
  .map(f => path.join(bpDir, f));

files.forEach(file => {
  const spec = JSON.parse(fs.readFileSync(file, 'utf8'));
  const type = spec.type; // alerts, widgets, lower-third, transition, theme
  if (!type) {
    console.warn(`Skipping ${file}: missing 'type'`);
    return;
  }
  const plural = type === 'lower-third' ? 'lower-thirds' : type + 's'; // handle plural
  const targetDir = path.join(ASSETS_DIR, plural);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const fileName = slug(spec.name) + '.html';
  const outPath = path.join(targetDir, fileName);

  const templatePath = path.join(__dirname, '..', 'templates', 'asset-starter.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  const meta = buildMeta(spec);

  const content = meta + template;
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`Created ${path.relative(process.cwd(), outPath)}`);
});
