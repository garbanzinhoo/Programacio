# Sistema intel·ligent d'accés a una zona restringida

Una empresa disposa d'una zona restringida a la qual només poden accedir determinades persones. Has de crear un programa en JavaScript que decideixi si una persona pot entrar a la zona i, en cas contrari, expliqui el motiu pel qual no hi pot accedir.

El programa rebrà les dades següents mitjançant variables:

- edat → edat de la persona.

- teAcreditacio → indica si disposa d'una acreditació (true o false).

- nivell → nivell de seguretat de l'acreditació, entre 1 i 5.

- haFetCurs → indica si ha superat el curs de seguretat (true o false).

- horesCurs → nombre d'hores del curs que ha completat.

- teAutoritzacio → indica si disposa d'una autorització especial (true o false).

- esTreballador → indica si és treballador de l'empresa (true o false).

- esResponsable → indica si és responsable d'un departament (true o false).

- zona → zona a la qual vol accedir: "A", "B" o "C".

- hora → hora actual, en format numèric de 0 a 23.

- dia → dia de la setmana: "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte" o "diumenge".

- incidencies → nombre d'incidències de seguretat que ha tingut anteriorment.

- convidat → indica si és una persona convidada (true o false).

- acompanyat → indica si va acompanyada d'una persona autoritzada (true o false).

Un cop tractades i analitzades aquestes dades, el programa ha de mostrar un dels possibles resultats:

- **"ACCÉS PERMÈS"**

- **"ACCÉS PERMÈS AMB RESTRICCIONS"**

- **"ACCÉS DENEGAT"**

En cas que l'accés sigui denegat o restringit, també s'haurà d'indicar el **motiu concret**.

# 1. Normes d'accés

Les normes següents s'han d'aplicar en l'ordre indicat.

## 1.1. Comprovació inicial

Una persona no pot accedir mai si:

- té menys de 16 anys;

- té 3 o més incidències de seguretat;

- o intenta accedir a una zona que no sigui "A", "B" o "C".

Si es compleix alguna d'aquestes condicions, l'accés queda denegat directament.

Si no es compleix cap d'aquestes condicions, cal continuar comprovant la resta de requisits.

## 1.2. Comprovació de l'acreditació

Si la persona té acreditació, cal comprovar el seu nivell.

### 1.2.1 Acreditació de nivell 1

Una acreditació de nivell 1 només permet accedir a la **zona A**.

A més:

- ha de ser treballador de l'empresa;

- ha d'haver fet el curs de seguretat;

- i ha d'haver completat com a mínim 10 hores de curs.

Si intenta accedir a una altra zona, l'accés serà denegat.

### 1.2.2 Acreditació de nivell 2

Una acreditació de nivell 2 permet accedir a:

- zona A sempre que compleixi els requisits del curs;

- zona B si, a més, és treballador.

Per accedir a la zona B ha de:

- ser treballador;

- haver fet el curs;

- i haver completat almenys 15 hores.

### 1.2.3 Acreditació de nivell 3

Una acreditació de nivell 3 permet accedir a les zones A i B si ha fet el curs i ha completat almenys 20 hores.

Per accedir a la zona C necessita, a més:

- ser responsable;

- tenir almenys 21 anys;

- i tenir autorització especial.

### 1.2.4 Acreditació de nivell 4

Una acreditació de nivell 4 permet accedir a qualsevol zona sempre que:

- tingui almenys 18 anys;

- hagi fet el curs;

- i hagi completat almenys 20 hores.

Però per accedir a la zona C també ha de ser responsable **o** tenir una autorització especial.

### 1.2.5 Acreditació de nivell 5

Una acreditació de nivell 5 permet accedir a qualsevol zona sempre que tingui almenys 18 anys.

No necessita haver fet el curs per entrar a les zones A o B.

Per entrar a la zona C, però, necessita:

- tenir almenys 21 anys;

- i ser responsable **o** tenir autorització especial.

## 1.3. Persones sense acreditació

Si la persona no té acreditació, encara pot entrar en determinades circumstàncies.

Una persona sense acreditació només pot accedir si és una persona convidada.

En aquest cas:

### Convidat menor de 18 anys

No pot accedir a cap zona.

### Convidat de 18 anys o més

Pot accedir a la zona A si va acompanyat d'una persona autoritzada.

Per accedir a la zona B, a més d'anar acompanyat:

