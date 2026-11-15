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

const items = document.querySelectorAll(".gallery__item");

if ("IntersectionObserver" in window) {

  items.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--delay", (i % 3) * 0.1 + "s");
  });

  const pengintai = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        pengintai.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => pengintai.observe(el));
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const foto = btn.querySelector("img");
    const judul = btn.parentElement.querySelector("strong");
    lightboxImg.src = foto.src;
    lightboxImg.alt = foto.alt;
    lightboxCaption.textContent = judul ? judul.textContent : "";
    lightbox.showModal();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});