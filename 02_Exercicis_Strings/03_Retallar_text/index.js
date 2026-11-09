/*
Guarda en una variable les lletres entre la posició 10 (inclosa) i la 20 (no inclosa).
Guarda en una altra variable les lletres des de la posició 10 fins al final.
Mostra el contingut de les dues variables.
*/
"use strict";
const LLETRES = "TRWAGMYFPDXBNJZSQVHLCKE";

let lletres10a20 = LLETRES.substring(10,20)
let lletres10 = LLETRES.substring(10, LLETRES.length)
alert(lletres10a20)
alert(lletres10)