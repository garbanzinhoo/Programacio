"use strict"
/*
Exercici 3. Gestió d'una reserva d'hotel
Crea un programa que calculi el preu d'una reserva d'hotel segons el nombre de nits, el tipus d'habitació i els serveis contractats.
Preus:
- Habitació estàndard: 60 € per nit.
- Habitació superior: 90 € per nit.
- Esmorzar: 12 € per persona i nit.
- Aparcament: 8 € per nit.
*/
import { esEnter, esPositiu } from "../utils/validacions.js";

const ESTANDARD = 60;
const SUPERIOR = 90;
const ESMORZAR = 12;
const APARCAMENT = 8;

let nits = prompt("Quantes nits?");
let persones = prompt("Quantes persones?");
let tipus = prompt("Quin tipus d'habitació? Estàndard o Superior");
let teAparcament = prompt("Vols aparcament?");

validarDadesIntroduides(nits, tipus, persones, teAparcament);


//--------------------FUNCIONS--------------------


function validarDadesIntroduides(nits, tipus, persones, teAparcament){
    // Bandera: si alguna dada és incorrecta, passa a false
    let correcte = true;

    if (!esEnter(nits) || !esPositiu(nits)){
        correcte = false;
    }
    if (!esEnter(persones) || !esPositiu(persones)){
        correcte = false;
    }
    if (tipus != "ESTANDARD" && tipus != "ESTÀNDARD" && tipus != "SUPERIOR"){
        correcte = false;
    }
    if (teAparcament != "si" && teAparcament != "sí" && teAparcament != "no"){
        correcte = false;
    }

    if (correcte){
        alert(calcularPreuFinal(Number(nits), tipus, Number(persones), teAparcament));
    }else{
        alert("Error: has introduït malament alguna dada");
    }
}


/**
 * 
 * @param {nits} 
 * @param {tipus} 
 * @returns preu de l'habitació segons el nombre de nits i el tipus d'habitació.
 */
function calcularPreuHabitacio(nits, tipus){



    
    let preu = 0;
    if (tipus == "ESTANDARD" || tipus == "ESTÀNDARD"){
        preu = nits * ESTANDARD;
    }else if (tipus == "SUPERIOR"){
        preu  = nits * SUPERIOR;
    }
    return preu;
}


/**
 * 
 * @param {persones} 
 * @param {nits} 
 * @returns cost total dels esmorzars
 */
function calcularPreuEsmorzar(persones, nits){
    let calcEsmorzars = (nits * persones) * ESMORZAR;
    return calcEsmorzars;

}


/**
 * 
 * @param {nits} 
 * @param {teAparcament} 
 * @returns cost de l'aparcament. Si no se'n contracta, retorna 0.
 */
function calcularPreuAparcament(nits, teAparcament){
    if (teAparcament == "no"){
        return 0;
    }else {
        let preuAparcament = nits * APARCAMENT;
        return preuAparcament;
    }
}


/**
 * 
 * @param {preu} 
 * @param {nits. si la reserva és de 7 nits o més, aplica un descompte del 10%.} 
 * @returns import del descompte
 */
function calcularDescompte(preu, nits){
    if (nits >= 7){
        let preuDescompte = preu * 10 / 100;
        return preuDescompte;
    }else{
        return 0;
    }

}

/**
 * 
 * @param {nits} 
 * @param {tipus}
 * @param {persones} 
 * @param {teAparcament}
 * @returns preu final de la reserva
 */
function calcularPreuFinal(nits, tipus, persones, teAparcament){
    let preuHabitacio = calcularPreuHabitacio(nits, tipus);
    let preuEsmorzar = calcularPreuEsmorzar(persones, nits);
    let preuAparcament = calcularPreuAparcament(nits, teAparcament);
    let preuSenseDescompte = preuHabitacio + preuEsmorzar + preuAparcament;
    let preuDescompte = calcularDescompte(preuSenseDescompte, nits);

    
    let preuFinal = preuSenseDescompte - preuDescompte;
    return "El preu final de la reserva és de: " + preuFinal +"€";
}