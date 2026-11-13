"use strict";

//Declarem les variables per el numero que demanem i per contar les iteracions
let numero = Number(prompt("Digues un numero entre 1 i 100"));
let iteracions = 0;

//Com sempre hem d'acabar amb 1 com resultat, ho posem com condició per acabar el bucle
while (numero != 1){
    //Primer mirem si es parell, en cas de que si fem el calcul i contem 1 iteració
    if (numero == 0){
        break;
    }else if (numero % 2 == 0){
        numero = numero / 2;
        alert(numero)
        iteracions++;
    }else if (numero % 2 !== 0){ //Fem el mateix per els imparells
        numero = (numero * 3) +1;
        alert(numero)
        iteracions++;
    }
    
}
//Posem quantes iteracions hem fet
    alert("Iteracions " + iteracions)