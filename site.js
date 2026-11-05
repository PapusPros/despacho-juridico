(() => {
  'use strict';
  document.documentElement.classList.add('js');

  // Aparición suave al hacer scroll
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(i => i.classList.add('in'));
  } else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15 });
    items.forEach(i => io.observe(i));
  }

  // Header compacto al bajar
  const top = document.querySelector('.top');
  const onScroll = () => top && top.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Enlace activo del menú según la sección visible
  const links = [...document.querySelectorAll('.menu a[href^="#"]')];
  const map = new Map();
  links.forEach(a => {
    const sec = document.querySelector(a.getAttribute('href'));
    if (sec) map.set(sec, a);
  });
  if ('IntersectionObserver' in window && map.size) {
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        map.get(e.target).classList.add('active');
      }
    }), { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, sec) => spy.observe(sec));
  }
})();
