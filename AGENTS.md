# AGENTS.md — Règles de travail pour agents

## Mission du dépôt
Refonte du site vitrine d'Uchronie Maybon (ébénisterie, tabletterie, marqueterie,
gainerie, design produit). Site statique HTML + CSS + JS natif, build Node.js simple,
zéro framework.


# AGENTS.md — Uchronie Maybon (Refonte Site)

**Constitution du projet — À lire obligatoirement à chaque nouvelle session.**

Tu travailles sur la refonte totale du site de **Mélodie Maybon** (Uchronie Maybon), artisan ébéniste, tabletier, marqueteur à Reims.

**Protocole strict (ne jamais dévier) :**
1. Lis `AGENTS.md` → `project.yaml` → `docs/decisions.md` → `docs/state.json`
2. Identifie la tâche `next_task` dans state.json
3. Ouvre **uniquement** le fichier correspondant dans `tasks/`
4. Respecte à la lettre les "Interdits", le "Definition of Done" et les règles anti-hallucination
5. À la fin de la tâche :
   - Exécute `node scripts/validate-content.mjs` (doit passer à 0 erreur)
   - Mets à jour `docs/state.json` (statut + next_task)
   - Ajoute une entrée dans `docs/decisions.md` pour tout choix structurant
   - Complète `docs/TODO-CLIENT.md` pour toute donnée non vérifiée
6. Commit avec préfixe `Txx: `

**Règles anti-hallucination (non négociables)**
- Toute donnée factuelle doit exister dans `src/content/` avec `source` et `verified`.
- Si `verified: false` → utilise `[[A_VERIFIER:clef]]` dans le HTML et ajoute l’item dans TODO-CLIENT.md.
- Interdit d’inventer : témoignages, notes, clients, essences de bois précises, prix, délais, récompenses supplémentaires.
- Le script `validate-content.mjs` est le juge de paix.

**Contraintes techniques permanentes**
- Site 100% statique (HTML + CSS + JS natif)
- Build via `scripts/build.mjs` (Node natif, zéro dépendance npm en prod)
- Contenu centralisé dans `src/content/` (JSON + Markdown frontmatter)
- Aucun framework, Tailwind, Bootstrap, GSAP, Astro, React, etc.
- Tout contenu métier doit être présent dans le HTML source (SEO + accessibilité)
- Design : « Le geste ancien, le dessin contemporain » (sobre, haut de gamme, références marqueterie/damier subtiles, palette bordeaux/champagne/ivoire/noyer)

**Réservation** : un seul provider à la fois (Calendly ou Google Calendar) avec consentement explicite avant chargement du tiers.

Ordre des tâches : T00 → T01 → T02 → T03 → T04 → T05 → T06 → T07 → T08 → T09 → T10 → T11 → T12.

## Règle d'or — sources d'abord
Avant toute rédaction, extraction ou implémentation métier, collecter et croiser les
données depuis les URLs listées dans `docs/source-urls.md`.

## Règles anti-hallucination
- N'inventer aucune donnée métier (adresses, prix, témoignages, récompenses, projets).
- Toute donnée incertaine ou non vérifiée → balise `[[A_VERIFIER:...]]`.
- Les placeholders vides restent vides tant qu'ils ne sont pas sourcés.
- Signaler toute source contradictoire dans `docs/decisions.md`.

## Conventions
- Contenu centralisé dans `src/content/` (JSON + markdown), jamais du texte en dur dans les pages.
- Tous les textes en français, UTF-8.
- Pas de framework CSS/JS. JavaScript natif uniquement.
- Nommage : kebab-case pour les fichiers, slugs français sans accents ni espaces.
- Une tâche = un fichier dans `tasks/`, format T00–T12, ne jamais les modifier hors de leur portée.
- Mettre à jour `docs/state.json` en fin de chaque tâche.
- Les objectifs qualité obligatoires sont dans `docs/quality-targets.md` ; ils doivent être atteints avant livraison.

## Commandes
- `npm run validate` — validation du contenu et des placeholders
- `npm run build` — build statique vers `dist/`
- `npm run serve` — serveur local de prévisualisation
- `npm run check-links` — vérification des liens internes

## Reprise de session
- Commencer par lire `docs/state.json`, `docs/decisions.md` et `docs/TODO-CLIENT.md`.

