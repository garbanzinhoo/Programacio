"use strict";
menu();

function menu(){
    let opcio = Number(prompt("------MENU------" +
        "\n1. Al reves" +
        "\n2. Posicio espais en blanc" +
        "\n3. Acronims" +
        "\n4. Substituir espais" +
        "\n5. Caracters especials" +
        "\n6. Quina paraula va primer" +
        "\n7. Separar paraules" +
        "\n8. Email" +
        "\n9. Paraules pentavocaliques" +
        "\n10. Majuscules o minuscules"));
    switch (opcio) {
        case 1:
            alReves();
            break;
        case 2:
            posicioEspaisBlanc();
            break;
        case 3:
            acronims();
            break;
        case 4:
            substituirEspais();
            break;
        case 5:
            caractersEspecials();
            break;
        case 6:
            quinaParaulaVaPrimer();
            break;
        case 7:
            separarParaules();
            break;
        case 8:
            email();
            break;
        case 9:
            paraulesPentavocaliques();
            break;
        case 10:
            majusculesOMinuscules();
            break;
        default:
            alert("Opció no vàlida");
    }
}


//Declarem les funcions
function alReves(){
    const FRASE = "rotia";
    let resultat = "";

    for(let i = 0; i < FRASE.length; i++){
        resultat += FRASE.charAt(FRASE.length - 1 - i);
    }
    alert(resultat);
}

function posicioEspaisBlanc(){
    const FRASE = "Hola Aitor com estas";
    let espai = " ";
    let resultat = "";

    for (let i = 0; i <= FRASE.length; i++){
        if (FRASE.charAt(i) == espai){
            resultat += i + " ";
        }
    }
    alert(resultat);
}

function acronims(){
    let FRASE = prompt("Digues una frase per fer l'acronim");
    let acronim = "";
    for (let i = 0; i <= FRASE.length; i++){
        let mayus = FRASE.charAt(i);
        if (mayus == mayus.toUpperCase() && mayus != mayus.toLowerCase()){ //Compara que la original sigui igual que la que modifiques
            acronim += mayus;
        }
    }
    alert(acronim);
}

function substituirEspais(){
    const FRASE = "Hi havia una vegada";
    let resultat = "";

    for (let i = 0; i < FRASE.length; i++){
        if (FRASE.charAt(i) == " "){
            resultat += "|";
        }else{
            resultat += FRASE.charAt(i);
        }
    }

    alert(resultat);
}

function caractersEspecials(){
    let prova = prompt("Digues una paraula");
    let resultat = "";

    if (prova.includes("@") || prova.includes("#") || prova.includes("€")){
        alert(prova + " conté un caracter especial");
    }else{
        alert("És correcte");
    }
}

function quinaParaulaVaPrimer(){
    let paraula1 = prompt("Digues una paraula");
    let paraula2 = prompt("Digues una altra paraula");

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

    alert(resultat);
}

function separarparaules(){
    let frase = prompt("Digues una frase:");
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

    alert(resultat);
}

function email(){
    let nom = prompt("Digues el teu nom");
    let cognom = prompt("Digues el teu cognom");

    if (nom === null || cognom === null || nom.trim() == "" || cognom.trim() == "" || !isNaN(Number(nom)) || !isNaN(Number(cognom))) {
        alert("No has introduït bé les dades");
    } else {
        nom = nom.trim().toLowerCase();
        cognom = cognom.trim().toLowerCase();

        if (cognom.indexOf(" ") != -1) {
            cognom = cognom.substring(0, cognom.indexOf(" "));
        }

        alert(nom.charAt(0) + "." + cognom + "@sapalomera.cat");
    }
}

function paraulesPentavocaliques(){
    let paraula = prompt("Digues una paraula");
    let vocalsfalten = "";
    let vocals = "aeiou";
    paraula = paraula.toUpperCase().trim();
    if (paraula.includes("A") && paraula.includes("E") && paraula.includes("I") && paraula.includes("O") && paraula.includes("U")){
        alert(paraula + ": conté totes les vocals");
    }else{
        for (let i = 0; i < vocals.length; i++) { //revisa quines vocals falten
            if (!paraula.toLowerCase().includes(vocals.charAt(i))) {
                vocalsfalten += vocals.charAt(i);
            }
        }
        alert(paraula + ": li falten les vocals " + vocalsfalten.toUpperCase());
    }
}

function majusculesOMinuscules(){}
