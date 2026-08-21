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

  function setFilter(activeFilter) {
    // Met a jour aria-pressed sur tous les boutons
    buttons.forEach((btn) => {
      const isActive = btn.dataset.filter === activeFilter;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Filtre les cartes
    let visible = 0;
    cards.forEach((card) => {
      const cat = card.dataset.category || '';
      const show = activeFilter === 'toutes' || cat === activeFilter;

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

    // Annonce aux lecteurs d'ecran
    if (status) {
      const label = visible === 1
        ? '1 realisation affichee'
        : `${visible} realisations affichees`;
      status.textContent = label;
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