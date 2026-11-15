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

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const submitLabel = document.getElementById("submitLabel");

const rules = {
  nama: { check: (v) => v.length >= 2, message: "Nama wajib diisi (minimal 2 huruf)." },
  email: { check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: "Masukkan alamat email yang valid, contoh: nama@contoh.com." },
  subjek: { check: (v) => v.length >= 3, message: "Subjek wajib diisi (minimal 3 huruf)." },
  pesan: { check: (v) => v.length >= 10, message: "Pesan minimal 10 karakter agar kebutuhan Anda jelas." }
};

function checkField(id) {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "Error");
  const valid = rules[id].check(input.value.trim());
  input.setAttribute("aria-invalid", valid ? "false" : "true");
  error.textContent = valid ? "" : rules[id].message;
  return valid;
}

Object.keys(rules).forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("blur", () => {
    if (input.value !== "") checkField(id);
  });
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") checkField(id);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const hasil = Object.keys(rules).map((id) => checkField(id));
  if (hasil.includes(false)) {
    const pertama = Object.keys(rules).find((id) => document.getElementById(id).getAttribute("aria-invalid") === "true");
    document.getElementById(pertama).focus();
    return;
  }

  submitBtn.disabled = true;
  submitLabel.textContent = "Mengirim...";
  setTimeout(() => {
    window.location.href = "terkirim.html";
  }, 600);
});
