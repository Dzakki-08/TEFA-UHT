// Menu mobile (hamburger)
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});

// Tutup menu setelah link diklik
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();

// Jika file gambar belum ada, sembunyikan ikon rusak (warna cadangan tetap tampil)
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => { img.style.visibility = "hidden"; });
});