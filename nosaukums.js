/* Vietnes nosaukums vienuviet — mainiet tikai šo vērtību,
   lai pārdēvētu vietni visur (logo, kājene, <title>). */

const VARDS = "Zini vai mini Skola";

document.title = document.title.replace(/Rūtiņa/g, VARDS);

document.querySelectorAll("[data-vards]").forEach((el) => {
  el.textContent = VARDS;
});
