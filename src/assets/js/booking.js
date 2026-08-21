/**
 * booking.js -- Réservation /rendez-vous/ (T09)
 *
 * Trois états pilotés par les data-attributes du conteneur [data-booking],
 * eux-mêmes alimentés par la config `booking` de src/content/site.json :
 *
 *   - demo          : pas d'URL réelle ou enabled=false -> rien n'est chargé,
 *                     message "bientôt disponible" + CTA téléphone/e-mail.
 *   - google        : bloc de consentement d'abord ; l'iframe Google Calendar
 *                     n'est injectée qu'après un clic explicite.
 *   - external-link : simple bouton sortant, aucune iframe.
 *
 * Garanties : aucun script ni iframe tiers tant que l'utilisateur n'a pas
 * cliqué, aucune erreur console si l'URL est absente, navigation clavier OK.
 */

const EMBED_TITLE = 'Agenda de réservation en ligne de l’atelier Uchronie Maybon';

function buildIframe(url) {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.title = EMBED_TITLE;
  iframe.loading = 'lazy';
  return iframe;
}

function initBooking() {
  const root = document.querySelector('[data-booking]');
  if (!root) return;

  const mode = (root.dataset.mode || 'demo').toLowerCase();
  const url = root.dataset.url || '';
  const provider = (root.dataset.provider || 'google').toLowerCase();

  const stateBlocks = {
    demo: root.querySelector('[data-booking-state="demo"]'),
    consent: root.querySelector('[data-booking-state="consent"]'),
    external: root.querySelector('[data-booking-state="external"]'),
    embed: root.querySelector('[data-booking-state="embed"]'),
  };
  const embedFallback = root.querySelector('[data-booking-embed-fallback]');
  const loadBtn = root.querySelector('[data-booking-load]');

  /* État 1 — démo : aucun tiers chargé, démo + fallback déjà visibles. */
  if (!url || mode === 'demo') return;

  /* Une vraie URL existe : le bloc démo disparaît au profit du mode actif. */
  if (stateBlocks.demo) stateBlocks.demo.hidden = true;

  /* Liens de secours vers l'URL de réservation (nouvel onglet). */
  for (const link of root.querySelectorAll('[data-booking-open]')) {
    link.href = url;
  }

  /* État 3 — lien externe simple : pas d'iframe, pas de consentement. */
  if (mode === 'external-link' || provider === 'external-link') {
    if (stateBlocks.external) stateBlocks.external.hidden = false;
    return;
  }

  /* État 2 — Google Agenda avec consentement préalable. */
  if (stateBlocks.consent) stateBlocks.consent.hidden = false;

  if (loadBtn && stateBlocks.embed) {
    loadBtn.addEventListener('click', () => {
      /* Idempotent : un seul chargement même en cas de double clic. */
      if (stateBlocks.embed.childElementCount > 0) return;

      stateBlocks.consent.hidden = true;
      stateBlocks.embed.appendChild(buildIframe(url));
      stateBlocks.embed.hidden = false;
      if (embedFallback) embedFallback.hidden = false;

      /* Rend le focus perceptible après le changement de contexte. */
      stateBlocks.embed.focus();
    });
  }
}

export { initBooking };
