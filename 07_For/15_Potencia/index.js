"use strict";
//Calula la potencia sin Math.pow() o **

let numero = parseInt(prompt("Digues un numero: "))
let potencia = parseInt(prompt("Digues una potencia: "))
let resultat = 1;

for (let i = 0; i <= potencia; i++){
    resultat = numero * numero
}
alert(resultat)
