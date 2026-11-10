"use strict";
const NUMERORANDOM = Math.floor(Math.random() * 100 + 1);
let numero;
let intents = 0;
do {
    numero = Number(prompt("Introdueix un numero entre 1 i 100 " + NUMERORANDOM)); //Esta el NUMERORANDOM per estalviar temps
    if (numero > NUMERORANDOM){
        alert("Es més petit")
        intents++;
    }else if (numero < NUMERORANDOM){
        alert("Es més gran")
        intents++;
    }else {
        alert("Correcte! El número era: " + NUMERORANDOM + 
            "L'has endevinat en " + (intents +1) + " intents" //intents +1 perque sino conta desde el 0 
        );
    }
}while (NUMERORANDOM != numero)