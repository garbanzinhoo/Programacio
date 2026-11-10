"use strict";
/*
3 - Introduir un número enter
Fes una funció que demani un número enter.
S'ha de demanar repetidament mentre el valor introduït no sigui un número enter, i avisar amb un missatge d'error.

Paràmetre d'entrada: pregunta que se li ha de fer a l'usuari.
Valor de retorn: el número enter introduït per l'usuari.

Crea també una funció que utilitzi l'anterior però que se li pugui indicar el valor mínim i màxim entre els quals s'ha de trobar el valor introduït.
Si el valor mínim és més gran que el màxim, cal intercanviar els valors.
S'ha de demanar repetidament mentre el valor introduït no estigui entre els dos límits, i avisar amb un missatge d'error.
*/

"use strict";

// Demana un número enter fins que l'usuari n'introdueixi un de vàlid
function demanarEnter(pregunta) {
    let text;
    let valid;
    do {
        text = prompt(pregunta);
        // esEnter ja descarta null (cancel·lar), buit i no enters
        valid = esEnter(text);
        if (!valid) {
            alert("ERROR: has d'introduir un número enter.");
        }
    } while (!valid);
    return Number(text);
}

// Demana un número enter que estigui entre min i max (inclosos)
function demanarEnterEntre(pregunta, min, max) {
    // Si els límits estan al revés, els intercanviem
    if (min > max) {
        let aux = min;
        min = max;
        max = aux;
    }
    let numero = demanarEnter(pregunta + " (entre " + min + " i " + max + ")");
    while (!estaEntre(numero, min, max)) {
        alert("ERROR: el número ha d'estar entre " + min + " i " + max + ".");
        numero = demanarEnter(pregunta + " (entre " + min + " i " + max + ")");
    }
    return numero;
}

// Exemple d'ús
let edat = demanarEnterEntre("Quina edat tens?", 120, 0);
alert("Has introduït: " + edat);