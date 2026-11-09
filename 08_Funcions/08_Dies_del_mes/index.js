"use strict";
/* 
4 - Dies del mes
Crea les següents funcions:

Una funció que, passant-li un número entre 1 i 12 i un altre amb l'any, retorni el nombre de dies que té el mes o -1 si el mes no és correcte.
Aquest mètode hauria d'aprofitar la funció creada anteriorment per saber si és any de traspàs.
A partir del valor retornat, el programa ha de mostrar quants dies té el mes o mostrar un missatge d'error indicant que el mes ha de ser un número entre 1 i 12.
*/
import { esTraspas } from "../06_Any_traspas/index.js";

let mes = Number(prompt("Digues el número del mes (1-12)"));
let any = Number(prompt("Digues l'any"));

let dies = diesMes(mes, any);


if (dies == -1) {
    alert("El mes ha de ser un número entre 1 i 12");
} else {
    alert("El mes " + mes + " de l'any " + any + " té " + dies + " dies");
}

function diesMes(mes, any) {
    switch (mes) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            // esTraspas està importada de ../06_Any_traspas/index.js
            if (esTraspas(any)) {
                return 29;
            } else {
                return 28;
            }
        default:
            return -1;
    }
}

