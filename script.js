// script.js
(() => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");

  if (hamburger && nav) {
    const closeMenu = () => {
      nav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    };

    hamburger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      hamburger.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close on link click (mobile)
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeMenu());
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      const clickedInside = nav.contains(e.target) || hamburger.contains(e.target);
      if (!clickedInside) closeMenu();
    });
  }

  // Slideshow (safe, optional)
  const container = document.querySelector("[data-slideshow='true']");
  const slides = container ? Array.from(container.querySelectorAll(".slide")) : [];
  const dotsWrap = container ? container.querySelector("[data-dots='true']") : null;
  const prevBtn = container ? container.querySelector("[data-slide='prev']") : null;
  const nextBtn = container ? container.querySelector("[data-slide='next']") : null;

  if (container && slides.length) {
    let index = 0;
    let timer = null;
    const intervalMs = 4500;

    // Build dots
    let dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      dots = slides.map((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dot";
        b.setAttribute("aria-label", `Go to slide ${i + 1}`);
        b.addEventListener("click", () => {
          goTo(i);
          restart();
        });
        dotsWrap.appendChild(b);
        return b;
      });
    }

    const render = () => {
      slides.forEach((s, i) => {
        s.style.display = i === index ? "block" : "none";
      });
      if (dots.length) {
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
      }
    };

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      render();
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    const start = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      timer = window.setInterval(next, intervalMs);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    const restart = () => {
      stop();
      start();
    };

    render();
    start();

    if (nextBtn) nextBtn.addEventListener("click", () => { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restart(); });

    // Pause on hover/focus for usability
    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);
    container.addEventListener("focusin", stop);
    container.addEventListener("focusout", start);

    // Keyboard arrows when focused
    container.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { next(); restart(); }
      if (e.key === "ArrowLeft") { prev(); restart(); }
    });
  }
})();
