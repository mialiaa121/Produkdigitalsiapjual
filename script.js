const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const categoriesWrap = document.getElementById("categories");
const emptyState = document.getElementById("empty-state");

let products = [];
let activeCategory = "Semua";
let searchTerm = "";

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
    card.className = "item";
    card.type = "button";
    card.setAttribute("aria-label", `Buka produk ${product.nama}`);

    card.innerHTML = `
      <div class="item-text">
        <span class="item-kategori">${product.kategori}</span>
        <span class="item-nama">${product.nama}</span>
        <p class="item-desk">${product.deskripsi}</p>
      </div>
      <span class="item-cta">Buka →</span>
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
