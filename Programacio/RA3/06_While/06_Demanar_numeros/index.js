"use strict";

let numeros = Number(prompt("Digues un numero enter (0 per acabar)"));
let parells = 0;
let imparells = 0;
let sumaTotal = 0;

do {
    if (numeros % 2 == 0){ //Mirem si es parell
        parells++; //Sumem als parells
        sumaTotal = sumaTotal + numeros; //Fem la suma total
        numeros = Number(prompt("Digues un numero enter (0 per acabar)"));
    }else if (numeros % 2 !== 0){//Mirem si es imparell
        imparells++;//Sumem a imparells
        sumaTotal = sumaTotal + numeros;//Fem la suma total
        numeros = Number(prompt("Digues un numero enter (0 per acabar)"));
    }
}while (numeros != 0)

alert("Parells: " + parells + "\nImparells: " + imparells + "\nSuma Total: " + sumaTotal);
