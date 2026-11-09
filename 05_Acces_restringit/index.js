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
    //Guardem si compleix els requisits per no haver de repetir les comprovacions d'horari a cada cas
    let compleixRequisits = false

    //Validem les dades
    if (edat < 0 ){
        alert("ERROR: dades d'entrada no vàlides")
    }else if (teAcreditacio && nivell != 1 && nivell != 2 && nivell != 3 && nivell != 4 && nivell !=5){
        //El nivell només el validem si té acreditació, si no el camp pot estar buit
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
            alert("ACCÉS DENEGAT: té menys de 16 anys")
        }else if (incidencies >= 3){
            alert("ACCÉS DENEGAT: té 3 o més incidències de seguretat")
        }else if (zona != "A" && zona != "B" && zona != "C"){
            alert("ACCÉS DENEGAT: la zona no existeix")
        }else {
            //Mirem les persones amb acreditació
            if (teAcreditacio){
                if (nivell == 1){
                    if ( zona == "A"){
                        if (!esTreballador){
                            motiu = "No és treballador"
                        }else if (!haFetCurs){
                            motiu = "No ha fet el curs"
                        }else if (horesCurs < 10){
                            motiu = "Menys de 10 hores de curs"
                        }else {
                            compleixRequisits = true
                        }
                    }else {
                        motiu = "El nivell 1 no pot accedir a les zones B i C"
                    }
                }else if (nivell == 2){
                    if (zona == "C"){
                        motiu = "El nivell 2 no pot accedir a la zona C"
                    }else if (!haFetCurs){
                        motiu = "No ha fet el curs"
                    }else if (horesCurs < 15){
                        motiu = "Menys de 15 hores de curs"
                    }else if (zona == "B" && !esTreballador){
                        motiu = "Per accedir a la zona B ha de ser treballador"
                    }else {
                        compleixRequisits = true
                    }
                }else if (nivell == 3){
                    if (!haFetCurs){
                        motiu = "No ha fet el curs"
                    }else if (horesCurs < 20){
                        motiu = "Menys de 20 hores de curs"
                    }else if (zona == "C"){
                        //Per la zona C no cal ser treballador (situació especial del responsable)
                        if (!esResponsable){
                            motiu = "Per accedir a la zona C ha de ser responsable"
                        }else if (edat < 21){
                            motiu = "Per accedir a la zona C ha de tenir almenys 21 anys"
                        }else if (!teAutoritzacio){
                            motiu = "Per accedir a la zona C necessita autorització especial"
                        }else {
                            compleixRequisits = true
                        }
                    }else {
                        compleixRequisits = true
                    }
                }else if (nivell == 4){
                    if (edat < 18){
                        motiu = "Ha de tenir almenys 18 anys"
                    }else if (!haFetCurs){
                        motiu = "No ha fet el curs"
                    }else if (horesCurs < 20){
                        motiu = "Menys de 20 hores de curs"
                    }else if (zona == "C" && !esResponsable && !teAutoritzacio){
                        motiu = "Per accedir a la zona C ha de ser responsable o tenir autorització especial"
                    }else {
                        compleixRequisits = true
                    }
                }else {
                    //Nivell 5
                    if (edat < 18){
                        motiu = "Ha de tenir almenys 18 anys"
                    }else if (zona == "C"){
                        if (edat < 21){
                            motiu = "Per accedir a la zona C ha de tenir almenys 21 anys"
                        }else if (!esResponsable && !teAutoritzacio){
                            motiu = "Per accedir a la zona C ha de ser responsable o tenir autorització especial"
                        }else {
                            compleixRequisits = true
                        }
                    }else {
                        compleixRequisits = true
                    }
                }
            }else {
                //Primer mirem si són convidats o no
                if (!convidat){
                    motiu = "No té acreditació i no és convidat"
                }else if (edat < 18){
                    motiu = "Convidat menor de 18 anys"
                }else {
                    //Un cop ja sabem el necessari, mirem si pot accedir a zona A
                    if (zona == "A"){
                        if (!acompanyat){
                            motiu = "El convidat no va acompanyat"
                        }else {
                            compleixRequisits = true
                        }
                        //Mirem de si pot accedir a zona B
                    }else if (zona == "B"){
                        if (!acompanyat){
                            motiu = "El convidat no va acompanyat"
                        }else if (edat < 21){
                            motiu = "Ha de tenir almenys 21 anys"
                        }else if (!haFetCurs){
                            motiu = "No ha fet el curs de seguretat"
                        }else {
                            compleixRequisits = true
                        }
                        //Posem que mai poden accedir convidats a zona C
                    }else {
                        motiu = "Els convidats mai poden accedir a la zona C"
                    }
                }
            }

            //Si compleix els requisits, mirem les restriccions horàries
            if (compleixRequisits){
                if (dia == "diumenge"){
                    if (!teAcreditacio || nivell != 5 || !teAutoritzacio){
                        compleixRequisits = false
                        motiu = "Diumenge només poden entrar persones amb nivell 5 i autorització especial"
                    }else if (zona == "A" && (hora < 10 || hora > 14)){
                        compleixRequisits = false
                        motiu = "Diumenge la zona A només està oberta de 10 a 14 h"
                    }else if (zona == "B" && (hora < 10 || hora > 14)){
                        compleixRequisits = false
                        motiu = "Diumenge la zona B només està oberta de 10 a 14 h"
                    }else if (zona == "C" && (hora < 11 || hora > 13)){
                        compleixRequisits = false
                        motiu = "Diumenge la zona C només està oberta d'11 a 13 h"
                    }
                }else if (dia == "dissabte"){
                    if (zona == "A" && (hora < 9 || hora > 14)){
                        compleixRequisits = false
                        motiu = "Dissabte la zona A només està oberta de 9 a 14 h"
                    }else if (zona == "B" && (hora < 10 || hora > 13)){
                        compleixRequisits = false
                        motiu = "Dissabte la zona B només està oberta de 10 a 13 h"
                    }else if (zona == "C"){
                        compleixRequisits = false
                        motiu = "Dissabte la zona C no està disponible"
                    }
                }else {
                    //De dilluns a divendres
                    if (zona == "A" && (hora < 7 || hora > 22)){
                        compleixRequisits = false
                        motiu = "Entre setmana la zona A només està oberta de 7 a 22 h"
                    }else if (zona == "B" && (hora < 8 || hora > 20)){
                        compleixRequisits = false
                        motiu = "Entre setmana la zona B només està oberta de 8 a 20 h"
                    }else if (zona == "C" && (hora < 9 || hora > 18)){
                        compleixRequisits = false
                        motiu = "Entre setmana la zona C només està oberta de 9 a 18 h"
                    }
                }
            }

            //Mostrem el resultat final
            if (!compleixRequisits){
                alert("ACCÉS DENEGAT: " + motiu)
            }else if (incidencies == 2){
                if (dia == "diumenge"){
                    alert("ACCÉS DENEGAT: amb 2 incidències de seguretat no es pot accedir en diumenge")
                }else {
                    alert("ACCÉS PERMÈS AMB RESTRICCIONS: Accés permès amb restriccions: la persona té 2 incidències de seguretat.")
                }
            }else {
                alert("ACCÉS PERMÈS")
            }
        }
    }
}
