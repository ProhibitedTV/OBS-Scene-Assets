#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

const templatesDir = path.join(__dirname, '..', 'templates');
const assetsDir = path.join(__dirname, '..', 'assets');

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

function generateMetadata(name) {
  const now = new Date().toISOString();
  return `
<!-- Asset Metadata Block -->
<!--
Name: ${name}
Generated: ${now}
Metadata will be added by the user.
-->
`;
}

program
  .name('assets:add')
  .description('Create a new asset scaffold')
  .argument('<type>', 'asset type (alert, widget, lower-third, transition, theme)')
  .argument('[name]', 'asset name')
  .action((type, name) => {
    const validTypes = ['alert', 'widget', 'lower-third', 'transition', 'theme'];
    if (!validTypes.includes(type)) {
      console.error(`Unsupported type. Choose from: ${validTypes.join(', ')}`);
      process.exit(1);
    }
    if (!name) {
      name = `${type}-${Date.now()}`;
    }
    const targetDir = type === 'theme' ? path.join(assetsDir, 'themes', name) : path.join(assetsDir, type + 's');
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    const filename = `${name}.html`;
    const destPath = path.join(targetDir, filename);
    const templatePath = path.join(templatesDir, 'asset-starter.html');

    copyFile(templatePath, destPath);
    const meta = generateMetadata(name);
    const content = fs.readFileSync(destPath, 'utf8');
    const updated = `${meta}\n${content}`;
    fs.writeFileSync(destPath, updated, 'utf8');

    console.log(`Asset scaffold created: ${destPath}`);

    // Trigger preview generation for this new file
    const exec = require('child_process').exec;
    exec('npm run previews:generate', (err) => {
      if (err) console.error('Preview generation failed:', err);
      else console.log('Preview generated for', destPath);
    });
  });

program.parse(process.argv);
