"use strict";
const n1 = Number(prompt("Digues un número"));
const operacio = prompt("Quina operació vols fer (+ - * /)");
const n2 = Number(prompt("Digues un altre número"));

let resultat;

if (operacio === "+") {
    resultat = n1 + n2;
} else if (operacio === "-") {
    resultat = n1 - n2;
} else if (operacio === "*") {
    resultat = n1 * n2;
} else if (operacio === "/") {
    resultat = n1 / n2;
} else {
    resultat = "Operació no vàlida";
}

alert(resultat);