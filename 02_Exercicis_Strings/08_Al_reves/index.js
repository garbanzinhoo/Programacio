"use strict";
/*

1 - String al revés
Fes un programa que mostri un string però escrit al revés.

Primer, fes-ho escrivint cada caràcter individualment.
Després, fes el mateix però crea primer un string al revés i escriu aquest string.
*/

const FRASE = "rotia";
let resultat = "";

for(let i = 0; i < FRASE.length; i++){
    resultat+= FRASE.charAt(FRASE.length -1 - i);
}
alert(resultat)