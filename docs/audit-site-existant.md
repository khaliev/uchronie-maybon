# Audit des sites existants — Uchronie Maybon

> T01 — Collecte factuelle réalisée le 2026-08-19. Aucune interprétation, aucune
> correction. Textes copiés tels quels (fautes comprises). Les URLs listées dans
> `docs/source-urls.md` ont été crawlées + pages internes découvertes.

## Tableau de synthèse

| # | URL | Statut HTTP | Accessibilité |
|---|-----|-------------|---------------|
| 1 | https://melodiemaybon.wixsite.com/uchronie-maybon | 200 | OK |
| 2 | https://melodiemaybon.wixsite.com/uchronie-maybon/a-propos | 200 | OK |
| 3 | https://melodiemaybon.wixsite.com/uchronie-maybon/contact | 200 | OK |
| 4 | https://melodiemaybon.wixsite.com/uchronie-maybon/ebénisterie | 200 | OK |
| 5 | https://melodiemaybon.wixsite.com/uchronie-maybon/portfolio | 200 | OK (découverte pendant crawl) |
| 6 | https://melodiemaybon.wixsite.com/uchronie-maybon/copie-de-ebénisterie | 200 | OK (découverte pendant crawl) |
| 7 | https://www.uchronie-maybon.com/ | 000 | INACCESSIBLE — NXDOMAIN (le domaine ne résout pas, www et sans www) |
| 8 | https://uchronie-maybon.sumupstore.com/ | 403 (curl) / 200 (rendu navigateur) | Protégé par Cloudflare (« Just a moment... ») ; contenu récupéré via rendu navigateur |

Pages listées dans le sitemap Wix (`pages-sitemap.xml`) : accueil, portfolio,
a-propos, copie-de-ebénisterie, contact, ebénisterie (6 pages, aucune autre).
`robots.txt` Wix : réponse 400 Bad Request.

---

## 1. Accueil — https://melodiemaybon.wixsite.com/uchronie-maybon

- **Statut HTTP** : 200
- **Title** : `Ebeniste | Uchronie Maybon | Grand Est`
- **Meta description** : `Artisan ébéniste, marqueteure et tabletière à proximité de Reims. Coffrets, étuis et créations en bois et cuir sur-mesure depuis le design jusqu'à la fabrication finale pour professionnels et particuliers. Uchronie Maybon propose des produits uniques ou très petite série, fabriqués à la main et en France.`
- **og:title** : `Ebeniste | Uchronie Maybon | Grand Est` ; **og:url** : page accueil ; **og:image** : `6860cd_74c64a68e3954cc1a437a5dd40e1fcd4~mv2.png` (logo-or)
- **H1** : `Artisane D'art Rémoise`
- **H2 / H3** : aucun
- **Titres H6** (utilisés pour le contenu) :
  - `Bienvenue dans univers de la tabletterie, la fabrication de coffrets et de petits objets en bois. Pièces uniques ou en petites séries, pour professionnels et particuliers.`
  - `Atelier-boutique situé à Reims, lieu de vente et de découverte, Uchronie Maybon prend son champs d'action dans la région Champagne Ardennes et île de France principalement pour les déplacement, nous disposons toutefois d'une boutique en ligne`
  - `retrouvez-nous sur les réseaux sociaux`
  - `BOUTIQUE EN LIGNE` (lien vers SumUp)
- **Texte visible (copie exacte)** : voir ci-dessus (H6) + coordonnées du footer (section « Coordonnées » ci-dessous).
- **Coordonnées (footer, présent sur toutes les pages Wix)** :
  - `ATELIER-BOUTIQUE:` `68 bis rue Ponsardin,` `51100 REIMS` ; `du mardi au vendredi: 11h-18h` ; `samedi: 10h-19h` ; `tel: 06 21 32 40 59` ; `mail: melodie.maybon+contact@gmail.com`
