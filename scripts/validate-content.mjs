import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src', 'content');
const PAGES_DIR = join(CONTENT_DIR, 'pages');
const PLACEHOLDER_RE = /\[\[A_VERIFIER:.*?\]\]/g;
const TODO_RE = /\[\[À_COMPLÉTER\]\]/g;

let errors = 0;
let warnings = 0;

function err(msg) {
  errors += 1;
  console.error(`[ERROR] ${msg}`);
}

function warn(msg) {
  warnings += 1;
  console.warn(`[WARN] ${msg}`);
}

// 1. JSON valides dans src/content/ (hors pages/)
for (const file of readdirSync(CONTENT_DIR)) {
  if (extname(file) !== '.json') continue;
  const path = join(CONTENT_DIR, file);
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf8'));
    if (typeof parsed !== 'object' || parsed === null) {
      err(`Contenu non-objet dans ${file}`);
    }
  } catch (e) {
    err(`JSON invalide dans ${file}: ${e.message}`);
  }
}

// 2. Chaque fichier .md de pages/ est non vide
if (existsSync(PAGES_DIR)) {
  const pageFiles = readdirSync(PAGES_DIR).filter((f) => extname(f) === '.md');
  for (const file of pageFiles) {
    const content = readFileSync(join(PAGES_DIR, file), 'utf8');
    if (!content.trim()) warn(`Page vide : ${file}`);
  }
} else {
  err(`Dossier pages/ manquant : ${PAGES_DIR}`);
}

// 3. Détection des placeholders restants dans le contenu centralisé
for (const file of readdirSync(CONTENT_DIR)) {
  const path = join(CONTENT_DIR, file);
  if (existsSync(path) && extname(file) === '.json') {
    const content = readFileSync(path, 'utf8');
    const found = content.match(PLACEHOLDER_RE) || [];
    if (found.length) warn(`${file} contient ${found.length} placeholder(s) [[A_VERIFIER:...]]`);
  }
}

// 4. Détection des TODO dans les pages
for (const file of readdirSync(PAGES_DIR)) {
  const content = readFileSync(join(PAGES_DIR, file), 'utf8');
  const found = content.match(TODO_RE) || [];
  if (found.length) warn(`${file} contient ${found.length} TODO [[À_COMPLÉTER]]`);
}

if (errors > 0) {
  console.error(`Validation KO : ${errors} erreur(s), ${warnings} avertissement(s).`);
  process.exit(1);
}
console.log(`Validation OK : ${warnings} avertissement(s).`);
process.exit(0);