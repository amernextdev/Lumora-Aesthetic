// Demo disclaimer banner — show for 3s then fade out
(function () {
  const banner = document.getElementById('demo-banner');
  if (!banner) return;

  requestAnimationFrame(() => {
    banner.classList.add('is-visible');
  });

  setTimeout(() => {
    banner.classList.remove('is-visible');
    banner.classList.add('is-hiding');

    banner.addEventListener('transitionend', () => {
      banner.remove();
    }, { once: true });
  }, 3000);
})();