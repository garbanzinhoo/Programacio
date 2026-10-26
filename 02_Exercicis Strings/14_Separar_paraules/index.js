"use strict";

/*
7 - Separar paraules
Utilitza els mètodes indexOf(value) i substring(start, end) per separar la primera paraula de la resta d'una frase.

Opcionalment, separa totes les paraules i tingues en compte que pot haver-hi més d'un espai entre cada paraula i també al principi i al final de la frase.

Exemple de sortida per consola
Si la frase és Administració de sistemes informàtics en xarxa:

Administració
de
sistemes
informàtics
en
xarxa

Busquem primer on es un espai i agafaem el que surt fins que torni a trovar un espai
*/
let frase = prompt("Digues una frase:");
let resultat = "";
let inici = 0;

while (inici < frase.length) {
    if (frase.charAt(inici) == " ") {
        // Si és un espai (inici, final o espais repetits), la saltem
        inici++;
    } else {
        // Busquem el següent espai a partir d'on comença la paraula
        let fi = frase.indexOf(" ", inici);
        if (fi == -1) {
            // No hi ha més espais: la paraula arriba fins al final
            fi = frase.length;
        }
        resultat += frase.substring(inici, fi) + "\n";
        inici = fi;
    }
}

alert(resultat);