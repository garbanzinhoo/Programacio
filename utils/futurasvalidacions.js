"use strict";

/* =====================================================
   VALIDACIONS EXISTENTS (amb petites millores)
   ===================================================== */

// Retorna true si un valor és null, undefined o text buit/només espais
export function esBuit(valor){
    return (valor == null || String(valor).trim() == "");
}

// Retorna true si el valor és un número vàlid i finit
export function esNumero(valor){
    return !esBuit(valor) && Number.isFinite(Number(valor));
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
    return esNumero(valor) && Number(valor) >= min && Number(valor) <= max;
}

// Retorna quin número és més gran
export function esMesGran(valor1, valor2){
    if (valor1 > valor2){
        return valor1 + " és més gran que " + valor2;
    } else if (valor1 < valor2){
        return valor2 + " és més gran que " + valor1;
    } else {
        return "Són iguals";
    }
}

// Retorna true si l'opció és un enter entre min i max
export function comprovaMenu(opcio, min, max){
    return esEnter(opcio) && estaEntre(opcio, min, max);
}

// Calculadora: fa l'operació indicada (+, -, *, /, %) entre dos números
export function calculadora(num1, num2, operacio){
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
export function compararSimbols(valor1, valor2){
    if (valor1 > valor2){
        return ">";
    } else if (valor1 < valor2){
        return "<";
    } else {
        return "=";
    }
}

// Retorna el text invertit (ex: "hola" -> "aloh")
export function invertirText(text){
    let resultat = "";
    text = String(text);
    for (let i = text.length - 1; i >= 0; i--){
        resultat += text[i];
    }
    return resultat;
}

/* =====================================================
   NOVES VALIDACIONS: NÚMEROS
   ===================================================== */

// Retorna true si el número és major o igual que 0
export function esPositiuOZero(valor){
    return esNumero(valor) && Number(valor) >= 0;
}

// Retorna true si el valor és un enter major que 0
export function esEnterPositiu(valor){
    return esEnter(valor) && Number(valor) > 0;
}

// Retorna true si el valor és un percentatge (0-100)
export function esPercentatge(valor){
    return estaEntre(valor, 0, 100);
}

// Retorna true si el número té com a màxim "n" decimals (ex: diners amb 2)
export function esDecimalAmbMaxDecimals(valor, n){
    if (!esNumero(valor)){
        return false;
    }
    let text = String(valor).trim();
    let posPunt = text.indexOf(".");
    if (posPunt == -1){
        return true;
    }
    return text.length - posPunt - 1 <= n;
}

/* =====================================================
   NOVES VALIDACIONS: TEXT
   ===================================================== */

// Retorna true si és un sol caràcter i és una lletra
export function esLletra(c){
    return typeof c == "string" && c.length == 1 && /^[A-Za-zÀ-ÿ]$/.test(c);
}

// Retorna true si el text només té lletres i espais (sense números)
export function nomesLletres(text){
    return !esBuit(text) && /^[A-Za-zÀ-ÿ\s]+$/.test(text);
}

// Retorna true si el text té format d'email (text@domini.extensio, sense espais)
export function esEmail(text){
    if (esBuit(text)){
        return false;
    }
    text = String(text);
    if (text.includes(" ")){
        return false;
    }
    let posArrova = text.indexOf("@");
    if (posArrova < 1 || posArrova != text.lastIndexOf("@")){
        return false;
    }
    let domini = text.substring(posArrova + 1);
    let posPunt = domini.lastIndexOf(".");
    return posPunt > 0 && posPunt < domini.length - 1;
}

// Retorna true si la longitud del text està entre min i max (inclosos)
export function longitudEntre(text, min, max){
    if (text == null){
        return false;
    }
    let longitud = String(text).length;
    return longitud >= min && longitud <= max;
}

// Retorna true si la contrasenya té mínim de longitud, majúscula, minúscula i número
export function esContrasenyaFort(text, minLongitud = 8){
    if (esBuit(text)){
        return false;
    }
    text = String(text);
    return text.length >= minLongitud
        && /[A-Z]/.test(text)
        && /[a-z]/.test(text)
        && /[0-9]/.test(text);
}

/* =====================================================
   NOVES VALIDACIONS: DATES I HORES
   ===================================================== */

// Retorna true si l'any és un enter positiu
export function esAnyValid(any){
    return esEnterPositiu(any);
}

// Retorna true si el mes és un enter entre 1 i 12
export function esMesValid(mes){
    return esEnter(mes) && estaEntre(mes, 1, 12);
}

// Retorna true si l'any és de traspàs
export function esTraspas(any){
    any = Number(any);
    return (any % 4 == 0 && any % 100 != 0) || any % 400 == 0;
}

// Retorna quants dies té un mes d'un any concret
export function diesDelMes(mes, any){
    mes = Number(mes);
    if (mes == 2){
        return esTraspas(any) ? 29 : 28;
    }
    if (mes == 4 || mes == 6 || mes == 9 || mes == 11){
        return 30;
    }
    return 31;
}

// Retorna true si el dia existeix en aquell mes i any
export function esDiaValid(dia, mes, any){
    return esEnter(dia) && esMesValid(mes) && esAnyValid(any)
        && estaEntre(dia, 1, diesDelMes(mes, any));
}

// Retorna true si el número és un dia de la setmana (1-7)
export function esDiaSetmana(n){
    return esEnter(n) && estaEntre(n, 1, 7);
}

// Retorna true si el text té format HH:MM amb hores 0-23 i minuts 0-59
export function esHoraValida(text){
    if (esBuit(text)){
        return false;
    }
    let parts = String(text).trim().split(":");
    if (parts.length != 2){
        return false;
    }
    let hores = parts[0];
    let minuts = parts[1];
    if (hores.length < 1 || hores.length > 2 || minuts.length != 2){
        return false;
    }
    return /^[0-9]+$/.test(hores) && /^[0-9]+$/.test(minuts)
        && estaEntre(hores, 0, 23) && estaEntre(minuts, 0, 59);
}

/* =====================================================
   NOVES VALIDACIONS: ENTRADA PER PROMPT
   ===================================================== */

// Retorna true si l'usuari ha cancel·lat el prompt (retorna null)
export function cancelat(valor){
    return valor === null;
}

// Retorna true si el valor és dins la llista d'opcions permeses
export function esOpcioValida(valor, llista){
    return llista.includes(valor);
}

// Demana un valor amb prompt fins que el validador l'accepti.
// Retorna el text introduït, o null si l'usuari cancel·la.
// Exemple: demanarValor("Edat:", esEnterPositiu)
export function demanarValor(missatge, validador){
    let valor;
    do {
        valor = prompt(missatge);
        if (cancelat(valor)){
            return null;
        }
    } while (!validador(valor));
    return valor;
}

// Demana un número vàlid (opcionalment amb validador propi). Retorna Number o null.
// Exemple: demanarNumero("Preu:", esPositiu)
export function demanarNumero(missatge, validador = esNumero){
    let valor = demanarValor(missatge, validador);
    return valor === null ? null : Number(valor);
}
