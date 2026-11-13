"use strict";

/*
3 - Primers números parells
Escriu un programa que inventi 1000 números enters aleatoris entre 100 i 10000 i els guardi dins d'un array.

Després ha de mostrar només els 10 primers números que siguin parells.
*/
const MIN = 100;
const MAX = 10000;
let numerosRandom = numerosAleatoris();
parells(numerosRandom);


function numerosAleatoris (){
    const NUMEROS = [];
    for (let i = 0; i < 1000; i++) {
        NUMEROS.push(Math.floor(Math.random() * 9901) + 100);
    }
    return NUMEROS;
}

function parells (valor){
    const PARELLS = [];
    //Recorrem l'array mirant que sigui parell i 
    //va mirant que l'array PARELLS no arribi a 10, si arriba "trenca" el bucle
    for (let i = 0; i < valor.length && PARELLS.length < 10; i++){
        if (valor[i] % 2 == 0){
            PARELLS.push(valor[i]);
        }
    }
    alert(PARELLS);
}
