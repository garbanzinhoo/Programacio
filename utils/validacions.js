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
export function esEnter(valor){
    return esNumero(valor) && Number.isInteger(Number(valor));
}

// Retorna true si el número és major que 0
export function esPositiu(valor){
    return esNumero(valor) && Number(valor) > 0;
}

// Retorna true si valor està entre min i max (inclosos)
export function estaEntre(valor, min, max){
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

// Calculadora: fa l'operació indicada (+, -, *, /, %) entre dos números
function calculadora(num1, num2, operacio){
    if (!esNumero(num1) || !esNumero(num2)){
        return "Error: cal introduir números vàlids";
    }
    num1 = Number(num1);
    num2 = Number(num2);

    let resultat;

    switch (operacio){
        case "+":
            resultat = num1 + num2;
            break;
        case "-":
            resultat = num1 - num2;
            break;
        case "*":
            resultat = num1 * num2;
            break;
        case "/":
            if (num2 == 0){
                resultat = "Error: no es pot dividir entre 0";
            } else {
                resultat = num1 / num2;
            }
            break;
        case "%":
            if (num2 == 0){
                resultat = "Error: no es pot dividir entre 0";
            } else {
                resultat = num1 % num2;
            }
            break;
        default:
            resultat = "Error: operació no vàlida";
            break;
    }

    return resultat;
}

// Compara dos valors i retorna el símbol corresponent: ">", "<" o "="
function compararSimbols(valor1, valor2){
    if (valor1 > valor2){
        return ">";
    } else if (valor1 < valor2){
        return "<";
    } else {
        return "=";
    }
}

// Retorna el text invertit (ex: "hola" -> "aloh")
function invertirText(text){
    let resultat = "";
    text = String(text);
    for (let i = text.length - 1; i >= 0; i--){
        resultat += text[i];
    }
    return resultat;
}