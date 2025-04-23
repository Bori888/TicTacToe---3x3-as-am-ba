let tabla = Array(9).fill("");
let lepesSzamlalo = 0;
let jatekos1 = "";
let jatekos2 = "";

export function aktualisJatekos(valtas) {
  return valtas % 2 === 0 ? "X" : "O";
}

export function ellenorizGyozelem(tabla) {
  const mintak = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let m of mintak) {
    const [a, b, c] = m;
    if (tabla[a] && tabla[a] === tabla[b] && tabla[a] === tabla[c]) {
      return tabla[a];
    }
  }
  return null;
}

export function dontetlenE(tabla) {
  return tabla.every(mezo => mezo !== "");
}

function letiltTabla(mezok) {
  mezok.forEach(mezo => mezo.classList.add("kattintva"));
}

function resetTabla(mezok) {
  tabla = Array(9).fill("");
  lepesSzamlalo = 0;
  mezok.forEach(mezo => {
    mezo.querySelector("p").textContent = "";
    mezo.classList.remove("kattintva");
  });
}

export function jatekInditasa() {
  const mezok = document.querySelectorAll(".mezo");
  const allapotElem = document.getElementById("aktualisAllapot");
  const ujJatekGomb = document.getElementById("ujJatek");
  const inditasGomb = document.getElementById("inditas");

  inditasGomb.addEventListener("click", () => {
    jatekos1 = document.getElementById("nev1").value || "Játékos 1";
    jatekos2 = document.getElementById("nev2").value || "Játékos 2";
    allapotElem.textContent = `Az aktuális játékos: ${jatekos1} (X)`;
    mezok.forEach(mezo => mezo.classList.remove("kattintva"));
    ujJatekGomb.style.display = "none";
    resetTabla(mezok);
  });

  mezok.forEach((mezo, index) => {
    mezo.addEventListener("click", () => {
      if (tabla[index] !== "" || !jatekos1 || !jatekos2) return;

      const jel = aktualisJatekos(lepesSzamlalo);
      mezo.querySelector("p").textContent = jel;
      mezo.classList.add("kattintva");
      tabla[index] = jel;
      lepesSzamlalo++;

      const gyoztes = ellenorizGyozelem(tabla);
      if (gyoztes) {
        const nyertes = gyoztes === "X" ? jatekos1 : jatekos2;
        allapotElem.textContent = `Győzött: ${nyertes} (${gyoztes})`;
        letiltTabla(mezok);
        ujJatekGomb.style.display = "inline-block";
        return;
      }

      if (dontetlenE(tabla)) {
        allapotElem.textContent = "Döntetlen!";
        ujJatekGomb.style.display = "inline-block";
        return;
      }

      const kovetkezo = aktualisJatekos(lepesSzamlalo) === "X" ? jatekos1 : jatekos2;
      allapotElem.textContent = `Az aktuális játékos: ${kovetkezo} (${aktualisJatekos(lepesSzamlalo)})`;
    });
  });

  ujJatekGomb.addEventListener("click", () => {
    resetTabla(mezok);
    allapotElem.textContent = `Az aktuális játékos: ${jatekos1} (X)`;
    ujJatekGomb.style.display = "none";
  });
}
