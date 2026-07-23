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
       SERVICES — tabs + swipe + dots
    ══════════════════════════════════════════════ */
    const track    = document.getElementById('svc-track');
    const tabs     = Array.from(document.querySelectorAll('.svc-tab'));
    const dots     = Array.from(document.querySelectorAll('.svc-dot'));
    const panels   = Array.from(document.querySelectorAll('.svc-panel'));
    let currentIdx = 0;
    let startX     = 0;
    let isDragging = false;

    function goToService(idx) {
      if (idx < 0 || idx >= panels.length) return;
      panels.forEach((p, i) => { p.classList.toggle('active', i === idx); });
      tabs.forEach((t, i) => {
        t.classList.toggle('active', i === idx);
        t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx);
        d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
      if (track) track.style.transform = `translateX(-${idx * 100}%)`;
      currentIdx = idx;
    }

    tabs.forEach(tab => { tab.addEventListener('click', () => goToService(Number(tab.dataset.idx))); });
    dots.forEach(dot => { dot.addEventListener('click', () => goToService(Number(dot.dataset.idx))); });

    tabs.forEach((tab, i) => {
      tab.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); goToService((i + 1) % tabs.length); tabs[(i + 1) % tabs.length].focus(); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goToService((i - 1 + tabs.length) % tabs.length); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
      });
    });

    const svcWrap = document.querySelector('.svc-track-wrap');
    if (svcWrap) {
      svcWrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDragging = false; }, { passive: true });
      svcWrap.addEventListener('touchmove',  () => { isDragging = true; },                                { passive: true });
      svcWrap.addEventListener('touchend',   e => {
        if (!isDragging) return;
        const delta = e.changedTouches[0].clientX - startX;
        if (delta < -50) goToService(currentIdx + 1);
        else if (delta > 50) goToService(currentIdx - 1);
      });
      svcWrap.addEventListener('mousedown', e => { startX = e.clientX; isDragging = false; });
      svcWrap.addEventListener('mousemove', () => { isDragging = true; });
      svcWrap.addEventListener('mouseup',   e => {
        if (!isDragging) return;
        const delta = e.clientX - startX;
        if (delta < -60) goToService(currentIdx + 1);
        else if (delta > 60) goToService(currentIdx - 1);
      });
    }

    goToService(0);

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