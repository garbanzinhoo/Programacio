"use strict";
const FRASE = "que divertit es programar en javascript";
const ALFABETO = "abcdefghijklmnopqrstuvwxyz";

let entrada = prompt("Introduce dos letras juntas:");

if (entrada !== null) {
  entrada = entrada.toLowerCase();

  if (entrada.length !== 2) {
    alert("Mal puesto");
  } else {
    let letra1 = entrada.charAt(0);
    let letra2 = entrada.charAt(1);

    if (ALFABETO.indexOf(letra1) === -1) {
      alert("Mal puesto");
    } else {
      if (ALFABETO.indexOf(letra2) === -1) {
        alert("Mal puesto");
      } else {
        let pos1 = FRASE.indexOf(letra1);
        let pos2 = FRASE.indexOf(letra2);

        if (pos1 === -1 || pos2 === -1) {
          alert("Esa letra no aparece en la frase");
        } else {
          // Si la primera posición es mayor que la segunda, se invierten
          if (pos1 > pos2) {
            let temporal = pos1;
            pos1 = pos2;
            pos2 = temporal;
          }

          // Tramo desde la primera letra hasta la segunda (ambas incluidas)
          let tramo = FRASE.substring(pos1, pos2 + 1);
          let longitud = tramo.length;

          if (longitud % 2 === 1) {
            let letraCentral = tramo.charAt(Math.floor(longitud / 2));
            alert("Frase: " + tramo + "\nLetra del medio: " + letraCentral);
          } else {
            alert("Frase: " + tramo + "\nEl tramo tiene un número par de letras, no hay letra del medio");
          }
        }
      }
    }
  }
}