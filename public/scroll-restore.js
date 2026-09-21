// Empêche le navigateur de sauter directement à la section correspondant
// au #hash de l'URL (ex: #apropos) au rechargement : on repart toujours en haut.
(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  window.addEventListener('load', function () {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  });
})();
