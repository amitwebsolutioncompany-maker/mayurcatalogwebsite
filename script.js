const whatsappNumber = "916353774990";

document.body.classList.add("is-loading");

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  window.setTimeout(() => {
    loader?.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
  }, 550);
});

const header = document.querySelector(".site-header");
const toggleHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

toggleHeaderState();
window.addEventListener("scroll", toggleHeaderState, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const productCards = document.querySelectorAll(".product-card");
productCards.forEach((card) => {
  const productName = card.dataset.product || "NextView product";
  const whatsappLink = card.querySelector(".js-whatsapp-link");

  if (whatsappLink) {
    const message = `Hello I am interested in ${productName} `;
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
});

const tiltCards = document.querySelectorAll("[data-tilt-card]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  tiltCards.forEach((card) => {
    const resetTilt = () => {
      card.style.transform = "";
    };

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = (0.5 - (y / rect.height)) * 10;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", resetTilt);
    card.addEventListener("blur", resetTilt, true);
  });

  const hero = document.querySelector(".hero");
  const heroBackground = document.querySelector(".hero__background");

  if (hero && heroBackground) {
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 16;

      heroBackground.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    hero.addEventListener("mouseleave", () => {
      heroBackground.style.transform = "";
    });
  }
}
