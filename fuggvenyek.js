let tabla = Array(9).fill("");
let lepesSzamlalo = 0;
let jatekos1 = "";
let jatekos2 = "";
let jatekVege = false;

export function jatekInditasa() {
  const mezok = document.querySelectorAll(".mezo");
  const uzenetek = document.getElementById("uzenetek");
  const ujJatekGomb = document.getElementById("ujJatek");

  document.getElementById("inditas").addEventListener("click", () => {
    jatekos1 = document.getElementById("nev1").value || "Játékos 1";
    jatekos2 = document.getElementById("nev2").value || "Játékos 2";
    tabla = Array(9).fill("");
    lepesSzamlalo = 0;
    jatekVege = false;

    mezok.forEach(mezo => {
      mezo.querySelector("p").textContent = "";
      mezo.classList.remove("kattintva");
    });

    uzenetek.innerHTML = `<li>Játék indult! Az aktuális játékos: ${jatekos1} (X)</li>`;
    ujJatekGomb.style.display = "none";
  });

  mezok.forEach((mezo, index) => {
    mezo.addEventListener("click", () => {
      if (tabla[index] !== "" || jatekVege || !jatekos1 || !jatekos2) return;

      const jel = lepesSzamlalo % 2 === 0 ? "X" : "O";
      mezo.querySelector("p").textContent = jel;
      mezo.classList.add("kattintva");
      tabla[index] = jel;
      lepesSzamlalo++;

      const uzenetek = document.getElementById("uzenetek");
      const li = document.createElement("li");
      li.textContent = `${jel === "X" ? jatekos1 : jatekos2} (${jel}) lépett.`;
      uzenetek.appendChild(li);

      const gyoztes = ellenorizGyozelem(tabla);
      if (gyoztes) {
        jatekVege = true;
        const li = document.createElement("li");
        li.textContent = `Győzött: ${gyoztes === "X" ? jatekos1 : jatekos2} (${gyoztes})!`;
        uzenetek.appendChild(li);
        document.getElementById("ujJatek").style.display = "inline-block";
        return;
      }

      if (tabla.every(mezo => mezo !== "")) {
        jatekVege = true;
        const li = document.createElement("li");
        li.textContent = "Döntetlen!";
        uzenetek.appendChild(li);
        document.getElementById("ujJatek").style.display = "inline-block";
        return;
      }
    });
  });

  ujJatekGomb.addEventListener("click", () => {
    document.getElementById("inditas").click();
  });
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
