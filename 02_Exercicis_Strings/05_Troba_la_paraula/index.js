/*
Fes un programa que indiqui si una paraula està dins d'una frase.
El programa haurà de mostrar true o false.

OPCIONAL: fes-ho de forma que no importi si es posa la paraula en majúscules, minúscules o barrejades.
*/
"use strict";

const FRASE = "Avui fa molt bon dia";
let paraula = "aVui";

//Convierte toda la frase a minuscula y busca la palabra en minuscula
let resultat = FRASE.toLowerCase().includes(paraula.toLowerCase());

alert(resultat);