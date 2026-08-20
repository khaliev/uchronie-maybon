/**
 * Uchronie Maybon — Moteur de build statique (T06)
 *
 * Assemble chaque page depuis :
 *   - src/content/site.json + src/content/navigation.json (données centralisées)
 *   - src/content/pages/*.md (frontmatter + corps Markdown)
 *   - src/partials/{head,header,footer}.html (gabarits avec variables {{...}})
 *
 * Génère dist/ : pages HTML (dist/index.html + dist/[slug]/index.html),
 * recopie src/assets/ → dist/assets/, puis crée dist/sitemap.xml et dist/robots.txt.
 *
 * Zéro dépendance npm. Node >= 18.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync, existsSync, statSync, copyFileSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');
const CONTENT_DIR = join(SRC, 'content');
const PAGES_DIR = join(CONTENT_DIR, 'pages');
const PARTIALS_DIR = join(SRC, 'partials');
const ASSETS_DIR = join(SRC, 'assets');

const TODAY = new Date().toISOString().slice(0, 10);
const PLACEHOLDER_RE = /\[\[A_VERIFIER:([^\]]+)\]\]/g;
const TEMPLATE_RE = /\{\{\s*([\w.-]+)\s*\}\}/g;

/* ------------------------------------------------------------------ */
/* Petites utilitaires                                                 */
/* ------------------------------------------------------------------ */

function read(file) {
  return readFileSync(file, 'utf8');
}

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function loadJson(file) {
  return JSON.parse(read(join(CONTENT_DIR, file)));
}

/**
 * Aplatit un objet JSON de contenu : toute feuille de forme
 * { value, source, verified } devient "chemin.vers.cle" → value.
 * (Schéma ADR-004 : le bloc _meta est ignoré, il n'a pas de clé "value".)
 */
function flattenValues(obj, prefix = '', acc = {}) {
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      if ('value' in val) acc[path] = val.value;
      else flattenValues(val, path, acc);
    }
  }
  return acc;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Normalise le chemin d'une image Markdown vers une URL absolue servie
 * depuis la racine : /assets/images/originals/<nom-fichier>.
 * Règle : aucune référence relative (../) ne doit survivre dans le HTML final.
 */
