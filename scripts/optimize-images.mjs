/**
 * Génération de variantes redimensionnées des images (correctif perf pré-T11).
 *
 * Les originaux (jusqu'à 4000px, 3,5 Mo) restent dans src/assets/images/originals/
 * (référence + Open Graph). Ce script crée des variantes légères dans
 * src/assets/images/cards/ servies par les pages :
 *   - cartes de la galerie réalisations + images de contenu : max 800px
 *   - hero accueil (collection Arlequin) : max 1200px
 *   - logo header : max 120px (affiché 60px, retina 2x)
 *
 * Outil : `sips` (natif macOS). Aucune dépendance npm. Si sips est absent,
 * le script sort en erreur SANS toucher les originaux — le build et les
 * pages référencant originals/ continuent de fonctionner.
 */
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { imageSize } from './lib/image-size.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGINALS = join(ROOT, 'src/assets/images/originals');
const CARDS = join(ROOT, 'src/assets/images/cards');

/** Taille max (plus grand côté) par fichier ; défaut 800 pour les cartes. */
const TARGETS = {
  'collection-arlequin-multicolore.jpg': 1200, // hero accueil
  'logo-uchronie-maybon-complet.png': 120, // header, affiché 60px @2x
  'logo-embleme-sablier-or.png': 240, // favicon
};

function sipsAvailable() {
  try {
    execFileSync('sips', ['--help'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (!sipsAvailable()) {
  console.error('sips introuvable : variantes non générées (originaux inchangés).');
  process.exit(1);
}

const files = execFileSync('find', [ORIGINALS, '-type', 'f'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .sort();

mkdirSync(CARDS, { recursive: true });

let created = 0;
let skipped = 0;

for (const file of files) {
  const name = file.split('/').pop();
  if (!/\.(jpe?g|png)$/i.test(name)) continue;
  const target = TARGETS[name] ?? 800;
  const dims = imageSize(file);
  if (!dims) {
    console.warn(`  ? ${name} : dimensions illisibles, ignoré`);
    skipped += 1;
    continue;
  }
  const out = join(CARDS, name);
  const largest = Math.max(dims.width, dims.height);
  if (largest <= target) {
    // Déjà plus petit que la cible : copie telle quelle (source unique servie).
    execFileSync('cp', [file, out]);
    console.log(`  = ${name} : ${dims.width}x${dims.height} ≤ ${target}px, copié`);
    created += 1;
    continue;
  }
  execFileSync('sips', ['-Z', String(target), file, '--out', out], { stdio: 'ignore' });
  const newDims = imageSize(out);
  console.log(
    `  ↓ ${name} : ${dims.width}x${dims.height} → ${newDims?.width}x${newDims?.height} (max ${target}px)`
  );
  created += 1;
}

console.log(`Variantes : ${created} fichier(s) dans src/assets/images/cards/, ${skipped} ignoré(s).`);
