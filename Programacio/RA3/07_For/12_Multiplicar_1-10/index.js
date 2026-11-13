"use strict";
let resultat = "";
//Fem un bucle per cada fila
for (let i = 1; i <= 10; i++){
    for (let j = 1; j <= 10; j++){ //Bucle per cada columna de la fila
        resultat += i*j + " "; //Calculem la fila i per la columna j, i afegim un espai per separar la següent cel·la
    }
    resultat += "\n"

}
alert(resultat)