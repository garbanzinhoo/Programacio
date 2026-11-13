"use strict";

let numeros = Number(prompt("Digues un numero:"));

for (let i = 0; i < 5; i++){
    if (numeros >= 0){
        alert("El " + numeros + " és positiu");
        numeros = Number(prompt("Digues un numero:"));
    }else {
        alert("El " + numeros + " es negatiu");
        numeros = Number(prompt("Digues un numero:"));
    }
}