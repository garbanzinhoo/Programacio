// Títol dels apunts
var temari = "Apunts DWEC";

// TODO: Eliminar u[], t[] i c[] ?
//	Deixar només ccap[] ?
// Dades de les UF (temes i capítols)
var u = [];
var t = [];
var c = [];

// Llista seqüencial de capítols
var ccap = [];
var ncap = -1;

// Indica si està veient la pàgina principal/tot i el menú desplegable
var inici = true;
var index = false;

// Adreça de la pàgina principal i la base per afegir-la als enllaços
// (url = http://moodle/.../index.html | file:///mnt/.../index.html)
// (base igual que url però sense index.html)
var url;
var base;

// Dispositiu mòbil i offline (true|false)
var mobile;
var offline;

// Per navegar pel menú amb les tecles
var marked = null;
var walker = null;

// Per generar el contingut
var html;


/*********************************************************/
// MOSTRAR
/*********************************************************/

// Mostra o amaga les fletxes
function showHide(sh) {
	if (sh == "hide") {
		document.getElementById("l").classList.add("hidden");
		document.getElementById("r").classList.add("hidden");
	}
	else {
		document.getElementById("l").classList.remove("hidden");
		document.getElementById("r").classList.remove("hidden");
	}
	document.getElementById("l").classList.remove("soft");
	document.getElementById("r").classList.remove("soft");
}

// Buscar el pare del node "n" que pertany a la classe "c"
function findAncestor(n, c) {
    while (n.id != "menu" && !n.classList.contains(c)) n = n.parentElement;
    return n;
}

// Desplegar UF/tema del capítol actual
function desplegar() {
	if (ncap < 0) return;

	var c = document.getElementById("c" + ncap);
	var p = findAncestor(c, "collapsed");
	p.classList.remove("collapsed");
	p = findAncestor(p, "collapsed");
	p.classList.remove("collapsed");
	markUnmark(c);
}

// Plegar/desplegar UF/Tema al fer-hi clic en el menú
function openClose(n) {
	var c = document.getElementById("L" + n);
	var p = c.parentElement;

	if (p.classList.contains("collapsed")) p.classList.remove("collapsed");
	else p.classList.add("collapsed");
	markUnmark(c);
}

// Plega / desplega temes i UFs del menú
function plegarDesplegar(mc) {
	var i, l, m = document.getElementById("menu");
	if (mc == 2) {
		l = m.getElementsByClassName("collapsed");
		i = l.length;
		while (i > 0) {
			--i;
			l[i].classList.remove("collapsed");
		}
		return;
	}
	else {
		l = m.getElementsByClassName("tema");
		for (i = 0; i < l.length; ++i) l[i].classList.add("collapsed");
		l = m.getElementsByClassName("uf");
		if (mc == 0) for (i = 0; i < l.length; ++i) l[i].classList.add("collapsed");
		else for (i = 0; i < l.length; ++i) l[i].classList.remove("collapsed");
	}
}

// Mostrar la llista dels capítols de Apunts
function llistaCompleta() {
	var apunts = [], path;

	// Crear la llista dels capítols de Apunts
	for (var i = 0; i < ccap.length; ++i) {
		path = ccap[i].clink.substring(base.length);
		apunts.push("<td>UF" + ccap[i].uid + "&nbsp;&nbsp;&nbsp;T" + ccap[i].tid + "&nbsp;&nbsp;&nbsp;</td><td><a target='_blank' href='" + base + "index.html?ref=" + ccap[i].ref + "'>" + path + "</a>&nbsp;&nbsp;&nbsp;</td><td>" + ccap[i].ctitol + "</td>");
	}

	inici = true;
	showHide("hide");
	document.getElementById("titol").innerHTML = temari;
	document.getElementById("header2").style.display = "none";

	// Crear menú mostrant capítols
	plegarDesplegar(2);

	var ant = "", act = "", uant = "", uact = "";

	uant = apunts[0].substring(0,apunts[0].indexOf("T"));
	html = "<table>";
	for (var i = 0; i < apunts.length; ++i) {
		act = apunts[i].substring(0,apunts[i].indexOf("/"));
		if (act != ant) { 
			html += "<tr><td><br></td></tr>";
			ant = act;
		}
		uact = apunts[i].substring(0,apunts[i].indexOf("T"));
		if (uact != uant) { 
			html += "<tr><td><br><br></td></tr>";
			uant = uact;
		}
		html += "<tr>" + apunts[i] + "</tr>";
	} 
	html += "</table>";
	document.getElementById("ini").innerHTML = html;
	document.getElementById("ini").style.maxWidth = "none";
	setChapterFocus();
}

//-------------------------------------------------------//
// CAPITOLS
//-------------------------------------------------------//

