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

<!-- COUNTDOWN -->
<script>
  // Zielzeit: 16. April 2026, 14:30 Uhr MESZ
  // ISO-Format mit Zeitzone ist stabil (Sommer-/Winterzeit korrekt)
  const weddingDate = new Date("2026-04-16T14:30:00+02:00");

  const countdown = document.getElementById("countdown");
  const title = document.getElementById("countdown-title");

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");

  function updateCountdown() {
    // Sicherheitscheck: Script bricht nicht ab, falls ein Element fehlt
    if (!countdown || !daysEl || !hoursEl || !minutesEl) return;

    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      countdown.style.display = "none";
      if (title) title.style.display = "none";
      return;
    }

    const totalMinutes = Math.floor(diff / 60000);

    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    daysEl.textContent = days;
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
  }

  // Initiales Update + regelmäßige Aktualisierung
  updateCountdown();
  setInterval(updateCountdown, 1000);
</script>

  
<script>
/* === KONFIGURATION === */
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCf97RcKu_czfAPWDSzkprQRgcVo9-yaNb0ySxg2XTAgQPt8mj_CZFrpHzWfuzJhCZ1Kfeyuc2VCem/pub?gid=0&single=true&output=csv";

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
