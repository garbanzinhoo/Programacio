"use strict";

/*
Escriu un programa que inventi 20 números enters aleatoris entre 1 i 100 i que guardi 10 en un array i 10 en un altre. Mostra les dues llistes.

Després ha de mostrar el resultat de multiplicar els números de cada llista un per un.

Opcionalment pots fer que sumi cada número d’una llista amb tots els de l’altra llista.
*/
//Fem una constant per agafar els dos arrays que retornem a nRandoms()
//Despres asignem a PRIMER el primer array y a SEGON el segon array
const NUMEROS = nRandoms();
const PRIMER = NUMEROS[0];
const SEGON = NUMEROS[1];
calcul(PRIMER, SEGON);

function nRandoms (){
    const PRIMER =  [];
    const SEGON = [];

    for (let i = 0; i < 20; i++){
        let aleatoris = Math.floor(Math.random() * 100) + 1; //Guardem el numero aleatori en la variable
        if (i < 10){ //Mentre i sigui menor a 10 que escrigui al primer array, sino al segon
            PRIMER.push(aleatoris)
        }else{
            SEGON.push(aleatoris)
        }
    }
    return [PRIMER, SEGON]; //Tornem els dos arrays
}

function calcul (primer, segon){
    const FINAL = [];
    for (let i = 0; i < primer.length; i++){
        FINAL.push(primer[i] * segon[i])
    }
    alert(primer + "\n" + segon + "\n\n" + FINAL)
}