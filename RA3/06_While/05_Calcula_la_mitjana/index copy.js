"use strict";

//Preguntem el primer número abans del bucle
let numero = Number(prompt("Digues un numero entre 1 i 10 (0 per acabar)"));
let notes = 0;
let nnotes = 0;
let suspensos = 0;

//Fem while perquè ja hem preguntat: primer comprovem i després processem
while (numero != 0) {
    //Només els suspesos tenen una línia pròpia
    if (numero < 5) {
        suspensos++;
    }
    //Això es fa sempre, sigui suspens o aprovat
    notes = notes + numero;
    nnotes++;
    numero = Number(prompt("Digues un numero entre 1 i 10 (0 per acabar)"));
}

//Evitem dividir entre 0 si l'usuari posa 0 de bon començament
if (nnotes > 0) {
    let mitjana = notes / nnotes;
    alert("Suspensos: " + suspensos);
    alert("Mitjana: " + mitjana);
} else {
    alert("No s'ha introduït cap nota.");
}