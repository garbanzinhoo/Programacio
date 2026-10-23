/*
Guarda en una variable una frase que tingui una paraula repetida.
Fes que indiqui la primera i l'última posició de la paraula repetida.

OPCIONAL: fes-ho de forma que no importi si es posa la paraula en majúscules, minúscules o barrejades.
*/
"use strict"

/* 
Detecta las palabras

let frase = "Avui dia es un bon dia";
let pRepetida = "dia";

let primera = frase.indexOf(pRepetida);
let ultima = frase.lastIndexOf(pRepetida);
alert("Primera posició " + primera + " Última posicio " + ultima);
*/

//Aqui le da igual como escribas la palabra
let frase = "Avui dia es un bon dia";
let pRepetida = "Dia";
let minusculas = pRepetida.toLowerCase();
let primera = frase.indexOf(minusculas);
let ultima = frase.lastIndexOf(minusculas);

//alert(minusculas);
alert("Primera posició " + primera + " Última posicio " + ultima);