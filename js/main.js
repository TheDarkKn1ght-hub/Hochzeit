document.addEventListener("DOMContentLoaded", function () {

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");

  if (!daysEl || !hoursEl || !minutesEl) {
    console.error("Countdown-Elemente nicht gefunden");
    return;
  }

  const weddingDate = new Date("2026-04-16T14:30:00");

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minutesEl.textContent = "0";
      return;
    }

    daysEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    hoursEl.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutesEl.textContent = Math.floor((diff / (1000 * 60)) % 60);
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
});
