"use strict";
/*
8 - Gràfics de barres
Utilitza bucles for per dibuixar amb diferents símbols un gràfic de barres amb 3 valors.

El gràfic s'ha de dibuixar en horitzontal i les barres han de tenir amplada 2.

Opcional: intenta fer el gràfic en vertical i amb una amplada de 5 per cada barra.
Primer pots provar a fer-ho invertit (les barres cap avall) i després amb les barres cap amunt.
*/

let numeros =prompt("Valors: (separa amb comes)");
let n1 = 0;
let n2 = 0;
let n3 = 0;
n1 = Number(numeros.split(",")[0]);
n2 = Number(numeros.split(",")[1]);
n3 = Number(numeros.split(",")[2]);
let resultat = "";
let nsimbols = 0;
let simbols = "*,ª,$";
let simbolsortida = "";

// Bucle exterior fa una volta per cada barra
for (let x = 0; x < 3 ; x++){
    // Triem la longitud i el simbol segons la barra en que estem
    if (x == 0){
        nsimbols = n1
        simbolsortida = simbols.split(",")[0];
    }else if (x == 1){
        nsimbols = n2
        simbolsortida = simbols.split(",")[1];
    }else {
        nsimbols = n3
        simbolsortida = simbols.split(",")[2];
    }

    // Bucle de files
    for (let j = 1; j<=2; j++){
        // Bucle de simbols
        for (let i = 1; i <= nsimbols; i++){
            resultat += simbolsortida;
        }
        // Acabem la fila i passem a la següent linia
        resultat += "\n";
    }
}

alert(resultat)
