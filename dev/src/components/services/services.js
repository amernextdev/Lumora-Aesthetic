(function () {
  'use strict';

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

})();