function setChapterFocus() {
	var f = document.getElementById('chapter');
	// No passa el focus si el contingut és una pàgina externa
	if (ncap >= 0  && ccap[ncap].ref == "*") {
		f.blur();
		return;
	}
	
	if (f.style.display != "block") {
		f = document.getElementById('ini');
		if (f.contentWindow) f.contentWindow.focus();	// Edge
		else f.focus();		// Chrome & Firefox
	}
	else {
		document.getElementById('ini').blur();
		if (f.contentWindow) f.contentWindow.focus();	// Edge
		else f.focus();		// Chrome & Firefox
	}

	//window.blur();
	//setTimeout(function(){
	//window.top.focus();
	//}, 1000);
	//document.body.focus();
}

// Paràmetres
//   uf: número seqüencial de UF
//   tema: número seqüencial de tema
//   capitol: número de capítol o -1 per indicar el primer capítol
// Retorna el capitol sequencial (>= 0) o
//   -1: no s'ha trobat el capítol
//   -2: no s'ha trobat el tema
//   -3: no s'ha trobat la UF
function comprovarCapitol(uf, tema, capitol) {
	if (uf >= u.length) return -3;
	if (tema >= u[uf].temes.length) return -2;

	var nc = 0, t, i, j, k;

	for (i = 0; i < u.length; ++i) {
		for (j = 0; j < u[i].temes.length; ++j) {
			t = u[i].temes[j];
			for (k = 0; k < t.capitols.length; ++k) {
				if (t.capitols[k].link != null) {
					if (i == uf && ( j== tema || tema == -1)) {
						if (k == capitol || capitol == -1) return nc;
					}
					++nc;
				}
			}
		}
	}
	if (capitol == -1 && nc > 0) return 0;
	return -1;
}

// Per comprovar que no hi hagi identificadors de UF repetits
function buscarUF(num) {
	for (var i = 0; i < u.length; ++i) {
		if (u[i].id == num) return i;
	}
	return null;
}

// Per comprovar que no hi hagi identificadors de tema repetits
function buscarTema(num) {
	var r = {uf:0,tema:0};
	
	if (num == "") return null;
	for (var i = 0; i < u.length; ++i) {
		for (var j = 0; j < u[i].temes.length; ++j) {
			if (u[i].temes[j].id == num) {
				r.uf = i;
				r.tema = j;
				return r;
			}
		}
	}
	return null;
}

// Mostrar el capítol actual del tema
// TODO: esperar fins que es carregui iframe
//  Detectar si s'està fent showCapitol per cancelar ?
function showCapitol() {
	var i = inici;
	hideMenu();
	inici = false;

	// Seleccionar el capítol en el menú
	document.getElementById("c" + ncap).classList.add("selec");

	// Mostrar les fletxes (desactiva una si està al principi o al final)
	// TODO: canviar transparència segons estigui al principi o final de capítol o de tot
	//	(25%, 60% o 100%)
	showHide("show");
	if (ncap == 0) document.getElementById("l").classList.add("soft");
	if (ncap >= ccap.length - 1) document.getElementById("r").classList.add("soft");

	// Mostrar el títol del tema i del capítol
	document.getElementById("titol").innerHTML = ccap[ncap].tid + " - " + ccap[ncap].ttitol;
	document.getElementById("titol").style.width = "100%";
	document.getElementById("subtitol").innerHTML = ccap[ncap].ctitol;
	document.getElementById("header2").style.display = "block";

	// Mostrar el capítol dins d'un iframe
	document.getElementById("ini").style.display = "none";
	var f = document.getElementById("chapter");
	f.style.display = "block";
	f.title = ccap[ncap].ctitol;
	f.src = ccap[ncap].clink;
	//console.log(ccap[ncap].clink);
	// !!!???
	if (ccap[ncap].ref != "*") f.focus();
	else f.blur();
	setChapterFocus();
	window.history.replaceState(history.state, temari, url + "?cap=" + ncap + "&ref=" + ccap[ncap].ref);
	//document.getElementById("titol").click();
}

// Mostrar el capítol corresponent (abans comprova si existeix)
function capitolN(n) {
	if (ncap >= 0) document.getElementById("c" + ncap).classList.remove("selec");

	// Comprovar si existeix el capítol
	if (n < 0 || n >= ccap.length) {
		if (offline) alert("No existeix el capítol " + n);
		llistarUFs();
		return;
	}

	ncap = n;
	showCapitol();
}

// Mostrar el capítol corresponent (abans comprova si existeix)
function capitol(uf, tema, capitol) {
	// Comprovar si existeix el capítol
	var r = comprovarCapitol(uf, tema, capitol);

	if (r < 0) {
		if (offline) {
			switch (r) {
				case -3: alert("No hi ha tantes UF"); break;
				case -2: alert("No hi ha tants temes en la UF " + u[uf].id); break;
				case -1: alert("No s'ha trobat el capítol en la UF " + u[uf].id + " Tema " + u[uf].temes[tema].id); break;
			}
		}
		llistarUFs();
		return;
	}

	capitolN(r);
}

// Mostra el capitol (c = U.T.C)
function capitolId(c) {
	var utc = c.split(".");

	plegarDesplegar(0);
	if (utc.length == 3) capitol(utc[0], utc[1], utc[2]);
	else capitolN(utc[0]);
}

