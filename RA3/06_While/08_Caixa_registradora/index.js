"use strict";
let preu = Number(prompt("Digues el preu (0 per acabar):"));
let productestotals = 0;
let mes20 = 0;
let menys20 = 0;
let preufinal = 0;

do {
    if (preu > 20){
        mes20++;
        productestotals++;
        preufinal += preu;
        preu = Number(prompt("Digues el preu (0 per acabar):"));
    }else {
        menys20++;
        productestotals++;
        preufinal += preu;
        preu = Number(prompt("Digues el preu (0 per acabar):"));

    }
}while (preu != 0)

alert("Productes: " + productestotals + 
    "\n Més de 20€: " + mes20 +
    "\n 20€ o menys: " + menys20 +
    "\n Total: " + preufinal.toFixed(2) + "€"
)