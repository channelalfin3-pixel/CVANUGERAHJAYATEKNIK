/* ==========================================================================
   CV ANUGERAH JAYA TEKNIK — components.js
   Injects the shared navbar, footer, and floating action buttons on every
   page. Kept as JS templates (rather than fetch('partials/header.html'))
   so the site also works when opened directly from disk, not only when
   served over http/GitHub Pages.
   ========================================================================== */

const AJT_NAV = [
  { href: 'index.html', label: 'Home' },
  { href: 'tentang.html', label: 'Tentang Kami' },
  { href: 'layanan.html', label: 'Layanan' },
  { href: 'produk.html', label: 'Produk' },
  { href: 'project.html', label: 'Project' },
  { href: 'galeri.html', label: 'Galeri' },
  { href: 'artikel.html', label: 'Artikel' },
  { href: 'testimoni.html', label: 'Testimoni' },
  { href: 'faq.html', label: 'FAQ' },
  { href: 'kontak.html', label: 'Kontak' }
];

function ajtRenderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = `
  <nav class="navbar-ajt">
    <div class="container-ajt nav-inner">
      <a href="index.html" class="brand">
        <img src="assets/logo-badge.png" alt="Logo CV Anugerah Jaya Teknik" style="width:48px;height:48px;object-fit:contain;">
        <span>
          CV Anugerah Jaya Teknik
          <small>MECHANICAL · ELECTRICAL · HVAC</small>
        </span>
      </a>

      <ul class="nav-links d-none d-lg-flex">
        ${AJT_NAV.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
      </ul>

      <div class="nav-actions">
        <button class="icon-btn theme-toggle" aria-label="Ganti tema" title="Ganti tema"><i class="fa-solid fa-moon"></i></button>
        <a href="kontak.html" class="btn-ajt btn-ajt-primary d-none d-md-inline-flex">
          <i class="fa-solid fa-phone"></i> Hubungi Kami
        </a>
        <button class="icon-btn d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-label="Buka menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="mobileMenu">
    <div class="offcanvas-header">
      <span class="brand" style="color:var(--navy-900);"><img src="assets/logo-badge.png" alt="Logo CV Anugerah Jaya Teknik" style="width:48px;height:48px;object-fit:contain;"> Menu</span>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex flex-column gap-1">
        ${AJT_NAV.map(n => `<a href="${n.href}" class="p-2 rounded" style="color:var(--ink);">${n.label}</a>`).join('')}
        <a href="kontak.html" class="btn-ajt btn-ajt-primary mt-3 justify-content-center"><i class="fa-solid fa-phone"></i> Hubungi Kami</a>
      </div>
    </div>
  </div>`;
}

function ajtRenderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
  <footer class="footer-ajt">
    <div class="container-ajt">
      <div class="row g-5">
        <div class="col-lg-4">
          <a href="index.html" class="brand mb-3 d-inline-flex" style="color:#fff;">
            <img src="assets/logo-badge.png" alt="Logo CV Anugerah Jaya Teknik" style="width:48px;height:48px;object-fit:contain;">
            <span>CV Anugerah Jaya Teknik<small>MECHANICAL · ELECTRICAL · HVAC</small></span>
          </a>
          <p class="mt-3">Kontraktor Mechanical, Electrical &amp; HVAC dengan pengalaman lebih dari 15 tahun, dipercaya oleh pabrik, rumah sakit, hotel, mall, dan gedung pemerintah di seluruh Indonesia.</p>
          <div class="d-flex gap-2 mt-3">
            <a href="#" class="social-circle" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="social-circle" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-circle" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" class="social-circle" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <h5>Quick Links</h5>
          <div class="d-flex flex-column gap-2">
            <a href="tentang.html">Tentang Kami</a>
            <a href="project.html">Project</a>
            <a href="galeri.html">Galeri</a>
            <a href="artikel.html">Artikel</a>
            <a href="faq.html">FAQ</a>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <h5>Layanan</h5>
          <div class="d-flex flex-column gap-2">
            <a href="layanan.html">Mechanical</a>
            <a href="layanan.html">Electrical</a>
            <a href="layanan.html">HVAC</a>
            <a href="layanan.html">Maintenance</a>
          </div>
        </div>
        <div class="col-lg-4">
          <h5>Kontak</h5>
          <div class="d-flex flex-column gap-2">
           <span><i class="fa-solid fa-location-dot text-orange me-2"></i>Jl. KH. R. Moh. Rosyid No. KM. 5, Ngumpak Dalem, Kec. Dander, Bojonegoro, Jawa Timur 62171</span>
<a href="tel:+6281293208137"><i class="fa-solid fa-phone text-orange me-2"></i>+62 812-9320-8137</a>
<a href="mailto:anugerahjayateknik@gmail.com"><i class="fa-solid fa-envelope text-orange me-2"></i>anugerahjayateknik@gmail.com</a>
            <span><i class="fa-solid fa-clock text-orange me-2"></i>Senin - Sabtu, 08.00 - 17.00 WIB</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; <span class="js-year"></span> CV Anugerah Jaya Teknik. Seluruh hak cipta dilindungi. &middot;
        <a href="privacy-policy.html">Privacy Policy</a> &middot; <a href="terms.html">Terms</a>
      </div>
    </div>
  </footer>`;
}

function ajtRenderFloatingActions() {
  const el = document.getElementById('site-floating');
  if (!el) return;
  el.innerHTML = `
  <div class="floating-actions">
    <button class="fab fab-top" aria-label="Kembali ke atas"><i class="fa-solid fa-arrow-up"></i></button>
    <a class="fab fab-call" href="tel:+6281293208137" aria-label="Telepon kami"><i class="fa-solid fa-phone"></i></a>
<a class="fab fab-wa" href="https://wa.me/6281293208137?text=Halo%20CV%20Anugerah%20Jaya%20Teknik,%20saya%20ingin%20bertanya" target="_blank" rel="noopener" aria-label="Chat WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
  </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  ajtRenderHeader();
  ajtRenderFooter();
  ajtRenderFloatingActions();
});