// Mostra la referència (4 primers caràcters de l'arxiu)
function refId(c) {
	var i;

	for (i = 0; i < ccap.length; ++i) {
		if (ccap[i].ref == c) {
			plegarDesplegar(0);
			capitolN(i);
			return;
		}
	}

	if (offline) alert("No existeix la pàgina " + c + "-....html");
	llistarUFs();
}

// Mostra el primer capítol del tema "num" i genera el menú amb els capítols del tema
function temaId(num) {
	var r = buscarTema(num);

	if (r == null) {
		if (offline) alert("No existeix el tema "+ num);
		llistarUFs();
		return;
	}

	plegarDesplegar(0);
	capitol(r.uf, r.tema, -1);
}

// Mostra el primer capítol de la uf "num" i genera el menú amb els capítols del tema
function ufId(num) {
	var r = buscarUF(num);

	if (r == null) {
		if (offline) alert("No existeix la UF "+ num);
		llistarUFs();
		return;
	}

	plegarDesplegar(0);
	capitol(r, -1, -1);
}

//-------------------------------------------------------//
// PÀGINA PRINCIPAL
//-------------------------------------------------------//

// Mostra les UF i els nuclis formatius
function llistarUFs() {
	if (ncap >= 0) document.getElementById("c" + ncap).classList.remove("selec");
	ncap = -1;
	inici = true;
	showHide("hide");
	document.getElementById("titol").innerHTML = temari;
	document.getElementById("header2").style.display = "none";

	// Crear menú mostrant temes
	plegarDesplegar(1);
	setChapterFocus();
}


/*********************************************************/
// ICONS & KEYS (main options)
/*********************************************************/

// Marcar la primera UF
function markFirst() {
	markUnmark(document.getElementById("menu").firstElementChild.firstElementChild.firstElementChild);
}

// Desmarcar UF/Tema/Capitol actual i marcar el nou
function markUnmark(newMarked) {
	if (mobile) return;
	if (marked) marked.classList.remove("mark");
	marked = newMarked;
	marked.classList.add("mark");
	walker.currentNode = marked;
}

// Saltar n amunt / avall
function upDn(n, up) {
	walker.currentNode = marked;
	if (up) {
		while (n != 0 && walker.previousNode()) --n;
	}
	else {
		while (n != 0 && walker.nextNode()) --n;
	}
	markUnmark(walker.currentNode);
	setScroll();
}

// Pàgina amunt / avall
function pgUpDn(up) {
	var m = document.getElementById("menu");
	var t = marked.offsetTop;
	var s, p;
	walker.currentNode = marked;

	if (up) {
		s = t - m.offsetHeight;
		p = walker.previousNode();
		while (p && p.offsetTop > s) p = walker.previousNode();
	}
	else {
		s = t + m.offsetHeight;
		p = walker.nextNode();
		while (p && p.offsetTop < s) p = walker.nextNode();
	}

	markUnmark(walker.currentNode);
	m.scrollTop += marked.offsetTop - t;
	setScroll();
}

function menuWidht() {
	if (mobile) return;

	var w = 25 * parseFloat(getComputedStyle(document.documentElement).fontSize);
	if (document.getElementById("header1").offsetWidth <= w)
		document.getElementById("menu").classList.add("mobil");
	else
		document.getElementById("menu").classList.remove("mobil");
}

// Desplaçar scroller del menú per veure el capítol actual si queda amagat
function setScroll() {
	if (ncap < 0 && !marked) return;

	var c, m = document.getElementById("menu");

	if (marked) c = marked;
	else c = document.getElementById("c" + ncap);

	if (c.offsetTop + c.offsetHeight - m.scrollTop > m.offsetHeight)
		m.scrollTop = c.offsetTop + c.offsetHeight - m.offsetHeight + 10;
	if (c.offsetTop < m.scrollTop)
		m.scrollTop = c.offsetTop - 10;
}

function showMenu() {
	var m = document.getElementById("menu");

	index = true;
	menuWidht();
	desplegar();
	m.style.left = "" + (-m.offsetWidth) + "px";
	m.style.top = "" + (document.getElementById("header1").offsetHeight) + "px";
	m.style.height = "" + (document.body.offsetHeight - document.getElementById("header1").offsetHeight) + "px";
	m.style.visibility = "visible";
	setScroll();
	m.style.transition = "left 0.3s ease-out";
	m.style.left = "0";
	// ????????
	//m.focus();
}

function hideMenu() {
	if (!index) return;

	var m = document.getElementById("menu");

	index = false;
	m.style.left = "" + (-m.offsetWidth - parseFloat(getComputedStyle(document.documentElement).fontSize)) + "px";
	setChapterFocus();
}

function redraw() {
	var m = document.getElementById("menu");

	if (index) {
		menuWidht();
		m.style.top = "" + (document.getElementById("header1").offsetHeight) + "px";
		m.style.height = "" + (document.body.offsetHeight - document.getElementById("header1").offsetHeight) + "px";
		setScroll();
	}
	else {
		m.style.visibility = "hidden";
	}
}

