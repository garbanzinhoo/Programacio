"use strict";

const LLETRES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
menu();

function menu() {
    let opcio = Number(
        prompt(
            "------MENU------" +
            "\n1. Comprovar quin numero es mes gran" +
            "\n2. Comprova si el valor esta entre dos valors" +
            "\n3. Comprova si el numero es positiu" +
            "\n4. Genera un caracter aleatori entre dos caracters" +
            "\n5. Introdueix un caracter (a, b o c)" +
            "\n6. Demana un numero enter" +
            "\n7. Demana un numero enter entre dos valors" +
            "\n8. Comprova si una hora es correcta" +
            "\n9. Crea emails"
        ),
    );

    if (comprovaMenu(opcio)) {
        switch (opcio) {
            case 1: {
                let valor1 = Number(prompt("Digues un numero"));
                let valor2 = Number(prompt("Digues un numero"));
                alert(esMesGran(valor1, valor2));
                break;
            }
            case 2: {
                let valor = Number(prompt("Digues un valor"));
                let min = Number(prompt("Digues el minim"));
                let max = Number(prompt("Digues el maxim"));
                alert(estaEntre(valor, min, max));
                break;
            }
            case 3: {
                let numero = Number(prompt("Digues un numero"));
                alert(esPositiu(numero));
                break;
            }
            case 4: {
                let inicial = prompt("Digues el caracter inicial:").toUpperCase();
                let final = prompt("Digues el caracter final:").toUpperCase();
                alert(caracterAleatori(inicial, final));
                break;
            }
            case 5: {
                let escollit = introduirCaracter("Escull una opció (a, b o c):", "abc");
                alert("Has escollit: " + escollit);
                break;
            }
            case 6:
                alert("Has introduït: " + demanarEnter("Digues un numero enter"));
                break;
            case 7: {
                let min = demanarEnter("Digues el minim");
                let max = demanarEnter("Digues el maxim");
                alert(
                    "Has introduït: " + demanarEnterEntre("Digues un numero", min, max),
                );
                break;
            }
            case 8: {
                let h = prompt("Digues una hora minuts i segons");
                let resultat = comprovaHores(h);
                if (resultat == "") {
                    alert(h + " --> ERROR: hora incorrecta");
                } else {
                    alert(h + " --> " + resultat);
                }
                break;
            }
            case 9: {
                let nom = prompt("Digues el teu nom");
                let cognom = prompt("Digues el teu cognom");
                let email = crearEmail(nom, cognom);
                if (email == "") {
                    alert("No has introduït bé les dades");
                } else {
                    alert(email);
                }
                break;
            }
        }
    } else {
        alert("Introdueix una dada vàlida");
    }
}

function comprovaMenu(opcio) {
    return esEnter(opcio) && estaEntre(opcio, 1, 9);
}

// Retorna un caràcter aleatori entre inicial i final (inclosos)
function caracterAleatori(inicial, final) {
    if (inicial > final) {
        let temporal = inicial;
        inicial = final;
        final = temporal;
    }
    let rang = LLETRES.substring(
        LLETRES.indexOf(inicial),
        LLETRES.indexOf(final) + 1,
    );
    let numero = Math.floor(Math.random() * rang.length);
    return rang.charAt(numero);
}

// Demana un caràcter fins que sigui un dels de opcionsValides
function introduirCaracter(pregunta, opcionsValides) {
    let caracter;
    do {
        caracter = prompt(pregunta);
    } while (
        caracter === null ||
        caracter.length !== 1 ||
        !opcionsValides.includes(caracter)
    );
    return caracter;
}

// Demana un número enter fins que l'usuari n'introdueixi un de vàlid
function demanarEnter(pregunta) {
    let text;
    let valid;
    do {
        text = prompt(pregunta);
        valid = esEnter(text);
        if (!valid) {
            alert("ERROR: has d'introduir un número enter.");
        }
    } while (!valid);
    return Number(text);
}

// Demana un número enter que estigui entre min i max (inclosos)
function demanarEnterEntre(pregunta, min, max) {
    if (min > max) {
        let auxiliar = min;
        min = max;
        max = auxiliar;
    }
    let numero = demanarEnter(pregunta + " (entre " + min + " i " + max + ")");
    while (!estaEntre(numero, min, max)) {
        alert("ERROR: el número ha d'estar entre " + min + " i " + max + ".");
        numero = demanarEnter(pregunta + " (entre " + min + " i " + max + ")");
    }
    return numero;
}

// Retorna l'hora amb dos dígits per valor ("05:24:03"), o "" si no és correcta
function comprovaHores(valor) {
    let pos1 = valor.indexOf(":");
    let pos2 = valor.lastIndexOf(":");

    let hores = "";
    let minuts = "";
    let segons = "";

    if (pos1 == pos2) {
        hores = valor.substring(0, pos1);
        minuts = valor.substring(pos1 + 1);
    } else {
        hores = valor.substring(0, pos1);
        minuts = valor.substring(pos1 + 1, pos2);
        segons = valor.substring(pos2 + 1);
    }

    if (!formatValid(hores) || !formatValid(minuts)) {
        return "";
    }
    if (segons != "" && !formatValid(segons)) {
        return "";
    }

    if (!estaEntre(Number(hores), 0, 23) || !estaEntre(Number(minuts), 0, 59)) {
        return "";
    }
    if (segons != "" && !estaEntre(Number(segons), 0, 59)) {
        return "";
    }

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

function crearEmail(nom, cognom) {
    if (
        nom === null ||
        cognom === null ||
        nom.trim() == "" ||
        cognom.trim() == "" ||
        !isNaN(Number(nom)) ||
        !isNaN(Number(cognom))
    ) {
        return "";
    }
    nom = nom.trim().toLowerCase();
    cognom = cognom.trim().toLowerCase();

    if (cognom.indexOf(" ") != -1) {
        cognom = cognom.substring(0, cognom.indexOf(" "));
    }
    return nom.charAt(0) + "." + cognom + "@sapalomera.cat";
}