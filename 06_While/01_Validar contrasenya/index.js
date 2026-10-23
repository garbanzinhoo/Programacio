"use strict";
const CONTRASENYA_CORRECTA = "1234";
let intents = 0;
let contrasenya = "";

//Iniciamos el bucle
//Primero declaramos que mientras intents sea menor a 3 y lo que ponga el usuario no sea igual a la contrasenya correcta funcione el bucle
while (intents < 3 && contrasenya !== CONTRASENYA_CORRECTA) {
    //Pedimos la contraseña y sumamos 1 a los intentos
  contrasenya = prompt("Introdueix la contrasenya:");
  intents++;
    //Hacemos un if para comprobar la contrasenya
  if (contrasenya !== CONTRASENYA_CORRECTA && intents < 3) {
    alert("Contrasenya incorrecta. Et queden " + (3 - intents) + " intents.");
  }
}
//Otro if para el mensaje final de cuando acabe el bucle 
if (contrasenya === CONTRASENYA_CORRECTA) {
  alert("Has encertat la contrasenya!");
} else {
  alert("S'han acabat els intents.");
}