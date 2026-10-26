"use strict";

/*
5 - Detectar caràcters especials
Utilitza el mètode includes(value) per detectar si un string conté algun dels caràcters @, # o €.
Si no detecta correctament algun d’aquests caràcters, pots utilitzar altres similars ($, &, %...).

Opcionalment, indica quins conté concretament.
*/

let prova = prompt("Digues una paraula");
let resultat = "";

if (prova.includes("@") || prova.includes("#") || prova.includes("€")){
  alert(prova + " conté un caracter especial")
}else{
    alert("És correcte")
}
