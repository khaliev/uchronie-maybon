/**
 * main.js -- Point d'entree JS (T08)
 *
 * Importe et initialise les modules navigation et gallery.
 * Type="module" assure le defer implicite.
 * Guard sur DOMContentLoaded pour robustesse (chargement en head possible).
 * Pas d'erreur si un composant est absent de la page courante.
 */

import { initNavigation } from './navigation.js';
import { initGallery } from './gallery.js';

function init() {
  initNavigation();
  initGallery();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded a deja fire (module charge de facon asynchrone)
  init();
}