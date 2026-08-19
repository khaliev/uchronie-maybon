# T01 — Audit et collecte de données

## Objectif
Collecter exhaustivement les données textuelles et techniques des sites actuels sans aucune modification.

## Entrées
- docs/source-urls.md (Liste des URLs Wix, SumUp, etc.)

## Étapes
1. Parcourir chaque URL listée dans `docs/source-urls.md`.
2. Extraire : textes bruts, titres H1-H3, métadonnées actuelles, liens sortants.
3. Identifier les incohérences (ex: deux adresses différentes) et les noter dans `docs/TODO-CLIENT.md`.
4. Produire un inventaire technique : `docs/audit-site-existant.md`.

## Interdits
- INTERDIT de corriger les fautes à cette étape.
- INTERDIT d'inventer des services non listés.

## Definition of Done
- [ ] Inventaire complet des textes sources réalisé.
- [ ] Incohérences listées dans TODO-CLIENT.md.