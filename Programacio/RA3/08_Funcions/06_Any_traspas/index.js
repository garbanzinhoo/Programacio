"use strict";
/* 
2 - És any de traspàs
Crea les següents funcions:

Una funció que, passant-li l'any, retorni true o false depenent de si és any de traspàs o no.
A partir de l'any i del valor retornat, el programa ha de mostrar el missatge "L'any XXXX és any de traspàs" o  "L'any XXXX NO és any de traspàs".
*/
let traspas = Number(prompt("Digues un any"));
let resultat = esTraspas(traspas);

if (resultat == true){
    alert("L'any " + traspas + " és de traspàs");
}else {
    alert("L'any " + traspas + " no és de traspàs");
}


//Declarem la funció
export function esTraspas(valor){
    // Un any és de traspàs si és divisible entre 4 però no entre 100, o si és divisible entre 400
    if ((valor % 4 == 0 && valor % 100 != 0) || valor % 400 == 0) {
        return true
    } else {
        return false
    }
}

