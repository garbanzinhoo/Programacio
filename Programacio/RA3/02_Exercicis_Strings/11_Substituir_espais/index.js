"use strict";

/*
4 - Substituir espais
Utilitzant un bucle, crea un string igual que un altre però substituint els espais que hi ha entre les paraules per |.
Després, busca un mètode de la classe String que ho faci i prova'l.
*/

const FRASE = "Hi havia una vegada";
let resultat = "";


for (let i = 0; i < FRASE.length; i++){
    if (FRASE.charAt(i) == " "){
        resultat += "|";
    }else{
        resultat += FRASE.charAt(i)
    }
}

alert(resultat)