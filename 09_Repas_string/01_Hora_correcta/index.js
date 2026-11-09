"use strict";
/*
1 - Hora correcta
Fes un programa que comprovi si l'hora que hi ha en un string té el format correcte: HH:MM:SS

Opcionalment, els minuts hores i segons poden tenir un dígit o dos: 5:24:3

Opcionalment, poden faltar els segons: 20:5

Comprova també si les hores minuts i segons són correctes (positius entre 0 i 23 o entre 0 i 59).
Mostra la hora amb dos dígits per cada valor i separats per :.
Exemple de sortida per consola
5:24:3 --> 05:24:03
*/
let h = demanarText("Digues una hora minuts i segons");
let resultat = comprovaHores(h);

if (resultat == "") {
    console.log(h + " --> ERROR: hora incorrecta");
} else {
    console.log(h + " --> " + resultat);
}


//Declaracio funcions

// Retorna l'hora amb dos dígits per valor ("05:24:03"), o "" si no és correcta
function comprovaHores(valor) {
    let pos1 = valor.indexOf(":");        // posició del primer ":"
    let pos2 = valor.lastIndexOf(":");    // posició de l'últim ":"

    let hores = "";
    let minuts = "";
    let segons = "";

    //1. Separem les parts
    if (pos1 == pos2) {
        // Només hi ha un ":" (o cap) → no hi ha segons: "20:5"
        hores = valor.substring(0, pos1);
        minuts = valor.substring(pos1 + 1);
    } else {
        // Hi ha dos ":" → "15:30:45"
        hores = valor.substring(0, pos1);
        minuts = valor.substring(pos1 + 1, pos2);
        segons = valor.substring(pos2 + 1);
    }

    //2. Comprovem el format: 1 o 2 xifres a cada part (els segons poden faltar)
    if (!formatValid(hores) || !formatValid(minuts)) {
        return "";
    }
    if (segons != "" && !formatValid(segons)) {
        return "";
    }

    //3. Comprovem els rangs
    if (!estaEntre(Number(hores), 0, 23) || !estaEntre(Number(minuts), 0, 59)) {
        return "";
    }
    if (segons != "" && !estaEntre(Number(segons), 0, 59)) {
        return "";
    }

    //4. Muntem l'hora amb dos dígits per valor
    let hora = dosDigits(hores) + ":" + dosDigits(minuts);
    if (segons != "") {
        hora = hora + ":" + dosDigits(segons);
    }
    return hora;
}

// Retorna true si la part té 1 o 2 caràcters i tots són dígits
function formatValid(part) {
    if (part.length < 1 || part.length > 2) {
        return false;
    }
    for (let i = 0; i < part.length; i++) {
        if (!"0123456789".includes(part[i])) {
            return false;
        }
    }
    return true;
}

// Afegeix un 0 al davant si la part només té un dígit ("5" → "05")
function dosDigits(part) {
    if (part.length == 1) {
        return "0" + part;
    }
    return part;
}
