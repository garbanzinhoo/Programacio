"use strict";
/*
2 - Introduir un caràcter verificant que sigui un caràcter d'una llista
Fes una funció que demani un caràcter (podria ser una opció d'un menú).
S'ha de demanar repetidament mentre el valor introduït no sigui un caràcter dels que es troba en un string (també es pot fer que la llista de caràcters permesos estigui en un array de caràcters).
Paràmetres d'entrada: pregunta que se li ha de fer a l'usuari i string o array amb les opcions vàlides.
Valor de retorn: el caràcter (opció) introduït per l'usuari.

*/

const OPCIONS = "abc";
let opcio = introduirCaracter("Escull una opció (a, b o c):", OPCIONS);

alert("Has escollit: " + opcio);

function introduirCaracter(pregunta, opcionsValides) {
    let caracter;

    do {
        caracter = prompt(pregunta);
    } while (caracter === null || caracter.length !== 1 || !opcionsValides.includes(caracter));

    return caracter;
}

