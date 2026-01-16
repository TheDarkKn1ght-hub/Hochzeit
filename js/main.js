document.getElementById("attendanceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(e.target);

  const body =
    "Antwort: " + data.get("response") + "%0D%0A%0D%0A" +
    "Name: " + data.get("name") + "%0D%0A" +
    "Telefon: " + data.get("phone") + "%0D%0A%0D%0A" +
    "Weitere Personen:%0D%0A" + data.get("guests") + "%0D%0A%0D%0A" +
    "Nachricht:%0D%0A" + data.get("message");

  window.location.href =
    "mailto:marvin.stark@web.de" +
    "?subject=Zu- oder Absage Hochzeit" +
    "&body=" + body;
});

const weddingDate = new Date("2026-04-16T14:30:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
}

updateCountdown();
setInterval(updateCountdown, 60000);
