"use strict";

/*
3 - Acrònims
Escriu en majúscules les inicials de cada paraula d'una frase (acrònim).
*/

let FRASE = prompt("Digues una frase per fer l'acronim");
let acronim = "";
for (let i = 0; i <= FRASE.length; i++){
    let mayus = FRASE.charAt(i);
    if (mayus == mayus.toUpperCase() && mayus != mayus.toLowerCase()){ //Compara que la original sigui igual que la que modifiques
        acronim += mayus
    }
}
alert(acronim)