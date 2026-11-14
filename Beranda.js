/* ===== 1. MENU HAMBURGER =====
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


/* ===== 2. TUTUP MENU SAAT LINK DIKLIK ===== */
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");                      // sembunyikan menu
    navToggle.setAttribute("aria-expanded", "false");  // kembalikan ikon ke ☰
    navToggle.setAttribute("aria-label", "Buka menu");
  });
});


/* ===== 3. TAHUN OTOMATIS DI FOOTER =====*/
document.getElementById("year").textContent = new Date().getFullYear();


/* ===== 4. GAMBAR RUSAK =====*/
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.visibility = "hidden";
  });
});