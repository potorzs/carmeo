/* Carmeo website – small enhancements; the pages work without JavaScript too. */
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

  // Language drop-down (phones and tablets): close on an outside tap or Escape, and not open together with the menu
  var dd = document.querySelector('.langdd');
  if (dd) {
    // pointerdown, not click: iOS Safari sends no click to the document for a tap on plain text
    document.addEventListener('pointerdown', function (e) {
      if (dd.open && !dd.contains(e.target)) dd.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dd.open) { dd.open = false; dd.querySelector('summary').focus(); }
    });
    dd.addEventListener('toggle', function () {
      if (dd.open && nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
    if (btn) btn.addEventListener('click', function () { dd.open = false; });
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
