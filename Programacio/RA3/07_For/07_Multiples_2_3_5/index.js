"use strict";
/*
2 - Múltiples de 2, 3 i 5
Utilitza un bucle for per trobar els números que son múltiples de 2, de 3 o de 5 entre 1 i 100.
Per cada resultat, ha d'indicar de quin(s) número(s) és multiple.

Repeteix el mateix però per trobar els números que siguin múltiples de 2, de 3 i de 5 a la vegada.
*/

/*
for (let i = 1; i <= 100; i++){
    if (i % 2 == 0){
        alert(i + " es múltiple de 2")
    }else if (i % 3 == 0){
        alert(i + " és múltiple de 3")
    }else if (i % 5 == 0) {
        alert (i + " és múltiple de 5")
    }else {
        alert(i + " no es divisible de cap")
    }
}
*/

"use strict";

for (let i = 1; i <= 100; i++) {
    if (i % 2 == 0 && i % 3 == 0 && i % 5 == 0) {
        alert(i + " és múltiple de 2, 3 i 5");
    }
}