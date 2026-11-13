"use strict";

/*
2 - Notes d'alumnes en un array
Fes un programa que demani les notes de 10 alumnes i les guardi en un array.

Després ha de comptar quants han suspès i quants han aprovat.

Finalment, haurà de mostrar les notes dels aprovats i calcular la mitjana només dels aprovats.
*/

import { esEnter, estaEntre } from "../../utils/validacions.js";

const MIN = 1;
const MAX = 10;
const N_ALUMNES = 10;
const notes = demanarNotes();

function demanarNotes(){
    const notes = [];
        for (let i = 0; i < N_ALUMNES; i++) {
            let nota = Number(prompt("Introduiex una nota entre "+ MIN + " i " + MAX));
    
            while (!(esEnter(nota) && estaEntre(Number(nota), MIN, MAX))) {
                alert("Has introduït una nota no vàlida");
                nota = Number(prompt("Introduiex una nota entre "+ MIN + " i " + MAX));
            }

            notes[i] = nota;
        }
        return notes;
}
alert(notes.join(", "));
