// /src/components/results/results.js
//
// Before/After section — keeps the mobile ".ba-scroll-hint" dots in sync
// with whichever ".ba-card" is currently visible while the user swipes
// through the horizontally-scrolling ".ba-grid".

function initResultsScrollHint() {
  const grid = document.querySelector('#results .ba-grid');
  const dots = document.querySelectorAll('#results .ba-scroll-hint span');
  if (!grid || !dots.length) return;

  const cardCount = grid.querySelectorAll('.ba-card').length;
  if (!cardCount) return;

  const setActiveDot = () => {
    const cardWidth = grid.scrollWidth / cardCount;
    const index = Math.round(grid.scrollLeft / cardWidth);
    const clamped = Math.min(Math.max(index, 0), dots.length - 1);

    dots.forEach((dot, i) => dot.classList.toggle('active', i === clamped));
  };

  // Throttle via rAF so this stays cheap during fast swipes.
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActiveDot();
      ticking = false;
    });
  };

  grid.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', setActiveDot);

  // Set correct initial state on load (in case markup doesn't hardcode one).
  setActiveDot();
}

initResultsScrollHint();
