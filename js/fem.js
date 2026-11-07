/* =========================================================================
   FEM aan het Dok — site-JS
   Geladen via jsDelivr vanuit github.com/byderkdesign/femaanhetdok
   Vereist: GSAP (via Webflow site settings) en Lenis (in de head).
   Alles werkt op data-attributen, zodat classnamen vrij blijven.
   ========================================================================= */
(function () {
  'use strict';

  /* ------------------------- Lenis smooth scroll ------------------------- */
  var lenis = null;
  function initLenis() {
    if (typeof window.Lenis === 'undefined') return;
    lenis = new window.Lenis({ autoRaf: true });
    window.femLenis = lenis;
  }

  /* ------------------------- Megamenu -------------------------
     Markup:
       [data-navigation-status="not-active"]   wrapper (status wordt hier gezet)
       [data-navigation-toggle="toggle"]       hamburger
       [data-navigation-toggle="close"]        sluitknop / overlay               */
  function initNavigation() {
    var statusEl = document.querySelector('[data-navigation-status]');
    if (!statusEl) return;

    function setOpen(open) {
      statusEl.setAttribute('data-navigation-status', open ? 'active' : 'not-active');
      if (lenis) { open ? lenis.stop() : lenis.start(); }
    }
    function isOpen() {
      return statusEl.getAttribute('data-navigation-status') === 'active';
    }

    document.querySelectorAll('[data-navigation-toggle="toggle"]').forEach(function (btn) {
      btn.addEventListener('click', function () { setOpen(!isOpen()); });
    });
    document.querySelectorAll('[data-navigation-toggle="close"]').forEach(function (btn) {
      btn.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setOpen(false);
    });
  }

  /* ------------------------- Menu-hover (homepage) -------------------------
     Markup (CMS-lijst "Menulinks"):
       [data-menu-hover="list"]
         [data-menu-hover="item"]          link
           [data-menu-hover="image"]       afbeelding uit het CMS
     De afbeelding staat fullscreen achter de tekst en fadet in bij hover
     of focus (0.6s) en uit bij mouseleave of blur (1s), op alle
     breakpoints, net als de oude Webflow-interactie.                         */
  function initMenuHover() {
    if (typeof window.gsap === 'undefined') return;
    var gsap = window.gsap;
    var mm = gsap.matchMedia();

    mm.add('all', function () {
      var items = document.querySelectorAll('[data-menu-hover="item"]');
      var handlers = [];

      items.forEach(function (item) {
        var img = item.querySelector('[data-menu-hover="image"]');
        if (!img) return;
        gsap.set(img, { opacity: 0 });

        var enter = function () {
          gsap.to(img, { opacity: 1, duration: 0.6, ease: 'power1.inOut', overwrite: true });
        };
        var leave = function () {
          gsap.to(img, { opacity: 0, duration: 1, ease: 'power1.inOut', overwrite: true });
        };
        item.addEventListener('mouseenter', enter);
        item.addEventListener('mouseleave', leave);
        item.addEventListener('focus', enter);
        item.addEventListener('blur', leave);
        handlers.push({ item: item, img: img, enter: enter, leave: leave });
      });

      return function () {
        handlers.forEach(function (h) {
          h.item.removeEventListener('mouseenter', h.enter);
          h.item.removeEventListener('mouseleave', h.leave);
          h.item.removeEventListener('focus', h.enter);
          h.item.removeEventListener('blur', h.leave);
          gsap.set(h.img, { clearProps: 'opacity' });
        });
      };
    });
  }

  function init() {
    initLenis();
    initNavigation();
    initMenuHover();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