// Amaga el menú de capitols si està obert
// Amaga buscar si s'està buscant
// Torna a l'índex principal si està mostrant un capítol
function esc() {
	if (index) hideMenu();
	else if (!inici || document.getElementById("ini").style.maxWidth == "none") window.location = url;
	return;
}

// Mostra el menú amb els capítols del tema
function menu() {
	if (index) hideMenu();
	else showMenu();
}

// Mostra la finestra per buscar o els resultats de la cerca
function find() {
	window.open('find.html', '_blank');
}

// Mostra el capítol anterior
function left() {
	if (inici || ncap <= 0) return false;
	document.getElementById("c"+ncap).classList.remove("selec");
	--ncap;
	capitolN(ncap);
}

// Mostra el capítol següent
function right() {
	if (inici || ncap >= ccap.length - 1) return false;
	document.getElementById("c"+ncap).classList.remove("selec");
	++ncap;
	capitolN(ncap);
}

// <a class="td ico" title="Descarregar apunts" onclick="downloadAll([['../../smx/xl/xl.zip','xl.zip'],['pax.zip','pax.zip']])">
function downloadAll(urls) {
	for (var i = 0; i < urls.length; ++i) {
		var link = document.createElement('a');
		var l = urls[i];

		link.setAttribute('href', l[0]);
		link.setAttribute('target', '_blank');
		link.setAttribute('download', l[1]);
		link.style.display = 'none';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}

//-------------------------------------------------------//
// KEYS
//-------------------------------------------------------//
/*
window.onkeydown = function(event) {
	console.log("Window Key");
}

window.onfocus = function() {
	console.log("FOCUS main win"+window);
}

window.onblur = function() {
	console.log("BLUR main win"+window);
}
*/
// Detectar click del ratolí per tancar menú, si cal:
//	Si s'ha fet clic sobre el menú, no fa res
//	Si s'ha fet clic sobre el botó del menú, passa el focus a la finestra del contingut
//	Si s'ha fet clic en qualsevol altre lloc, amaga el menú i passa el focus a la finestra del contingut
window.onclick = function(event) {
	var node = event.target;
	//var func = node.matches || node.msMatchesSelector;

	while (node != null) {
		//if (func.call(node, '#menu') || func.call(node, '#m')) return;
		if (node.id == 'menu' || node.id == 'm') return;
		node = node.parentElement;
	}
	if (index) hideMenu();
	else setChapterFocus();
}

function selecK() {
	marked.click();
}

// Detectar tecles
document.onkeydown = function(event) {
	var key = event.keyCode || event.which;

	if (mobile || event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;

	if (index) {
		switch (key) {
			case 13: selecK(); break;// Intro (plegar/desplegar/obrir capítol)
			case 27: esc(); break;	 // ESC
			case 32: menu(); break;  // SPACE (menú)
			case 38: upDn(1, true); break;		// Anterior
			case 40: upDn(1, false); break;		// Següent
			case 33: pgUpDn(true); break;		// Pg amunt
			case 34: pgUpDn(false); break;		// Pg avall
			case 36: upDn(-1, true); break;		// Inici de columna
			case 35: upDn(-1, false); break;	// Final de columna
			default: return;
		}
		event.preventDefault();
		return;
	}

	switch (key) {
		case 37: left(); break;  // LEFT
		case 39: right(); break; // RIGHT
		case 27: esc(); break;	 // ESC
		case 32: menu(); break;  // SPACE (menú)
		//case 112: find(); break; // F1 (buscar)
		default: return;
	}
	event.preventDefault();
}

// Rebre missatges de iframe (tecles especials)
window.addEventListener('message', function(event) { 
/*
	//console.log("Missatge " + event.origin + ": " + event.data);
    // IMPORTANT: Check the origin of the data! 
    if (~event.origin.indexOf('http://yoursite.com')) { 
        // The data has been sent from your site 
    } else { 
        // The data hasn't been sent from your site! 
        return; 
    } 
*/
	var key = event.data;

	switch (key) {
		case -1: hideMenu(); break;	// Clic
		case 37: left(); break;  // LEFT
		case 39: right(); break; // RIGHT
		case 27: esc(); break;	 // ESC
		case 32: menu(); break;  // SPACE (menú)
		//case 112: find(); break; // F1 (buscar)
	}
});


/*********************************************************/
// INIT
/*********************************************************/

//
function crearCapSeq() {
	// Crear la llista seqüencial de capítols
	var t, r, f, c;

	ccap = [];
	for (var i = 0; i < u.length; ++i) {
		for (var j = 0; j < u[i].temes.length; ++j) {
			t = u[i].temes[j]
			for (var k = 0; k < t.capitols.length; ++k) {
				c = t.capitols[k];
				if (c.link != null) {
					if (c.extern) {
						r = "*";
					}
					else {
						r = c.link;
						f = r.lastIndexOf("/") + 1;
						r = r.substring(f, f + 4);
					}
					ccap.push({uid:u[i].id,tid:t.id,ttitol:t.titol,ctitol:c.titol,clink:c.link,ref:r});
				}
			}
		}
	}
}

function menuNode(node) {
	if (node.tagName.toLowerCase () == "a" && node.offsetParent) return NodeFilter.FILTER_ACCEPT;
	return NodeFilter.FILTER_SKIP;
}

//
function crearMenu() {
	var indent = -1, l = 0, n = 0, c, t, i, j, k;

	c = "<ul>";
	// Link a Home
	c += "<li class='uf'>";
	c += "<a href='./index.html' class='notbefore' style='margin-left:-0.75em;margin-bottom:-1em;cursor:pointer'>"+
		"&nbsp; &nbsp;<svg style='width:1.25rem;padding:0;vertical-align:bottom' viewBox='0 0 48 48'><path style='fill:#0000ff' d='M 39,26 44,26 24,6 4,26 9,26 9,41 20,41 20,33 28,33 28,41 39,41 Z'></path><path style='fill:#0000ff' d='M 36,16 36,8 31,8 31,11 Z'></path></svg>"+
		"&nbsp; Inici</a>";
	c += "</li>";
	// Desplegables UFs
	for (i = 0; i < u.length; ++i) {
		++indent;
		c += "<li class='uf'>";
		c += "<a  id='L" + l + "' onClick='return openClose(" + l + ");'>" + u[i].titol + "</a>";
		c += "<ul>";
		++l;
		// Deplegables Temes
		for (j = 0; j < u[i].temes.length; ++j) {
			if (u[i].temes[j].titol == "<hr>") c += "<li><hr></li>";
			else {
				++indent;
				c += "<li class='tema collapsed'>";
				c += "<a id='L" + l + "' onClick='return openClose(" + l + ");'>" + u[i].temes[j].id + " - " + u[i].temes[j].titol + "</a>";
				c += "<ul>";
				++l;
				for (k = 0; k < u[i].temes[j].capitols.length; ++k) {
					t = u[i].temes[j].capitols[k];
					while (t.nivell > indent) { ++indent; c += "<li><ul>"; }
					while (t.nivell < indent) { --indent; c += "</ul></li>"; }

					if (t.link == null) {
						if (t.titol == "<hr>") c += "<li><hr></li>";
						else c += "<li><p>" + t.titol + "</p></li>";
					}
					else {
						c += "<li><a id='c" + n + "' href='index.html?cap=" + n + "'>" + t.titol + "</a></li>";
						++n;
					}
				}
			}
			while (indent > 0) { --indent; c += "</ul></li>"; }
		}
		c += "</ul></li>";
		--indent;
	}
	c += "</ul>";
	t = document.getElementById("menu");
	t.innerHTML = c;
	walker = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, menuNode, false);
	markFirst();
}

// Crea l'estructura de dades a partir de l'array del document temari.js
function crearDades() {
	var i, ln, ext, n = 0;

	for (i = 0; i < modul.length; ++i) {
  		switch (modul[i][0]) {
  			case "U":
  				// Crear UF: Identificador i títol UF
				t = [];
				if (offline && buscarUF(modul[i][1]) != null) alert("UF " + modul[i][1] + " repetida");
				u.push({id:modul[i][1],titol:modul[i][2],temes:t});
  				break;
  			case "T":
				// Crear Tema: Identificador i títol TEMA
				c = [];
				if (offline && buscarTema(modul[i][1]) != null) alert("Tema " + modul[i][1] + " repetit");
				t.push({id:modul[i][1],titol:modul[i][2],capitols:c});
  				break;
  			case "C":
				ln = modul[i][3];
				ext = true;
				if (ln != null) {
					if (!ln.startsWith("http")) {
						// Afegeix la base als enllaços relatius (la resta, externs i nuls, els deixa igual)
						ln = base + ln;
						ext = false;
					}
					++n;
				}
				// Crear Capítol: Indentat, títol i enllaç CAPITOL
				c.push({nivell:modul[i][1],titol:modul[i][2],link:ln,extern:ext});
  				break;
  		}
	}
}

// Inicialitzar
function init() {
	// Guardar la base de l'adreça URL per poder utilitzar els apunts en qualsevol web i en local
	url = window.location.href;
	if (url.indexOf("?") >= 0) url = url.substring(0, url.indexOf("?"));
	if (url.indexOf("/index") < 0) {
		if (url.charAt(url.length - 1) == "/") url = url.slice(0, -1);
		url += "/index.html";
	}
	base = url.substring(0,url.indexOf("index"));

	// Detectar si dispositiu mòbil i offline
	if (!navigator.userAgentData) mobile = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) == null ? false : true;
	else mobile = navigator.userAgentData.mobile;
	offline = !url.startsWith("http");
	if (!mobile) document.getElementById("menu").classList.remove("mobil");

	crearDades();
	crearMenu();
	crearCapSeq();
}

