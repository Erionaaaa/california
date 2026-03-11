const loader = document.getElementById("loader");
const topBtn = document.getElementById("topBtn");
const revealElements = document.querySelectorAll(".reveal");
const menuModal = document.getElementById("menuModal");
const lightbox = document.getElementById("lightbox");
const navbar = document.getElementById("navbar");

revealElements.forEach((el, index) => {
  const delay = Math.min(index * 70, 420);
  el.style.setProperty("--reveal-delay", delay + "ms");
});

window.addEventListener("load", () => {
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 320);
  }

  handleReveal();
  toggleTopButton();
  toggleNavbarState();
});

window.addEventListener("scroll", () => {
  handleReveal();
  toggleTopButton();
  toggleNavbarState();
});

function handleReveal() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 90) {
      el.classList.add("active");
    }
  });
}

function toggleTopButton() {
  if (!topBtn) {
    return;
  }

  const shouldShow = document.documentElement.scrollTop > 220 || document.body.scrollTop > 220;
  topBtn.style.display = shouldShow ? "block" : "none";
}

function toggleNavbarState() {
  if (!navbar) {
    return;
  }

  const isScrolled = document.documentElement.scrollTop > 40 || document.body.scrollTop > 40;
  navbar.classList.toggle("scrolled", isScrolled);
}

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function openModal(title, img, desc, price) {
  if (!menuModal) {
    return;
  }

  menuModal.style.display = "flex";
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalPrice").innerText = "EUR " + price;
  document.getElementById("modalImg").src = img;
}

function closeModal() {
  if (menuModal) {
    menuModal.style.display = "none";
  }
}

function openLightbox(img) {
  if (!lightbox) {
    return;
  }

  lightbox.style.display = "flex";
  document.getElementById("lightboxImg").src = img.src;
}

function closeLightbox() {
  if (lightbox) {
    lightbox.style.display = "none";
  }
}

window.addEventListener("click", (e) => {
  if (e.target === menuModal) {
    closeModal();
  }
  if (e.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeLightbox();
  }
});

const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;

    const message = [
      "Pershendetje! Dua te rezervoj tavoline.",
      "Emri: " + name,
      "Telefon: " + phone,
      "Data: " + date,
      "Ora: " + time,
      "Persona: " + guests,
    ].join("\n");

    const whatsappUrl = "https://wa.me/38343723623?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank");
  });
}
