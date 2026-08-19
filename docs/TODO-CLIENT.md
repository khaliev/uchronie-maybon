# TODO CLIENT

> Questions et validations à obtenir du client. À mettre à jour au fil des échanges.
>
> Règle (T00) : tout `[[A_VERIFIER:...]]` présent dans un fichier JSON de
> `src/content/` doit être listé ci-dessous avec **fichier concerné, clé
> exacte et explication courte**, puis confirmé et passé à `verified: true`
> une fois sourcé.

## À demander obligatoirement (issus de l'audit et de l'extraction)
- [ ] Confirmation du titre "Artisan d'art" CMA (logo présent sur le site).
- [ ] Confirmation badge "Made in France" vs label "Made in Marne".
- [ ] Droit à l'image du portrait de Mélodie pour utilisation sur le nouveau site.
- [ ] Disponibilité du domaine `uchronie-maybon.com` (NXDOMAIN constaté lors de l'audit).
- [ ] Confirmer les horaires / modalités de rendez-vous et de réservation.
- [ ] Confirmer les réseaux sociaux / liens officiels.

## Placeholders `[[A_VERIFIER:...]]` à traiter

### src/content/site.json
- [ ] `[[A_VERIFIER:domaine final]]` — links.official_site : domaine officiel
- [ ] `[[A_VERIFIER:url de réservation]]` — links.booking : url de réservation
- [ ] `links.boutique` — URL de la boutique SumUp (active constatée en T01, à confirmer)

### Pages légales (créées en T06, contenus à valider)
- [ ] `src/content/pages/mentions-legales.md` — données d'identification légales (SIRET, SIREN, forme juridique), hébergeur, propriété intellectuelle
- [ ] `src/content/pages/politique-de-confidentialite.md` — politique, cookies, droits RGPD

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
- [ ] **RÉCOMPENSES** : « 3ème place au concours du Noel de L'art 2019 sur le thème de l'Opéra » et « LABEL MADE IN MARNE » présents sur la page À propos (texte Wix). → À confirmer (orthographe « Noel de L'art » et date).
- [ ] **RÉSERVATION** : aucun widget de réservation (Calendly/Google Calendar) trouvé sur les sites actuels. → Confirmer le souhait d'un système de RDV (cf. ADR-003 : Google Calendar).