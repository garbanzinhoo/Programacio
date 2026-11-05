"use strict";

// Inputs per introduir el nom i l'edat
const iImport = document.getElementById("iImport");
const iPagat = document.getElementById("iPagat");
// Botó per executar l'aplicació
const bTornarCanvi = document.getElementById("bTornarCanvi");
// Element on mostrar el resultat
const resultat = document.getElementById("resultat");

// Quan es fa clic en el botó 'exec' es crida la funció 'executar()'
bTornarCanvi.addEventListener("click", executar);

// Funció que executa l'aplicació
function executar() {
	// Obtenir els 'inputs' del document i guardar-los en variables
	let impor = parseFloat(iImport.value.replace(",", "."));
	let pagat = parseFloat(iPagat.value.replace(",", "."));
	let canvi, canviCentims, monedes;

	// Processar les dades
	canvi = pagat - impor;
	resultat.innerHTML = "El canvi seran " + canvi.toFixed(2) + " €:<br>";
	
	// Cal canviar a cèntims i arrodonir per evitar
	//  problemes al convertir a int (truncar)
	canviCentims = Math.round(canvi * 100);
	
	monedes = Math.trunc(canviCentims / 200);
	canviCentims %= 200;
	resultat.innerHTML += monedes.toFixed(0) + " monedes de 2 euros<br>";
	
	monedes = Math.trunc(monedes = canviCentims / 100);
	canviCentims %= 100;
	resultat.innerHTML += monedes.toFixed(0) + " monedes de 1 euro<br>";
	
	monedes = Math.trunc(monedes = canviCentims / 50);
	canviCentims %= 50;
	resultat.innerHTML += monedes.toFixed(0) + " monedes de 50 cent<br>";
	
	monedes = Math.trunc(monedes = canviCentims / 20);
	canviCentims %= 20;
	resultat.innerHTML += monedes.toFixed(0) + " monedes de 20 cent<br>";
	
	monedes = Math.trunc(monedes = canviCentims / 10);
	//canviCentims %= 10; // No és necessari si no cal 5, 2 i 1 ctm
	resultat.innerHTML += monedes.toFixed(0) + " monedes de 10 cent<br>";
}