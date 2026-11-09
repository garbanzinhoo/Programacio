/*
Els noms propis s'han d'escriure amb la primera lletra majúscula i les següents en minúscula, 
però els usuaris no sempre els escriuen correctament.

Inicialitza una variable amb el teu nom TOT en minúscules.
Inicialitza una altra variable amb el teu primer cognom TOT en majúscules.

Escriu el codi necessari per transformar i mostrar el teu nom i cognom en la forma correcta.
*/
"use strict";

let nom = "aitor"
let cognom = "ZOILO"

let primerlletranom = nom.charAt(0)
let nombe = primerlletranom.toUpperCase() + nom.substring(1, nom.length)
alert(nombe)

let primerlletracognom = cognom.substring(1, cognom.length)
let cognombe = cognom.charAt(0) + primerlletracognom.toLowerCase()
alert (cognombe)