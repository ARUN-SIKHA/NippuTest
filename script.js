// Placeholder for future scalability:
// analytics, form handling, lazy loading, animations

document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for contacting NippuKoodi. We will get back to you shortly.");
  this.reset();
});
