"use strict";

/*
2 - Posició dels espais en un String
Utilitzant un bucle, localitza en quina posició estan tots els espais d'un string.
*/

const FRASE = "Hola Aitor com estas";
let espai = " ";
let resultat = "";

for (let i = 0; i <= FRASE.length; i++){
    if (FRASE.charAt(i) == espai){
        resultat += i + " ";
    }
}
alert(resultat)