// En funció del paràmetre:
//    sense paràmetres: mostra totes les UF amb els seus temes
//    ?uf=X: mostra el primer capítol de la uf
//    ?tema=XX: mostra el primer capítol del tema
//    ?cap=U.T.C: mostra el capítol C del tema T de la UF U (obsolet però encara funciona)
//    ?cap=C: mostra el capítol C (ordre seqüencial)
//    ?ref=NNNN: mostra l'arxiu que el nom comença amb NNNN
//    ?tot: mostra tots els capítols de Apunts (per fer comprovacions)
function receive(param) {
	// Crear les entrades de UFs, temes i capítols
	init();

	// Veure nivell 0 (totes les UFs amb els seus temes)
	if (param == undefined) return;

	// Buscar en els paràmetres la primera coincidència: apunts, tema o capitol
	for (var i = 0; i < param.length; ++i) {
		param[i] = param[i].split("=");
		// Per veure quins capítols de Apunts s'han agafat (només per a comprovar)
		if (param[i][0] == "tot") {
			llistaCompleta();
			return;
		}
		else {
			// Detectar paràmetres buits i decodificar, per exemple el · (middledot)
			var p = param[i][1] == undefined ? "" : param[i][1];
			p = decodeURIComponent(p);
			// Mostrar primer capítol de la UF
			if (param[i][0] == "uf") {
				ufId(p);
				return;
			}
			// Mostrar primer capítol del tema
			if (param[i][0] == "tema") {
				temaId(p);
				return;
			}
			// Mostrar capítol per número d'ordre
			if (param[i][0] == "cap") {
				capitolId(p);
				return;
			}
			// Mostrar capítol per referència (ref són els 4 primers caracters del nom de l'arxiu)
			if (param[i][0] == "ref") {
				refId(p);
				return;
			}
		}
	}
}

