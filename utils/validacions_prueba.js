"use strict";

// Retorna true si un valor és null, undefined o text buit/només espais
function esBuit(valor){
    return(valor == null || String(valor).trim() == "");
}

// Retorna true si el valor és un número vàlid
export function esNumero(valor){
    return !esBuit(valor) && !isNaN(Number(valor));
}

// Retorna true si el valor és un número enter
function esEnter(valor){
    return esNumero(valor) && Number.isInteger(Number(valor));
}

// Retorna true si el número és major que 0
function esPositiu(valor){
    return esNumero(valor) && Number(valor) > 0;
}

// Retorna true si valor està entre min i max (inclosos)
function estaEntre(valor, min, max){
    return valor >= min && valor <= max;
}

//Retorna quin número es mes gran
function esMesGran(valor1, valor2){
    if (valor1 > valor2){
        return valor1 + " és més gran que " + valor2;
    } else if (valor1 < valor2){
        return valor2 + " és més gran que " + valor1;
    } else {
        return "Són iguals";
    }
}

export function comprovaMenu(opcio, min, max) {
    return esEnter(opcio) && estaEntre(opcio, min, max);
}
export function prova (){
    alert("Funciona")
}




//Funcion calculadora
//Funcion comparar simbols 
//Funcion invertirtexto
