const fs = require('fs');
const path = require('path');
const {
  ASSETS_DIR,
  DOCS_DIR,
  REQUIRED_METADATA_FIELDS,
  compareAssets,
  escapeForScript,
  escapeHtml,
  formatPreviewLabel,
  getCollectionPathLabel,
  groupAssets,
  loadAssets,
  writeFile,
} = require('./asset-library');

const CATALOG_JSON_PATH = path.join(ASSETS_DIR, 'catalog.json');
const INDEX_HTML_PATH = path.join(ASSETS_DIR, 'index.html');
const CATALOG_MD_PATH = path.join(DOCS_DIR, 'asset-catalog.md');

function assertMetadata(assets) {
  const problems = [];
  const titleKeys = new Set();

  assets.forEach((asset) => {
    if (!asset.metadata) {
      problems.push(`${asset.relativePath}: missing metadata block`);
      return;
    }

    REQUIRED_METADATA_FIELDS.forEach((field) => {
      if (!asset.metadata[field]) {
        problems.push(`${asset.relativePath}: missing metadata field "${field}"`);
      }
    });

    const titleKey = `${asset.collection}::${asset.category}::${asset.title.toLowerCase()}`;
    if (titleKeys.has(titleKey)) {
      problems.push(`${asset.relativePath}: duplicate title "${asset.title}" within ${asset.collection}/${asset.category}`);
    }
    titleKeys.add(titleKey);

    if (asset.titleTag && asset.titleTag !== asset.title) {
      problems.push(`${asset.relativePath}: metadata Title does not match <title>`);
    }

    if (!/^\d+x\d+$/i.test(asset.resolution)) {
      problems.push(`${asset.relativePath}: Resolution must be in WIDTHxHEIGHT format`);
    }

    if (!/^(true|false)$/i.test(asset.metadata.Transparent || '')) {
      problems.push(`${asset.relativePath}: Transparent must be true or false`);
    }

    if (asset.preview !== 'none') {
      if (!asset.preview.startsWith('previews/')) {
        problems.push(`${asset.relativePath}: Preview must live under assets/previews/`);
      }
      if (!asset.preview.endsWith('.png') && !asset.preview.endsWith('.gif')) {
        problems.push(`${asset.relativePath}: Preview must be a .png or .gif`);
      }
      if (!asset.previewExists) {
        problems.push(`${asset.relativePath}: preview file "${asset.preview}" is missing`);
      }
    }
  });

  return problems;
}

function buildCatalogJson(assets) {
  const sortedAssets = assets.slice().sort(compareAssets).map((asset) => ({
    path: asset.relativePath,
    title: asset.title,
    category: asset.category,
    categoryLabel: asset.categoryLabel,
    collection: asset.collection,
    collectionLabel: asset.collectionLabel,
    useCase: asset.useCase,
    resolution: asset.resolution,
    width: asset.resolutionInfo.width,
    height: asset.resolutionInfo.height,
    aspect: asset.resolutionInfo.label,
    transparent: asset.transparent,
    description: asset.description,
    tags: asset.tags,
    preview: asset.preview,
    previewStatus: asset.hasPreview ? 'image' : 'placeholder',
  }));

  const summary = {
    assetCount: sortedAssets.length,
    collections: [...new Set(sortedAssets.map((asset) => asset.collection))].length,
    categories: [...new Set(sortedAssets.map((asset) => asset.category))].length,
    previewCount: sortedAssets.filter((asset) => asset.previewStatus === 'image').length,
  };

  return `${JSON.stringify({ summary, assets: sortedAssets }, null, 2)}\n`;
}

function buildCatalogMarkdown(assets) {
  const groups = groupAssets(assets);
  const lines = [
    '# Asset Catalog',
    '',
    'This file is generated from the asset metadata blocks embedded in each HTML file. Run `npm run assets:generate` after adding or editing assets.',
    '',
    `Total assets: **${assets.length}**`,
    '',
  ];

  groups.forEach((collection) => {
    lines.push(`## ${collection.label}`);
    lines.push('');
    lines.push(`Location: ${getCollectionPathLabel(collection.collection)}`);
    lines.push('');

    collection.categories.forEach((category) => {
      lines.push(`### ${category.label}`);
      lines.push('');
      lines.push('| Title | File | Use Case | Resolution | Preview | Description |');
      lines.push('| --- | --- | --- | --- | --- | --- |');
      category.assets
        .slice()
        .sort((left, right) => left.title.localeCompare(right.title))
        .forEach((asset) => {
          lines.push(`| ${asset.title} | \`${asset.relativePath}\` | ${asset.useCase} | ${asset.resolution}${asset.transparent ? ' (Transparent)' : ''} | ${formatPreviewLabel(asset)} | ${asset.description} |`);
        });
      lines.push('');
    });
  });

  lines.push('## Catalog Maintenance');
  lines.push('');
  lines.push('1. Add or update the metadata block at the top of the asset file.');
  lines.push('2. Add a mirrored preview image under `assets/previews/` for every new asset.');
  lines.push('3. Run `npm run assets:generate` and then `npm run assets:validate` before submitting changes.');
  lines.push('');

  return `${lines.join('\n')}\n`;
}

