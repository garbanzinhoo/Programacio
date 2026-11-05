"use strict";

// Quan acabi de carregar la pàgina...
window.onload = function() {

	function iconaCopia() {
		var imatge = document.createElement("img");
		imatge.src = "../../imatges/copy.svg";
		imatge.title ="Copiar codi";
		imatge.style.border = "none";
		imatge.style.height = "1.25rem";
		imatge.style.verticalAlign = "bottom";
		imatge.addEventListener("mousedown", copiar);
		return imatge;
	}

	// Numerar exercicis i configurar desplegables
	function numerar() {
		//var index = "<h5 style='margin-top:.5rem'>ÍNDEX</h5><p>";
		var index = "<p>";
		var e = document.querySelectorAll(".enun h3");

		// Afegir número davant de cada títol
		for (var i = 0; i < e.length; ++i) {
			e[i].innerHTML = (i+1) + " - " + e[i].innerHTML;
			index += "<a href='#ex" + (i+1) + "'>" + e[i].innerHTML + "</a><br>";
			e[i].innerHTML = "<a id='ex" + (i+1) + "'></a>" + e[i].innerHTML;
		}
		index += "</p>";
		
		var eIndex = document.createElement("div");
		var s = document.getElementsByTagName("section")[0];
		eIndex.innerHTML = index;
		eIndex.style.marginTop = ".5rem";
		eIndex.style.padding = "0 .5rem 0 .5rem";
		eIndex.style.border = "1px solid blue";
		eIndex.style.backgroundColor = "#f0f0ff";
		s.insertBefore(eIndex, s.firstChild.nextElementSibling.nextElementSibling);

		var desplegables = document.querySelectorAll(".p_desplegable");
		for (var i = 0; i < desplegables.length; ++i) {
			var desp = document.createElement("div");
			desp.innerHTML = "Mostrar codi";
			desp.style.fontSize = "1.1rem";
			desp.style.display = "inline-block";
			desp.style.width = "6.5rem";
			desp.style.textAlign = "center";
			desp.style.padding = "0 .5rem";
			desp.style.backgroundColor = "#E0E0E0";
			desp.style.border = "solid thin";
			desp.style.borderRadius = ".25rem";
			desp.style.cursor = "default";
			desp.addEventListener("click", desplegar);

			var imatge = iconaCopia();
			var copy = document.createElement("p");
			copy.appendChild(desp);
			copy.appendChild(imatge);
			desplegables[i].style.display = "none";
			desplegables[i].style.maxHeight = "0px";
			desplegables[i].parentNode.insertBefore(copy, desplegables[i]);
		}
	}

	// Copiar al portapapers
	function copiar(e) {
		e.target.style.backgroundColor = "#e0e0e0";
		setTimeout(icon => icon.style.backgroundColor = "#fff", 100, e.target);
		var p = e.target.parentNode.nextElementSibling;
		var t = p.innerText.replace(/\n */g, "\n");	// Eliminar els espais inicials
		t = t.replace(/\u00a0/g, " ");				// Canviar &nbsp; per espai
		navigator.clipboard.writeText(t);			// Copiar al portapapers
	}

	// Desplegar
	function desplegar(e) {
		function hide() {
			p.style.display = "none";
			e.target.innerText = "Mostrar codi";
		}
		
		function show() {
			e.target.innerText = "Amagar codi";
		}
		
		var p = e.target.parentNode.nextElementSibling;
		if (e.target.innerText == "Amagar codi") {
			p.style.maxHeight = "0px";
			setTimeout(hide, 300);
		} else {
			p.style.display = "block";
			p.style.maxHeight = p.scrollHeight + "px";
			setTimeout(show, 300);
		}
	}

	var ref = window.location.href;
	ref = ref.substring(ref.lastIndexOf("/") + 1);
	
	var nomArxiu = ref.substring(0, ref.lastIndexOf("."));

	// Si és un arxiu de solucions...
	if (nomArxiu.substring(nomArxiu.lastIndexOf("-") + 1) == "Solucions") {
		var arxiuEnunciats = nomArxiu.substring(0, nomArxiu.lastIndexOf("-")) + ".html";

		// Carregar l'arxiu amb els enunciats
		fetch(arxiuEnunciats)
			.then(data => data.text())
			.then(data => {
				// Crear un element amb el document que s'ha carregat
				var docEnunciats = document.createElement("div");
				docEnunciats.innerHTML = data;

				// Afegir els enunciats al principi del document
				var e = docEnunciats.getElementsByTagName("section")[0];	// Secció enunciats
				var s = document.getElementsByTagName("section")[0];		// Secció solucions
				document.body.insertBefore(e, s);

				// Moure cada solució al final de cada enunciat
				var enunciats = e.querySelectorAll(".enun");
				var solucions = s.querySelectorAll(".sol");
				// Ha d'haver-hi el mateix nombre d'enunciats que de solucions
				if (enunciats.length == solucions.length) {
					numerar();
					for (var i = 0; i < enunciats.length; ++i) {
						var sol = solucions[i].querySelectorAll("h3,h4,h5,h6");
						for (var j = 0; j < sol.length; ++j) {
							if (sol[j].nextElementSibling.classList.contains("p_codi"))
								sol[j].appendChild(iconaCopia());
						}
						enunciats[i].appendChild(solucions[i]);
						solucions[i].classList.remove("sol");
					}
					while (s.firstElementChild) {
						e.insertBefore(s.firstElementChild, enunciats[0]);
					}
					s.remove();
				} else {
					alert("No hi ha el mateix nombre de solucions que d'exercicis!");
				}
			})
	}
	else {
		numerar();
	}
}

