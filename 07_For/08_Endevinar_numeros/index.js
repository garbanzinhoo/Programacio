"use strict";
/*
Millora el joc d'endevinar números amb les següents opcions:

El programa ha de preguntar entre quins números pot estar el número a encertar.
També ha de preguntar el màxim d'intents que pot fer l'usuari.
Quan l'encerti o s'acabin els intents, ha de preguntar si ho vol tornar a intentar.
Utilitza el bucle for per limitar el nombre d'intents.
*/

"use strict";

let numeros = "";
let nintents = 0;
let n1 = 0;
let n2 = 0;
let nrandom = 0;
let resposta = 0;
let seguirjugant = "";

do {
    // Demanem el rang de números i els intents màxims
    numeros = prompt("Entre quins numeros ha d'estar el numero? ");
    nintents = Number(prompt("En quants intents ho vols fer? "));

    // Guardem els dos límits del rang
    n1 = Number(numeros.split(" ")[0]);
    n2 = Number(numeros.split(" ")[1]);

    // Generem un número aleatori i reiniciem la resposta
    nrandom = Math.floor(Math.random() * (n2 - n1 + 1)) + n1;
    resposta = 0;

    // Repetim mentre quedin intents i no s'hagi encertat
    for (let i = 1; i <= nintents && resposta != nrandom; i++) {
        resposta = Number(prompt("Digues un numero entre " + n1 + " i " + n2));

        if (resposta === nrandom) {
            alert("Correcte! El número era el " + nrandom);
        } else if (resposta < nrandom) {
            alert("El número és més gran");
        } else {
            alert("El número és més petit");
        }
    }

    // Si s'han acabat els intents sense encertar, mostrem el número
    if (resposta != nrandom) {
        alert("Has esgotat els intents! El número era el " + nrandom);
    }

    // Preguntem si vol jugar una altra partida
    seguirjugant = prompt("Vols tornar a intentar-ho?").toLowerCase();

} while (seguirjugant == "si");

