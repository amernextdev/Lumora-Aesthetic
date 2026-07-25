/* =============================================================
   MAIN.JS — Application Entry Point
   -------------------------------------------------------------
   1. Styles
   2. Services (شغل عام/مساعد بيتحمل بدري)
   3. Components (أجزاء الصفحة)
   4. App Behavior (سلوك عام للصفحة)
   ============================================================= */

/* =============================================================
   1. STYLES
   ============================================================= */
import './style.css';

/* =============================================================
   2. SERVICES
   ============================================================= */
import '/src/services/js/reveal.js';

/* =============================================================
   3. COMPONENTS
   ============================================================= */
import '/src/components/header/header.js';
import '/src/components/services/services.js';
import '/src/components/results/results.js';

/* =============================================================
   4. APP BEHAVIOR
   ============================================================= */

/**
 * Smooth-scrolls to any in-page anchor link (href="#..."),
 * offsetting the scroll position by the sticky header's height.
 */
function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navH = (document.getElementById('site-header') || { offsetHeight: 72 }).offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* =============================================================
   INIT
   ============================================================= */
initSmoothAnchorScroll();
