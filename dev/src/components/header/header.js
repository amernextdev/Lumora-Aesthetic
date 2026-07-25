(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     NAV — scroll effect
  ══════════════════════════════════════════════ */
  const nav = document.getElementById('main-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════════════════════════════════════════
     MOBILE MENU
  ══════════════════════════════════════════════ */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = false;
    document.body.style.overflow = 'hidden';
    hamburger && hamburger.classList.add('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    const firstLink = mobileMenu.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }
  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = true;
    document.body.style.overflow = '';
    hamburger && hamburger.classList.remove('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    hamburger && hamburger.focus();
  }

  hamburger  && hamburger.addEventListener('click', openMobileMenu);
  mobileClose && mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.hidden) closeMobileMenu();
  });

  /* ══════════════════════════════════════════════
     ACTIVE NAV LINK — highlight on scroll
  ══════════════════════════════════════════════ */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= scrollY) current = s; });
    navLinks.forEach(l => {
      const matches = l.getAttribute('href') === `#${current.id}`;
      l.style.color = matches ? 'var(--color-gold-warm)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

})();
