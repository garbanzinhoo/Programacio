"use strict"
import { comprovaMenu, esNumero } from "../utils/validacions_prueba.js";
/*
Exercici 2. Caixer automàtic
Crea un programa que simuli el funcionament d'un caixer automàtic. El saldo inicial serà de 500 €.
*/
const MIN = 1;
const MAX = 4;
let saldo = 500;
let quantitatIngres = 0;
menu();

//--------------------FUNCIONS--------------------
/**
 * Demana quantitats a ingressar fins que l'usuari escriu 0.
 * @param {number} saldo Saldo actual del compte
 * @param {number} quantitatIngres Quantitat que es vol ingressar
 * @returns {number} Nou saldo
 */
function ingressarDiners(saldo, quantitatIngres){
    do{
        quantitatIngres = Number(prompt("Quant vols ingressar? (0 per acabar)"));
        // Només sumem si la dada és un número major que 0
        if (esNumero(quantitatIngres) && quantitatIngres > 0){
            saldo += quantitatIngres;
        } else if (quantitatIngres !== 0){
            // Si no és 0 i no és vàlida (negatiu o lletres), avisem
            alert("Introdueix una quantitat vàlida");
        }
    // Seguim preguntant mentre no escrigui 0
    }while (quantitatIngres !== 0);
    return saldo;
}


/**
 * 
 * @param {saldo actual} 
 * @param {quantitat que es vol retirar} 
 * @returns Si hi ha prou diners i la quantitat és vàlida, retorna el nou saldo. En cas contrari, retorna el saldo original.
 */

function retirarDiners(){


}


/**
 * 
 * @param {quantitat} 
 * @param {} 
 * @returns retorna una comissió del 2% sobre la quantitat retirada
 */

function calcularComissio(){

}



/**
 * 
 * @param {saldo} 
 * @param {quantitat} 
 * @returns saldo actualitzat
 */

function retirarAmbComissio(){


}



function menu() {
    let opcio = Number(
        prompt(
            "------MENU------" +
            "\n1. Ingressar diners" +
            "\n2. Retirar diners" +
            "\n3. Calcular comissio" +
            "\n4. Retirar amb comissio"
        ),
    );

    if (comprovaMenu(opcio, MIN, MAX)) {
        switch (opcio) {
            case 1: {
                // Guardem el valor que retorna la funció a la variable global
                saldo = ingressarDiners(saldo, quantitatIngres);
                // Ara ja podem mostrar el saldo actualitzat
                alert("El teu saldo és " + saldo + " €");
                break;
            }
            case 2: {
                // ...
                break;
            }
            case 3: {
                // ...
                break;
            }
            case 4: {

                break;
            }
        }
    } else {
        alert("Introdueix una dada vàlida");
    }
}
