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

//Posem com const els preus ja que son fixes
const ESTANDARD = 60;
const SUPERIOR = 90;
const ESMORZAR = 12;
const APARCAMENT = 8;

//--------------------FUNCIONS--------------------


export function validarDadesIntroduides(nits, tipus, persones, teAparcament){
    // Normalitzem el text perquè no importi com l'escrigui l'usuari
    // (String() evita errors si prompt retorna null en prémer Cancel·lar)
    tipus = String(tipus).trim().toUpperCase();
    teAparcament = String(teAparcament).trim().toLowerCase();

    // Bandera: si alguna dada és incorrecta, passa a false
    let correcte = true;

    if (!esEnter(nits) || !esPositiu(nits)){ //si no és enter o no es positiu 
        correcte = false;
    }
    if (!esEnter(persones) || !esPositiu(persones)){ //si no és enter o no es positiu 
        correcte = false;
    }
    if (tipus != "ESTANDARD" && tipus != "ESTÀNDARD" && tipus != "SUPERIOR"){ //per saber si el prompt per el tipus no es correcte 
        correcte = false;
    }
    if (teAparcament != "si" && teAparcament != "sí" && teAparcament != "no"){ //per saber si el prompt per el aparcament no es correcte
        correcte = false;
    }

    if (correcte){
        alert(calcularPreuFinal(Number(nits), tipus, Number(persones), teAparcament)); //si tot es correcte i la bandera continua en true s'executa tot el programa
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
    let preu = 0; //inicialitzem aqui per calcular el preu per habitació
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
    if (teAparcament == "no"){ //If per separar si en té aparcament o no. En cas de que si fem el calcul i retornem el resultat
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
    if (nits >= 7){ //If per separar i saber si son 7 o més nits. En cas de que siguin 7 o més fa el càlcul
        let preuDescompte = preu * 10 / 100;
        return preuDescompte;
    }else{
        return 0; //si no té aparcament, el cost és 0 i no s'afegeix res al total
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
     //Sumem cada preu
    let preuHabitacio = calcularPreuHabitacio(nits, tipus);
    let preuEsmorzar = calcularPreuEsmorzar(persones, nits);
    let preuAparcament = calcularPreuAparcament(nits, teAparcament);

    //Sumem tot i fem el descompte
    let preuSenseDescompte = preuHabitacio + preuEsmorzar + preuAparcament;
    //El descompte és calcula sobre el total (0 si són menys de 7 nits)
    let preuDescompte = calcularDescompte(preuSenseDescompte, nits);

    //Restem el descompte al total i retornem el missatge final
    let preuFinal = preuSenseDescompte - preuDescompte;
    return "El preu final de la reserva és de: " + preuFinal.toFixed(2) +"€";
}
