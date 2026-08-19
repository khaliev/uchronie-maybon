/* Point d'entrée JS — à compléter en T08 */
import { initNavigation } from './navigation.js';
import { initGallery } from './gallery.js';
import { initBooking } from './booking.js';
import { initConsent } from './consent.js';

// TODO T08 : initialisation conditionnelle selon la page, gestion errors.
initNavigation();
initGallery();
initBooking();
initConsent();