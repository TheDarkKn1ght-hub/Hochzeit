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
