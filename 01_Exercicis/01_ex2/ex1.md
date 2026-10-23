const LLETRES = "TRWAGMYFPDXBNJZSQVHLCKE"; constant
const DNI = 12345678; constant
let residu = DNI % 23; variable 
let lletra = LLETRES.charAt(residu); variable
alert("La lletra del DNI " + DNI + " és " + lletra); variable + constant