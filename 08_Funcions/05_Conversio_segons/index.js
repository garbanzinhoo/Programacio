"use strict";
/*
1 - Convertir segons a HH:MM:SS
Crea les següents funcions:

Una funció que demani els segons fins que sigui un número enter entre 0 i 359999. Ha de retornar el valor introduït.
El valor retornat per la funció anterior s'ha de passar a una funció que generi i retorni un text amb les hores, minuts i segons en format "HH:MM:SS".
Convé crear una funció que, passant-li un número enter entre 0 i 99, retorni el valor amb dos dígits: 5 → "05". No cal que aquesta funció comprovi si el valor que se li passa és correcte.
*/

const SEGONS = demanarEnter();

let calcul = calculSegons(SEGONS);

alert(calcul);


/*-------------------------------------------------------FUNCIONS--------------------------------------------------- */
function demanarEnter(){ 
    let enter;
    do{
        enter = Number(prompt("Digues els segons "));
    }while (!esEnter(enter) || !estaEntre(enter, 0, 359999));
    return enter;
}

//Calculem els segons i utilitzem la funcio dosDigits per formatar 
function calculSegons(valor){
    let hores = Math.floor(valor / 3600);
    let segonsRestants = Math.floor(valor % 3600);
    let minuts = Math.floor(segonsRestants / 60);
    let segons = Math.floor(segonsRestants % 60);
    return dosDigits(hores) + ":" + dosDigits(minuts) + ":" + dosDigits(segons);
}

//Mirem si es un sol dígit i si ho es li afegim un 0
function dosDigits(valor){
    if (valor < 10) {
        return "0" + valor;
    }
    return valor.toString();
}
