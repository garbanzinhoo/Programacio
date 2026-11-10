"use strict";

let preu_inicial = 1000;
const IVA = 0.21;

let preu_descompte = (preu_inicial - (preu_inicial * 0.15));
let preu_final = (preu_descompte + (preu_descompte * IVA));

alert(preu_final);