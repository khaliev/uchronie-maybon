/**
 * gallery.js -- Galerie filtrable /realisations/ (T08)
 *
 * Progressive enhancement : sans JS, toutes les cartes restent visibles.
 * Filtrage cote client par data-category, aria-pressed, aria-live.
 * Respect de prefers-reduced-motion.
 * Aucune dependance externe.
 */

const FILTER_BAR_ID = 'gallery-filters';
const GRID_ID = 'gallery-grid';
const STATUS_ID = 'gallery-status';

export function initGallery() {
  const filterBar = document.getElementById(FILTER_BAR_ID);
  const grid = document.getElementById(GRID_ID);
  const status = document.getElementById(STATUS_ID);

  // Composants optionnels -- pas d'erreur si absents (page non-realisations)
  if (!filterBar || !grid) return () => {};

  const buttons = [...filterBar.querySelectorAll('button[data-filter]')];
  const cards = [...grid.querySelectorAll('[data-category]')];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Normalisation : slugs kebab-case minuscules, multi-categories possibles
  // (ex. data-category="marqueterie gainerie")
  const cardCategories = new Map(
    cards.map((card) => [
      card,
      (card.dataset.category || '')
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean),
    ])
  );

  function setFilter(activeFilter) {
    const filter = String(activeFilter || 'toutes').toLowerCase().trim();

    // Met a jour aria-pressed sur tous les boutons
    buttons.forEach((btn) => {
      const isActive = btn.dataset.filter.toLowerCase().trim() === filter;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Filtre les cartes
    let visible = 0;
    cards.forEach((card) => {
      const cats = cardCategories.get(card);
      const show = filter === 'toutes' || cats.includes(filter);

      if (show) {
        card.removeAttribute('hidden');
        visible++;
        // Animation legere si motion permise
        if (!prefersReducedMotion) {
          card.style.animation = 'none';
          // Force reflow
          card.offsetHeight; // eslint-disable-line no-unused-expressions
          card.style.animation = '';
        }
      } else {
        card.setAttribute('hidden', '');
      }
    });

    // Annonce aux lecteurs d'ecran (feedback meme si aucun resultat)
    if (status) {
      status.textContent = visible === 0
        ? 'Aucune realisation dans cette categorie'
        : visible === 1
          ? '1 realisation affichee'
          : `${visible} realisations affichees`;
    }
  }

  // Deleguer les clics sur la barre de filtres
  function onFilterClick(e) {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    setFilter(btn.dataset.filter);
  }

  filterBar.addEventListener('click', onFilterClick);

  // Etat initial : "toutes"
  setFilter('toutes');

  return () => {
    filterBar.removeEventListener('click', onFilterClick);
  };
}