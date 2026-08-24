/* Anketas nosūtīšana uz Google veidlapu bez servera:
   POST tiek sūtīts tieši uz veidlapas /formResponse adresi ar
   "no-cors" režīmu, tāpēc atbildi nolasīt nevar — pieņemam, ka
   nosūtīšana izdevusies, ja fetch neizmet kļūdu. */

const VEIDLAPAS_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfif7Zei6U5YpjgGfByuCtJGGISeb9THcuwre-0TBaTpBW-Qg/formResponse";

const IEEJAS = {
  vards: "entry.1178218189",       // Vārds
  klase: "entry.392496835",        // Klase
  prieksmets: "entry.441171026",   // Mācību priekšmets
  temas: "entry.881114196",        // Tagadējais līmenis
  merkis: "entry.413784947",       // Sasniedzamais rezultāts
  laiks: "entry.386665014",        // Vēlamais laiks
  epasts: "entry.1006788258",      // Epasts
};

const forma = document.getElementById("anketa");
const zinojums = document.getElementById("zinojums");

function parbaudit() {
  if (forma.checkValidity()) return true;
  forma.reportValidity();
  paraditZinojumu("Lūdzu aizpildiet iezīmētos laukus — bez tiem nevaram sazināties.");
  return false;
}

function paraditZinojumu(teksts) {
  zinojums.textContent = teksts;
  zinojums.hidden = false;
}

forma.addEventListener("submit", async (notikums) => {
  notikums.preventDefault();
  if (!parbaudit()) return;

  const dati = new FormData(forma);
  const nosutamie = new FormData();

  for (const [lauks, ieeja] of Object.entries(IEEJAS)) {
    const vertibas = dati.getAll(lauks).filter(Boolean);
    if (vertibas.length) nosutamie.append(ieeja, vertibas.join(", "));
  }

  try {
    await fetch(VEIDLAPAS_URL, { method: "POST", mode: "no-cors", body: nosutamie });
    forma.reset();
    paraditZinojumu("Paldies! Anketa nosūtīta");
  } catch {
    paraditZinojumu("Neizdevās nosūtīt anketu. Lūdzu mēģiniet vēlreiz vai rakstiet mums e-pastā.");
  }
});
