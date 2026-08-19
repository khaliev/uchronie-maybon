import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src', 'content');
const PAGES_DIR = join(CONTENT_DIR, 'pages');
const TODO_FILE = join(ROOT, 'docs', 'TODO-CLIENT.md');
const PLACEHOLDER_RE = /\[\[A_VERIFIER:(.*?)\]\]/g;
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

let todoContent = '';
if (existsSync(TODO_FILE)) {
  todoContent = readFileSync(TODO_FILE, 'utf8');
} else {
  err(`Fichier TODO-CLIENT.md manquant : ${TODO_FILE}`);
}

// 1. JSON valides dans src/content/ (hors pages/) + schéma source/verified
const jsonFiles = readdirSync(CONTENT_DIR).filter((f) => extname(f) === '.json');
for (const file of jsonFiles) {
  const path = join(CONTENT_DIR, file);
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    err(`JSON invalide dans ${file}: ${e.message}`);
    continue;
  }
  if (typeof parsed !== 'object' || parsed === null) {
    err(`Contenu non-objet dans ${file}`);
    continue;
  }

  // 1a. Schéma attendu : bloc "_meta" obligatoire avec source + verified
  const meta = parsed._meta;
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) {
    err(`Schéma invalide dans ${file}: bloc "_meta" manquant (source + verified obligatoires)`);
  } else {
    if (typeof meta.source !== 'string' || meta.source.trim() === '') {
      err(`Schéma invalide dans ${file}: "_meta.source" manquante ou vide`);
    }
    if (typeof meta.verified !== 'boolean') {
      err(`Schéma invalide dans ${file}: "_meta.verified" doit être un booléen`);
    }
  }

  // 1b. Chaque placeholder [[A_VERIFIER:...]] doit être tracé dans TODO-CLIENT.md
  const content = readFileSync(path, 'utf8');
  const found = content.match(PLACEHOLDER_RE) || [];
  for (const ph of found) {
    if (!todoContent.includes(ph)) {
      err(`Placeholder non tracé dans TODO-CLIENT.md : ${file} — ${ph}`);
    }
  }
  if (found.length) warn(`${file} contient ${found.length} placeholder(s) [[A_VERIFIER:...]]`);
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

// 3. Détection des TODO dans les pages
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