// DADES

// Camps de l'array:
// Per crear una UF:
// 		["U","id_UF","Títol de la UF"],
// 		L'identificador de UF no es pot repetir (sol ser un número a partir de 1)
// Per crear un tema:
// 		["T","id_Tema","Títol del tema"],
// 		L'identificador de tema no es pot repetir
//		Es pot deixar l'identificador buit i el títol null per posar una línia de separació entre temes
// Per crear un capítol:
// 		["C","indentat","Títol del capítol","link (adreça web)"],
// 		El camp "indentat" indica el nombre de "tabuladors" que s'afegeixen abans del títol del capítol
// 		Es pot posar el link a null per posar un text sense enllaç
//		Es pot posar "<hr>" en el títol (i el link a null) per posar una línia de separació entre temes (i capítols)

// La indentació del text que defineix les dades només serveix
// per veure més clarament els diferents nivells

var modul = [

/*********************************************************/
["U","1","RA1 - Identificar els elements d'un programa"],
/*********************************************************/

	["T","12","Introducció a la programació"],
		["C","1","Conceptes bàsics","uf1/nf1/1100-ConceptesBasics.html"],
		["C","1","Evolució de la programació","uf1/nf1/1110-EvolucioProgramacio.html"],
		["C","1","Llenguatge JavaScript","uf1/nf1/1112-JavaScript.html"],
		["C","1","Començar a programar amb Java","uf1/nf1/1115-ProgramarJavaScript.html"],
		["C","1","Sintaxi de JavaScript","uf1/nf1/1118-SintaxiJavaScript.html"],

	["T","14","Tipus de dades simples"],
		["C","1","Tipus de dades","uf1/nf1/1210-Dades.html"],
		["C","1","Operadors",null],
			["C","2","Operadors matemàtics","uf1/nf1/1220-OperadorsMatematics.html"],
			["C","2","La classe <em>Math</em>","uf1/nf1/1221-ClasseMath.html"],
			["C","2","La classe <em>String</em>","uf1/nf1/1225-ClasseString.html"],
			["C","2","Conversió i format de dades","uf1/nf1/1227-Conversio.html"],
			["C","2","Introduir dades","uf1/nf1/1235-IntroduirDades.html"],
			["C","2","Treballar amb la pàgina web","uf1/nf1/1236-PlantillaJavaScript.html"],
//			["C","2","Precedència dels operadors","uf1/nf1/1228-Precedencia.html"],
		["C","1","Importància d'utilitzar constants","uf1/nf1/1230-Constants.html"],
//		["C","1","Mostrar dades amb format","uf1/nf1/1230-FormatarDades.html"],

/*********************************************************/
["U","3","RA3 - Utilitzar estructures de control"],
/*********************************************************/

	["T","32","Programació estructurada"],
//		["C","1","Introduir dades","uf1/nf2/1235-IntroduirDades.html"],
		["C","1","Introducció a la programació estructurada","uf1/nf2/1400-Estructurada.html"],
			["C","2","Altres idees útils per la programació estructurada","uf1/nf2/1402-Estructurada2.html"],
		["C","1","Operadors relacionals i lògics","uf1/nf2/1410-OperadorsRelacionalsLogics.html"],
		["C","1","Estructures condicionals","uf1/nf2/1420-Condicionals.html"],
			["C","2","Condicionals encadenats i niuats","uf1/nf2/1422-Condicionals2.html"],
			["C","2","Condicionals avançats","uf1/nf2/1423-Condicionals3.html"],
			["C","2","Estructura de selecció múltiple","uf1/nf2/1424-Switch.html"],
		["C","1","Estructures de repetició","uf1/nf2/1440-Bucles.html"],
			["C","2","Com utilitzar el bucle <em>while</em>","uf1/nf2/1442-UtilitzarWhile.html"],
			["C","2","Bucle <em>for</em>","uf1/nf2/1444-For.html"],
			["C","2","Banderes, comptadors i acumuladors","uf1/nf2/1446-BanderesComptadorsAcumuladors.html"],
			["C","2","Modificar la seqüència d'un bucle","uf1/nf2/1448-BreakContinue.html"],
		["C","1","Modularitat","uf2/nf1/2000-Modularitat.html"],
//			["C","2","Funcions","uf2/nf1/2002-Funcions.html"],
			["C","2","Funcions amb JavaScript","uf2/nf1/2300-Funcions.html"],
			["C","2","Paràmetres i valor de retorn","uf2/nf1/2302-FuncionsParametresRetorn.html"],

	["T","34","Control d'errors"],
//		["C","1","Excepcions","uf5/nf2/5210-Excepcions.html"],
//		["C","1","Assercions","uf5/nf2/5210-Assercions.html"],
		["C","1","Detecció i tractament d'excepcions","uf5/nf2/1255-Depuracio.html"],
//		["C","1","Eines de depuració","uf5/nf2/1250-EinesNavegadors.html"],

/*********************************************************/
["U","6","RA6 - Utilitzar tipus avançats de dades"],
/*********************************************************/

	["T","62","Tipus de dades compostes"],
		["C","1","Introducció als arrays","uf1/nf3/2100-Llistes.html"],
			["C","2","Mètodes dels arrays","uf1/nf3/2110-LlistesMetodes.html"],
			["C","2","Recorregut d'un array","uf1/nf3/2111-ArraysRecorreguts.html"],
			// TODO: recol·lecció, filtrat, resum...
			["C","2","Cerques en un array","uf1/nf3/2112-ArraysCercar.html"],
			["C","2","Arrays ordenats","uf1/nf3/2113-ArraysOrdenats.html"],
			["C","2","Arrays bidimensionals","uf1/nf3/2114-ArraysBidimensionals.html"],
		["C","1","Objectes","uf1/nf3/2115-Objectes.html"],
		["C","1","Col·leccions","uf5/nf1/2115-SetMap.html"],
		["C","1","Operacions amb conjunts de dades","uf5/nf1/5010-Coleccions.html"],
		["C","1","Expressions regulars","uf5/nf1/5150-RegEx.html"],

/*********************************************************/
["U","4","RA4 - Desenvolupar programes organitzats en classes"],
/*********************************************************/

	["T","42","Introducció a Java"],
		["C","1","Llenguatge Java","uf4/nf0/1112-Java.html"],
		["C","1","Començar a programar amb Java","uf4/nf0/1115-ProgramarJava.html"],
		["C","1","Sintaxi de Java","uf4/nf0/1118-Sintaxi.html"],
		["C","1","Tipus de dades","uf4/nf0/1210-Dades.html"],
		["C","1","Identificadors","uf4/nf0/1212-Identificadors.html"],
		["C","1","Mostrar dades amb format","uf4/nf0/1230-FormatarDades.html"],
		["C","1","Introduir dades","uf4/nf0/1235-IntroduirDades.html"],
		["C","1","Arrays","uf4/nf0/1510-Arrays.html"],
		["C","1","Modularitat","uf2/nf1/2000-Modularitat.html"],
		["C","1","Funcions","uf4/nf0/2002-Funcions.html"],
		["C","1","Excepcions","uf4/nf0/2004-Excepcions.html"],
		["C","1","Classes","uf4/nf0/2005-Classes.html"],
		["C","1","Paquets","uf4/nf0/2007-Paquets.html"],
		["C","1","Documentació de programes","uf4/nf0/2015-JavaDoc.html"],
		["C","1","La API de Java","uf4/nf0/2010-APIJava.html"],

	["T","46","Programar utilitzant classes estàtiques"],
		["C","1","Classes sense objectes","uf4/nf1/4000-Classes.html"],
		["C","1","Introducció a la programació orientada a objectes","uf4/nf1/4002-IntroPOO.html"],
		["C","1","Modificadors dels membres d'una classe","uf4/nf1/4004-Modificadors.html"],

/*********************************************************/
["U","2","RA2 - Programar utilitzant classes i objectes"],
/*********************************************************/

	["T","22","Programació orientada a objectes (POO)"],
		["C","1","Objectes","uf4/nf1/4006-Objectes.html"],
			["C","2","Objectes compostos","uf4/nf1/4008-Composicio.html"],

/*********************************************************/
["U","7","RA7 - Desenvolupar programes amb característiques avançades de POO"],
/*********************************************************/

	["T","72","Utilització avançada de classes i objectes"],
		["C","1","Característiques de la POO",null],
			["C","2","Herència","uf4/nf2/4010-Herencia.html"],
				["C","3","Creació i utilització de subclasses","uf4/nf2/4012-Subclasses.html"],
			["C","2","Polimorfisme","uf4/nf2/4020-Polimorfisme.html"],
			["C","2","Classes abstractes","uf4/nf2/4030-ClassesAbstractes.html"],
			["C","2","Interfícies","uf4/nf2/4040-Interfaces.html"],
		["C","1","Disseny de classes","uf4/nf2/4050-DissenyClasses.html"],

/*********************************************************/
["U","5","RA5 - Realitzar operacions d'entrada i sortida"],
/*********************************************************/

	["T","52","Lectura i escriptura d'informació"],
		["C","1","Fluxos de dades",null],
			["C","2","Sockets","uf5/nf4/5436-Sockets.html"],
			["C","2","Exemples amb Sockets","uf5/nf4/5438-ExemplesSockets.html"],

	["T","54","Gestió d'arxius"],
		["C","1","Gestió de carpetes i arxius","uf3/nf1/3010-CarpetesArxius.html"],
		["C","1","Arxius orientats a caràcters","uf3/nf1/3020-ArxiusCaracters.html"],
		["C","1","Arxius orientats a bytes","uf3/nf1/3030-ArxiusBinaris.html"],
		["C","1","Arxius XML","uf3/nf1/3040-XML.html"],
		["C","1","Arxius JSON","uf3/nf1/3042-JSON.html"],
		["C","1","Guardar i recuperar informació en altres formats","uf3/nf1/3050-AltresFormats.html"],

	["T","56","Interfícies gràfiques d'usuari"],
		["C","1","MVC","uf5/nf3/5310-MVC.html"],
		["C","1","Diàlegs simples","uf5/nf3/5320-DialegsSimples.html"],
		["C","1","Finestres","uf5/nf3/5330-Finestres.html"],
		["C","1","Menús","uf5/nf3/5332-Menus.html"],
		["C","1","Barres d'eines","uf5/nf3/5334-Eines.html"],
		["C","1","Contenidors","uf5/nf3/5340-Contenidors.html"],
			["C","2","Altres contenidors","uf5/nf3/5342-AltresContenidors.html"],
		["C","1","Layouts","uf5/nf3/5350-Layouts.html"],
			["C","2","<em>Layouts</em> bàsics","uf5/nf3/5352-LayoutsBasics.html"],
			["C","2","Altres <em>layouts</em>","uf5/nf3/5354-AltresLayouts.html"],
		["C","1","Components","uf5/nf3/5360-Components.html"],
			["C","2","Altres components","uf5/nf3/5362-MesComponents.html"],
		["C","1","Introducció als esdeveniments","uf5/nf3/5370-IntroEsdeveniments.html"],
			["C","2","Gestió dels esdeveniments","uf5/nf3/5372-GestioEsdeveniments.html"],
		["C","1","Disseny de diàlegs amb l'IDE","uf5/nf3/5380-DialegsIDE.html"],
			["C","2","Crear diàlegs manualment","uf5/nf3/5382-DialegsManual.html"],
		["C","1","Introducció als gràfics i al so","uf5/nf3/5390-IntroGrafics.html"],
			["C","2","Les classes Graphics i Graphics2D","uf5/nf3/5392-Graphics2D.html"],
			["C","2","Canvas","uf5/nf3/5394-Canvas.html"],
			["C","2","So","uf5/nf3/5396-So.html"],

/*********************************************************/
["U","9","RA9 - Gestionar informació de bases de dades"],
/*********************************************************/

//	["T","90","Introducció als diagrames UML"],

	["T","92","Gestió de bases de dades relacionals"],
		["C","1","JDBC","uf6/nf2/6210-JDBC.html"],
		["C","1","Execució de sentències SQL","uf6/nf2/6220-ExecutarSQL.html"],
		["C","1","Traducció <em>Java objects</em> - BD relacional","uf6/nf2/6230-ModelBD.html"],
		["C","1","CRUD i DAO","uf6/nf2/6240-CRUD-DAO.html"],

/*********************************************************/
["U","8","RA8 - Utilitzar base de dades orientades a objectes (BDOO)"],
/*********************************************************/

	["T","82","Gestió de bases de dades orientades a objectes"],
		["C","1","db4o","uf6/nf4/6410-BDOO.html"],
		["C","1","Gestió avançada","uf6/nf4/6420-BDOO2.html"],

/*********************************************************/
["U","10","Altres"],
/*********************************************************/

// ---------- Sobre els apunts ---------- //
	["T","90","Informacions sobre els apunts"],
		["C","1","Recomanacions per utilitzar aquests apunts",null],
			["C","2","Navegadors i cercadors","0001-Navegadors.html"],
			["C","2","Opcions i tecles que es poden utilitzar","0002-Tecles.html"],
			["C","2","Recomanacions per utilitzar aquests apunts","0003-Recomanacions.html"],
			["C","2","Tipografia","0004-Tipografia.html"],
		["C","1","Informació addicional sobre aquests apunts","0000-About.html"],
];

