# Uchronie Maybon — refonte du site vitrine

Site statique HTML + CSS + JavaScript natif, build Node.js simple, zéro framework.
Positionnement : haut de gamme, artisanal, contemporain avec héritage historique.

## Structure

```text
docs/          Documentation, décisions, état, qualité, sources
tasks/         Tâches T00–T12 (squelettes à compléter)
scripts/       Validation, build, liens, serveur local
src/content/   Contenu centralisé (JSON + markdown)
src/partials/  Fragments HTML réutilisables
src/pages/     Templates de pages
src/assets/    CSS, JS, images, fonts
dist/          Sortie du build (générée)
```

## Commandes

- `npm run validate` — validation du contenu et détection des placeholders
- `npm run build` — génération du site dans `dist/`
- `npm run check-links` — vérification des liens internes
- `npm run serve` — serveur local de prévisualisation

## Règles

- Avant toute rédaction, extraction ou implémentation métier : lire
  `docs/source-urls.md` puis `docs/state.json`, `docs/decisions.md`,
  `docs/TODO-CLIENT.md`.
- Ne jamais inventer de donnée métier. Utiliser `[[A_VERIFIER:...]]` et des placeholders.
- Objectifs qualité : voir `docs/quality-targets.md`.