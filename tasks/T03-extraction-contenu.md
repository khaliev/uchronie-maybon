# T03 — Structuration du contenu (JSON/Markdown)

## Objectif
Transformer les données brutes de T01 en fichiers structurés et exploitables par le moteur de build.

## Entrées
- Résultats de T01
- docs/brief-client.md

## Étapes
1. Remplir `src/content/site.json`, `services.json`, `projects.json`.
2. Pour chaque élément, indiquer la `source` (ex: "URL Wix Contact") et le statut `verified`.
3. Utiliser les placeholders `[[A_VERIFIER:clef]]` pour toute donnée douteuse.
4. Rédiger les fichiers Markdown dans `src/content/pages/` (Accueil, À propos, etc.).

## Definition of Done
- [ ] `node scripts/validate-content.mjs` passe avec succès.
- [ ] Tout le texte métier est centralisé hors du code HTML.