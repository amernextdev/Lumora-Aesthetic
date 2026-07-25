(function () {
    'use strict';

    /* ══════════════════════════════════════════════
       NAV scroll effect + MOBILE MENU — انتقلت إلى header.js
    ══════════════════════════════════════════════ */

    /* ══════════════════════════════════════════════
       SERVICES — tabs + swipe + dots — انتقلت إلى services.js
    ══════════════════════════════════════════════ */

    /* ══════════════════════════════════════════════
       SCROLL REVEAL — انتقل إلى reveal.js
    ══════════════════════════════════════════════ */

    /* ══════════════════════════════════════════════
       SMOOTH ANCHOR SCROLL
    ══════════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navH = (document.getElementById('site-header') || { offsetHeight: 72 }).offsetHeight;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    /* ══════════════════════════════════════════════
       ACTIVE NAV LINK highlight — انتقلت إلى header.js
    ══════════════════════════════════════════════ */

  })();