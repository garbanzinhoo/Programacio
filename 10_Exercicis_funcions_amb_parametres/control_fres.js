"use strict"
/*
Exercici 1. Control de factures
Crea un programa que permeti calcular l'import final d'una factura aplicant-hi descomptes i impostos.
*/
//--------------------FUNCIONS--------------------
/**
 * 
 * @param {preu} 
 * @param {percentatge de descompte} 
 * @returns import del descompte
 */
function calcularDescompte(preu, descompte){
    return preu * descompte / 100;
}


/**
 * 
 * @param {preu} 
 * @param {descompte} 
 * @returns preu amb el descompte aplicat
 */
function aplicarDescompte(preu, descompte){
    return preu - calcularDescompte(preu, descompte);
}


/**
 * 
 * @param {preu} 
 * @param {} 
 * @returns el 21% d'aquest import
 */
function calcularIVA(preu){
    return preu * 21 /100;
}


/**
 * 
 * @param {preu inicial} 
 * @param {descompte} 
 * @returns total de la factura amb l'IVA inclòs
 */
export function calcularTotal(preu, descompte){
    let preuDescompte = aplicarDescompte(preu, descompte);
    let preuIva = calcularIVA(preuDescompte);
    let preufinal = "El preu final és de " + (preuDescompte + preuIva).toFixed(2) + "€"; // L'IVA s'aplica sobre el preu ja descomptat
    return(preufinal);
}
