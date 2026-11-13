"use strict";
//Suma tots els numeros parells de l'1 al numero
let numero = Number(prompt("Digues un numero"))
let resultat = 0;

for (let i = 0; i <= numero; i++){
    if (i % 2 == 0 ){
        resultat += i;
    }
}
alert(resultat);