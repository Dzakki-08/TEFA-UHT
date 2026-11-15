const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.visibility = "hidden";
  });
});