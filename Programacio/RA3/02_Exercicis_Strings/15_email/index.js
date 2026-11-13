"use strict";

/*
8 - Adreça de correu
Fes un programa que, demanant el nom i primer cognom d'un alumne, generi la seva adreça de correu.
Fes les comprovacions que creguis necessàries.

Exemple de sortida per consola
Escriu el teu nom: Pere
Escriu el teu primer cognom:
Només has posat el nom
Escriu el teu nom: Pere
Escriu el teu primer cognom: Pi Zarra
p.pi@sapalomera.cat
*/
let nom = prompt("Digues el teu nom");
let cognom = prompt("Digues el teu cognom");

if (nom === null || cognom === null || nom.trim() == "" || cognom.trim() == "" || !isNaN(Number(nom)) || !isNaN(Number(cognom))) {
    alert("No has introduït bé les dades");
} else {
    nom = nom.trim().toLowerCase();
    cognom = cognom.trim().toLowerCase();

    if (cognom.indexOf(" ") != -1) {
        cognom = cognom.substring(0, cognom.indexOf(" "));
    }

    alert(nom.charAt(0) + "." + cognom + "@sapalomera.cat");
}