function imageUrl(path) {
  const clean = path.trim().replace(/^["']|["']$/g, '');
  if (clean.startsWith('/assets/images/originals/')) return clean;
  const file = basename(clean.split(/[?#]/)[0]);
  return `/assets/images/originals/${file}`;
}

function renderImage(alt, path) {
  return `<img src="${imageUrl(path)}" alt="${alt}" loading="lazy" width="800" height="600">`;
}

/* ------------------------------------------------------------------ */
/* Parseur frontmatter YAML (minimal : title, description, slug)        */
/* ------------------------------------------------------------------ */

function parseFrontmatter(md) {
  const fm = {};
  const start = md.startsWith('---\n') || md.startsWith('---\r\n') ? 4 : -1;
  if (start !== -1) {
    const end = md.indexOf('\n---', start);
    if (end !== -1) {
      const block = md.slice(start, end);
      for (const line of block.split(/\r?\n/)) {
        const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
        if (m) fm[m[1]] = m[2].trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
      }
      const body = md.slice(end + 4).replace(/^\r?\n/, '');
      return { fm, body };
    }
  }
  return { fm, body: md };
}

/* ------------------------------------------------------------------ */
/* Convertisseur Markdown → HTML (périmètre T06, volontairement simple) */
/* ------------------------------------------------------------------ */

function inline(text) {
  return text
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, (m, alt, path) => renderImage(alt, path))
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderMarkdown(md) {
  const htmlBlocks = [];
  const preserved = md.replace(/<([a-z][a-z0-9]*)[^>]*>[\s\S]*?<\/\1\s*>/gi, (match) => {
    const placeholder = `__HTML_BLOCK_${htmlBlocks.length}__`;
    htmlBlocks.push(match);
    return placeholder;
  });
  const source = escapeHtml(preserved).replace(
    PLACEHOLDER_RE,
    '<mark class="a-verifier" title="Donnée à vérifier">$1</mark>'
  );
  const lines = source.split(/\r?\n/);
  const out = [];
  let para = [];
  let list = null;

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${para.map(inline).join(' ')}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      out.push(`</${list.tag}>`);
      list = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }

    let m;
    const htmlMatch = line.match(/^__HTML_BLOCK_(\d+)__$/);
    if (htmlMatch) {
      flushPara();
      flushList();
      out.push(htmlBlocks[Number(htmlMatch[1])]);
      continue;
    }
    if ((m = line.match(/^!\[([^\]]+)\]\(([^)]+)\)$/))) {
      flushPara();
      flushList();
      out.push(renderImage(m[1], m[2]));
      continue;
    }
    if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      flushPara();
      flushList();
      out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`);
      continue;
    }
    if ((m = line.match(/^\*+\s+(.*)$/)) || (m = line.match(/^-\s+(.*)$/))) {
      flushPara();
      if (!list || list.tag !== 'ul') {
        flushList();
        list = { tag: 'ul' };
        out.push('<ul>');
      }
      out.push(`<li>${inline(m[1])}</li>`);
      continue;
    }
    if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      flushPara();
      if (!list || list.tag !== 'ol') {
        flushList();
        list = { tag: 'ol' };
        out.push('<ol>');
      }
      out.push(`<li>${inline(m[1])}</li>`);
      continue;
    }
    if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara();
      flushList();
      out.push(`<blockquote>${inline(m[1])}</blockquote>`);
      continue;
    }

    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return out.join('\n\n');
}

/* ------------------------------------------------------------------ */
/* Navigation (desktop + mobile) depuis navigation.json                 */
/* ------------------------------------------------------------------ */

function buildNavLink(href, label, opts = {}) {
  const cls = opts.cls ? ` class="${opts.cls}"` : '';
  const current = opts.current ? ' aria-current="page"' : '';
  const external = opts.external ? ' target="_blank" rel="noopener"' : '';
  return `      <li><a${cls} href="${href}"${current}${external}>${label}</a></li>`;
}

function isHomeSlug(slug) {
  return slug === 'accueil' || slug === 'index';
}

function buildNavigation(nav, boutiqueUrl, currentSlug) {
  const currentPath = isHomeSlug(currentSlug) ? '/' : `/${currentSlug}/`;
  const items = [];

  for (const item of nav.items) {
    items.push(buildNavLink(item.href, item.label, { cls: 'nav-link', current: item.href === currentPath }));
    if (Array.isArray(item.children)) {
      for (const child of item.children) {
        items.push(buildNavLink(child.href, child.label, { cls: 'nav-link', current: child.href === currentPath }));
      }
    }
  }

  const shop = buildNavLink(boutiqueUrl, 'Boutique ↗', {
    cls: 'nav-link nav-link-shop',
    external: true,
  });

  const desktop = [
    '<nav class="nav-desktop" aria-label="Navigation principale">',
    '  <ul class="nav-list">',
    ...items,
    shop,
    '  </ul>',
    '</nav>',
  ].join('\n');

  const mobileItems = [];
  for (const item of nav.items) {
    mobileItems.push(buildNavLink(item.href, item.label, { cls: 'nav-mobile-link', current: item.href === currentPath }));
    if (Array.isArray(item.children)) {
      for (const child of item.children) {
        mobileItems.push(buildNavLink(child.href, child.label, { cls: 'nav-mobile-link', current: child.href === currentPath }));
      }
    }
  }
  mobileItems.push(
    buildNavLink(boutiqueUrl, 'Boutique ↗', { cls: 'nav-mobile-link nav-link-shop', external: true })
  );

  const mobile = [
    '<nav class="nav-mobile-drawer" id="nav-menu" aria-label="Navigation principale (mobile)">',
    '  <ul class="nav-mobile-list">',
    ...mobileItems,
    '  </ul>',
    '</nav>',
  ].join('\n');

  return { desktop, mobile };
}

/* ------------------------------------------------------------------ */
/* Rendu des gabarits : remplacement des variables {{...}}              */
/* ------------------------------------------------------------------ */

function renderTemplate(template, vars) {
  return template.replace(TEMPLATE_RE, (match, key) => {
    if (vars[key] === undefined || vars[key] === null) {
      console.warn(`Variable non résolue dans le gabarit : {{${key}}}`);
      return match;
    }
    return String(vars[key]);
  });
}

/* ------------------------------------------------------------------ */
/* Copie récursive de src/assets/ → dist/assets/ (sans .DS_Store)       */
/* ------------------------------------------------------------------ */

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (entry === '.DS_Store') continue;
    const from = join(src, entry);
    const to = join(dest, entry);
    if (statSync(from).isDirectory()) copyDir(from, to);
    else copyFileSync(from, to);
  }
}

/* ------------------------------------------------------------------ */
/* Pipeline principal                                                   */
/* ------------------------------------------------------------------ */

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const site = loadJson('site.json');
const nav = loadJson('navigation.json');
const flat = flattenValues(site);

const siteVars = {
  'site.name': flat['identity.name'],
  'site.artisan': flat['identity.artisan'],
  'site.tagline': flat['identity.tagline'],
  'site.description': flat['identity.description'],
  'site.address': flat['contact.address'],
  'site.phone': flat['contact.phone'],
  'site.phone_tel': String(flat['contact.phone'] || '').replace(/[^+\d]/g, ''),
  'site.email': flat['contact.email'],
  'site.hours': flat['contact.hours'],
  'site.instagram': flat['social.instagram'],
  'site.facebook': flat['social.facebook'],
  'site.boutique': flat['links.boutique'],
  'site.booking': flat['links.booking'],
  'site.official_site': flat['links.official_site'],
};

const boutiqueUrl = siteVars['site.boutique'] || '';
const baseUrl = siteVars['site.official_site'] || 'https://example.com';
const ogImage = '/assets/images/originals/collection-arlequin-multicolore.jpg';

const partials = {
  head: read(join(PARTIALS_DIR, 'head.html')),
  header: read(join(PARTIALS_DIR, 'header.html')),
  footer: read(join(PARTIALS_DIR, 'footer.html')),
};

const pageFiles = readdirSync(PAGES_DIR).filter((file) => extname(file) === '.md');
const builtPages = [];

for (const file of pageFiles) {
  const { fm, body } = parseFrontmatter(read(join(PAGES_DIR, file)));
  const slug = fm.slug || basename(file, '.md');
  const title = fm.title || slug;
  const description = fm.description || '';

  const navHtml = buildNavigation(nav, boutiqueUrl, slug);
  const contentHtml = renderMarkdown(body);
  const main = `<main id="main" class="main-content"><div class="container">\n${contentHtml}\n</div></main>`;

  const path = isHomeSlug(slug) ? '/' : `/${slug}/`;
  const vars = {
    ...siteVars,
    'site.url': baseUrl,
    'site.og_image': `${baseUrl}${ogImage}`,
    'page.title': title,
    'page.description': description,
    'page.slug': slug,
    'page.path': path,
    'nav-desktop': navHtml.desktop,
    'nav-mobile': navHtml.mobile,
  };

  const document = [
    renderTemplate(partials.head, vars),
    renderTemplate(partials.header, vars),
    main,
    renderTemplate(partials.footer, vars),
  ].join('\n');

  const outFile = isHomeSlug(slug)
    ? join(DIST, 'index.html')
    : join(DIST, slug, 'index.html');
  write(outFile, document);
  builtPages.push({ slug, title, url: isHomeSlug(slug) ? '/' : `/${slug}/` });
}

/* --- Assets ------------------------------------------------------- */
if (existsSync(ASSETS_DIR)) {
  copyDir(ASSETS_DIR, join(DIST, 'assets'));
}

/* --- Sitemap + robots --------------------------------------------- */
const urls = builtPages
  .map((p) => `  <url><loc>${baseUrl}${p.url === '/' ? '' : p.url}</loc><lastmod>${TODAY}</lastmod></url>`)
  .join('\n');

write(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

write(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
);

/* --- Marqueur dist/.gitkeep (dist/ est ignoré par git) ------------- */
write(join(DIST, '.gitkeep'), '');

console.log(`Build terminé : ${builtPages.length} page(s) générée(s) dans ${DIST}.`);
for (const p of builtPages) console.log(`  - ${p.title} → ${p.url}`);