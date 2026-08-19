# T09 — Intégration Réservation et RGPD

## Objectif
Intégrer Calendly ou Google Calendar en respectant la vie privée.

## Étapes
1. Créer le composant de consentement (Avertir l'utilisateur avant de charger l'iframe tiers).
2. Intégrer l'outil de réservation choisi dans `project.yaml`.
3. Prévoir le mode "Lien direct" si l'utilisateur refuse les cookies tiers.

## Definition of Done
- [ ] Aucun script tiers ne se charge sans action utilisateur.
- [ ] La réservation est fluide sur mobile.