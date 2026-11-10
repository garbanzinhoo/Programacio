"use strict";
/*
1 - Generar caràcter aleatori
Fes una funció que retorni un caràcter aleatori entre la 'A' i la 'Z' totes dues incloses.
Millora la funció anterior fent que se li pugui passar el caràcter inicial i el caràcter final.

*/

const LLETRES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let caracterInicial = prompt("Digues el caracter inicial:").toUpperCase();
let caracterFinal = prompt("Digues el caracter final:").toUpperCase();

alert(caracterAleatori(caracterInicial, caracterFinal));

function caracterAleatori(inicial, final) {
    if (inicial > final) {
        let temporal = inicial;
        inicial = final;
        final = temporal;
    }

    //Declarem variable rang per el rang de lletres que hem d'utilitzar
    let rang = LLETRES.substring(LLETRES.indexOf(inicial), LLETRES.indexOf(final) + 1);
    let numero = Math.floor(Math.random() * rang.length); //Busquem lletra aleatoria al nou rang
    return rang.charAt(numero);
}
