window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  // After 3s, fade out intro
  setTimeout(() => {
    intro.style.opacity = "0";

    // After fade-out completes, remove it from DOM
    setTimeout(() => {
      intro.style.display = "none";
    }, 1000); // matches CSS transition
  }, 3000); // time to show logo
});
