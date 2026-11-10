"use strict";
// Fes un programa que, introduïnt un número N entre entre 1 i 80, escrigui una línia amb N asteriscos.

let numero = Number(prompt("Digues quants * vols"));
let asterisco = "";

for (let i = 1; i <= numero; i++) {
    // Afegim un asterisc a cada volta del bucle
    asterisco += "*";
}

// Mostrem tots els asteriscs en una sola línia
alert(asterisco);