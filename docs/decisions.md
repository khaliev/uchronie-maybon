# Journal des décisions

> Toute décision d'architecture, de contenu ou de périmètre se note ici.
> Signaler aussi toute source contradictoire.

## Format

| Date | Décision | Motivation | Statut |
|------|----------|------------|--------|
| AAAA-MM-JJ | [[décision]] | [[pourquoi]] | [[prise / en cours / annulée]] |

## Décisions

_(à remplir au fil des tâches)_


# Journal des décisions (ADR) — append-only, ne jamais supprimer

## Format
### ADR-NNN — Titre court
- **Date** : YYYY-MM-DD
- **Tâche** : Txx
- **Décision** : ce qui a été décidé
- **Contexte** : pourquoi
- **Alternatives rejetées** : et pourquoi
- **Conséquences** : impact sur la suite
- **Statut** : actée | remplacée par ADR-XXX

---

### ADR-001 — Site statique généré, zéro dépendance npm
- **Date** : 2026-08-19
- **Tâche** : cadrage
- **Décision** : build maison en Node natif (`build.mjs`), partials HTML,
  contenu en JSON/Markdown, sortie dans `dist/`.
- **Contexte** : maintenabilité par un artisan/prestataire, légèreté, pérennité.
- **Alternatives rejetées** : Astro (dépendance framework), Wix (statu quo),
  HTML dupliqué à la main (header/footer non maintenables).
- **Conséquences** : toute page = template + contenu ; jamais de texte en dur.
- **Statut** : actée

### ADR-002 — Contenu factuel avec provenance obligatoire
- **Date** : 2026-08-19
- **Décision** : tout item de `src/content/` porte `source` et `verified`.
  `validate-content.mjs` échoue si un item factuel n'a pas de source.
- **Conséquences** : anti-hallucination vérifiable mécaniquement, pas
  seulement par consigne.
- **Statut** : actée

### ADR-003 — Réservation : Calendly remplacé par Google Calendar
- **Date** : 2026-08-19
- **Tâche** : cadrage
- **Décision** : remplacer le widget Calendly par un lien direct et un
  iframe Google Calendar (mode public).
- **Contexte** : éviter les dépendances externes non maîtrisées, rester simple,
  maîtriser l'affichage.
- **Alternatives rejetées** : garder Calendly (dépendance externe), proposer
  un formulaire maison (charge de maintenance).
- **Conséquences** : le planning est visible uniquement via Google.
- **Statut** : actée