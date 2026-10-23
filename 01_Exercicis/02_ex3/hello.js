let a = 5;
let b = 7;
let c;

++b; //Suma +1 a b
b = (b * 3) / 8;
a += 3;
a = a + 4 / 2;
c = a / 5 + b;

alert("a = " + a + "\nb = "+ b + "\nc = "+ c);
// Resultat: a = 10, b = 3, c = 5


a = 5;
b = 8;

++a; //Suma +1 a a
a += 4;
b -= a / 2;
c = ++a + b;
c += a - b++;

alert("a = " + a + "\nb = "+ b + "\nc = "+ c);
// Resultat: a = 11, b = 4, c = 22