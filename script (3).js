const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const categoriesWrap = document.getElementById("categories");
const emptyState = document.getElementById("empty-state");

let products = [];
let activeCategory = "Semua";
let searchTerm = "";

// Ikon placeholder saat produk tidak punya gambar (image_url null)
const folderIcon = `
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 14a3 3 0 0 1 3-3h9l4 4h17a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V14Z" fill="var(--brand)" fill-opacity="0.35" stroke="var(--brand-deep)" stroke-width="1.6"/>
  </svg>`;

const fileIcon = `
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 6h15l9 9v25a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" fill="var(--brand)" fill-opacity="0.35" stroke="var(--brand-deep)" stroke-width="1.6"/>
    <path d="M28 6v9h9" stroke="var(--brand-deep)" stroke-width="1.6" stroke-linejoin="round"/>
  </svg>`;

async function loadProducts() {
  try {
    const res = await fetch("products.json");
    if (!res.ok) throw new Error("Gagal memuat products.json");
    products = await res.json();
    renderCategories();
    renderGrid();
  } catch (err) {
    grid.innerHTML = `<p class="empty-state">Tidak bisa memuat data produk. Pastikan file <code>products.json</code> ada di folder yang sama.</p>`;
    console.error(err);
  }
}

function renderCategories() {
  const categories = ["Semua", ...new Set(products.map(p => p.kategori))];
  categoriesWrap.innerHTML = "";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "chip" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", cat === activeCategory);
    btn.addEventListener("click", () => {
      activeCategory = cat;
      renderCategories();
      renderGrid();
    });
    categoriesWrap.appendChild(btn);
  });
}

function renderGrid() {
  const filtered = products.filter(p => {
    const matchCategory = activeCategory === "Semua" || p.kategori === activeCategory;
    const matchSearch = p.nama.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  grid.innerHTML = "";
  emptyState.hidden = filtered.length !== 0;

  filtered.forEach(product => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("aria-label", `Buka produk ${product.nama}`);

    const icon = product.tipe === "folder" ? folderIcon : fileIcon;

    card.innerHTML = `
      <div class="card-media">
        ${product.gambar ? `<img src="${product.gambar}" alt="" loading="lazy">` : icon}
      </div>
      <div class="card-body">
        <span class="card-kategori">${product.kategori}</span>
        <span class="card-nama">${product.nama}</span>
        <p class="card-desk">${product.deskripsi}</p>
        <div class="card-footer">
          <span class="card-cta">Buka produk →</span>
        </div>
      </div>
    `;

    // Saat kartu diklik, buka link produk yang tersimpan di products.json
    card.addEventListener("click", () => {
      if (product.link) {
        window.open(product.link, "_blank", "noopener,noreferrer");
      }
    });

    grid.appendChild(card);
  });
}

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderGrid();
});

loadProducts();
