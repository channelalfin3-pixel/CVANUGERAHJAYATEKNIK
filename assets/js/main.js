/* ==========================================================================
   CV ANUGERAH JAYA TEKNIK — main.js
   Shared behaviour across all pages: navbar, theme toggle, loader,
   back-to-top, animated counters, reveal-on-scroll fallback, search.
   No backend / no database — everything runs client-side.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hide'), 250);
  });

  /* ---------- AOS ---------- */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.querySelector('.navbar-ajt');
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    const topBtn = document.querySelector('.fab-top');
    if (topBtn) topBtn.classList.toggle('show', window.scrollY > 500);
  };
  document.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Active nav link ---------- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a, .offcanvas-body a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Dark / Light mode ---------- */
  const root = document.documentElement;
  const themeBtns = document.querySelectorAll('.theme-toggle');
  const saved = localStorage.getItem('ajt-theme');
  if (saved) root.setAttribute('data-theme', saved);
  const syncThemeIcon = () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    themeBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  };
  themeBtns.forEach(btn => btn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('ajt-theme', isDark ? 'light' : 'dark');
    syncThemeIcon();
  }));
  syncThemeIcon();

  /* ---------- Back to top ---------- */
  document.querySelectorAll('.fab-top').forEach(btn => {
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });

  /* ---------- Reveal fallback (for elements not using AOS) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const runCounter = (el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('id-ID') + (el.getAttribute('data-suffix') || '');
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.4 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------- Simple site search (title/keyword match across JSON data) ---------- */
  const searchForm = document.getElementById('siteSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('siteSearchInput').value.trim();
      if (q) window.location.href = `produk.html?q=${encodeURIComponent(q)}`;
    });
  }

  /* ---------- Contact form (client-side only, no backend) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-nama').value.trim();
      const msg = document.getElementById('cf-pesan').value.trim();
      const feedback = document.getElementById('contactFeedback');
      const waNumber = '6281234567890';
      const text = encodeURIComponent(`Halo, saya ${name}. ${msg}`);
      if (feedback) {
        feedback.classList.remove('d-none');
        feedback.textContent = 'Terima kasih! Pesan Anda siap dikirim melalui WhatsApp.';
      }
      window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
      contactForm.reset();
    });
  }

  /* ---------- Year in footer ---------- */
  document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());
});
