"use strict";
import { comprovaMenu, esNumero } from "../utils/validacions.js";
/*
Exercici 2. Caixer automàtic
Crea un programa que simuli el funcionament d'un caixer automàtic. El saldo inicial serà de 500 €.
*/
const MIN = 1;
const MAX = 4;
let saldo = 500;
menu_caixer_automatic();

//--------------------FUNCIONS--------------------
/**
 * Demana quantitats a ingressar fins que l'usuari escriu 0.
 * @param {number} saldo Saldo actual del compte
 * @returns {number} Nou saldo
 */
function ingressarDiners(saldo){
    let quantitatIngres = 0;
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
 * Demana quantitats a retirar fins que l'usuari escriu 0.
 * Només retira si el saldo cobreix la quantitat.
 * @param {number} saldo Saldo actual del compte
 * @returns {number} Nou saldo
 */
function retirarDiners(saldo){
    let quantitatRetirar = 0;
    do{
        quantitatRetirar = Number(prompt("Quant vols retirar? (0 per acabar)"));
        // Només sumem si la dada és un número major que 0
        if (esNumero(quantitatRetirar) && quantitatRetirar > 0){
            // Només restem si el saldo cobreix la quantitat
            if (validarSaldo(saldo, quantitatRetirar)){
                saldo -= quantitatRetirar;
            } else {
                alert("No tens prou saldo");
            }
        } else if (quantitatRetirar !== 0){
            // Si no és 0 i no és vàlida (negatiu o lletres), avisem
            alert("Introdueix una quantitat vàlida");
        }
    // Seguim preguntant mentre no escrigui 0
    }while(quantitatRetirar !== 0);
    return saldo;

}


/**
 * Calcula la comissió del 2% sobre una quantitat.
 * @param {number} retirada Quantitat que es vol retirar
 * @returns {number} Comissió del 2% sobre la quantitat
 */
function calcularComissio(retirada){
    let calculComissio = retirada * 2 / 100;
    return calculComissio;
}



/**
 * Demana quantitats a retirar fins que l'usuari escriu 0.
 * Resta la quantitat més la comissió del 2% si el saldo ho cobreix.
 * @param {number} saldo Saldo actual del compte
 * @returns {number} Nou saldo
 */
function retirarAmbComissio(saldo){
    let quantitatRetirar = 0;
    do{
        quantitatRetirar = Number(prompt("Quant vols retirar? (0 per acabar)"));
        // Només sumem si la dada és un número major que 0
        if (esNumero(quantitatRetirar) && quantitatRetirar > 0){
            let comissio = calcularComissio(quantitatRetirar);
            // Només restem si el saldo cobreix la quantitat més la comissió
            if (validarSaldo(saldo, quantitatRetirar + comissio)){
                saldo -= (quantitatRetirar + comissio);
                alert("La comissió és de " + comissio + "€");
            } else {
                alert("No tens prou saldo per retirar " + quantitatRetirar + "€ més la comissió de " + comissio + "€");
            }
        } else if (quantitatRetirar !== 0){
            // Si no és 0 i no és vàlida (negatiu o lletres), avisem
            alert("Introdueix una quantitat vàlida");
        }
    // Seguim preguntant mentre no escrigui 0
    }while(quantitatRetirar !== 0);
    return saldo;
}



function menu_caixer_automatic() {
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
                saldo = ingressarDiners(saldo);
                // Ara ja podem mostrar el saldo actualitzat
                alert("El teu saldo és " + saldo + " €");
                break;
            }
            case 2: {
                saldo = retirarDiners(saldo);
                alert("El teu saldo és " + saldo + " €");
                break;
            }
            case 3: {
                let quantitatRetirar = Number(prompt("Quant vols retirar?"));
                if (esNumero(quantitatRetirar) && quantitatRetirar > 0){
                    alert("La comissió és de " + calcularComissio(quantitatRetirar) + "€");
                } else {
                    alert("No has introduït bé la dada");
                }
                break;
            }
            case 4: {
                saldo = retirarAmbComissio(saldo);
                alert("El teu saldo és " + saldo + " €");
                break;
            }
        }
    } else {
        alert("Introdueix una dada vàlida");
    }
}


/**
 * Comprova si el saldo cobreix el que es vol retirar.
 * @param {number} saldo Saldo actual del compte
 * @param {number} total Diners necessaris (la quantitat, o la quantitat més la comissió)
 * @returns {boolean} true si hi ha prou saldo, false en cas contrari
 */
function validarSaldo(saldo, total){
    return saldo >= total;
}