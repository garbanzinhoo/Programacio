"use strict";

let temperatura = Number(prompt("Digues una temperatura (999 per acabar)"));
let negatiu = 0;
let positiu = 0;
let mitjana = 0;
let introduides = 0;

while (temperatura != 999){
    if (temperatura >= 0){
        positiu++;
        introduides++;
        mitjana = mitjana + temperatura
        temperatura = Number(prompt("Digues una temperatura (999 per acabar)"));
    }else if (temperatura < 0){
        negatiu++;
        introduides++;
        mitjana = mitjana + temperatura;
        temperatura = Number(prompt("Digues una temperatura (999 per acabar)"));
    }
}

mitjana = mitjana / introduides;

alert("Temperatures introduïdes: " + introduides +"\nTemperatures negatives: " + negatiu + "\nTemperatures positives o 0: " + positiu + "\nTemperatura mitjana: " + mitjana);