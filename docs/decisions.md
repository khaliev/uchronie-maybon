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

### ADR-005 — Contradictions relevées en T01, aucune non tranchée
- **Date** : 2026-08-19
- **Tâche** : T01
- **Décision** : les contradictions trouvées pendant l'audit sont consignées dans
  `docs/TODO-CLIENT.md` (section « En attente ») sans être tranchées.
- **Contexte** : l'audit a révélé plusieurs sources contradictoires : adresse
  (68 bis rue Ponsardin, 51100 REIMS vs 51420 Nogent-l'Abbesse), domaine
  www.uchronie-maybon.com (NXDOMAIN), boutique melodie-maybon.sumup.link
  (inactive) vs uchronie-maybon.sumupstore.com (active), casse des URLs
  Instagram/Facebook, lien MELI-MELO en 404. Conformément aux règles
  anti-hallucination, aucune version n'est retenue avant confirmation client.
- **Alternatives rejetées** : trancher arbitrairement (interdit), corriger les
  textes (hors périmètre T01).
- **Conséquences** : en T03, toute donnée concernée portera `verified: false`
  et un `[[A_VERIFIER:...]]` ; rien n'est rempli sans source confirmée.
- **Statut** : actée

### ADR-004 — Format du schéma `source`/`verified` dans les JSON de contenu
- **Date** : 2026-08-19
- **Tâche** : T00
- **Décision** : chaque fichier JSON de `src/content/` (hors `pages/`) porte un
  bloc racine `_meta` obligatoire au format
  `{ "source": "<url-source>", "verified": <booléen> }`. Le script
  `validate-content.mjs` échoue si `_meta` est absent, si `source` est vide ou
  si `verified` n'est pas un booléen. Tout placeholder `[[A_VERIFIER:...]]`
  présent dans un JSON doit avoir une entrée exacte dans `docs/TODO-CLIENT.md`,
  sinon le script échoue.
- **Contexte** : concrétiser l'ADR-002 de façon mécanique dès le scaffolding,
  sans inventer de donnée. À ce stade aucun contenu n'est collecté :
  `verified: false` partout, placeholders conservés.
- **Alternatives rejetées** : wrapper objet par donnée
  (`{ value, source, verified }`) — casse les lectures plates
  (`site.name`, `site.lang`) du build et alourdit les fichiers.
- **Conséquences** : en T03, lors de l'extraction, les listes
  (`services`, `projects`, `testimonials`) passeront à un `source`/`verified`
  par entrée ; le `_meta` de fichier reste la source par défaut.
- **Statut** : actée