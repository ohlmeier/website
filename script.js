const toggle = document.getElementById("darkToggle");
const body = document.body;

// gespeicherten Modus laden
if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("darkMode", body.classList.contains("dark"));
});

// ===== LIGHTBOX =====
const images = document.querySelectorAll(".gallery img");
const lb = document.getElementById("lightbox");
const lbImg = document.querySelector(".lightbox-img");
const lbTitle = document.getElementById("lb-title");
const lbLoc = document.getElementById("lb-location");

const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");
const btnClose = document.querySelector(".lightbox .close");

let currentIndex = 0;

// Öffnen
function openLightbox(index) {
  const img = images[index];
  currentIndex = index;

  lbImg.src = img.src;
  lbTitle.textContent = img.dataset.title || "";
  lbLoc.textContent = img.dataset.location || "";

  lb.classList.add("show");
}

// Schließen
function closeLightbox() {
  lb.classList.remove("show");
  lbImg.src = ""; // verhindert Bild-Flackern
}

// Bild klicken → öffnen
images.forEach((img, i) => {
  img.addEventListener("click", () => openLightbox(i));
});

// Navigation
btnNext.addEventListener("click", (e) => {
  e.stopPropagation();
  openLightbox((currentIndex + 1) % images.length);
});

btnPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  openLightbox((currentIndex - 1 + images.length) % images.length);
});

// Close Button
btnClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

// Klick auf Overlay (aber NICHT auf Bild)
lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLightbox();
});

// Tastatur
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("show")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") btnNext.click();
  if (e.key === "ArrowLeft") btnPrev.click();
});