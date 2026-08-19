# Architecture Technique et Convention

## 1. Rôle de chaque dossier dans `src/`

- **`src/content/`** : Cœur des données du site. Contient l'intégralité des textes, coordonnées, et listes structurées (services, projets) au format JSON.
- **`src/content/pages/`** : Fichiers Markdown représentant le contenu spécifique de chaque page du site (frontmatter pour les métadonnées SEO, corps pour le contenu texte).
- **`src/partials/`** : Composants HTML réutilisables (header, footer, head) inclus dynamiquement lors de la phase de build.
- **`src/assets/`** : Ressources statiques (images, polices, CSS natif, JS côté client).

## 2. Composants partagés (`src/partials/`)

- **`head.html`** : Contient les balises `<head>` (meta SEO title/description, balises Open Graph, schéma JSON-LD, liens vers les CSS et favicons).
- **`header.html`** : Contient le logo du site, la navigation principale responsive, et le lien de redirection vers la boutique SumUp externe.
- **`footer.html`** : Contient les coordonnées de l'atelier, les liens vers les pages légales, les liens vers les réseaux sociaux et le copyright.
- **`booking-consent.html`** : Module affichant un bandeau ou une modale de consentement RGPD (consentement utilisateur obligatoire) avant de charger le script externe de Google Calendar.

## 3. Guide de contribution (Gestion du contenu)

### Comment ajouter une nouvelle page ?
1. Créer un fichier Markdown dans `src/content/pages/` (ex: `nouvelle-page.md`).
2. Ajouter le frontmatter requis (`slug`, `title`, `description`).
3. Écrire le contenu au format Markdown.
4. Ajouter un lien vers la page dans le tableau `items` du fichier `src/content/navigation.json`.

### Comment ajouter un nouveau projet (Réalisations) ?
1. Placer la ou les nouvelles photos du projet dans `src/assets/images/`.
2. Ouvrir `src/content/projects.json` et y ajouter un nouvel objet dans le tableau `projects` en respectant la structure (slug, title, description, image).

### Où vivent les informations globales ?
- **Coordonnées, réseaux sociaux et configuration de la boutique** : Dans `src/content/site.json`.
- **Navigation et menu principal** : Dans `src/content/navigation.json`.

## 4. Règles de nommage

- **Fichiers et répertoires** : Utiliser la convention `kebab-case` (minuscules, mots séparés par des tirets).
- **Slugs et URLs** : Strictement sans accents, sans espaces, sans caractères spéciaux.
- **Images** : Noms descriptifs en `kebab-case` pertinents pour le SEO (ex: `coffret-bijoux-marqueterie-bois.jpg`).
