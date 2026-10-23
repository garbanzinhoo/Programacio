"use strict";
//crea un programa que pida un número entero no negativo N y calcule su factorial utilizando un bucle for.
let numero = parseInt(prompt("Digues un numero:"))
let resultat = 1;

for (let i = 1; i <= numero; i++){
    resultat = resultat * i;
}
alert(resultat)