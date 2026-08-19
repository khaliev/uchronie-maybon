# Objectifs qualité obligatoires

> À atteindre **avant livraison** (T11/T12). Vérifier lors de la QA.

## Lighthouse (Chrome DevTools, navigation desktop + mobile)
- Performance : **≥ 95**
- Accessibilité : **≥ 95**
- SEO : **≥ 95**
- Best Practices : **≥ 95**

## Responsive
- Largeurs supportées : de **320 px** à **4K**.
- Aucun débordement horizontal, textes lisibles, cibles tactiles suffisantes.

## Accessibilité
- Menu hamburger mobile **accessible** (ARIA, focus, fermeture).
- **Navigation clavier complète** sur toutes les pages et interactions.
- Respect de **`prefers-reduced-motion`** (aucune animation imposée sans consentement).
- Contraste conforme WCAG, `lang="fr"`, titres hiérarchisés, alternatives aux images.

## Performance & technique
- Site statique sans framework.
- Assets optimisés (images webp/avif, fonts maîtrisées).
- Aucune erreur console, zéro dépendance superflue.

## Vérification
- Enregistrer les mesures et leurs captures dans `docs/decisions.md` ou une annexe dédiée.