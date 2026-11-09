"use strict";

/*
6 - Quina paraula va primer?
A partir de 2 paraules, determinar quina és més petita que l'altra lexicogràficament (quina aniria primer en el diccionari) sense tenir en compte majúscules i minúscules.
Pots utilitzar el mètode compareLocale(value).

Millora el programa indicant també quina és més curta.

Exemple de sortida per consola
Si les paraules són abc i DEF:

abc va abans que DEF
Tenen la mateixa llargada

Si les paraules són alumnes i ALUMNE:

ALUMNE va abans que alumnes
ALUMNE és més curta que alumnes

*/
let paraula1 = prompt("Digues una paraula");
let paraula2 = prompt("Digues una altra paraula");

let resultat = "";

// Ordre alfabètic
if (paraula1.localeCompare(paraula2) < 0) {
  resultat += paraula1 + " va abans que " + paraula2;
} else if (paraula1.localeCompare(paraula2) > 0) {
  resultat += paraula2 + " va abans que " + paraula1;
} else {
  resultat += paraula1 + " i " + paraula2 + " són la mateixa paraula";
}

// Longitud
if (paraula1.length > paraula2.length) {
  resultat += "\n" + paraula1 + " és més llarga que " + paraula2;
} else if (paraula2.length > paraula1.length) {
  resultat += "\n" + paraula2 + " és més llarga que " + paraula1;
} else {
  resultat += "\n" + paraula1 + " i " + paraula2 + " tenen la mateixa mida";
}

alert(resultat);