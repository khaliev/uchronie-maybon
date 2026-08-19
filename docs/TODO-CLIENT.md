# TODO CLIENT

> Questions et validations à obtenir du client. À mettre à jour au fil des échanges.
>
> Règle (T00) : tout `[[A_VERIFIER:...]]` présent dans un fichier JSON de
> `src/content/` doit être listé ci-dessous avec **fichier concerné, clé
> exacte et explication courte**, puis confirmé et passé à `verified: true`
> une fois sourcé.

## À demander
- [ ] Confirmer les coordonnées officielles (adresse, téléphone, email, horaires)
- [ ] Valider les pages et rubriques souhaitées
- [ ] Fournir photos / visuels autorisés et leurs droits d'utilisation
- [ ] Valider les textes et le ton éditorial
- [ ] Confirmer les horaires / modalités de rendez-vous et de réservation
- [ ] Confirmer les réseaux sociaux / liens officiels

## Placeholders `[[A_VERIFIER:...]]` à traiter

### src/content/site.json
- [ ] `[[A_VERIFIER:accroche du site]]` — tagline : accroche officielle du site
- [ ] `[[A_VERIFIER:description officielle de l'atelier]]` — description officielle de l'atelier
- [ ] `[[A_VERIFIER:adresse complète]]` — contact.address : adresse de l'atelier
- [ ] `[[A_VERIFIER:ville]]` — contact.city : ville
- [ ] `[[A_VERIFIER:code postal]]` — contact.postal_code : code postal
- [ ] `[[A_VERIFIER:téléphone]]` — contact.phone : téléphone officiel
- [ ] `[[A_VERIFIER:email]]` — contact.email : email de contact
- [ ] `[[A_VERIFIER:horaires]]` — contact.hours : horaires d'ouverture
- [ ] `[[A_VERIFIER:url instagram]]` — social.instagram : URL officielle
- [ ] `[[A_VERIFIER:url facebook]]` — social.facebook : URL officielle

### src/content/services.json
- [ ] `[[A_VERIFIER:introduction des savoir-faire]]` — intro : phrase d'intro
- [ ] `[[A_VERIFIER:résumé ébénisterie]]` — services[0].summary (ébénisterie)
- [ ] `[[A_VERIFIER:détail à compléter]]` — services[0].details (ébénisterie)
- [ ] `[[A_VERIFIER:résumé tabletterie]]` — services[1].summary (tabletterie)
- [ ] `[[A_VERIFIER:détail à compléter]]` — services[1].details (tabletterie)
- [ ] `[[A_VERIFIER:résumé marqueterie et gainerie]]` — services[2].summary (marqueterie-gainerie)
- [ ] `[[A_VERIFIER:détail à compléter]]` — services[2].details (marqueterie-gainerie)
- [ ] `[[A_VERIFIER:résumé design produit]]` — services[3].summary (design-produit)
- [ ] `[[A_VERIFIER:détail à compléter]]` — services[3].details (design-produit)

### src/content/projects.json
- [ ] `[[A_VERIFIER:introduction des réalisations]]` — intro : phrase d'intro

### src/content/testimonials.json
- [ ] `[[A_VERIFIER:introduction des témoignages]]` — intro : phrase d'intro

## Validé par le client
- _(à remplir)_

## En attente
> Contradictions relevées en T01 (audit du 2026-08-19). Aucune n'est tranchée :
> les deux versions sont notées avec leur origine.

- [ ] **ADRESSE** : texte Wix « 68 bis rue Ponsardin, 51100 REIMS » (toutes pages, footer + page contact) VS données de localisation du widget carte Wix (page contact, JSON `businessLocation`) : « 51420 Nogent-l'Abbesse, France » (code postal 51420). → Confirmer l'adresse officielle de la boutique-atelier.
- [ ] **DOMAINE « officiel »** : `docs/source-urls.md` / `project.yaml` indiquent « https://www.uchronie-maybon.com/ » comme site principal, mais le domaine ne résout PAS (NXDOMAIN, vérifié www et sans www). → Confirmer le domaine officiel final (existant ou à créer).
- [ ] **BOUTIQUE** : la politique de confidentialité SumUp (`/page/politique-en-matiere-de-protection-de-la-vie-privee`) référence « melodie-maybon.sumup.link » comme « le Site Internet », alors que la boutique active est « uchronie-maybon.sumupstore.com ». Le domaine « melodie-maybon.sumup.link » renvoie 200 mais affiche « Sorry, this shop is not available. ». → Confirmer l'URL officielle de la boutique en ligne.
- [ ] **RÉSEAUX SOCIAUX** : casse des identifiants différente — Wix footer : instagram.com/**uchroniemaybon** et facebook.com/**uchroniemaybon** (minuscules) ; SumUp footer : instagram.com/**UchronieMaybon** et facebook.com/**UchronieMaybon** (capitales). → Confirmer les URLs officielles.
- [ ] **LIEN CASSÉ BOUTIQUE** : catégorie « MELI-MELO » du menu SumUp pointe vers `https://uchronie-maybon.sumupstore.com/error/404` (404). → Indiquer l'URL cible correcte ou supprimer la catégorie.
- [ ] **TITRE PAGE D'ACCUEIL WIX** : « Ebeniste » (sans accent) VS autres pages « Ebénisterie » (avec accent). → Confirmer l'orthographe officielle du titre SEO.
- [ ] **SLUGS PRODUITS** : URL `/product/<slug>` sur la page /produits VS `/article/<slug>` sur les pages catégories (même produit). → Sans impact métier, à clarifier pour le nouveau site.
- [ ] **RÉCOMPENSES** : « 3ème place au concours du Noel de L'art 2019 sur le thème de l'Opéra » et « LABEL MADE IN MARNE » présents sur la page À propos (texte Wix). → À confirmer (orthographe « Noel de L'art » et date).
- [ ] **HORAIRES** : « du mardi au vendredi: 11h-18h » / « samedi: 10h-19h » (Wix) ; aucun horaire visible sur la boutique SumUp. → Confirmer.
- [ ] **RÉSERVATION** : aucun widget de réservation (Calendly/Google Calendar) trouvé sur les sites actuels. → Confirmer le souhait d'un système de RDV (cf. ADR-003 : Google Calendar).