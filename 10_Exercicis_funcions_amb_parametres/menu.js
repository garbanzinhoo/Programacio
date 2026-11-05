"use strict";
import { comprovaMenu, esNumero, esPositiu } from "../utils/validacions.js";
import { menu_caixer_automatic } from "./caixer_autom.js";
import { calcularTotal } from "./control_fres.js";
import { validarDadesIntroduides } from "./reserv_hotel.js";

const MIN = 1;
const MAX = 4;
menu();

//--------------------FUNCIONS--------------------
function menu() {
    let opcio = 0;
    do {
        opcio = Number(
            prompt(
                "------MENU------" +
                "\n1. Caixer automàtic " +
                "\n2. Control factures " +
                "\n3. Reserva hotels" +
                "\n4. Sortir"
            ),
        );

        if (comprovaMenu(opcio, MIN, MAX)) {
            switch (opcio) {
                case 1: {
                    menu_caixer_automatic();
                    break;
                }
                case 2: {
                    let preuInicial = prompt("Digues el preu inicial");
                    let descompte = prompt("Digues de quant es el descompte");
                    // El preu ha de ser un número major que 0 i el descompte ha d'estar entre 0 i 100
                    if (esPositiu(preuInicial) && esNumero(descompte) && Number(descompte) >= 0 && Number(descompte) <= 100){
                        alert(calcularTotal(Number(preuInicial), Number(descompte)));
                    } else {
                        alert("Error: el preu ha de ser major que 0 i el descompte ha d'estar entre 0 i 100");
                    }
                    break;
                }
                case 3: {
                    let nits = prompt("Quantes nits?");
                    let persones = prompt("Quantes persones?");
                    let tipus = prompt("Quin tipus d'habitació? Estàndard o Superior");
                    let teAparcament = prompt("Vols aparcament?");
                    validarDadesIntroduides(nits, tipus, persones, teAparcament);
                    break;
                }
                case 4: {
                    break;
                }
            }
        } else {
            alert("Introdueix una dada vàlida");
        }
    // Repetim el menú fins que l'usuari triï 4 (Sortir)
    } while (opcio !== 4);
}
