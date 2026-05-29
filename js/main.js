/* ============================================================
   main.js — taskbar clock, Start menu, and the projects-page
   TOC highlight. No animation, no dependencies.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Taskbar clock ---------- */
  const clock = document.getElementById('clock');
  if (clock) {
    const timeEl = clock.querySelector('.clock-time');
    const dateEl = clock.querySelector('.clock-date');
    const tick = () => {
      const now = new Date();
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      }
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Start menu ---------- */
  const orb = document.getElementById('startOrb');
  const menu = document.getElementById('startMenu');
  if (orb && menu) {
    orb.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== orb) menu.classList.remove('open');
    });
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => menu.classList.remove('open'))
    );
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') menu.classList.remove('open');
    });
  }

  /* ---------- Projects page: TOC highlight ---------- */
  const toc = document.getElementById('projToc');
  if (toc) {
    const tocLinks = Array.from(toc.querySelectorAll('a'));
    const sections = tocLinks
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach((a) =>
              a.classList.toggle('active', a.getAttribute('href') === '#' + id)
            );
          }
        });
      }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
      sections.forEach((s) => spy.observe(s));
    }

    toc.querySelector('.proj-toc-inner').addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  }
})();
