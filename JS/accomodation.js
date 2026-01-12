document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     GALLERY / LIGHTBOX
  ====================== */

  const images = [
    "./Asset/images/Luxury.jpg",
    "./Asset/images/Standard.jpg",
    "./Asset/images/Deluxe.jpg",
    "./Asset/images/Luxury-livingRoom.jpg",
    "./Asset/images/Luxury-Toilet.jpg"
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

  /* ======================
     DATE VALIDATION
  ====================== */

const checkIn = document.getElementById("checkin");
const checkOut = document.getElementById("checkout");

if (checkIn && checkOut) {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Prevent past check-in dates
  checkIn.min = today;

  checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value;

    if (checkOut.value && checkOut.value < checkIn.value) {
      checkOut.value = "";
    }
  });
}

/* ======================
   FORMSPREE FORM
====================== */

const form = document.getElementById("bookingForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const nameInput = this.querySelector('input[name="name"]');

if (nameInput) {
  const cleanName = nameInput.value.trim();

  if (cleanName === "") {
    showToast("error", "Add Name");
    return; // STOP submission
  }

  nameInput.value = cleanName;
}

    showToast("info", "Sending reservation request...");

    const formData = new FormData(this);

    try {
      const response = await fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        showToast("success", "Reservation request sent successfully!");
        this.reset();
      } else {
        showToast("error", "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Network error. Check your connection.");
    }
  });
}
});