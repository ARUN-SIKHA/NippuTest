(() => {
  "use strict";

  // Always set footer year (safe, never hides page)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));

    // Close on link click (mobile)
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      const target = e.target;
      if (target instanceof Node && !nav.contains(target) && !toggle.contains(target)) {
        setOpen(false);
      }
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // Smooth slideshow fade (no harsh transitions)
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (!slides.length) return;

  // Make sure at least one slide is active
  let index = slides.findIndex((s) => s.classList.contains("is-active"));
  if (index < 0) {
    index = 0;
    slides[0].classList.add("is-active");
  }

  // Support mixed extensions: if an image fails to load, it won't break the page
  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    if (!img) return;
    img.addEventListener("error", () => {
      // If an image fails, hide that slide to avoid blank flashes
      slide.style.display = "none";
    });
  });

  const INTERVAL_MS = 4500;

  setInterval(() => {
    const current = slides[index];
    // Find next available slide (skip ones hidden due to load error)
    let nextIndex = index;
    for (let i = 0; i < slides.length; i++) {
      nextIndex = (nextIndex + 1) % slides.length;
      if (slides[nextIndex].style.display !== "none") break;
    }

    const next = slides[nextIndex];
    if (!next || next === current) return;

    current.classList.remove("is-active");
    next.classList.add("is-active");
    index = nextIndex;
  }, INTERVAL_MS);
})();
