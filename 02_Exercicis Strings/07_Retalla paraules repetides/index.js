/*
A partir de l'exercici anterior, retalla tot el text que hi ha entre la primera i l'última paraula repetida.
Totes dues paraules han d'aparèixer en el text retallat.
Per exemple, si el text és "Quan plou, plou tant que sembla que plourà tot el dia", el text retallar hauria de ser "plou, plou tant que sembla que plou".

OPCIONAL: fes el mateix però que no s'inclogui ni la primera ni l'última paraula repetida.
En aquest cas, el resultat hauria de ser ", plou tant que sembla que ".
*/

"use strict";

const FRASE = "Quan plou, plou tant que sembla que plourà tot el dia";
let paraula = "plou";                                    // paraula repetida dins la FRASE

let primera = FRASE.indexOf(paraula);                    // posició de la 1a aparició
let ultima = FRASE.lastIndexOf(paraula);                 // posició de l'última aparició

let retallat = FRASE.substring(primera, ultima + paraula.length);
// substring des de la 1a aparició fins al final de l'última (per això se li suma la longitud)
alert(retallat);

// OPCIONAL: sense incloure la primera ni l'última paraula
let retallatOpcional = FRASE.substring(primera + paraula.length, ultima);
// comença just DESPRÉS de la 1a paraula i acaba just ABANS de l'última
alert(retallatOpcional);