document.addEventListener("DOMContentLoaded", () => {
    const images = [
    "./Asset/images/founder.png",
    "./Asset/images/MD.jpg"
  ];

  let current = 0;

  window.openLightbox = function(index) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    if (!lightbox || !img) return;

    current = index;
    img.src = images[current];
    lightbox.style.display = "flex";
  };

  window.closeLightbox = function() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
  };

  window.changeImage = function(step) {
    const img = document.getElementById("lightbox-img");
    if (!img) return;

    current += step;
    if (current < 0) current = images.length - 1;
    if (current >= images.length) current = 0;
    img.src = images[current];
  };

})