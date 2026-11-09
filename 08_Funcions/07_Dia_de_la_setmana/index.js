"use strict";
/* 
3 - Dia de la setmana
Crea les següents funcions:

Una funció que, passant-li un número entre 1 i 7, retorni el nom del dia de la setmana o el missatge "El dia ha d’estar entre 1 i 7".
A partir del valor retornat, el programa ha de mostrar el dia de la setmana o el missatge d'error.
*/

let num = Number(prompt("Digues un numero"));
setmana(num)
function setmana (numero){
    switch (numero) {
        case 1:
            alert("Dilluns");
            break;
        case 2: 
            alert("Dimarts");
            break;
        case 3:
            alert("Dimecres");
            break;
        case 4:
            alert("Dijous");
            break;
        case 5:
            alert("Divendres");
            break;
        case 6:
            alert("Dissabte");
            break;
        case 7:
            alert("Diumenge");
            break;
    }
}