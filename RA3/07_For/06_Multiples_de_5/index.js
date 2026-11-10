"use strict";
/*
1 - Múltiples de 5 entre 25 i 100
Utilitza un bucle for per generar els múltiples de 5 entre 25 i 100.
*/

//Ponemos que la variable empiece desde 25 y un if para que calcule si es multiple 
//hasta que sea igual a 100
for (let i = 25; i <= 100; i++){
    if (i % 5 == 0){
        alert(i)
    }
}
