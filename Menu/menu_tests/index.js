"use strict";

// Funcions disponibles, per al nom que indica data-funcio a l'HTML
const FUNCIONS = {
    alReves, posicioEspaisBlanc, acronims, substituirEspais, caractersEspecials,
    quinaParaulaVaPrimer, separarParaules, email, paraulesPentavocaliques, majusculesOMinuscules
};

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".opcio").forEach(function (boto) {
        boto.addEventListener("click", function () { triarOpcio(boto); });
    });
    document.querySelectorAll(".formulari").forEach(function (formulari) {
        formulari.addEventListener("submit", executar);
    });
});

// Mostra només el formulari de l'opció triada
function triarOpcio(boto){
    document.querySelectorAll(".opcio").forEach(function (b) {
        b.classList.toggle("activa", b === boto);
    });
    document.querySelectorAll(".formulari").forEach(function (f) {
        f.hidden = f.dataset.funcio !== boto.dataset.funcio;
    });
    document.getElementById("resultat").classList.remove("visible");

    const PRIMER = document.querySelector('.formulari:not([hidden]) input');
    if (PRIMER) PRIMER.focus();
}

// Llegeix els camps del formulari, crida la funció i mostra el que retorna
function executar(event){
    event.preventDefault();
    const FORMULARI = event.currentTarget;
    const VALORS = Array.from(FORMULARI.querySelectorAll("input")).map(function (input) {
        return input.value;
    });
    mostrar(FUNCIONS[FORMULARI.dataset.funcio](...VALORS));
}

//Mostra el resultat a la pàgina
function mostrar(text){
    const PANELL = document.getElementById("resultat");
    PANELL.textContent = text;
    PANELL.classList.add("visible");
}

//Declarem les funcions
function alReves(FRASE){
    let resultat = "";

    for(let i = 0; i < FRASE.length; i++){
        resultat += FRASE.charAt(FRASE.length - 1 - i);
    }
    return resultat;
}

function posicioEspaisBlanc(FRASE){
    let espai = " ";
    let resultat = "";

    for (let i = 0; i <= FRASE.length; i++){
        if (FRASE.charAt(i) == espai){
            resultat += i + " ";
        }
    }
    return resultat;
}

function acronims(FRASE){
    let acronim = "";
    for (let i = 0; i <= FRASE.length; i++){
        let mayus = FRASE.charAt(i);
        if (mayus == mayus.toUpperCase() && mayus != mayus.toLowerCase()){ //Compara que la original sigui igual que la que modifiques
            acronim += mayus;
        }
    }
    return acronim;
}

function substituirEspais(FRASE){
    let resultat = "";

    for (let i = 0; i < FRASE.length; i++){
        if (FRASE.charAt(i) == " "){
            resultat += "|";
        }else{
            resultat += FRASE.charAt(i);
        }
    }

    return resultat;
}

function caractersEspecials(prova){
    if (prova.includes("@") || prova.includes("#") || prova.includes("€")){
        return prova + " conté un caracter especial";
    }else{
        return "És correcte";
    }
}

function quinaParaulaVaPrimer(paraula1, paraula2){
    let resultat = "";

    // Ordre alfabètic
    if (paraula1.localeCompare(paraula2) < 0) {
        resultat += paraula1 + " va abans que " + paraula2;
    } else if (paraula1.localeCompare(paraula2) > 0) {
        resultat += paraula2 + " va abans que " + paraula1;
    } else {
        resultat += paraula1 + " i " + paraula2 + " són la mateixa paraula";
    }

    // Longitud
    if (paraula1.length > paraula2.length) {
        resultat += "\n" + paraula1 + " és més llarga que " + paraula2;
    } else if (paraula2.length > paraula1.length) {
        resultat += "\n" + paraula2 + " és més llarga que " + paraula1;
    } else {
        resultat += "\n" + paraula1 + " i " + paraula2 + " tenen la mateixa mida";
    }

    return resultat;
}

function separarParaules(frase){
    let resultat = "";
    let inici = 0;

    while (inici < frase.length) {
        if (frase.charAt(inici) == " ") {
            // Si és un espai (inici, final o espais repetits), la saltem
            inici++;
        } else {
            // Busquem el següent espai a partir d'on comença la paraula
            let fi = frase.indexOf(" ", inici);
            if (fi == -1) {
                // No hi ha més espais: la paraula arriba fins al final
                fi = frase.length;
            }
            resultat += frase.substring(inici, fi) + "\n";
            inici = fi;
        }
    }

    return resultat;
}

function email(nom, cognom){
    if (nom === null || cognom === null || nom.trim() == "" || cognom.trim() == "" || !isNaN(Number(nom)) || !isNaN(Number(cognom))) {
        return "No has introduït bé les dades";
    } else {
        nom = nom.trim().toLowerCase();
        cognom = cognom.trim().toLowerCase();

        if (cognom.indexOf(" ") != -1) {
            cognom = cognom.substring(0, cognom.indexOf(" "));
        }

        return nom.charAt(0) + "." + cognom + "@sapalomera.cat";
    }
}

function paraulesPentavocaliques(paraula){
    let vocalsfalten = "";
    let vocals = "aeiou";
    paraula = paraula.toUpperCase().trim();
    if (paraula.includes("A") && paraula.includes("E") && paraula.includes("I") && paraula.includes("O") && paraula.includes("U")){
        return paraula + ": conté totes les vocals";
    }else{
        for (let i = 0; i < vocals.length; i++) { //revisa quines vocals falten
            if (!paraula.toLowerCase().includes(vocals.charAt(i))) {
                vocalsfalten += vocals.charAt(i);
            }
        }
        return paraula + ": li falten les vocals " + vocalsfalten.toUpperCase();
    }
}

function majusculesOMinuscules(frase){
    if (frase == frase.toUpperCase() && frase != frase.toLowerCase()){
        return frase + ": està tot en majúscules";
    } else if (frase == frase.toLowerCase() && frase != frase.toUpperCase()){
        return frase + ": està tot en minúscules";
    } else if (frase == frase.toUpperCase()){
        return frase + ": no té cap lletra";
    } else {
        return frase + ": barreja majúscules i minúscules";
    }
}
