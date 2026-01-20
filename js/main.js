<script>
document.addEventListener("DOMContentLoaded", () => {

  const countdown = document.getElementById("countdown");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");

  console.log("Countdown Elemente:", countdown, daysEl, hoursEl, minutesEl);

  // TESTDATUM: 24 Stunden in der Zukunft
  const weddingDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  function updateCountdown() {
    const diff = weddingDate - new Date();
    const mins = Math.max(0, Math.floor(diff / 60000));

    daysEl.textContent = Math.floor(mins / 1440);
    hoursEl.textContent = Math.floor((mins % 1440) / 60).toString().padStart(2, "0");
    minutesEl.textContent = (mins % 60).toString().padStart(2, "0");

    countdown.style.display = "flex";
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
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
