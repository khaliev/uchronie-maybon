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

---

### ADR-005 — Portrait non utilisé dans la démo
- **Date** : 2026-08-19
- **Décision** : Le portrait de Mélodie ne sera pas utilisé dans la maquette
  de prospection pour respecter le droit à l'image.
- **Conséquences** : La page À propos utilisera uniquement des photos
  d'atelier et de créations. Si le projet est accepté, on demandera
  l'autorisation pour un portrait officiel.
- **Statut** : actée

---

### ADR-006 — Récupération et inventaire des assets visuels (T02)
- **Date** : 2026-08-19
- **Tâche** : T02
- **Décision** : Récupération en pleine résolution des 32 images et logos publics du site Wix existant dans `src/assets/images/originals/`, renommage en kebab-case français descriptif et factuel, et catalogage complet dans `docs/inventaire-assets.csv`. Les conversions en formats modernes (WebP/AVIF) et responsive sont différées au pipeline de build statique ultérieur en raison de l'absence d'outils CLI de conversion (cwebp, avifenc, imagemagick) dans l'environnement d'exécution.
- **Contexte** : 32 fichiers sur 33 identifiés ont été téléchargés avec succès (1 fichier Wix en erreur HTTP 403 et la boutique SumUp protégée par Cloudflare anti-bot). Aucune essence de bois, matière ou collection non formellement sourcée n'a été inventée pour les noms de fichiers et descriptions.
- **Alternatives rejetées** :
  - Conserver les identifiants opaques Wix (`6860cd_...`) : rejeté car non maintenable et anti-SEO.
  - Inventer des essences de bois dans les noms de fichiers : rejeté en vertu des règles anti-hallucination.
  - Générer des images de substitution par IA pour les assets inaccessibles : strictement interdit.
- **Conséquences** : Les 32 originaux haute résolution (29 Mo) sont disponibles localement pour servir de base aux templates et aux futures optimisations d'assets.
- **Statut** : actée

---

### ADR-007 — Arborescence et stratégie SEO (T04)
- **Date** : 2026-08-19
- **Tâche** : T04
- **Décision** : Validation de l'arborescence finale du site avec URLs propres, sans accents, en kebab-case. 
  - La navigation se compose d'un menu principal avec les pages racines et d'un lien sortant vers la boutique SumUp existante.
  - Le système de réservation (Google Calendar) disposera d'une page dédiée (`/rendez-vous/`) intégrée après une étape de consentement explicite, avec un fallback si désactivé.
  - Le plan de redirection 301 gère les URLs Wix d'origine vers les nouvelles (avec prise en charge de l'encodage spécifique pour l'ancienne page `ebénisterie`).
- **Contexte** : Nécessité de garantir une migration SEO sans perte de jus tout en adoptant une structure plus professionnelle et évolutive que l'existant.
- **Alternatives rejetées** :
  - Intégration iframe de la boutique SumUp : rejeté car techniquement complexe à bien adapter sur mobile et bloqué par les politiques de contenu (CSP) fréquentes ; on privilégie un lien sortant clair dans le menu.
- **Conséquences** : Les pages Markdown doivent être rigoureusement créées avec les slugs définis dans l'architecture, et le header/footer construits autour de cette arborescence.
- **Statut** : actée

---

### ADR-008 — Design System "Le geste ancien, le dessin contemporain" (T05)
- **Date** : 2026-08-19
- **Tâche** : T05
- **Décision** : Mise en place d'un design system complet en Pur CSS sans framework (total ~35 Ko non compressé, < 12 Ko compressé), articulé autour des tokens de couleur identitaires : Bordeaux (`#681D2A`), Champagne (`#C5A46D`), Ivoire (`#F5F0E7`), Noyer (`#49352A`), Ébène (`#171411`).
  - Typographie : `Cormorant Garamond` (titres éditoriaux serif) et `Inter` (sans-serif textuelle lisible), chargées via Bunny Fonts (respect de la vie privée / RGPD) avec fallbacks système robustes.
  - Principes visuels : Lignes fines d'incrustation inspirées de la marqueterie, damier filigrane très subtil, micro-arrondis contemporains (2-4px), respiration généreuse, absence totale de rouages/steampunk ou de textures bois omniprésentes.
  - Accessibilité : Conformité WCAG AA systématique. Utilisation du champagne uniquement sur fond sombre ou pour les liserés décoratifs ; le texte standard repose sur l'ébène/noyer/bordeaux sur fond ivoire (ratios 7.8:1 à 14.2:1). Tailles tactiles minimales de 44px, `:focus-visible` distinctif et respect strict de `prefers-reduced-motion`.
- **Contexte** : Établir une identité visuelle artisanale haut de gamme sobre et performante pour la vitrine d'Uchronie Maybon.
- **Alternatives rejetées** :
  - Framework CSS (Tailwind, Bootstrap) : rejeté pour garantir l'absence de dépendances et une charge de maintenance minimale.
  - Thème sombre par défaut : rejeté pour préserver l'ambiance "atelier & papier chaud" du fond ivoire.
- **Conséquences** : Les templates de T06 et les pages de T07 utiliseront exclusivement ces classes et variables CSS.
- **Statut** : actée

**Mise à jour 2026-08-19 :** Polices auto-hébergées en WOFF2 (8 fichiers, ~180 Ko total) pour éliminer la dépendance Bunny Fonts et optimiser le temps de chargement initial (économie estimée : 300-500ms au LCP).