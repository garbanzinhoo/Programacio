"use strict";

/*
9 - Paraules pentavocàliques
Detecta si una paraula conté totes les vocals (només vocals sense accents ni dièresis), però poden ser majúscules o minúscules.

Opcionalment, fes que digui quines vocals falten.

Exemple de sortida per consola
MURCIELAGO: conté totes les vocals

COCHE: li falten les vocals AIU
*/
let paraula = prompt("Digues una paraula");
let vocalsfalten = "";
let vocals = "aeiou"
paraula = paraula.toUpperCase().trim();
if (paraula.includes("A") && paraula.includes("E") && paraula.includes("I") && paraula.includes("O") && paraula.includes("U")){
    alert(paraula + ": conté totes les vocals");
}else{
    for (let i = 0; i < vocals.length; i++) { //revisa quines vocals falten
        if (!paraula.toLowerCase().includes(vocals.charAt(i))) {
            vocalsfalten += vocals.charAt(i);
        }
    }
    alert(paraula + ": li falten les vocals " + vocalsfalten.toUpperCase());
}