- ha de tenir almenys 21 anys;

- i ha d'haver fet el curs.

Els convidats mai poden accedir a la zona C.

## 1.4. Restriccions horàries

Fins i tot si una persona compleix tots els requisits anteriors, cal comprovar l'horari.

### De dilluns a divendres

- Zona A: es permet l'accés entre les 7 i les 22 h.

- Zona B: es permet l'accés entre les 8 i les 20 h.

- Zona C: es permet l'accés entre les 9 i les 18 h.

### Dissabte

- Zona A: entre les 9 i les 14 h.

- Zona B: només entre les 10 i les 13 h.

- Zona C: no està disponible.

### Diumenge

No es permet l'accés a cap zona, excepte en el cas de persones amb acreditació de nivell 5 i autorització especial.

En aquest cas:

- poden entrar a la zona A entre les 10 i les 14 h;

- poden entrar a la zona B entre les 10 i les 14 h;

- poden entrar a la zona C entre les 11 i les 13 h.

## 1.5. Accés amb restriccions

Hi ha situacions en què l'accés no s'ha de denegar completament, sinó que s'ha de permetre amb restriccions.

L'accés serà "ACCÉS PERMÈS AMB RESTRICCIONS" quan:

- la persona tingui exactament 2 incidències de seguretat;

- compleixi tots els altres requisits;

- i no sigui diumenge.

En aquest cas, el programa haurà d'indicar:

"Accés permès amb restriccions: la persona té 2 incidències de seguretat."

Si té 3 o més incidències, l'accés serà directament denegat segons la norma inicial.

## 1.6. Situacions especials

Hi ha algunes excepcions que compliquen encara més el sistema:

### Responsable

Si la persona és responsable, té acreditació de nivell 3 o superior i té autorització especial, pot accedir a la zona C encara que no sigui treballador.

Tot i això, haurà de complir les restriccions d'edat i horari corresponents.

### Autorització especial

Una autorització especial mai substitueix l'acreditació, excepte en el cas concret dels convidats acompanyats.

Per tant, tenir teAutoritzacio == true no significa automàticament que la persona pugui entrar.

### Curs

Haver fet el curs (haFetCurs) i haver completat les hores mínimes (horesCurs) són dues coses diferents.

Per tant, una persona amb:

- haFetCurs == true

- però amb poques hores,

no compleix el requisit.

# 2. Quines instruccions fem servir a l’hora de programar

**Només pots utilitzar:**

- `if`

- `else`

- `else if`

- operadors relacionals:

  - `>`

  - `<`

  - `>=`

  - `<=`

  - `==`

  - `!=`

- operadors lògics:

  - `&&`

  - `||`

  - `!`

- variables

- `console.log()`

- valors booleans, números i cadenes.

- `switch`

### NO pots utilitzar:

- `for`

- `while`

- `do...while`

- arrays

- objectes

- funcions pròpies

- mètodes

- operador ternari ?:

- `break`

- `continue`

- `return`

- expressions regulars

- Math

- cap llibreria

- cap estructura de dades

- cap altre tipus de control del flux.

# 3. Requisit addicional: validació

Abans de comprovar si la persona pot entrar, també hauràs de comprovar que les dades siguin vàlides.

Per exemple:

- edat no pot ser negativa;

- nivell ha d'estar entre 1 i 5;

- horesCurs no pot ser negativa;

- incidencies no pot ser negativa;

- hora ha d'estar entre 0 i 23;

- zona només pot ser A, B o C;

- dia només pot ser un dels set dies de la setmana.

Si alguna dada no és vàlida, hauràs de mostrar:

"ERROR: dades d'entrada no vàlides"

i no s'haurà de continuar amb la comprovació d'accés.

Intenta resoldre el problema de manera que cada decisió depengui de condicionals aniuats.

Per exemple, no es tracta simplement de fer una cadena enorme de condicions independents, sinó d'estructurar el programa

# 4. Objectiu del repte

Aconseguir implementar tot el sistema utilitzant únicament condicionals if...else, fent ús de condicionals niuats, operadors relacionals i operadors lògics.

No es busca que el programa sigui curt.

De fet, en aquest exercici, la complexitat dels condicionals forma part del repte.

La pregunta que has de respondre amb el teu programa és:

*"Amb aquestes dades, aquesta persona pot entrar a aquesta zona, en aquest moment i en aquestes circumstàncies?"*
