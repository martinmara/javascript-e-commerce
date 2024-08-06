document.addEventListener("scroll", () => {
  const heroImage = document.querySelector(".hero-image img");
  const scrollY = window.scrollY;

  // Example of a parallax effect
  heroImage.style.transform = `translateY(${scrollY * 0.5}px)`;
});
