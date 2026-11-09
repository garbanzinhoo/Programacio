"use strict";

//Hipotenusa d'un triangle

//Declaramos la variable para relacionarlo con el html
let d = document.getElementById("missatge");

const a = 5;
const b = 8;

let suma_costats = (Math.pow(a,2)) + Math.pow(b,2);
let hipotenusa = Math.sqrt(suma_costats);

//Lo hace como alerta
alert(hipotenusa);

//Lo añade como texto en el html
d.innerHTML = ("La respuesta és: " + hipotenusa);