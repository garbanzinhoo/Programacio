"use strict";

let numero = parseInt(prompt("Quantes línies vols?"));
let resultat = "";

for (let i = 1; i <= numero; i++) {
    // Afegim els asteriscs de cada linia
    for (let j = 1; j <= i; j++) {
        resultat += "*";
    }

    // Saltem a la linia següent
    resultat += "\n";
}

alert(resultat);
