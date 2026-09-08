# Etalase — Dashboard Produk Digital

Dashboard statis (HTML/CSS/JS, tanpa framework) untuk menampilkan produk digital siap jual. Klik salah satu produk akan membuka link pembelian yang tersimpan di `products.json`.

## Struktur file

```
.
├── index.html       # Struktur halaman
├── style.css        # Styling, warna brand #d3b0e8
├── script.js        # Render produk & aksi klik → buka link
├── products.json    # Data produk (edit di sini)
└── README.md
```

## Cara menambah / mengubah produk

Buka `products.json` dan tambahkan objek baru ke dalam array, contoh:

```json
{
  "id": "id-unik-produk",
  "nama": "Nama Produk",
  "kategori": "Kategori",
  "harga": "Rp 00.000",
  "deskripsi": "Deskripsi singkat produk.",
  "gambar": "https://url-gambar-produk.jpg",
  "link": "https://link-tujuan-saat-diklik.com"
}
```

Tidak perlu edit HTML/JS — dashboard otomatis membaca ulang data dari file ini, termasuk kategori filter di bagian atas.

## Menjalankan secara lokal

File ini menggunakan `fetch()` untuk membaca `products.json`, sehingga perlu dijalankan lewat server lokal (bukan dibuka langsung sebagai `file://`):

```bash
# opsi 1: pakai Python
python3 -m http.server 8000

# opsi 2: pakai Node (http-server)
npx http-server .
```

Lalu buka `http://localhost:8000` di browser.

## Deploy ke GitHub Pages

1. Push repo ini ke GitHub.
2. Buka **Settings → Pages**.
3. Pilih branch `main` dan folder `/ (root)`.
4. Simpan — situs akan tersedia di `https://<username>.github.io/<nama-repo>/`.

## Kustomisasi warna brand

Warna utama diatur lewat CSS variable di `style.css`:

```css
:root {
  --brand: #d3b0e8;
  --brand-deep: #6d4a86;
}
```

Ganti nilai ini untuk menyesuaikan dengan brand lain.
