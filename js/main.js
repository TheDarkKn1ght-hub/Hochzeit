document.addEventListener("DOMContentLoaded", function () {

  const countdown = document.getElementById("countdown");
  const title = document.querySelector(".countdown-title");

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");

  // Falls irgendetwas fehlt → abbrechen, aber NICHT crashen
  if (!countdown || !daysEl || !hoursEl || !minutesEl) {
    console.warn("Countdown-Elemente fehlen");
    return;
  }

  // 16. April 2026, 14:30 Uhr MESZ
  const weddingDate = new Date(Date.UTC(2026, 3, 16, 13, 30));

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      countdown.style.display = "none";
      if (title) title.style.display = "none";
      return;
    }

    const totalMinutes = Math.floor(diff / 60000);

    daysEl.textContent = Math.floor(totalMinutes / 1440);
    hoursEl.textContent = Math.floor((totalMinutes % 1440) / 60);
    minutesEl.textContent = totalMinutes % 60;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
});
<script>
/* === KONFIGURATION === */
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/DEINE_SHEET_ID/pub?output=csv";

/* === ESSEN AUS SHEET LADEN === */
let bekannteEssen = [];

fetch(sheetURL)
  .then(res => res.text())
  .then(text => {
    bekannteEssen = text
      .split("\n")
      .slice(1)
      .map(e => e.trim().toLowerCase())
      .filter(e => e.length);
  });

/* === FORM-LOGIK === */
const radios = document.querySelectorAll('input[name="response"]');
const essenWrapper = document.getElementById("essen-wrapper");
const essenInput = document.getElementById("essen-input");
const hinweis = document.getElementById("duplikat-hinweis");

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "Zusage" && radio.checked) {
      essenWrapper.style.display = "block";
      essenInput.required = true;
    } else if (radio.value === "Absage" && radio.checked) {
      essenWrapper.style.display = "none";
      essenInput.required = false;
      essenInput.value = "";
      hinweis.style.display = "none";
    }
  });
});

/* === DUPLIKAT-WARNUNG === */
essenInput.addEventListener("input", () => {
  const wert = essenInput.value.trim().toLowerCase();
  hinweis.style.display = bekannteEssen.includes(wert)
    ? "block"
    : "none";
});
</script>
