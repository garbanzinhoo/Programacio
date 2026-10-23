"use strict";
function comprovar() {
    //Declarem les variables
    let edat = Number(document.getElementById("edat").value);
    let teAcreditacio = document.getElementById("teAcreditacio").checked;
    let nivell = Number(document.getElementById("nivell").value);
    let haFetCurs = document.getElementById("haFetCurs").checked;
    let horesCurs = Number(document.getElementById("horesCurs").value);
    let teAutoritzacio = document.getElementById("teAutoritzacio").checked;
    let esTreballador = document.getElementById("esTreballador").checked;
    let esResponsable = document.getElementById("esResponsable").checked;
    let zona = document.getElementById("zona").value;
    let hora = Number(document.getElementById("hora").value);
    let dia = document.getElementById("dia").value;
    let incidencies = Number(document.getElementById("incidencies").value);
    let convidat = document.getElementById("convidat").checked;
    let acompanyat = document.getElementById("acompanyat").checked;
    let motiu = ""

    //Validem les dades
    if (edat < 0 ){
        alert("ERROR: dades d'entrada no vàlides")
    }else if ( nivell != 1 && nivell != 2 && nivell != 3 && nivell != 4 && nivell !=5){
        alert("ERROR: dades d'entrada no vàlides")
    }else if (horesCurs < 0){
        alert("ERROR: dades d'entrada no vàlides")
    }else if (incidencies < 0){
        alert("ERROR: dades d'entrada no vàlides")
    }else if (hora < 0 || hora > 23){
        alert("ERROR: dades d'entrada no vàlides")
    }else if (zona != "A" && zona != "B" && zona != "C" ){
        alert("ERROR: dades d'entrada no vàlides")
    }else if (dia != "dilluns" && dia != "dimarts" && dia != "dimecres" && dia != "dijous" && dia != "divendres" && dia != "dissabte" && dia != "diumenge"){
        alert("ERROR: dades d'entrada no vàlides")
    }else {
        //Mirem si ACCÉS DENEGAT de cap manera
        if (edat < 16){
            alert("ACCÉS DENEGAT")
        }else if (incidencies >= 3){
            alert("ACCÉS DENEGAT")
        }else if (zona != "A" && zona != "B" && zona != "C"){
            alert("ACCÉS DENEGAT")
        }else {
            //Mirem les persones sense acreditació
            if (teAcreditacio){
                if (nivell == 1){
                    if ( zona == "A"){
                        if (!esTreballador){
                            alert("ACCÉS DENEGAT: No es treballador")
                        }else if (!haFetCurs){
                            alert("ACCÉS DENEGAT: No ha fet el curs")
                        }else if (horesCurs < 10){
                            alert("ACCÉS DENEGAT: Menys de 10 hores de curs")
                        }else {
                            alert("ACCÉS PERMÉS")
                        }
                    }else {
                        alert("ACCÉS DENEGAT: No pot accedir a les zones B i C")
                    }
                }else if (nivell == 2){
                    if (!haFetCurs){
                        alert("ACCÉS DENEGAT")
                    }else if (esTreballador){
                        alert("ACCÉS DENEGAT")
                    }else{
                        if (horesCurs >= 15){
                        alert("ACCÉS PERMÈS")
                    }
                    }
                }else if (nivell == 3){

                }else if (nivell == 4){

                }else {

                }
            }else {
                //Primer mirem si on convidats o no
                if (!convidat){
                    alert("ACCÉS DENEGAT: no té acreditació i no és convidat")
                }else if (edat < 18){
                    alert("ACCÉS DENEGAT: convidat menor de 18 anys")
                }else {
                    //Un cop ja sabem el necessari, mirem si pot accedir a zona A
                    if (zona == "A"){
                        if (!acompanyat){
                            alert("ACCÉS DENEGAT: el convidat no va acompanyat")
                        }else {
                            alert("ACCÉS PERMÈS")
                        }
                        //Mirem de si pot accedir a zona B
                    }else if (zona == "B"){
                        if (!acompanyat){
                            alert("ACCÉS DENEGAT: el convidat no va acompanyat")
                        }else if (edat < 21){
                            alert("ACCÉS DENEGAT: ha de tenir almenys 21 anys")
                        }else if (!haFetCurs){
                            alert("ACCÉS DENEGAT: no ha fet el curs de seguretat")
                        }else {
                            alert("ACCÉS PERMÈS")
                        }
                        //Posem que mai poden accedir convidats a zona C
                    }else {
                        alert("ACCÉS DENEGAT: els convidats mai poden accedir a la zona C")
                    }
                }
            }
        }
    }
}
//terminar nivel 2