- **Liens sortants** : LinkedIn (https://www.linkedin.com/company/uchronie-maybon/), Instagram (https://www.instagram.com/uchroniemaybon/), Facebook (https://www.facebook.com/uchroniemaybon), boutique SumUp (https://uchronie-maybon.sumupstore.com), mailto:melodie.maybon+contact@gmail.com, bandeau Wix (https://fr.wix.com/lp-fr/website-builder?...).
- **Témoignages** : non trouvé.
- **Images** : cf. section « Inventaire des images ».
- **Liens cassés** : aucun sur cette page.
- **Pages internes découvertes** : /portfolio, /ebénisterie, /copie-de-ebénisterie, /a-propos, /contact.

Note : le title utilise « Ebeniste » sans accent (incohérence d'accentuation avec les autres pages Wix en « Ébenisterie »). Les H6 sont des titres de niveau 6 utilisés comme contenu (hiérarchie H mal utilisée). Faute relevée : « Bienvenue dans univers de la tabletterie », « champs d'action », « pour les déplacement ».

---

## 2. À propos — https://melodiemaybon.wixsite.com/uchronie-maybon/a-propos

- **Statut HTTP** : 200
- **Title** : `À propos | Uchronie Maybon`
- **Meta description** : `Artisan d'art ébéniste à Reims. Tabletterie, mobilier et marqueterie de bois et cuir. Créations sur-mesure, petites restaurations et vente directe. Visite de l'atelier sur rendez-vous.`
- **H1** : `Artisane D'art Rémoise`
- **H2** : `Mélodie MAYBON`
- **H5** : `Savoir-faire :` / `Formation :` / `Récompenses et Prix :`
- **Texte visible (copie exacte)** :
  - `Artisan ébéniste à son compte depuis 2018, sous le nom d'Uchronie Maybon, Mélodie aspire à moderniser son savoir-faire emprunt d'Histoire et est active dans toute sa région de Champagne-Ardennes et île-de-France principalement.`
  - `Travaillant avec des professionnels et des particuliers, son objectif est de réaliser vos projets en établissant avec vous un cahier des charges compatible avec votre budget.`
  - `Travaillant dans sa boutique-atelier au 68 bis rue Ponsardin à Reims (Marne), Mélodie "dépoussière" le métier de tabletier et marqueteur. Mélanger les matières entre elles dans ses créations font sa particularité, et Mélodie recherche la modernité dans le dessin de ses marqueteries. Vous retrouverez malgré tout les grands classiques de l'ébénisterie avec le motif de damier, motif typique et symbolique des ébénistes qui est un incontournable de son métier. Fabriquant tout de A à Z, elle tiens à se fournir en France/UE pour sa matière première afin de vous proposer une qualité exemplaire. Pour ce qui est des essences de bois, découvrez des veinages et des teintes originales que vous n'aurez pour certains jamais vu...`
  - `Savoir-faire : design produit (conception, infographie), ébénisterie (mobilier), tabletterie (coffret de bois), gainerie (travail du cuir/ cuir synthétique), marqueterie (dessins formés grâce à un matériau: bois, cuir, paille, etc...), packaging de luxe (transformation de l'existant ou création complète en bois et/ou cuir synthétique, logo en marqueterie ou gravé,...)`
  - `Formation : Vous avez la garantie de travailler avec une artisan de 7 ans d'études: 3 ans de design produit, 4 ans d'ébénisterie.`
  - `Récompenses et Prix :` — `3ème place au concours du Noel de L'art 2019 sur le thème de l'Opéra` ; `LABEL MADE IN MARNE`
  - `Petites anecdotes: l'origine du métier de tabletier, à proprement parler, date du Moyen-Age avec les tablettes à écrire voir même du 14ème av J-C avec les tablettes en cire ayant cette même fonction ! Uchronie Maybon prend son point de départ dans le métier de tabletière du début 19ème; c'est l'époque des grandes explorations, de la Révolution Industrielle et des Grandes Inventions, c'est la fameuse période de l'Exposition Universelle (1889) où la Tour Eiffel a été construite.`
- **Coordonnées** : footer identique à l'accueil (68 bis rue Ponsardin, 51100 REIMS ; mar-sam ; tel ; mail).
- **Liens sortants** : identiques à l'accueil (LinkedIn, Instagram, Facebook, SumUp, mailto, bandeau Wix).
- **Témoignages** : non trouvé.
- **Liens cassés** : aucun.

---

## 3. Contact — https://melodiemaybon.wixsite.com/uchronie-maybon/contact

- **Statut HTTP** : 200
- **Title** : `Contact | Uchronie Maybon`
- **Meta description** : `Artisan d'art ébéniste à Reims. Tabletterie, mobilier et marqueterie de bois et cuir. Créations sur-mesure, petites restaurations et vente directe. Visite de l'atelier sur rendez-vous.`
- **H1** : `Artisane D'art Rémoise`
- **H2** : `CONTACTEZ-MOI`
- **Texte visible (copie exacte)** :
  - `Un projet sur-mesure ? Une restauration à faire ? Un concept de boite ? Contactez-moi par téléphone, mail et pourquoi pas directement me rendre visite à la boutique ?`
  - `Boutique - atelier:` `68 bis rue Ponsardin, 51100 REIMS.` `du mardi au vendredi: 11h-18h` `le samedi: 10h-19h` `Tél: 06 21 32 40 59` `E-mail: melodie.maybon+contact@gmail.com`
- **CONTRADICTION (carte) — données de localisation du widget Wix (JSON `businessLocation`)** :
  - `businessLocationFormatted` : `51420 Nogent-l'Abbesse, France`
  - `businessLocationCity` : `Nogent-l'Abbesse` ; `businessPostalCode` : `51420` ; `businessLocationCountry` : `FR`
  - vs texte affiché : `68 bis rue Ponsardin, 51100 REIMS` (corps de page ET footer).
  - → deux adresses différentes selon la source (texte vs données carte). Reportée dans TODO-CLIENT.md « En attente ».
- **Liens sortants** : mailto (x2), LinkedIn, Instagram, Facebook, SumUp, bandeau Wix.
- **Témoignages** : non trouvé.
- **Liens cassés** : aucun.
- **Images** : mini-avatar `IMG_20210217_115727_128.jpg` (blur), logo-or.

---

## 4. Ébénisterie — https://melodiemaybon.wixsite.com/uchronie-maybon/ebénisterie

- **Statut HTTP** : 200 (URL encodée `eb%C3%A9nisterie` acceptée, pas de redirection)
- **Title** : `Ebénisterie | Uchronie Maybon`
- **Meta description** : `Artisan d'art ébéniste à Reims. Tabletterie, mobilier et marqueterie de bois et cuir. Créations sur-mesure, petites restaurations et vente directe. Visite de l'atelier sur rendez-vous.`
- **H1** : `Artisane D'art Rémoise`
- **H4** : `Découvrez l'ébénisterie autrement:`
- **H5** : `L'ébénisterie est le savoir-faire noble du travail du bois dans la fabrication de mobilier. Ainsi, Uchronie Maybon travaille avec l'existant selon votre cahier des charges, ou propose ses services pour la fabrication de petits espaces d'exposition.`
- **Texte visible (copie exacte)** :
  - (H5 ci-dessus)
  - `A noter:` `_ transformation de meuble (gainerie, placage, extension),` `_ petite restauration de meuble (placage, marqueterie, remise en état, vernissage).` `_ présentoirs (pour bijoux, accessoires, sculptures, montres, maquillage,...)`
- **Coordonnées** : footer identique.
- **Liens sortants** : identiques (LinkedIn, Instagram, Facebook, SumUp, mailto, bandeau Wix).
- **Témoignages** : non trouvé.
- **Liens cassés** : aucun.
- **Images** : `copeaux chene uchronie maybon bois .jpg` + 5 photos de galerie SANS attribut alt.

---

## 5. Tabletterie — https://melodiemaybon.wixsite.com/uchronie-maybon/portfolio

- **Statut HTTP** : 200 (découverte via le menu)
- **Title** : `Tabletterie | Uchronie Maybon`
- **Meta description** : `Artisan d'art ébéniste à Reims. Tabletterie, mobilier et marqueterie de bois et cuir. Créations sur-mesure, petites restaurations et vente directe. Visite de l'atelier sur rendez-vous.`
- **H1** : `Artisane D'art Rémoise`
- **H2** : `La tabletterie, un savoir-faire de niche.`
- **Texte visible (copie exacte)** :
  - Légendes des 4 visuels : `Marqueterie` / `Mélange des matières` / `Travail du bois` / `Personnalisation`
  - `La tabletterie est une branche de l'ébénisterie consistant à fabriquer de petits objets en bois (tablettes à écrire, peignes, manches de canne, dominos, éventails, etc.) et à la fin du 18ème- début 19ème (Premier Empire plus particulièrement), ce savoir-faire s'étend aux coffrets en bois destinés aux classes sociales de l'époque pouvant se permettre de voyager.`
  - `Uchronie Maybon vous propose des pièces aussi fonctionnelles qu'agréables à l'œil car le plaisir de l'utilisation passe aussi par l'esthétique. Coffrets à bijoux inovants ou coffrets à champagnes personnalisés, Uchronie Maybon vous propose des pièces uniques et vous accompagne dans tout vos projets.`
- **Coordonnées** : footer identique.
- **Liens sortants** : identiques.
- **Témoignages** : non trouvé.
- **Liens cassés** : aucun.
- **Images** : 4 visuels nommés (catégorie) + 6 photos de galerie sans alt.

---

## 6. Espace pro — https://melodiemaybon.wixsite.com/uchronie-maybon/copie-de-ebénisterie

- **Statut HTTP** : 200 (découverte via le menu)
- **Title** : `Espace pro | Uchronie Maybon`
- **Meta description** : `Artisan d'art ébéniste à Reims. Tabletterie, mobilier et marqueterie de bois et cuir. Créations sur-mesure, petites restaurations et vente directe. Visite de l'atelier sur rendez-vous.`
- **H1** : `Artisane D'art Rémoise`
- **H4** : `Démarquez-vous avec le + Métier d'art`
- **Texte visible (copie exacte)** :
  - `Remerciez vos collaborateurs, chouchoutez vos clients, Faitez-vous jalousez par vos concurrents. Misez l'utile et l'esthétique unique et faites-nous confiance pour nos propositions professionnelles qui sortent de l'ordinaire. Tarifs selon votre budget, et les options que vous choisissez. Demandez donc votre devis !`
  - `QUelques-unes de nos proposition ci-dessous, liste non exhaustive.`
  - `Tour d'exposition, comptoir, boite à chocolats, tapis de souris, dessous de main, agenda, cartes de menu et des vins, boite à pourboire,... Vos couleurs, votre budget, votre cahier des charges. Toujours Made in France et signé Uchronie Maybon, ébénisterie d'art. Choisissez l'exception et l'originalité pour votre entreprise qui le mérite.`
- **Coordonnées** : footer identique.
- **Liens sortants** : identiques.
- **Témoignages** : non trouvé.
- **Liens cassés** : aucun.
- **Images** : aucune image propre (header/footer communs uniquement).

---

## 7. https://www.uchronie-maybon.com/

- **Statut** : **000 — INACCESSIBLE**.
- **Cause** : `curl: (6) Could not resolve host` → NXDOMAIN confirmé par DNS (`nslookup www.uchronie-maybon.com` et `uchronie-maybon.com` : server can't find → NXDOMAIN).
- **Contenu** : non récupéré — le domaine n'existe pas / n'est pas publié. Aucun contenu simulé.
- **Conséquence** : la source « site officiel » listée dans `source-urls.md` est inexistante au moment de l'audit. Reportée dans TODO-CLIENT.md « En attente ».

---

## 8. Boutique en ligne — https://uchronie-maybon.sumupstore.com/

- **Statut HTTP** : 403 via curl (Cloudflare « Just a moment... », anti-bot) ; 200 via rendu navigateur (webfetch). Le contenu ci-dessous provient du rendu navigateur.
- **Title** : `La boutique en ligne d'Uchronie Maybon`
- **H1** : `Uchronie Maybon, ébéniste d'art, tabletière et marqueteure`
- **Texte visible (copie exacte)** :
  - `Modèles uniques et de caractère, Made in France à Reims.`
  - `Pièces uniques en bois et en cuir synthétique pour Monsieur et Madame.`
  - CTA : `Voir articles` (lien `#` — ancre sans URL)
- **Menu (catégories)** : Accueil ; Articles ; BIJOUX ; BUREAU ; MELI-MELO ; ART DE LA TABLE ; ACCESSOIRES ; MAISON ; COFFRETS ; Contact (→ page Contact du site Wix).
- **LIEN CASSÉ** : la catégorie `MELI-MELO` pointe vers `https://uchronie-maybon.sumupstore.com/error/404` → confirmé **404**.
- **Footer** : Contact Us (/contact) ; Legal Terms (/page/conditions-generales) ; Privacy Policy (/page/politique-en-matiere-de-protection-de-la-vie-privee) ; Cookie Policy (/politique-cookies) ; `© 2026 Uchronie Maybon` ; powered by SumUp.
- **Réseaux sociaux** : Facebook `https://facebook.com/UchronieMaybon`, Instagram `https://instagram.com/UchronieMaybon` (capitales — casse différente des liens Wix en minuscules).
- **Pages vérifiées** :
  - /produits (200) — catalogue paginé (1/2/3), 16 produits page 1 (ex : bague de lecture 7,00 € ; Boîte Arlequin 230,00 € ; Boite CUBE L Noyer 80,00 € ; Boite CUBE L Séquoia 80,00 € ; Boite damier doré 38,00 € ; Boîte ébène et marqueterie 275,00 € ; Boîte loupe d'érable 175,00 € ; Boîte palissandre 130,00 € ; Boîte verte et marqueterie 250,00 € ; Boucle d'oreilles Drop marqueterie 45,00 € ; Cadre à stickers 30,00 € ; Crochet à clés 25,00 € ; Crochet à clés 2 25,00 € ; Crochet à clés 3 35,00 € ; Dessous de verre bois 20,00 € ; Dessous de verre gainé 8,00 €).
  - /catégorie/bijoux (200) — Boucle d'oreilles Drop marqueterie.
  - /catégorie/bureau-1 (200) — Étui à stylo citronnier de Ceylan 35,00 € ; Marque-pages chat 8,00 € ; pot à crayons 30,00 € ; Tapis de souris 35,00 €.
  - /catégorie/art-de-la-table (200) — Dessous de verre bois 20,00 € ; Dessous de verre gainé 8,00 € ; Porte-couteau cathédrale de Reims 3,50 € ; Porte-nom Cathédrale de Reims 3,00 € ; Rond de serviette 4,00 €.
  - /catégorie/coffrets (200) — Boite damier doré ; Boîte ébène et marqueterie ; Boîte loupe d'érable ; Boîte palissandre ; Boîte verte et marqueterie ; Mini-coffre sapelli 30,00 € ; Plumier Arlebois 250,00 € ; Plumier Arlequin 175,00 €.
  - /catégorie/accessoires et /catégorie/maison : présentes dans le menu, non crawlees individuellement (même motif que les catégories vérifiées).
  - /product/boite-arlequin (200) — fiche produit avec « Acheter », « Ajouter au panier », articles connexes. Breadcrumb « ACCESSOIRES ».
  - /contact (200) — formulaire « Nous contacter », reCAPTCHA.
  - /page/conditions-generales (200) — CGV génériques SumUp (nom « Mélodie maybon », loi irlandaise, retours 14 jours, retrait en magasin).
  - /page/politique-en-matiere-de-protection-de-la-vie-privee (200) — **CONTRADICTION** : le texte référence `melodie-maybon.sumup.link (le « Site Internet »)` comme domaine de la boutique, alors que la boutique active est `uchronie-maybon.sumupstore.com`. Par ailleurs `melodie-maybon.sumup.link` renvoie 200 mais affiche « Sorry, this shop is not available. » → boutique inexistante/inactive.
  - /politique-cookies (200) — politique de cookies SumUp, mise à jour 09/04/2024.
  - /error/404 (404) — page d'erreur (liée au menu MELI-MELO).
- **Incohérence technique** : les URLs produits sont en `/product/<slug>` sur la page /produits mais en `/article/<slug>` sur la page de catégorie (ex : /product/boucle-d-oreilles-drop-marqueterie vs /article/boucle-d-oreilles-drop-marqueterie). Les deux semblent fonctionner (le catalogue de bijoux utilise /article/).
- **Témoignages** : non trouvé.
- **Images** : logo header `68185074-40c3-47cc-8a5f-38abc879e8f1.png` (alt « Bienvenue sur la boutique en ligne d'Uchronie Maybon »), bannière `206a817f-87e7-461b-a49e-ba5c41be6a19.jpeg` (alt générique « Banner image »), images produits sur cdn `images.sumup.com` (alts descriptifs, ex : « bague de lecture »), logo SumUp (footer).

---

## Coordonnées — synthèse (page d'origine)

| Donnée | Valeur | Page d'origine |
|--------|--------|----------------|
| Adresse (texte) | 68 bis rue Ponsardin, 51100 REIMS | Wix : accueil (footer), a-propos, contact (corps + footer), ebénisterie, tabletterie, espace pro (footer) |
| Adresse (données carte widget) | 51420 Nogent-l'Abbesse, France | Wix : contact (JSON businessLocation) |
| Téléphone | 06 21 32 40 59 | Wix : toutes pages (footer) + contact |
| Email | melodie.maybon+contact@gmail.com | Wix : toutes pages (footer) + contact |
| Horaires | du mardi au vendredi: 11h-18h ; samedi: 10h-19h | Wix : toutes pages (footer) ; « le samedi: 10h-19h » (contact) |

## Réseaux sociaux — synthèse

| Réseau | URL (Wix) | URL (SumUp) |
|--------|-----------|-------------|
| Instagram | https://www.instagram.com/uchroniemaybon/ | https://instagram.com/UchronieMaybon |
| Facebook | https://www.facebook.com/uchroniemaybon | https://facebook.com/UchronieMaybon |
| LinkedIn | https://www.linkedin.com/company/uchronie-maybon/ | (absent) |

Toutes renvoient HTTP 200. Casse des identifiants différente entre Wix (minuscules) et SumUp (capitales) → confirmer les URLs officielles (TODO-CLIENT).

## Boutiques / domaines

- Boutique active : https://uchronie-maybon.sumupstore.com/ (403 anti-bot en curl, OK en navigateur)
- Domaine cité dans la politique de confidentialité SumUp : melodie-maybon.sumup.link → 200 mais « Sorry, this shop is not available. »
- Domaine « site officiel » (source-urls) : www.uchronie-maybon.com → NXDOMAIN, inexistant

## Témoignages

Non trouvés sur aucune des pages crawlées (aucun témoignage client sur le Wix ni sur la boutique SumUp).

## Liens cassés / incohérences de liens

1. **MELI-MELO** (menu boutique) → https://uchronie-maybon.sumupstore.com/error/404 → **404**.
2. **www.uchronie-maybon.com** → NXDOMAIN (site « officiel » inexistant).
3. **melodie-maybon.sumup.link** (cité dans la politique de confidentialité) → 200 mais boutique « not available ».
4. Incohérence de slugs produits : `/product/<slug>` sur /produits vs `/article/<slug>` sur les pages catégories.
5. CTA « Voir articles » de la boutique → lien ancre `#` (sans URL cible).
6. images non altées : photos de galerie Wix (ébénisterie, tabletterie), image lien boutique (Wix), bannière SumUp (alt générique « Banner image »).

## Inventaire des images (URL + alt) — Wix

Base : `https://static.wixstatic.com/media/` (fichiers hébergés sur le compte `6860cd_...`).

**Header commun (toutes pages)** :
- `6860cd_57b1d02aea004fa2be73b2effc6a88d2~mv2.png` — `page-de-garde(2)_edited.png` (alt : « page-de-garde(2)_edited.png »)
- `6860cd_76c86ac57a544564bc75556a795aa7b6~mv2.png` — uchronie-maybon-melodie-made-in-france-r (alt idem, mention « r »)
- `6860cd_6e521357e1774a9da81495b778aa2c7c~mv2.png` — uchronie-maybon-melodie-made-in-france-r (alt idem)
- `6860cd_d787783c6e9d4dfab83f92f0030a2950~mv2.png` — logo uchronie maybon.png (alt : « logo uchronie maybon.png »)

**Footer commun (toutes pages)** :
- `6860cd_547154e432be4bdf8c0a080a00db63ed~mv2.png` — page-de-garde(2).png (alt : « page-de-garde(2).png »)
- `6860cd_a9ba88131ced4020b2efa3fd357076c1~mv2.png` — Linkedin-Logo.png (alt : « Linkedin-Logo.png »)
- `6860cd_a08328b680d740cca72da5b72defce20~mv2.png` — uchroniemaybon_nametag.png (alt : « uchroniemaybon_nametag.png »)
- `6860cd_7a6510c865d043ecbc03f203bb9307ad~mv2.jpg` — logo facebook.jpg (alt : « logo facebook.jpg »)
- `6860cd_05cf17cda6ba47a59dd696d38e41563a~mv2.png` — image lien boutique SumUp (**sans attribut alt**)

**Accueil** : `6860cd_46f7fcf4d46c4217888f42b9685aa6cd~mv2.png` — P_20201104_111917.png (alt : « P_20201104_111917.png »)

**À propos** :
- `6860cd_74c64a68e3954cc1a437a5dd40e1fcd4~mv2.png` — logo-or-uchronie-maybon.png (alt : « logo-or-uchronie-maybon.png ») — aussi utilisée comme og:image
- `6860cd_0776d23fa25640cc8867e6b7356196be~mv2.jpg` — P1000836_edited_edited_edited.jpg (alt idem)

**Contact** :
- `6860cd_e2f0cb121f6f4373848e0a5fc7a9a6a6~mv2.jpg` — IMG_20210217_115727_128.jpg (alt idem, rendu flouté `blur_2`)
- logo-or-uchronie-maybon.png

**Ébénisterie** :
- `6860cd_294a31257ceb4cedae45c365defa57a1~mv2.jpg` — copeaux chene uchronie maybon bois .jpg (alt : « copeaux chene uchronie maybon bois .jpg »)
- Galerie sans alt : `6860cd_c64cf4f3325544a49622b538fc01a160~mv2.jpg`, `6860cd_b85910e0910f49b1a46b89a82e2784de~mv2.jpg`, `6860cd_7206a145de274d04a2f7c2dca9e95aba~mv2.jpg`, `6860cd_4ec3ede023cc4068acab1297c4504303~mv2.jpg`, `6860cd_f4db63f2a4ec45d996c13ce3e9d60ac6~mv2.jpg`

**Tabletterie (/portfolio)** :
- `6860cd_fd14e6b77a424a4cb7a0eea92052e57d~mv2.jpg` — uchronie-maybon-boite-bois-gamme-arlequin-multicolore-mondrian-marqueterie-cuir-simili-uni (alt idem) — « Marqueterie »
- `6860cd_31bbb83157bb465cb1ef550d03080861~mv2.png` — uchronie-maybon-sablier-rouge-boite-bois-entreprise-champagne-ardenne-reims-tabletterie-su (alt idem) — « Mélange des matières »
- `6860cd_1e602ce4aca549bbb80096c03f931029~mv2.jpg` — uchronie-maybon-boite-bois-arlequin-tradition-marin-reims-champagne-ardenne-grand-est-coff (alt idem) — « Travail du bois »
- `6860cd_7af19a8dc59945f7b47b7dd72aa5234f~mv2.jpg` — dessous de verre, Collection des Sacres.jpg (alt idem) — « Personnalisation »
- Galerie sans alt : `6860cd_f0a3b2685f0f41af8d1e4da403ad1fb7f000.jpg`, `6860cd_d9fe1f0a78be4a7eb473cc104ae7c288~mv2.jpg`, `6860cd_efa4d5aea7ff4088aae043ac3448bc5a~mv2.jpg`, `6860cd_a8593a839395447da62228d499d500b3~mv2.jpg`, `6860cd_1eed8f4a78364fa7bd4cd245ddb730b3~mv2.jpg`, `6860cd_c47d5b1a07ac4769a1a5af28355597e8f003.jpg`

**Espace pro** : aucune image propre.

## Réservation

Aucun widget de réservation (Calendly / Google Calendar) trouvé sur les pages Wix crawlées. Aucune mention de prise de rendez-vous en ligne. (Note : ADR-003 prévoit Google Calendar pour le nouveau site — décision, pas donnée collectée.)

## Fichiers produits en T01

- `docs/audit-site-existant.md` (ce fichier)
- `docs/inventaire-contenu.csv`
- `docs/liens-et-redirections.csv`
- `docs/TODO-CLIENT.md` (mise à jour : contradictions en « En attente »)
- `docs/decisions.md` (ADR-005 : contradictions signalées)
- `docs/state.json` (statut T01 → done)