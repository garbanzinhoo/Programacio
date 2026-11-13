"use strict";

/*
1 - Notes de UFs en un array
Fes un programa que demani les 6 notes de les UF del Mòdul de Programació,
les guardi en un array i busqui la nota mínima i la nota màxima.

Si la nota mínima és inferior a 5, ha de dir que no aprova el mòdul.
En cas contrari, ha de calcular la mitjana i mostrar el resultat.
*/

import { esEnter, estaEntre } from "../../utils/validacions.js";

const MIN = 1;
const MAX = 10;
const NUM_UF = 6;

const notes = demanaNotes();
mostraResultat(notes);


function demanaNotes() {
    const notes = [];

    for (let i = 0; i < NUM_UF; i++) {
        let nota = prompt("Digues la nota de la UF" + (i + 1));

        while (!(esEnter(nota) && estaEntre(Number(nota), MIN, MAX))) {
            alert("Has introduït una nota no vàlida");
            nota = prompt("Digues la nota de la UF" + (i + 1));
        }

        notes[i] = Number(nota);
    }

    return notes;
}

function buscaNotes(notes) {
    let notaMinima = notes[0];
    let notaMaxima = notes[0];

    for (let i = 1; i < notes.length; i++) {
        if (notes[i] < notaMinima) {
            notaMinima = notes[i];
        }

        if (notes[i] > notaMaxima) {
            notaMaxima = notes[i];
        }
    }

    return { notaMinima, notaMaxima };
}

function calculaMitjana(notes) {
    let suma = 0;

    for (let i = 0; i < notes.length; i++) {
        suma += notes[i];
    }

    return suma / notes.length;
}

function mostraResultat(notes) {
    const extrems = buscaNotes(notes);

    if (extrems.notaMinima < 5) {
        alert("No aproves el mòdul");
    } else {
        alert(
            "Nota mínima: " + extrems.notaMinima +
            "\nNota màxima: " + extrems.notaMaxima +
            "\nMitjana: " + calculaMitjana(notes)
        );
    }
}

