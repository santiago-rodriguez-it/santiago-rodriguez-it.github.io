/* ============================================
   Santiago Rodriguez Portfolio — Main JS
   ============================================ */

(function () {
  'use strict';

  /* ---- Sticky Nav ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ---- Mobile Menu ---- */
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks  = document.querySelector('.navbar__links');
  const overlay   = document.querySelector('.mobile-overlay');

  function closeMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks)  navLinks.classList.remove('active');
    if (overlay)   overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('active');
      if (navLinks)  navLinks.classList.toggle('active', isOpen);
      if (overlay)   overlay.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (overlay) overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  document.querySelectorAll('.navbar__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---- Active Nav Link via IntersectionObserver ---- */
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.navbar__link[href^="#"]');

  if (sections.length && navItems.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navItems.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(function (sec) { sectionObserver.observe(sec); });
  }

  /* ---- Scroll Reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) {
      // Stagger siblings that share the same grid parent
      var parent = el.parentElement;
      if (parent) {
        var siblings = Array.from(parent.querySelectorAll('.reveal'));
        var idx = siblings.indexOf(el);
        if (idx > 0) el.dataset.delay = String(idx * 120);
      }
      revealObserver.observe(el);
    });
  }

  /* ---- Smooth Scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navbarHeight = navbar ? navbar.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
