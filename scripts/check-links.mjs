import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

// TODO: enrichir en T07/T12 (fichiers générés par le build, pages dynamiques).
// Vérifie simplement les liens internes vers des fichiers présents dans dist/.

const LINK_RE = /(?:href|src)="([^"#]+)(?:#[^"]*)?"/g;

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (entry.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

if (!existsSync(DIST)) {
  console.error('dist/ manquant. Lancer `npm run build` d’abord.');
  process.exit(1);
}

let errors = 0;
for (const htmlFile of walk(DIST)) {
  const content = readFileSync(htmlFile, 'utf8');
  const from = htmlFile.replace(DIST + '/', '');
  let match;
  while ((match = LINK_RE.exec(content)) !== null) {
    const target = match[1];
    if (target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('tel:')) continue;
    const clean = target.split('?')[0];
    const targetPath = join(DIST, clean);
    if (!existsSync(targetPath)) {
      errors += 1;
      console.error(`[${from}] lien cassé → ${clean}`);
    }
  }
}

if (errors > 0) {
  console.error(`Liens : ${errors} cassé(s).`);
  process.exit(1);
}
console.log('Liens internes OK.');
process.exit(0);