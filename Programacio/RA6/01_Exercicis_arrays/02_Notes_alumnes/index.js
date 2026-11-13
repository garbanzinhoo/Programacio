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
    const notes = []; //creem l'array
    for (let i = 0; i < N_ALUMNES; i++) {
        let nota = Number(prompt("Introdueix una nota entre " + MIN + " i " + MAX));

        // Bucle per validar que les dades siguin vàlides
        while (!(esEnter(nota) && estaEntre(nota, MIN, MAX))) {
            alert("Has introduït una nota no vàlida");
            nota = Number(prompt("Introdueix una nota entre " + MIN + " i " + MAX));
        }

        // Guardem la nota vàlida a la posició i de l'array
        notes[i] = nota;
    }
    return notes;
}

// Retorna els aprovats, quants han suspès i la mitjana dels aprovats
function comptarNotes(notes){
    let aprovats = [];  // notes dels alumnes aprovats
    let suspesos = 0;   // quantitat d'alumnes suspesos
    let suma = 0;       // suma de les notes dels aprovats (per fer la mitjana)

    for (let i = 0; i < notes.length; i++){
        if (notes[i] >= 5){
            aprovats.push(notes[i]);  // afegim la nota a la llista d'aprovats
            suma += notes[i];         // l'afegim a la suma
        } else {
            suspesos++;               // si no arriba a 5, és un suspès
        }
    }

    // Calculem la mitjana
    let mitjana = 0;
    if (aprovats.length > 0){
        mitjana = suma / aprovats.length;
    }

    return { aprovats, suspesos, mitjana };
}

// Cridem la funció amb les notes introduïdes i guardem el resultat
const resultat = comptarNotes(notes);

// Mostrem el resum: quantitat d'aprovats i suspesos, les notes dels aprovats i la mitjana (2 decimals)
alert("Aprovats: " + resultat.aprovats.length +
      "\nSuspesos: " + resultat.suspesos +
      "\nNotes aprovats: " + resultat.aprovats.join(", ") +
      "\nMitjana: " + resultat.mitjana.toFixed(2));
