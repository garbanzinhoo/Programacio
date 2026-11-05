var titol = "Apunts DWEC";
var base, ref, mobile;

//
function home() {
	window.location = base + "index.html?ref=" + ref;
}

// 
function crear_titol() {
	// Obtenir la referència de l'arxiu (primers 4 caràcters)
	var r, t = titol;
	ref = window.location.href;
	r = ref.lastIndexOf("/") + 1;
	ref = ref.substring(r, r + 4);

	// Mostrar el títol (<header> per defecte està amagat)
	//  i afegir icona Home amb enllaç a la mateixa pàgina dins dels apunts
	var dh = document.getElementsByTagName("header")[0];

	if (!dh) {
		var b = document.getElementsByTagName("body")[0];

		b.innerHTML = "<header>" + t + "</header>" + b.innerHTML;
		dh = document.getElementsByTagName("header")[0];
	}
	t = dh.textContent;

	var html = "<div id='h' class='td ico' alt='" + titol + "' title='" + titol + "' onclick='home()'>";
	html += "<svg viewbox='0 0 48 48'>";
	html += "<path style='fill:#ffffff' d='M 39,26 44,26 24,6 4,26 9,26 9,41 20,41 20,33 28,33 28,41 39,41 Z' />";
	html += "<path style='fill:#ffffff' d='M 36,16 36,8 31,8 31,11 Z' /></svg>";
	html += "</div>";
	html += "<div class='td'><h1>" + t + "</h1></div>";
	dh.innerHTML = html;
	dh.style.display = "block";

	// Posar a <title> el mateix que a <h1>
	var dt = document.getElementsByTagName("title")[0];
	if (!dt) document.getElementsByTagName("head")[0].innerHTML += "<title>" + t + "</title>";
	else dt.innerHTML = t;
	
	// Crear favicon
	var favicon = document.createElement('link');
	//favicon.setAttribute('rel', 'shortcut icon');
	favicon.setAttribute('rel', 'icon');
	favicon.setAttribute('type', 'image/png');
	favicon.setAttribute('href', (base+'imatges/favicon.png'));
	var head = document.querySelector('head');
	head.appendChild(favicon);
}

//
function crear_peu() {
	// Comprovar que hi ha un element on crear el peu (<footer>...</footer>)
	var peu = document.getElementsByTagName("footer")[0];
	if (peu) {
		peu.innerHTML = "<hr><p style='text-align:right;'><img alt='copyleft' class='noborder' src='" + base + "imatges/copyleft.svg' style='width:10em;height:auto;'><br><strong>Autor: Pere Sánchez</strong></p>";

		// Mostrar el peu (per defecte està amagat)
		peu.style.display = "block";
	}
}

// TIP (Títol, Index i Peu)
// Afegeix link a pàgina corresponent dins la web apunts si s'obre com a pàgina independent
// Crea peu de pàgina amb copyleft i autor si no s'obre amb dispositius mòbils
function TIP(minH, maxH) {
	// Obtenir l'adreça base
	var scripts = document.head.getElementsByTagName("script");
	var src = scripts[0].src;
	base = src.substring(0,src.lastIndexOf("/") + 1);

	if (!navigator.userAgentData) mobile = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) == null ? false : true;
	else mobile = navigator.userAgentData.mobile;

	// Si es mostra de forma independent (no dins d'unframe)
	if (window.self === window.parent) crear_titol();

	// Crea peu (excepte si es visualitza en un dispositiu mòbil)
	if (!mobile) crear_peu();
}
/*
window.onfocus = function() {
	console.log("focus iframe");
}

window.onblur = function() {
	console.log("blur iframe");
}
*/
// Detecta click i avisa a la finestra pare
window.onclick = function(event) {
	if (window.self === window.parent) return;
	window.parent.postMessage(-1, '*');
	//window.parent.postMessage(-1, window.location.href);
}

// Detecta tecles especials i avisa a la finestra pare
document.onkeydown = function(event) {
	var key = event.keyCode || event.which;
	if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;

	if (window.self === window.parent) {
		if (key == 32 || key == 27) window.location = base + "index.html?ref=" + ref;
		return;
	}

	switch (key) {
		case 37:	 // LEFT
		case 39:	 // RIGHT
		case 27:	 // ESC
		case 32:	 // SPACE (Menú)
		case 112: break; // F1 (Buscar)
		default: return;
	}
	window.parent.postMessage(key, '*');
	//window.parent.postMessage(key, window.location.href);

	if (key == 32) {
		if (window.frameElement) window.frameElement.blur();	// Firefox
		window.parent.focus();	// Chrome & Edge
	}
	event.preventDefault();
}
