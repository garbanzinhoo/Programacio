"use strict";

let numero = parseInt(prompt("Digues un numero: "));
let potencia = parseInt(prompt("Digues una potencia: "));
let resultat = 1;

for (let i = 1; i <= potencia; i++) {
    resultat *= numero; // Multiplica el resultado actual por el número
}

alert(resultat);