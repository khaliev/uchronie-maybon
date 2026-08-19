# Migration SEO et Redirections

## 1. Mapping des URLs (Redirections 301)

| URL Source (Wix) | URL Cible (Nouveau site) | Type | Remarques |
| :--- | :--- | :--- | :--- |
| `/uchronie-maybon` | `/` | 301 Permanente | Page d'accueil |
| `/uchronie-maybon/a-propos` | `/a-propos/` | 301 Permanente | - |
| `/uchronie-maybon/contact` | `/contact/` | 301 Permanente | - |
| `/uchronie-maybon/ebénisterie` | `/ebenisterie/` | 301 Permanente | Nécessite un traitement spécial pour l'accent (cf. section 2) |
| `/uchronie-maybon/portfolio` | `/realisations/` | 301 Permanente | - |
| `/uchronie-maybon/copie-de-ebénisterie` | *Aucune (410 Gone ou 404)* | - | Page en double à ne pas rediriger |

## 2. Gestion de l'URL accentuée (`/ebénisterie`)

L'ancienne URL Wix pour l'ébénisterie contient un "é" accentué. Selon le serveur web (Apache, Nginx, ou l'hébergeur de fichiers statiques), l'URL encodée pourra être appelée.
- L'URL encodée est : `/uchronie-maybon/eb%C3%A9nisterie`
- **Recommandation** : Il est impératif de configurer la règle de redirection sur la version encodée (`/uchronie-maybon/eb%C3%A9nisterie`) pour intercepter les requêtes HTTP brutes envoyées par les navigateurs ou les moteurs de recherche, et la rediriger vers `/ebenisterie/` (sans accent).

## 3. Instructions techniques (Hébergement)

Étant donné que le nouveau site sera hébergé statiquement (hors Wix), les redirections 301 devront être configurées au niveau du serveur du nouvel hébergement (par exemple via `.htaccess` pour Apache, un bloc `server` pour Nginx, ou les règles de redirection de plateformes comme Netlify/Vercel).

**Pour Wix (si conservation temporaire du domaine Wix) :**
Wix permet de configurer des redirections 301 dans son interface SEO. Cependant, si le domaine principal (ex: `uchronie-maybon.fr`) est transféré vers le nouvel hébergeur statique, les redirections Wix ne serviront plus : elles devront être paramétrées sur le nouveau serveur.
