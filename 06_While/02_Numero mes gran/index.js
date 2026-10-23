"use strict";
let numero = Number(prompt("Introdueix un numero positiu (0 per acabar)"));
let numerogran = numero; //Posem el numero dins la variable per poder comparar desde el principi
let numeropetit = numero;

while (numero != 0) {
    //Va comparant i guarda el numero mes gran tota l'estona
    if (numero > numerogran) {
        numerogran = numero;
    }
    //Aqui el mateix pero amb el numero mes petit
    if (numero < numeropetit) {
        numeropetit = numero;
    }

    numero = Number(prompt("Introdueix un numero positiu (0 per acabar)"));
}
alert("El numero mes gran és " + numerogran +
    "\nEl numero mes petit és " + numeropetit);