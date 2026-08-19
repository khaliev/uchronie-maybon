# T00 — Mise en place du protocole et validation

## Objectif
Initialiser le système de garde-fou pour garantir qu'aucune donnée métier ne soit inventée durant le projet.

## Entrées
- AGENTS.md
- project.yaml
- scripts/validate-content.mjs

## Sorties attendues
- Structure de dossiers `src/content/` prête.
- Script de validation fonctionnel.

## Étapes
1. Vérifier que l'agent a bien lu la "Constitution" (AGENTS.md).
2. Initialiser les fichiers JSON dans `src/content/` avec les clés obligatoires `source` et `verified`.
3. Tester le script `node scripts/validate-content.mjs` pour s'assurer qu'il bloque bien le processus si une donnée est invalide.

## Definition of Done
- [ ] Le script de validation s'exécute sans erreur.
- [ ] Le journal `docs/decisions.md` contient l'ADR-001 et ADR-002.