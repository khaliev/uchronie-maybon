/**
 * navigation.js — Menu hamburger mobile accessible (T08)
 *
 * Progressive enhancement : si ce script ne se charge pas, la nav reste
 * visible en fallback CSS (voir composants CSS). Aucun framework.
 * WCAG 2.2 AA : aria-expanded, aria-label dynamique, focus trap, Échap.
 */

const BREAKPOINT = 900; // px — synchro avec le breakpoint CSS .nav-toggle

/**
 * Initialise le menu mobile.
 * @returns {() => void} cleanup
 */
export function initNavigation() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-navigation');

  if (!toggle || !nav) return () => {};

  // Récupère tous les liens focusables dans la nav
  function getFocusable() {
    return [...nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')];
  }

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function open() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu');
    toggle.classList.add('is-active');
    nav.classList.add('is-open');
    document.documentElement.classList.add('nav-open'); // bloque le scroll

    // Focus sur le premier lien
    const focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
  }

  function close(returnFocus = true) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    toggle.classList.remove('is-active');
    nav.classList.remove('is-open');
    document.documentElement.classList.remove('nav-open');

    if (returnFocus) toggle.focus();
  }

  // Bouton toggle
  function onToggleClick() {
    isOpen() ? close() : open();
  }

  // Fermeture avec Echap
  function onKeydown(e) {
    if (!isOpen()) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    // Focus trap a l'interieur du menu
    if (e.key === 'Tab') {
      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Fermeture au clic sur un lien interne
  function onNavClick(e) {
    const link = e.target.closest('a');
    if (!link) return;
    // Ne ferme que si le menu est ouvert en mobile
    if (isOpen() && window.innerWidth < BREAKPOINT) {
      close(false); // pas de retour focus (on navigue)
    }
  }

  // Fermeture au clic exterieur
  function onDocumentClick(e) {
    if (!isOpen()) return;
    const header = document.querySelector('.site-header');
    if (header && !header.contains(e.target)) {
      close();
    }
  }

  toggle.addEventListener('click', onToggleClick);
  document.addEventListener('keydown', onKeydown);
  nav.addEventListener('click', onNavClick);
  document.addEventListener('click', onDocumentClick);

  // Reinitialise l'etat si on redimensionne au-dessus du breakpoint
  function onResize() {
    if (window.innerWidth >= BREAKPOINT && isOpen()) {
      close(false);
    }
  }
  window.addEventListener('resize', onResize);

  // Cleanup
  return () => {
    toggle.removeEventListener('click', onToggleClick);
    document.removeEventListener('keydown', onKeydown);
    nav.removeEventListener('click', onNavClick);
    document.removeEventListener('click', onDocumentClick);
    window.removeEventListener('resize', onResize);
  };
}