/* =====================================================
   produk.js - SELURUH JavaScript untuk halaman Katalog Produk
   Dipanggil di HTML lewat: <script src="produk.js"></script>
   File ini berdiri sendiri, berisi:
   A. Bagian umum: menu hamburger, tahun otomatis di footer, gambar rusak
   B. Bagian khusus halaman ini (di paling bawah): kartu produk muncul halus saat di-scroll
   ===================================================== */


/* ################ A. BAGIAN UMUM ################ */

/* ===== MENU HAMBURGER =====
   document.getElementById("...") = mengambil elemen HTML berdasarkan id-nya.
   const = membuat variabel yang nilainya tidak diganti lagi. */
const navToggle = document.getElementById("navToggle");   // tombol ☰ (<button id="navToggle">)
const nav = document.getElementById("nav");               // daftar menu (<nav id="nav">)

/* addEventListener("click", fungsi) = jalankan fungsi setiap kali elemen diklik/diketuk */
navToggle.addEventListener("click", () => {

  /* classList.toggle("open") = kalau class "open" belum ada, tambahkan; kalau sudah ada, hapus.
     Hasilnya true (menu terbuka) atau false (menu tertutup).
     CSS yang menampilkan menu: .nav.open { display: flex; } */
  const open = nav.classList.toggle("open");

  /* Memberi tahu pembaca layar (aksesibilitas) apakah menu sedang terbuka.
     Atribut ini juga dipakai CSS untuk mengubah ☰ menjadi ✕. */
  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});


/* ===== TUTUP MENU SAAT LINK DIKLIK =====
   querySelectorAll("a") = ambil semua link <a> di dalam menu.
   forEach = lakukan hal yang sama untuk setiap link. */
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");                      // sembunyikan menu
    navToggle.setAttribute("aria-expanded", "false");  // kembalikan ikon ke ☰
    navToggle.setAttribute("aria-label", "Buka menu");
  });
});


/* ===== TAHUN OTOMATIS DI FOOTER =====
   new Date().getFullYear() = tahun saat ini dari jam perangkat.
   textContent = mengganti isi teks elemen <span id="year"> */
document.getElementById("year").textContent = new Date().getFullYear();


/* ===== GAMBAR RUSAK =====
   Jika file foto belum ada di folder img/, browser menampilkan ikon gambar rusak
   dan teks alt. Event "error" terjadi saat gambar gagal dimuat; di sini gambarnya
   disembunyikan agar yang tampil hanya warna cadangan (.img-box di CSS). */
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.visibility = "hidden";
  });
});


/* ################ B. KHUSUS HALAMAN KATALOG PRODUK: KARTU MUNCUL HALUS ################ */

/* Ambil semua kartu produk */
const items = document.querySelectorAll(".product");

/* IntersectionObserver = "pengintai" yang memberi tahu saat elemen terlihat di layar.
   Dicek dulu apakah browser mendukung; kalau tidak, kartu dibiarkan tampil biasa. */
if ("IntersectionObserver" in window) {

  /* Beri class "reveal" (mulai transparan) dan jeda bertingkat; (i % 3) = jeda diulang per baris (3 kartu) */
  items.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--delay", (i % 3) * 0.1 + "s");
  });

  /* Saat kartu terlihat minimal 15%, tambahkan class "show" agar muncul halus */
  const pengintai = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        pengintai.unobserve(entry.target);   // cukup sekali, setelah itu berhenti diawasi
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => pengintai.observe(el));
}