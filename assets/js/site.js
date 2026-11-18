/* Carmeo website – two small enhancements; the pages work without JavaScript too. */
(function () {
  'use strict';

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Hero phone: switch between app screens
  var tabs = document.querySelector('.tabs');
  var shot = document.getElementById('hero-shot');
  if (tabs && shot) {
    tabs.hidden = false;
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-src]');
      if (!b) return;
      shot.src = b.getAttribute('data-src');
      shot.alt = b.getAttribute('data-alt') || '';
      tabs.querySelectorAll('button').forEach(function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
    });
    // fetch the other screens once the page is idle, so switching is instant
    var warm = function () {
      tabs.querySelectorAll('button[data-src]').forEach(function (b) {
        var i = new Image();
        i.src = b.getAttribute('data-src');
      });
    };
    if ('requestIdleCallback' in window) requestIdleCallback(warm); else setTimeout(warm, 1500);
  }
})();