function buildIndexHtml(assets) {
  const sortedAssets = assets.slice().sort(compareAssets);
  const categories = [...new Set(sortedAssets.map((asset) => asset.categoryLabel))].sort((left, right) => left.localeCompare(right));
  const collections = [...new Set(sortedAssets.map((asset) => asset.collectionLabel))].sort((left, right) => left.localeCompare(right));
  const data = sortedAssets.map((asset) => ({
    title: asset.title,
    path: asset.relativePath,
    href: asset.relativePath,
    category: asset.category,
    categoryLabel: asset.categoryLabel,
    collection: asset.collection,
    collectionLabel: asset.collectionLabel,
    useCase: asset.useCase,
    description: asset.description,
    resolution: asset.resolution,
    transparent: asset.transparent,
    preview: asset.preview,
    hasPreview: asset.hasPreview,
    aspectLabel: asset.resolutionInfo.label,
    aspectRatio: asset.resolutionInfo.aspectRatio,
    tags: asset.tags,
  }));

  const categoryOptions = categories.map((category) => `            <option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('\n');
  const collectionOptions = collections.map((collection) => `            <option value="${escapeHtml(collection)}">${escapeHtml(collection)}</option>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>OBS Scene Assets Gallery</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {
      color-scheme: dark;
      --bg: #07111f;
      --panel: rgba(8, 19, 36, 0.9);
      --panel-strong: rgba(9, 24, 45, 0.98);
      --line: rgba(148, 163, 184, 0.18);
      --text: #e2e8f0;
      --muted: #94a3b8;
      --accent: #38bdf8;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: "Segoe UI", Tahoma, sans-serif;
      background:
        radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 30%),
        radial-gradient(circle at top right, rgba(244, 114, 182, 0.14), transparent 24%),
        linear-gradient(180deg, #020817, #081526 55%, #06111f);
      color: var(--text);
    }

    a {
      color: inherit;
    }

    header {
      padding: 3.5rem 5vw 2rem;
    }

    .hero {
      display: grid;
      gap: 1.4rem;
      max-width: 78rem;
    }

    .eyebrow {
      margin: 0;
      font-size: 0.82rem;
      letter-spacing: 0.34em;
      text-transform: uppercase;
      color: #7dd3fc;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.4rem, 6vw, 4.4rem);
      line-height: 0.95;
      letter-spacing: -0.04em;
    }

    .summary {
      margin: 0;
      max-width: 54rem;
      color: var(--muted);
      font-size: 1.05rem;
    }

    .stats {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    .stat {
      padding: 0.75rem 1rem;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.62);
      font-size: 0.92rem;
    }

    main {
      padding: 0 5vw 4rem;
      display: grid;
      gap: 1.5rem;
    }

    .toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: grid;
      gap: 1rem;
      padding: 1.15rem;
      border: 1px solid var(--line);
      border-radius: 1.2rem;
      background: rgba(7, 17, 31, 0.92);
      backdrop-filter: blur(16px);
    }

    .toolbar-grid {
      display: grid;
      gap: 0.9rem;
      grid-template-columns: minmax(220px, 2fr) repeat(4, minmax(160px, 1fr));
    }

    .field {
      display: grid;
      gap: 0.4rem;
    }

    .field label {
      font-size: 0.75rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .field input,
    .field select {
      width: 100%;
      padding: 0.85rem 0.95rem;
      border-radius: 0.95rem;
      border: 1px solid rgba(148, 163, 184, 0.18);
      background: var(--panel-strong);
      color: var(--text);
      font: inherit;
    }

    .toolbar-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      color: var(--muted);
      font-size: 0.9rem;
    }

    .reset-button {
      padding: 0.7rem 1rem;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: transparent;
      color: var(--text);
      cursor: pointer;
    }

    .gallery {
      display: grid;
      gap: 1.2rem;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }

    .asset-card {
      display: grid;
      gap: 0.95rem;
      padding: 1rem;
      border-radius: 1.25rem;
      border: 1px solid var(--line);
      background: var(--panel);
      text-decoration: none;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .asset-card:hover {
      transform: translateY(-2px);
      border-color: rgba(56, 189, 248, 0.4);
      box-shadow: 0 24px 48px rgba(2, 8, 23, 0.25);
    }

    .asset-preview {
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      border: 1px solid rgba(148, 163, 184, 0.16);
      aspect-ratio: var(--asset-ratio, 16 / 9);
      background:
        linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(244, 114, 182, 0.16)),
        rgba(15, 23, 42, 0.65);
    }

    .asset-preview img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .asset-placeholder {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 1rem;
      text-align: center;
      color: #dbeafe;
      background:
        linear-gradient(135deg, rgba(14, 165, 233, 0.26), rgba(79, 70, 229, 0.18)),
        repeating-linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.06) 0,
          rgba(255, 255, 255, 0.06) 12px,
          transparent 12px,
          transparent 24px
        );
    }

    .asset-placeholder strong {
      font-size: 0.95rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .asset-meta {
      display: grid;
      gap: 0.7rem;
    }

    .asset-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
    }

    .badge {
      padding: 0.35rem 0.6rem;
      border-radius: 999px;
      background: rgba(51, 65, 85, 0.54);
      color: #dbeafe;
      font-size: 0.73rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .badge.preview {
      background: rgba(34, 197, 94, 0.14);
      color: #bbf7d0;
    }

    .badge.transparent {
      background: rgba(125, 211, 252, 0.14);
      color: #bae6fd;
    }

    .asset-card h2 {
      margin: 0;
      font-size: 1.08rem;
      line-height: 1.2;
    }

    .asset-card p {
      margin: 0;
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.55;
    }

    .asset-path {
      font-family: "Consolas", "Courier New", monospace;
      font-size: 0.78rem;
      color: #93c5fd;
      word-break: break-all;
    }

    .empty-state {
      display: none;
      padding: 2rem;
      border-radius: 1.25rem;
      border: 1px dashed rgba(148, 163, 184, 0.3);
      color: var(--muted);
      text-align: center;
      background: rgba(7, 17, 31, 0.7);
    }

    .empty-state.visible {
      display: block;
    }

    @media (max-width: 960px) {
      .toolbar-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="hero">
      <p class="eyebrow">OBS Browser Source Library</p>
      <h1>Filterable asset gallery for stream overlays, scenes, widgets, and themed creator packs.</h1>
      <p class="summary">Browse the full metadata-driven catalog, filter by category or theme, and use the embedded paths directly in OBS. Legacy assets without screenshots show metadata-driven placeholders so the gallery stays complete while previews are backfilled.</p>
      <div class="stats">
        <span class="stat">${sortedAssets.length} assets</span>
        <span class="stat">${collections.length} collections</span>
        <span class="stat">${sortedAssets.filter((asset) => asset.hasPreview).length} preview images</span>
      </div>
    </div>
  </header>
  <main>
    <section class="toolbar" aria-label="Catalog filters">
      <div class="toolbar-grid">
        <div class="field">
          <label for="search">Search</label>
          <input id="search" type="search" placeholder="Search titles, tags, and descriptions" />
        </div>
        <div class="field">
          <label for="category">Category</label>
          <select id="category">
            <option value="">All categories</option>
${categoryOptions}
          </select>
        </div>
        <div class="field">
          <label for="collection">Collection</label>
          <select id="collection">
            <option value="">All collections</option>
${collectionOptions}
          </select>
        </div>
        <div class="field">
          <label for="aspect">Aspect</label>
          <select id="aspect">
            <option value="">All aspects</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </select>
        </div>
        <div class="field">
          <label for="transparency">Transparency</label>
          <select id="transparency">
            <option value="">All assets</option>
            <option value="transparent">Transparent</option>
            <option value="opaque">Opaque</option>
          </select>
        </div>
      </div>
      <div class="toolbar-foot">
        <span id="results-count">${sortedAssets.length} matches</span>
        <button class="reset-button" id="reset-filters" type="button">Reset filters</button>
      </div>
    </section>
    <section class="gallery" id="gallery" aria-live="polite"></section>
    <div class="empty-state" id="empty-state">No assets match the current filters. Clear one or two filters and try again.</div>
  </main>
  <script id="catalog-data" type="application/json">${escapeForScript(JSON.stringify(data))}</script>
  <script>
    const catalog = JSON.parse(document.getElementById('catalog-data').textContent);
    const elements = {
      search: document.getElementById('search'),
      category: document.getElementById('category'),
      collection: document.getElementById('collection'),
      aspect: document.getElementById('aspect'),
      transparency: document.getElementById('transparency'),
      gallery: document.getElementById('gallery'),
      results: document.getElementById('results-count'),
      empty: document.getElementById('empty-state'),
      reset: document.getElementById('reset-filters'),
    };

    function buildCard(asset) {
      const card = document.createElement('a');
      card.className = 'asset-card';
      card.href = asset.href;
      card.style.setProperty('--asset-ratio', asset.aspectRatio);

      const transparentBadge = asset.transparent ? '<span class="badge transparent">Transparent</span>' : '';
      const previewBadge = asset.hasPreview ? '<span class="badge preview">Preview</span>' : '<span class="badge">Placeholder</span>';
      const image = asset.hasPreview
        ? '<img loading="lazy" alt="" src="' + asset.preview + '" />'
        : '<div class="asset-placeholder"><strong>' + asset.collectionLabel + '</strong><span>' + asset.categoryLabel + ' preview pending</span></div>';

      card.innerHTML = [
        '<div class="asset-preview">' + image + '</div>',
        '<div class="asset-meta">',
        '  <div class="asset-badges">',
        '    <span class="badge">' + asset.collectionLabel + '</span>',
        '    <span class="badge">' + asset.categoryLabel + '</span>',
        '    <span class="badge">' + asset.resolution + '</span>',
        '    <span class="badge">' + asset.aspectLabel + '</span>',
        '    ' + previewBadge,
        '    ' + transparentBadge,
        '  </div>',
        '  <div>',
        '    <h2>' + asset.title + '</h2>',
        '    <p>' + asset.useCase + '</p>',
        '  </div>',
        '  <p>' + asset.description + '</p>',
        '  <div class="asset-path">' + asset.path + '</div>',
        '</div>',
      ].join('');

      return card;
    }

    function applyFilters() {
      const query = elements.search.value.trim().toLowerCase();
      const category = elements.category.value;
      const collection = elements.collection.value;
      const aspect = elements.aspect.value;
      const transparency = elements.transparency.value;

      const filtered = catalog.filter((asset) => {
        if (query && ![asset.title, asset.collectionLabel, asset.categoryLabel, asset.useCase, asset.description, asset.tags.join(' ')].join(' ').toLowerCase().includes(query)) {
          return false;
        }
        if (category && asset.categoryLabel !== category) {
          return false;
        }
        if (collection && asset.collectionLabel !== collection) {
          return false;
        }
        if (aspect && asset.aspectLabel !== aspect) {
          return false;
        }
        if (transparency === 'transparent' && !asset.transparent) {
          return false;
        }
        if (transparency === 'opaque' && asset.transparent) {
          return false;
        }
        return true;
      });

      elements.gallery.innerHTML = '';
      filtered.forEach((asset) => {
        elements.gallery.appendChild(buildCard(asset));
      });

      elements.results.textContent = filtered.length === 1 ? '1 match' : filtered.length + ' matches';
      elements.empty.classList.toggle('visible', filtered.length === 0);
    }

    [elements.search, elements.category, elements.collection, elements.aspect, elements.transparency].forEach((element) => {
      element.addEventListener('input', applyFilters);
      element.addEventListener('change', applyFilters);
    });

    elements.reset.addEventListener('click', () => {
      elements.search.value = '';
      elements.category.value = '';
      elements.collection.value = '';
      elements.aspect.value = '';
      elements.transparency.value = '';
      applyFilters();
    });

    applyFilters();
  </script>
</body>
</html>
`;
}

function generateOutputs() {
  const assets = loadAssets();
  const problems = assertMetadata(assets);
  if (problems.length) {
    throw new Error(problems.join('\n'));
  }

  writeFile(CATALOG_JSON_PATH, buildCatalogJson(assets));
  writeFile(CATALOG_MD_PATH, buildCatalogMarkdown(assets));
  writeFile(INDEX_HTML_PATH, buildIndexHtml(assets));
  process.stdout.write(`Generated catalog outputs for ${assets.length} assets.\n`);
}

function validateOutputs() {
  const assets = loadAssets();
  const problems = assertMetadata(assets);
  if (problems.length) {
    throw new Error(problems.join('\n'));
  }

  const expectations = [
    [CATALOG_JSON_PATH, buildCatalogJson(assets)],
    [CATALOG_MD_PATH, buildCatalogMarkdown(assets)],
    [INDEX_HTML_PATH, buildIndexHtml(assets)],
  ];

  const mismatches = expectations
    .filter(([filePath, expected]) => fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8') !== expected)
    .map(([filePath]) => `${path.relative(path.join(__dirname, '..'), filePath)} is out of date. Run npm run assets:generate.`);

  const missing = expectations
    .filter(([filePath]) => !fs.existsSync(filePath))
    .map(([filePath]) => `${path.relative(path.join(__dirname, '..'), filePath)} is missing. Run npm run assets:generate.`);

  if (mismatches.length || missing.length) {
    throw new Error([...missing, ...mismatches].join('\n'));
  }

  process.stdout.write(`Validated ${assets.length} assets and generated outputs.\n`);
}

const command = process.argv[2];

if (command === 'generate') {
  generateOutputs();
} else if (command === 'validate') {
  validateOutputs();
} else {
  process.stderr.write('Usage: node scripts/asset-tools.js <generate|validate>\n');
  process.exit(1);
}
