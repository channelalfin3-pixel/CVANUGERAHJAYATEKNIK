/* ==========================================================================
   CV ANUGERAH JAYA TEKNIK — data-loader.js
   Fetches JSON "content files" and renders them into the DOM.
   This is the site's lightweight, database-free CMS layer: editing the
   JSON files in /assets/data/ (via admin.html or directly) updates the
   live pages, no server or database required.
   ========================================================================== */

const AJT = {
  async fetchJSON(path) {
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error('Gagal memuat ' + path);
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  starIcons(rating) {
    let out = '';
    for (let i = 1; i <= 5; i++) out += `<i class="fa-${i <= rating ? 'solid' : 'regular'} fa-star"></i>`;
    return out;
  },

  /* ---------- PRODUCTS ---------- */
  productCard(p) {
    return `
    <div class="col-md-6 col-lg-4">
      <div class="card-ajt product-card h-100" data-aos="fade-up">
        <div class="img-wrap">
          <span class="badge-cat">${p.kategori}</span>
          <img src="${p.gambar}" alt="${p.nama}" loading="lazy">
        </div>
        <div class="body">
          <h5 class="fw-semibold mb-2">${p.nama}</h5>
          <p class="text-mono small text-orange mb-2">${p.spesifikasi}</p>
          <p class="small text-secondary mb-3">${p.deskripsi}</p>
          <div class="d-flex flex-wrap gap-2 mb-3">
            ${p.keunggulan.map(k => `<span class="badge rounded-pill" style="background:var(--navy-100);color:var(--navy-800);font-weight:500;">${k}</span>`).join('')}
          </div>
          <div class="d-flex gap-2">
            <button class="btn-ajt btn-ajt-navy btn-sm flex-fill" data-bs-toggle="modal" data-bs-target="#produkModal" data-id="${p.id}">
              <i class="fa-solid fa-circle-info"></i> Detail
            </button>
            <a href="kontak.html?produk=${encodeURIComponent(p.nama)}" class="btn-ajt btn-ajt-primary btn-sm flex-fill">
              <i class="fa-solid fa-paper-plane"></i> Minta Penawaran
            </a>
          </div>
        </div>
      </div>
    </div>`;
  },

  async renderProducts(containerId, opts = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const data = await this.fetchJSON('assets/data/products.json');
    window.__ajtProducts = data;
    const limit = opts.limit || data.length;
    const list = opts.limit ? data.slice(0, limit) : data;
    container.innerHTML = list.map(p => this.productCard(p)).join('');
    if (window.AOS) AOS.refreshHard();
    this.bindProductModal(data);
    if (opts.enableFilter) this.bindProductFilter(data, containerId);
  },

  bindProductModal(data) {
    const modalEl = document.getElementById('produkModal');
    if (!modalEl) return;
    modalEl.addEventListener('show.bs.modal', (e) => {
      const id = e.relatedTarget?.getAttribute('data-id');
      const p = data.find(x => x.id === id);
      if (!p) return;
      modalEl.querySelector('.modal-title').textContent = p.nama;
      modalEl.querySelector('.modal-img').src = p.gambar;
      modalEl.querySelector('.modal-spec').textContent = p.spesifikasi;
      modalEl.querySelector('.modal-desc').textContent = p.deskripsi;
      modalEl.querySelector('.modal-keunggulan').innerHTML = p.keunggulan.map(k => `<li>${k}</li>`).join('');
      modalEl.querySelector('.modal-aplikasi').innerHTML = p.aplikasi.map(a => `<span class="badge rounded-pill me-1 mb-1" style="background:var(--orange-100);color:var(--orange-600);">${a}</span>`).join('');
      modalEl.querySelector('.modal-cta').href = `kontak.html?produk=${encodeURIComponent(p.nama)}`;
    });
  },

  bindProductFilter(data, containerId) {
    const bar = document.getElementById('produkFilterBar');
    if (!bar) return;
    const categories = ['Semua', ...new Set(data.map(p => p.kategori))];
    bar.innerHTML = categories.map((c, i) => `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
    bar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        const filtered = cat === 'Semua' ? data : data.filter(p => p.kategori === cat);
        document.getElementById(containerId).innerHTML = filtered.map(p => this.productCard(p)).join('');
        this.bindProductModal(data);
      });
    });

    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      const filtered = data.filter(p => (p.nama + p.deskripsi + p.kategori).toLowerCase().includes(q.toLowerCase()));
      document.getElementById(containerId).innerHTML = filtered.length
        ? filtered.map(p => this.productCard(p)).join('')
        : `<div class="col-12 text-center py-5 text-secondary">Tidak ada produk yang cocok dengan pencarian "${q}".</div>`;
      this.bindProductModal(data);
    }
  },

  /* ---------- PROJECTS ---------- */
  projectCard(p) {
    return `
    <div class="col-md-6 col-lg-4">
      <div class="card-ajt product-card h-100" data-aos="fade-up">
        <div class="img-wrap">
          <span class="badge-cat">${p.kategori}</span>
          <img src="${p.gambar}" alt="${p.nama}" loading="lazy">
        </div>
        <div class="body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-mono small text-orange">${p.tahun}</span>
            <span class="badge rounded-pill ${p.status === 'Selesai' ? 'bg-success' : 'bg-warning text-dark'}">${p.status}</span>
          </div>
          <h5 class="fw-semibold mb-1">${p.nama}</h5>
          <p class="small text-secondary mb-2"><i class="fa-solid fa-location-dot text-orange me-1"></i>${p.lokasi}</p>
          <p class="small text-secondary">${p.deskripsi}</p>
        </div>
      </div>
    </div>`;
  },

  async renderProjects(containerId, opts = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const data = await this.fetchJSON('assets/data/projects.json');
    const list = opts.limit ? data.slice(0, opts.limit) : data;
    container.innerHTML = list.map(p => this.projectCard(p)).join('');
    if (window.AOS) AOS.refreshHard();
    if (opts.enableFilter) {
      const bar = document.getElementById('projectFilterBar');
      if (bar) {
        const categories = ['Semua', ...new Set(data.map(p => p.kategori))];
        bar.innerHTML = categories.map((c, i) => `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
        bar.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-cat');
            const filtered = cat === 'Semua' ? data : data.filter(p => p.kategori === cat);
            container.innerHTML = filtered.map(p => this.projectCard(p)).join('');
          });
        });
      }
    }
  },

  /* ---------- ARTICLES ---------- */
  articleCard(a) {
    const tanggal = new Date(a.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    return `
    <div class="col-md-6 col-lg-4">
      <div class="card-ajt product-card h-100" data-aos="fade-up">
        <div class="img-wrap"><span class="badge-cat">${a.kategori}</span><img src="${a.gambar}" alt="${a.judul}" loading="lazy"></div>
        <div class="body">
          <p class="text-mono small text-orange mb-2">${tanggal}</p>
          <h5 class="fw-semibold mb-2">${a.judul}</h5>
          <p class="small text-secondary mb-3">${a.ringkasan}</p>
          <button class="btn-ajt btn-ajt-navy btn-sm" data-bs-toggle="modal" data-bs-target="#artikelModal" data-id="${a.id}">
            Baca Selengkapnya <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>`;
  },

  async renderArticles(containerId, opts = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const data = await this.fetchJSON('assets/data/articles.json');
    const list = opts.limit ? data.slice(0, opts.limit) : data;
    container.innerHTML = list.map(a => this.articleCard(a)).join('');
    if (window.AOS) AOS.refreshHard();
    const modalEl = document.getElementById('artikelModal');
    if (modalEl) {
      modalEl.addEventListener('show.bs.modal', (e) => {
        const id = e.relatedTarget?.getAttribute('data-id');
        const a = data.find(x => x.id === id);
        if (!a) return;
        modalEl.querySelector('.modal-title').textContent = a.judul;
        modalEl.querySelector('.modal-img').src = a.gambar;
        modalEl.querySelector('.modal-isi').textContent = a.isi;
        modalEl.querySelector('.modal-tanggal').textContent = new Date(a.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      });
    }
  },

  /* ---------- TESTIMONIALS ---------- */
  async renderTestimonials(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;
    const data = await this.fetchJSON('assets/data/testimonials.json');
    wrapper.innerHTML = data.map(t => `
      <div class="swiper-slide">
        <div class="card-ajt testi-card">
          <img src="${t.foto}" class="testi-avatar" alt="${t.nama}" loading="lazy">
          <div class="stars">${this.starIcons(t.rating)}</div>
          <p class="fst-italic text-secondary mb-3">&ldquo;${t.komentar}&rdquo;</p>
          <h6 class="fw-semibold mb-0">${t.nama}</h6>
          <p class="small text-mono text-orange">${t.perusahaan}</p>
        </div>
      </div>`).join('');
    if (window.Swiper) {
      new Swiper('.testi-swiper', {
        loop: true,
        spaceBetween: 24,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: '.testi-swiper .swiper-pagination', clickable: true },
        breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }
      });
    }
  },

  /* ---------- FAQ ---------- */
  async renderFAQ(containerId, opts = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const data = await this.fetchJSON('assets/data/faq.json');
    const list = opts.limit ? data.slice(0, opts.limit) : data;
    container.innerHTML = list.map((f, i) => `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button ${i !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#faq${i}">
            ${f.q}
          </button>
        </h2>
        <div id="faq${i}" class="accordion-collapse collapse ${i === 0 ? 'show' : ''}" data-bs-parent="#${containerId}">
          <div class="accordion-body text-secondary">${f.a}</div>
        </div>
      </div>`).join('');
  }
};
