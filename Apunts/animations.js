// IMPORTANT!!!
// Cal executar Chrome amb el paràmetre --allow-file-access-from-files
// "C:\Program Files (x86)\Google\Chrome\Application\Chrome.exe" --allow-file-access-from-files
// /usr/lib/chromium-browser/chromium-browser --allow-file-access-from-files
// /snap/chromium/2020/usr/lib/chromium-browser/chrome  --allow-file-access-from-files

// Per modificar txt cal posar l'identificador dins de l'<span> que conté el text

// TODO: fstop, fpause, steps?, fsteps?
//		comprovar 'id' repetits
//		esborrar stops incorrectes

"use strict";

var offline;
var animations = [];


//*****************************************************************************
// AUXILIARS
//*****************************************************************************

// Round N decimals
function decN(n, d) {
	if (isNaN(n)) return n;
	if (d >= 0) return Number(Math.round(n+'e'+d)+'e-'+d);
	else return n;
}

// Round 1 decimal
function dec1(n) {
	return decN(n, 1);
}

function cosinus(a) {
	a = a % 360;
	if (a < 0) a += 360;
	if (a == 0) return 1;
	if (a == 180) return -1;
	if (a == 90 || a == 270 ) return 0;
	if (a > 90 && a < 180) return -Math.cos((180 - a) * Math.PI / 180);
	if (a > 180 && a < 270) return -Math.cos((a - 180) * Math.PI / 180);
	if (a > 270 && a < 360) return Math.cos((360 - a) * Math.PI / 180);
	else return Math.cos(a * Math.PI / 180);
}

function sinus(a) {
	a = a % 360;
	if (a < 0) a += 360;
	if (a == 0 || a == 180) return 0;
	if (a == 90) return 1;
	if (a == 270 ) return -1;
	if (a > 90 && a < 180) return Math.sin((180 - a) * Math.PI / 180);
	if (a > 180 && a < 270) return -Math.sin((a - 180) * Math.PI / 180);
	if (a > 270 && a < 360) return -Math.sin((360 - a) * Math.PI / 180);
	else return Math.sin(a * Math.PI / 180);
}

function toRGB(r, g, b) {
	return "rgb(" + r + "," + g + "," + b + ")";
}

function toColor(c) {
	var i, rgb, arr = [];
	if (!c) return undefined;
	if (c == "none") return "none";

	c = c.toLowerCase();
	if (c.substr(0, 1) == "#") {
		c = c.substr(1);
		if (c.length == 3) c = c.substr(0,1) + c.substr(0,1) + c.substr(1,1) + c.substr(1,1) + c.substr(2,1) + c.substr(2,1);
		if (c.length != 6) return undefined;
		if (!c.match(/[0-9a-f]{6}/)) return undefined;

		arr[0] = parseInt(c.substr(0,2), 16);
		arr[1] = parseInt(c.substr(2,2), 16);
		arr[2] = parseInt(c.substr(4,2), 16);
	}
	else if (c.substr(0, 4) == "rgb(") {
		c = c.substr(4);
		c = c.replace(")", "");
		arr = c.split(",");
		if (arr.length != 3) return undefined;

		for (i = 0; i < arr.length; i++) {
			arr[i] = parseInt(arr[i]);
			if (isNaN(arr[i])) return undefined;
			if (arr[i] > 255) arr[i] = 255;
			if (arr[i] < 0) arr[i] = 0;
		}
	}
	else return undefined;

	rgb = { r:arr[0], g:arr[1], b:arr[2] };
	return rgb;
}

//-----------------------------------------------------------------------------

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild; 
}

function sliderW(a) {
	var sliderWidth = Math.floor(a.image.getBoundingClientRect().width - a.playButton.getBoundingClientRect().width - parseFloat(getComputedStyle(document.documentElement).fontSize)/2);
	a.animationSlider.style.width = "" + sliderWidth + "px";
}

function resizeSlider() {
	for (var i = 0; i < animations.length; i++) sliderW(animations[i]);
}


//*****************************************************************************
// MOVES
//*****************************************************************************

Animation.prototype.calcOrientation = function(alfa, matrix) {
	var a, d, ma, mb;
	if (alfa != 0) {
		alfa *= Math.PI / 180;
		a = matrix[0];
		d = matrix[3];
		ma = Math.cos(alfa);
		mb = Math.sin(alfa);
		
		matrix[0] = a * ma;
		matrix[1] = a * mb;
		matrix[2] = d * -mb;
		matrix[3] = d * ma;
	}
	else {
		matrix[1] = 0;
		matrix[2] = 0;
	}
};

// !fixed --> next step
// fixed --> calculate position
Animation.prototype.updateObjects = function(fixed) {
	var i, o, m, s, sh, alfa, axi, ayi, inc, matrix = [0,0,0,0,0,0];

	for (i = 0; i < this.objects.length; i++) {
		o = this.objects[i].obj;
		m = this.objects[i].move;
		sh = this.objects[i].shifts;
		if (sh.length == 0) continue;
		if (fixed) {
			m = 0;
			while (m < sh.length-1 && sh[m].f0 + sh[m].fi <= this.frame) ++m;
			this.objects[i].move = m;
		}
		s = sh[m];

		inc = this.frame - s.f0;
		if (inc >= s.fi) {
			inc = s.fi;
			matrix[0] = s.w.stop * o.w;
			matrix[3] = s.h.stop * o.h;
			matrix[4] = s.x.stop;
			matrix[5] = s.y.stop;

			alfa = o.a + s.o.stop;
			this.calcOrientation(alfa, matrix);			
			o.setAttribute("transform", "matrix("+matrix+")");

			o.style.opacity = s.op.stop;
			if (o.txt) o.innerHTML = s.txt.stop;

			if (o.fill && s.fill.stop) {
				if (s.fill.stop == "none") o.style.fill = "none";
				else o.style.fill = toRGB(s.fill.stop.r, s.fill.stop.g, s.fill.stop.b);
			}
			if (o.stroke && s.stroke.stop) {
				if (s.stroke.stop == "none") o.style.stroke = "none";
				else o.style.stroke = toRGB(s.stroke.stop.r, s.stroke.stop.g, s.stroke.stop.b);
			}
		}
		else {
			matrix[0] = s.w.start * o.w + inc * s.w.step * o.w;
			matrix[3] = s.h.start * o.h + inc * s.h.step * o.h;
			matrix[4] = s.x.start;
			matrix[5] = s.y.start;

			if (s.p) {
				matrix[4] += s.p.xy[inc].x;
				matrix[5] += s.p.xy[inc].y;
			}
			else {
				axi = 0; ayi = 0;
				if (s.r != undefined) {
					alfa = s.r.a.start + inc * s.r.a.step;
					axi = s.r.rx * (cosinus(alfa) - cosinus(s.r.a.start));
					ayi = s.r.ry * (sinus(alfa) - sinus(s.r.a.start));
				}
				matrix[4] += inc * s.x.step + axi;
				matrix[5] += inc * s.y.step + ayi;
			}

			alfa = o.a + s.o.start + inc * s.o.step;
			if (s.po != undefined) {
				if (s.p) alfa += s.p.a[inc];
				else {
					if (s.r != undefined) alfa += s.r.a.start + inc * s.r.a.step;
					alfa += s.po;
				}
			}
			this.calcOrientation(alfa, matrix);			
			o.setAttribute("transform", "matrix("+matrix+")");
		
			o.style.opacity = s.op.start + inc * s.op.step;
			if (o.txt) o.innerHTML = s.txt.start;

			if (o.fill && s.fill.start) {
				if (s.fill.start == "none") o.style.fill = "none";
				else o.style.fill = toRGB(s.fill.start.r + inc * s.fill.step.r, s.fill.start.g + inc * s.fill.step.g, s.fill.start.b + inc * s.fill.step.b);
			}
			if (o.stroke && s.stroke.start) {
				if (s.stroke.start == "none") o.style.stroke = "none";
				else o.style.stroke = toRGB(s.stroke.start.r + inc * s.stroke.step.r, s.stroke.start.g + inc * s.stroke.step.g, s.stroke.start.b + inc * s.stroke.step.b);
			}
		}
		if (m < sh.length-1 && inc == s.fi-1) ++this.objects[i].move;
	}

	// Send message to informate on every change
	this.animationSlider.dispatchEvent(new Event("motionChange"));
};

// Set animation frame
Animation.prototype.move = function(fr) {
	this.frame = fr;
	this.animationSlider.value = fr;
	this.updateObjects(true);
	if (this.stops.length > 0) {
		this.stop = 0;
		while (this.stop < this.stops.length && this.stops[this.stop].stop <= this.frame) ++this.stop;
	}
};

// Set next frame
Animation.prototype.step = function() {
	var a = this;
	if (this.pause) return;
	if (this.frame >= this.frames-1) {
		if (this.repeat != undefined) {
			this.halt();
			this.frame = this.frames;	// Last frame
			if (this.repeat == 0) {	// No more repeats
				this.updateObjects(false);
				this.animationSlider.value = this.frame;
			}
			else {
				if (this.waitRepeat > 0) {	// Wait on last frame before repeat
					this.updateObjects(false);
					this.animationSlider.value = this.frame;
					this.idTimer = setTimeout(function() { a.play(); }, this.waitRepeat * 1000 / this.speed);
				}
				else this.play();	// No wait (go directly to first frame)
				if (this.repeat > 0) --this.repeat;
			}
			return;
		}
		if (this.frame >= this.frames) {	// End of motion & no repeat
			this.halt();
			return;
		}
	}

	// Next frame
	++this.frame;
	this.updateObjects(false);
	this.animationSlider.value = this.frame;
	if (this.stop < this.stops.length) {
		if (this.stops[this.stop].stop == this.frame) {	// Stop
			this.halt();
			if (this.stops[this.stop].pause > 0) {	// Pause
				this.idTimer = setTimeout(function() { a.resume(); }, this.stops[this.stop].pause / this.speed);
			}
			++this.stop;
		}
	}
};

// Continue
Animation.prototype.resume = function() {
	var a = this;
	this.pause = false;
	clearTimeout(this.idTimer);
	this.playButton.innerHTML = '<path style="fill:#3020a8" d="M 4,40 C 5,41 7,43 24,43 41,43 43,41 44,40 45,39 47,37 47,24 47,11 45,9 44,8 43,7 41,5 24,5 7,5 5,7 4,8 3,9 1,11 1,24 1,37 3,39 4,40 Z M 21,14 V 34 H 15 V 14 Z M 33,14 V 34 H 27 V 14 Z" />';
	this.idTimer = setInterval(function() { a.step(); }, this.mpf / this.speed);
};

// Pause
Animation.prototype.halt = function() {
	this.pause = true;
	clearInterval(this.idTimer);
	this.playButton.innerHTML = '<path style="fill:#3020a8" d="M 4,40 C 5,41 7,43 24,43 41,43 43,41 44,40 45,39 47,37 47,24 47,11 45,9 44,8 43,7 41,5 24,5 7,5 5,7 4,8 3,9 1,11 1,24 1,37 3,39 4,40 Z M 17,35 V 13 L 34,24 Z" />';
};

// Button Play/Pause
Animation.prototype.play = function() {
	if (this.pause) {	// Play button clicked
		if (this.frame >= this.frames) this.move(0);	// Restart
		this.resume();
	}
	else this.halt();	// Pause button clicked
};


//*****************************************************************************
// GET IDs, VALUEs & REFs
//*****************************************************************************

Animation.prototype.getVal = function(o, a, def=undefined, min=undefined, max=undefined) {
	var val = o.getAttribute(a);

	if (!val || val == "") return def;
	val = parseFloat(val);
	if (isNaN(val)) return def;
	if (val < min || val > max) {
		this.errors.push("Value of '"+a+"' out of range ("+min+"-"+max+")");
		if (val < min) val = min;
		if (val > max) val = max;
	}
	return val;
};

Animation.prototype.getId = function(o, a) {
	var id = o.getAttribute(a);

	if (!id || id == "") return undefined;
	if (!id.charAt(0).match(/[A-Za-z]/)) {
		this.errors.push("First character of an identifier must be a letter ("+id+")");
		return undefined;
	}
	return id;
};

// TODO: verify if exists 'id' ???
Animation.prototype.getRef = function(o, a) {
	var id = o.getAttribute(a);

	if (!id || id == "") return undefined;
	if (id.charAt(0) != "#") {
		this.errors.push("References must begin with '#' ("+id+")");
		return undefined;
	}
	if (!id.charAt(1).match(/[A-Za-z]/)) {
		this.errors.push("First character of a reference must be a letter ("+id+")");
		return undefined;
	}
	return id.substr(1);
};

//
Animation.prototype.getValRef = function(o, a) {
	var val = this.getVal(o, a);

	if (!isNaN(val)) return val;
	return this.getRef(o, a);
};


//*****************************************************************************
// INIT MOVES
//*****************************************************************************

Animation.prototype.getAttr = function(o, attr) {
	var val = o.getAttribute(attr);
	if (!val || val == "") return undefined;
	val = parseFloat(val);
	if (isNaN(val)) return undefined;
	return val;
};

Animation.prototype.emptyAttr = function(s, a) {
	return s[a+'i'] == undefined && s[a+'1'] == undefined;
};

Animation.prototype.empty = function(s) {
	return (this.emptyAttr(s, 'x') && this.emptyAttr(s, 'y') &&
			this.emptyAttr(s, 'w') && this.emptyAttr(s, 'h') &&
			this.emptyAttr(s, 'o') && this.emptyAttr(s, 'op') &&
			this.emptyAttr(s, 'fill') && this.emptyAttr(s, 'stroke') &&
			this.emptyAttr(s, 'txt') && s.r == undefined && s.p == undefined);
};

Animation.prototype.undefAttr = function(s, a) {
	return s[a+'0'] == undefined && s[a+'i'] == undefined && s[a+'1'] == undefined;
};

Animation.prototype.undef = function(s) {
	return (this.undefAttr(s, 'x') && this.undefAttr(s, 'y') &&
			this.undefAttr(s, 'w') && this.undefAttr(s, 'h') &&
			this.undefAttr(s, 'o') && this.undefAttr(s, 'op') &&
			this.undefAttr(s, 'fill') && this.undefAttr(s, 'stroke') &&
			this.undefAttr(s, 'txt') && s.r == undefined && s.p == undefined);
};

Animation.prototype.notEmpty = function(s) {
	return (s.fi != 0 || !s.undef);
};


//*****************************************************************************
// ANIMATION OBJECT & FUNCTIONS
//*****************************************************************************

// Detect syntax & logic errors
Animation.prototype.cleanMotion = function() {
	var i, j, id, r2, result;

	// Motions with attribute 'href'
	result = this.image.querySelectorAll("motion[href]");
	for (i = 0; i < result.length; i++) {
		// Remove 'id' attribute in motions with attribute 'href'
		if (result[i].hasAttribute("id")) {
			this.errors.push("Motion with 'href' and 'id' attributes: 'id="+result[i].getAttribute("id")+"' removed");
			result[i].removeAttribute("id");
		}
		// Detect incorrect 'href'
		id = this.getRef(result[i], "href");
		if (!id || !this.image.getElementById(id)) {
			this.errors.push("Motion with 'href=#"+id+"' removed: no SVG object with 'id="+id+"'");
			result[i].remove();
		}
		else {
			// Detect duplicated 'href'
			for (j = 0; j < i; j++) {
				if (id == this.getRef(result[j], "href")) {
					this.errors.push("Motion with 'href=#"+id+"' removed: 'href' duplicated");
					result[i].remove();
				}
			}
		}
	}

	// Motions with attribute 'id'
	result = this.image.querySelectorAll("motion[id]");
	for (i = 0; i < result.length; i++) {
		// Detect incorrect 'id' 
		id = this.getId(result[i], "id");
		if (!id) {
			if (result[i].getAttribute("id") != "") this.errors.pop();
			this.errors.push("Motion with 'id="+result[i].getAttribute("id")+"' removed: first character of an identifier must be a letter");
			result[i].remove();
			continue;
		}
		// Remove 'id' from <shift> in motions with 'id' attribute
		r2 = result[i].getElementsByTagName("shift");
		for (j = 0; j < r2.length; j++) {
			if (r2[j].hasAttribute("id")) {
				this.errors.push("Motion with 'id="+id+"': attribute 'id="+r2[j].getAttribute("id")+"' removed in inner 'shift'");
				r2[j].removeAttribute("id");
			}
		}
	}

	// Remove incorrect 'use'
	result = this.image.querySelectorAll("shift[use]");
	for (i = 0; i < result.length; i++) {
		id = this.getRef(result[i], "use");
		if (!id) {
			if (result[i].getAttribute("use") != "") this.errors.pop();
			this.errors.push("'use="+result[i].getAttribute("use")+"' in 'shift' removed: references must begin with '#' and first character must be a letter");
			result[i].removeAttribute("use");
		}
		else {
			r2 = this.image.getElementById(id);
			if (!r2 || r2.tagName != "motion") {
				this.errors.push("'use=#"+id+"' in 'shift' removed: no <motion> object with 'id="+id+"'");
				result[i].removeAttribute("use");
			}
		}
	}
};

// ------------------------------------

Animation.prototype.getValN = function(s, sh, attr, n) {
	s[attr+'0'] = this.getAttr(sh, attr+'0');
	s[attr+'1'] = this.getAttr(sh, attr+'1');
	if (n == 3) s[attr+'i'] = this.getAttr(sh, attr+'i');
};

Animation.prototype.setLinearMotion = function(s, sh) {
	// Get X & Y (ini & (inc | fin))
	this.getValN(s, sh, 'x', 3);
	this.getValN(s, sh, 'y', 3);

	// Get D & A --> convert to inc
	var d = this.getVal(sh, "d");
	var a = this.getVal(sh, "a0");
	if (d != undefined && a != undefined) {
		s.x1 = undefined;
		s.y1 = undefined;
		s.xi = d * cosinus(a);
		s.yi = d * sinus(a);
	}

	var rx = this.getVal(sh, "rx");
	var ai = this.getVal(sh, "ai");
	if (rx == undefined) {
		if (ai != undefined) {
			// Convert to angular move
			// TODO: check when ai = -0.2 & ai = -0.7
			s.ai = Math.round(ai) % 360;
			if (Math.abs(s.ai) >= 1 && Math.abs(s.ai) <= 359) s.ai = ai;
			else s.ai = undefined;
		}
	}
	else {
		// Angular move
		s.r = {};
		s.r.rx = rx;
		s.r.ry = this.getVal(sh, "ry");
		this.getValN(s.r, sh, "a", 3);
		if (this.emptyAttr(s.r, "a") || (s.r.rx == 0 && (s.r.ry == 0 || s.r.ry == undefined))) s.r = undefined;
		else {
			s.x1 = undefined;
			s.y1 = undefined;
			s.xi = 0;
			s.yi = 0;
		}
	}
};

Animation.prototype.setPathMotion = function(s, sh) {
	var pid = this.getRef(sh, "p");
	if (!pid) return;

	var p = this.image.getElementById(pid);
	if (!p || p.tagName != "path") {
		this.errors.push("Path '"+pid+"' not found");
	}
	else {
		s.r = undefined;
		s.x1 = undefined;
		s.y1 = undefined;
		s.xi = 0;
		s.yi = 0;
  	}

  	s.p = {};
  	s.p.id = pid;
};

Animation.prototype.setSize = function(s, sh) {
	this.getValN(s, sh, 'w', 3);
	this.getValN(s, sh, 'h', 3);
	if (s.h0 == undefined) s.h0 = s.w0;
	if (s.h1 == undefined) s.h1 = s.w1;
	if (s.hi == undefined) s.hi = s.wi;
};

Animation.prototype.setOrientation = function(s, sh) {
	this.getValN(s, sh, 'o', 3);
};

Animation.prototype.setOpacity = function(s, sh) {
	this.getValN(s, sh, 'op', 2);
	if (s.op0 < 0) s.op0 = 0;
	if (s.op0 > 1) s.op0 = 1;
	if (s.op1 < 0) s.op1 = 0;
	if (s.op1 > 1) s.op1 = 1;
};

Animation.prototype.setColors = function(s, sh) {
	s.fill0 = sh.getAttribute('fill0');
	s.fill1 = sh.getAttribute('fill1');
	s.stroke0 = sh.getAttribute('stroke0');
	s.stroke1 = sh.getAttribute('stroke1');
	if (toColor(s.fill0) == undefined) s.fill0 = undefined;
	if (toColor(s.fill1) == undefined) s.fill1 = undefined;
	if (toColor(s.stroke0) == undefined) s.stroke0 = undefined;
	if (toColor(s.stroke1) == undefined) s.stroke1 = undefined;
};

// Get 'use'
Animation.prototype.getUse = function(href, sh, o) {
	var mot = this.image.getElementById(href);
	// Detect recursive loop
	if (this.useLoop.indexOf(href) >= 0) {
		this.useLoop.push(href);
		this.errors.push("Loop in 'use' with 'id' sequence: "+this.useLoop);
		this.useLoop = [];
	}
	else {
		this.useLoop.push(href);
		var j, l, sub, n = this.sub.findIndex(function(e) { return e.id == this; }, href);
		if (n < 0) {
			sub = {id:href,shifts:[],eshifts:[]};
			this.getShifts(mot, sub);
			this.sub.push(sub);
		}
		else sub = this.sub[n];

		// TODO: detect 'use' with span = 0

		var repe = this.getVal(sh, "repeat", 1, 1);
		var po = sh.getAttribute("po");
		repe = Math.round(repe);
		for (var i = 0; i < repe; i++) {
			l = o.shifts.length;
			for (j = 0; j < sub.shifts.length; j++) {
				o.shifts.push(Object.assign({},sub.shifts[j]));
				o.shifts[l].use = href;
				o.shifts[l].repe = i;
				++l;
			}
			if (po != undefined) {
				l -= sub.shifts.length;
				for (j = 0; j < sub.shifts.length; j++) {
					o.shifts[l].po = po;
					++l;
				}
			}
		}
		this.useLoop.pop();
	}
};

// Get shifts from <motion>
Animation.prototype.getShifts = function(motion, o) {
	var i, s, sh, t, sid, swait;
	var shifts = motion.getElementsByTagName("shift");
	for (i = 0; i < shifts.length; i++) {
		sh = shifts[i];
		// Id
		sid = this.getId(sh, "id");
		if (sid) o.shifts.push({id:sid,fi:0,xi:0,yi:0,undef:true});

		// Use
		var href = this.getRef(sh, "use");
		if (href) this.getUse(href, sh, o);

		// Shift
		s = {};
		this.setLinearMotion(s, sh);
		this.setPathMotion(s, sh);
		this.setSize(s, sh);
		this.setOrientation(s, sh);
		this.setOpacity(s, sh);
		this.setColors(s, sh);
	  	s.po = sh.getAttribute("po");
	  	s.txt0 = sh.getAttribute("txt");
	  	//if (s.txt0) o.txt = "";

		// TODO: angular move only with <span> or <steps>???
		//	or change speed(pixels/second) by aspeed(angle/second)
		//  or, if speed, calculate s.d = 2 * Math.PI * s.r * s.ai / 360
		//		How to calculate length of ellipse if rx != ry? (by series or aproximation, not exact)
		//		s.d = Math.PI * (3*(s.rx + s.ry) - Math.sqrt((3*s.rx + s.ry)*(s.rx + 3*s.ry));

		t = this.getValRef(sh, "span");
		if (!t) t = 0;
		if (!isNaN(t)) {
			t = Math.floor(t * this.fps);
			if (t < 0) {
				this.errors.push("'span' with value less than 0 (" + this.getValRef(sh, "span") + ") removed");
				continue;
			}
		}
		s.fi = t;
		if (this.undef(s)) s.undef = true;
		/*
		if (sh.hasAttribute("speed")) {
			s.speed = parseFloat(sh.getAttribute("speed"));
			if (s.rx > 0) t = s.ai / s.speed;
			else t = Math.sqrt((s.inc * s.inc) + (s.yi * s.yi)) / s.speed;
			s.f0 = d + t;
			d += t;
		}
		*/
		if (this.notEmpty(s)) {
			var repe = this.getVal(sh, "repeat", 1, 1);
			if (href || isNaN(t) || t <= 0) repe = 1;
			repe = Math.round(repe);
			for (var j = 0; j < repe; j++) {
				s.repe = j;
				o.shifts.push(Object.assign({},s));
			}
		}
	}
};

Animation.prototype.initMotion = function() {
	var o, s, p;
	var motions = this.image.getElementsByTagName("motion");

	var i, j;
	for (i = 0; i < motions.length; i++) {
		if (motions[i].hasAttribute("stop")) {
			var sp = {};
			sp.stop = this.getValRef(motions[i], "stop");
			if (sp.stop) {
				if (!isNaN(sp.stop)) sp.stop = Math.floor(sp.stop * this.fps);
				sp.pause = this.getVal(motions[i], "pause", 0);
				sp.pause = Math.floor(sp.pause * 1000);
				sp.href = undefined;
				if (sp.pause >= 0 && (isNaN(sp.stop) || sp.stop > 0)) this.stops.push(sp);
				else {
					if (sp.stop <= 0) this.errors.push("Stop with value less than zero ("+(sp.stop/this.fps)+")");
					if (sp.pause < 0) this.errors.push("Stop with pause less than zero ("+(sp.pause/1000)+")");
				}
			}
		}
		var href = this.getRef(motions[i], "href");
		if (href) {
			var obj = this.image.getElementById(href);
			// Init motion object
			o = {};
			o.href = href;
			o.obj = obj;
			// Init transform matrix
			var t = o.obj.transform.baseVal;
			// ATENCIÓ: transform.baseval.length no funciona en Edge
			//if (t.length == 0) o.obj.setAttribute("transform", "matrix(1,0,0,1,0,0)");
			if (t.numberOfItems == 0) o.obj.setAttribute("transform", "matrix(1,0,0,1,0,0)");
			t.consolidate();

			this.useLoop = [];	// To detect 'use' recursive loops
			o.shifts = [];
			o.eshifts = [];	// Shifts with duration = 0
			this.getShifts(motions[i], o);
			if (o.shifts.length > 0) this.objects.push(o);
		}
	}
};

// ------------------------------------

Animation.prototype.checkKeyPoints = function() {
	var i, j, s, t, id, final;
	var o = this.objects, p = this.stops, ids = this.labels;

	do {
		this.waitLocks = [];
		var action = false;
		final = true;
		for (i = 0; i < o.length; i++) {
			s = o[i].shifts;
			t = 0;
			for (j = 0; j < s.length; j++) {
				if (s[j].fi) {
					if (isNaN(s[j].fi)) {
						id = ids.findIndex(function(e) { return e.id == this; }, s[j].fi);
						if (id >= 0) {
							s[j].fi = ids[id].f0 - t;
							if (s[j].fi < 0) {
								this.errors.push("'span=#"+ids[id].id+"' after its reference in motion 'href=#"+o[i].href+"': 'span' set to 0");
								s[j].fi = 0;
							}
							s[j].label = ids[id].id;
							action = true;
						}
						else {
							this.waitLocks.push(s[j].fi);
							final = false;
							break;
						}
					}
				}
				t += s[j].fi;
				if (s[j].id) {
					ids.push({id:s[j].id,f0:t,obj:o[i].href});
					action = true;
				}
				if (j > 0 && !this.notEmpty(s[j])) {
					s.splice(j,1);
					--j;
				}
			}
		}
	} while (action);

	// Error
	if (!final) {
		this.errors.push("ERROR: wait locks ("+this.waitLocks+")");
		for (i = 0; i < o.length; i++) {
			s = o[i].shifts;
			for (j = 0; j < s.length; j++) {
				if (isNaN(s[j].fi)) {
					s.splice(j,1);
					--j;
				}
			}
		}
	}

	// Set time of named stops
	for (i = 0; i < p.length; i++) {
		if (isNaN(p[i].stop)) {
			id = ids.findIndex(function(e) { return e.id == this; }, p[i].stop);
			if (id >= 0) {
				p[i].stop = ids[id].f0;
				p[i].href = ids[id].id;
			}
		}
	}
	// Sort stops
	p.sort(function(a,b) { return (a.stop > b.stop ? 1 : (a.stop < b.stop ? -1 : 0)); });
	// Remove duplicated stops
	for (i = 0; i < p.length; i++) {
		if (i > 0 && p[i].stop == p[i-1].stop) {
			p.splice(i,1);
			--i;
		}
	}

	ids.sort(function(a,b){return (a.f0 > b.f0 ? 1 : (a.f0 < b.f0 ? -1 : 0));});
};

// ------------------------------------

Animation.prototype.calcDistance = function(s) {
	var xi = s.x.stop - s.x.start, yi = s.y.stop - s.y.start;
	return Math.sqrt((xi * xi) + (yi * yi));
}

// Calc rotation
Animation.prototype.calcRotation = function(s) {
	var i;
	var steps = s.fi;
	var xy = s.p.xy;

	s.p.a = [];
	var ar = s.p.a;
	var incx, incy;
	ar.push(Math.atan2((xy[1].y - xy[0].y), (xy[1].x - xy[0].x)) * 180 / Math.PI);
	for (i = 1; i < steps; i++) {
		incx = xy[i+1].x - xy[i-1].x;
		incy = xy[i+1].y - xy[i-1].y;
		if (incx == 0 && incy == 0) {
			// Correct 180º path angle
			//ar.push(undefined);
			incx = xy[i+1].x - xy[i].x;
			incy = xy[i+1].y - xy[i].y;
		}
		//else ar.push(Math.atan2(incy, incx) * 180 / Math.PI); 
		ar.push(Math.atan2(incy, incx) * 180 / Math.PI); 
	}
	ar.push(Math.atan2((xy[i].y - xy[i-1].y), (xy[i].x - xy[i-1].x)) * 180 / Math.PI);
	//for (i = 1; i < steps; i++) if (ar[i] == undefined) ar[i] = (ar[i-1] + ar[i+1]) / 2;
	s.o.stop += ar[steps];
};

// Calc path (& rotation)
Animation.prototype.calcPath = function(s, sprev) {
	var i;
	var steps = s.fi;

	s.p.xy = [];
	var xy = s.p.xy;
	var p = this.image.getElementById(s.p.id);
	var l = p.getTotalLength();
	var p0 = p.getPointAtLength(0);

	for (i = 0; i <= steps; i++) xy.push(p.getPointAtLength(i*l/steps));
	for (i = 0; i <= steps; i++) {
		xy[i].x -= p0.x;
		xy[i].y -= p0.y;
	}
	
	s.x.stop = s.x.start + xy[steps].x;
	s.y.stop = s.y.start + xy[steps].y;
	
	// Rotation (slope)
	if (s.po != undefined) this.calcRotation(s);
};

// Calc angular
Animation.prototype.calcAngular = function(s) {
	if (s.r.ry == undefined) s.r.ry = s.r.rx;
	if (s.po != undefined) {
		s.po = 90;
		s.o.stop += s.r.a.stop + s.po;
	}
	var axi = s.r.rx * (cosinus(s.r.a.stop) - cosinus(s.r.a.start));
	var ayi = s.r.ry * (sinus(s.r.a.stop) - sinus(s.r.a.start));
	s.x.stop = s.x.start + axi;
	s.y.stop = s.y.start + ayi;
	s.x.step = 0;
	s.y.step = 0;
}

// Set Start, Stop & Step (X, Y, O, OP)
Animation.prototype.setSSS = function(a, s, sprev, fi) {
	s[a] = {};
	s[a].start = s[a+'0'] != undefined ? s[a+'0'] : sprev[a].stop;
	s[a].stop = s[a].start;
	if (s[a+'1'] != undefined) s[a].stop = s[a+'1'];
	if (s[a+'i'] != undefined) s[a].stop = s[a].start + s[a+'i'];
	s[a].step = (s[a].stop - s[a].start) / fi;
};

//TODO:
// Set Start, Stop & Step (Fill & Stroke)
Animation.prototype.setFSColor = function(a, s, sprev, fi) {
	s[a] = {};
	s[a].start = toColor(s[a+'0']);
	s[a].stop = toColor(s[a+'1']);
	if (s[a].start == undefined && sprev[a] && sprev[a].stop != undefined) {
		if (sprev[a].stop == "none") s[a].start = "none";
		else s[a].start = Object.assign({},sprev[a].stop);
	}
	if (s[a].start != undefined) {
		s[a].step = {};
		if (s[a].stop == undefined) {
			if (s[a].start == "none") s[a].stop = "none";
			else s[a].stop = Object.assign({},s[a].start);
		}
		if (s[a].start == "none" || s[a].stop == "none") {
			s[a].step.r = 0;
			s[a].step.g = 0;
			s[a].step.b = 0;
		}
		else {
			s[a].step.r = (s[a].stop.r - s[a].start.r) / s.fi;
			s[a].step.g = (s[a].stop.g - s[a].start.g) / s.fi;
			s[a].step.b = (s[a].stop.b - s[a].start.b) / s.fi;
		}
	}
};

Animation.prototype.calc = function(s, sprev) {
	// X & Y
	this.setSSS('x', s, sprev, s.fi);
	this.setSSS('y', s, sprev, s.fi);

	// W & H
	this.setSSS('w', s, sprev, s.fi);
	this.setSSS('h', s, sprev, s.fi);

	// O & Op
	this.setSSS('o', s, sprev, s.fi);
	this.setSSS('op', s, sprev, s.fi);

	// Fill & Stroke
	this.setFSColor('fill', s, sprev, s.fi);
	this.setFSColor('stroke', s, sprev, s.fi);

	// Text
	s.txt = {};
	if (s.txt0 == undefined) s.txt.start = s.txt.stop = sprev.txt.stop;
	else s.txt.start = s.txt.stop = s.txt0;

	//
	if (s.r == undefined && s.ai == undefined && s.p == undefined && s.po != undefined && this.calcDistance(s) >= 1) {
		var xi = s.x.stop - s.x.start, yi = s.y.stop - s.y.start;
		s.po = Math.atan2(yi, xi) * 180 / Math.PI;
		s.o.stop += s.po;
	}

	// Angular motion
	if (s.r != undefined) {
		s.r.a = {};
		if (s.r.a0 == undefined) s.r.a.start = 0;
		else s.r.a.start = s.r.a0;
		if (s.r.ai != undefined) s.r.a.stop = s.r.a.start + s.r.ai;
		else s.r.a.stop = s.fin;
		s.r.a.step = (s.r.a.stop - s.r.a.start) / s.fi;
		this.calcAngular(s);
	}
	else if (s.ai != undefined && this.calcDistance(s) >= 1) {
		// Central angle of an arc: calculate radius, a0, ai
		// (convert linear motion to angular motion)
		var xi = s.x.stop - s.x.start, yi = s.y.stop - s.y.start;
		var a = Math.atan2(yi, xi) * 180 / Math.PI;
		s.r = {};
		s.r.rx = (this.calcDistance(s)/2) / Math.sin(s.ai * Math.PI / 360);
		s.r.ry = s.r.rx;
		s.r.a = {};
		s.r.a.start = a - 90 - s.ai/2;
		s.r.a.stop = s.r.a.start + s.ai;
		s.r.a.step = (s.r.a.stop - s.r.a.start) / s.fi;
		this.calcAngular(s);
	}

	if (s.p) this.calcPath(s, sprev);
};

// Init Fill & Stroke
Animation.prototype.initFSColor = function(a, o, s0) {
	var v = undefined, cs;

	cs = getComputedStyle(o);
	v = toColor(cs[a]);
	if (v == undefined) v = toColor(o.getAttribute(a));

	s0[a] = {};
	/*if (v == undefined) s0[a] = undefined;
	else */if (v == "none") s0[a].stop = "none";
	else s0[a].stop = Object.assign({},v);
}

// Init
Animation.prototype.init = function(o, s) {
	//var bb = o.getBBox();
	//s.cx = (bb.x + bb.width/2) * s.m.a;
	//s.cy = (bb.y + bb.height/2) * s.m.d;
	
	var s0 = {};
	s0.f0 = 0;
	s0.fi = 0;
	s0.x = {}; s0.x.stop = o ? o.tm.e : 0;
	s0.y = {}; s0.y.stop = o ? o.tm.f : 0;
	s0.w = {}; s0.w.stop = 1;
	s0.h = {}; s0.h.stop = 1;
	s0.o = {}; s0.o.stop = 0;
	s0.op = {}; s0.op.stop = o ? parseFloat(getComputedStyle(o).opacity) : 1;
	s0.txt = {};
	if (o && o.txt) s0.txt.stop = o.innerHTML;
	if (o && o.fill) this.initFSColor('fill', o, s0);
	if (o && o.stroke) this.initFSColor('stroke', o, s0);
	this.calc(s, s0);
};

Animation.prototype.setStopFS = function(a, s, sprev) {
	//sprev[a] = {};
	//if (s[a] == undefined) sprev[a] = s[a];
	/*else */if (s[a].stop == "none") sprev[a].stop = "none";
	else sprev[a].stop = Object.assign({},s[a].stop);
}

Animation.prototype.setStop = function(s, sprev) {
	sprev.x.stop = s.x.stop;
	sprev.y.stop = s.y.stop;
	sprev.w.stop = s.w.stop;
	sprev.h.stop = s.h.stop;
	sprev.o.stop = s.o.stop;
	sprev.op.stop = s.op.stop;
	sprev.txt.stop = s.txt.stop;
	this.setStopFS('fill', s, sprev);
	this.setStopFS('stroke', s, sprev);
};

// Detect if the object changes Fill, Strong or Text
Animation.prototype.enableFST = function(o, s) {
	o.fill = false;
	o.stroke = false;
	o.txt = false;
	for (var i = 0; i < s.length; i++) {
		if (s[i].fill0 != undefined || s[i].fill1 != undefined) o.fill = true;
		if (s[i].stroke0 != undefined || s[i].stroke1 != undefined) o.stroke = true;
		if (s[i].txt0 != undefined) o.txt = true;
	}
}

// TODO: if (!o) ... (it's a submotion)
Animation.prototype.initShiftsObj = function(o, s, es) {
	var i;

	// Calc original angle & size
	s[0].f0 = 0;
	if (o) {
		o.tm = o.transform.baseVal[0].matrix;
		o.a = dec1(Math.atan2(o.tm.b, o.tm.a) * 180 / Math.PI);
		o.w = o.tm.a / cosinus(o.a);
		o.h = o.tm.d / cosinus(o.a);
		this.enableFST(o, s);
	}
	this.init(o, s[0]);

	// Calculate steps
	for (i = 1; i < s.length; i++) {
		s[i].f0 = s[i-1].f0 + s[i-1].fi;
		s[i].m = this.image.createSVGMatrix();
		var steps = s[i].fi;
		if (steps == 0) {
			s[i].fi = 1;
			this.calc(s[i], s[i-1]);
			s[i].fi = 0;
			this.setStop(s[i], s[i-1]);
			es.push(s[i]);
			s.splice(i,1);
			--i;
		}
		else this.calc(s[i], s[i-1]);
	}
	if (s.length > 0) return s[s.length-1].f0 + s[s.length-1].fi;
	else return 0;
};

Animation.prototype.initShifts = function() {
	var o, f0;
	// Submotions
	for (o of this.sub) this.initShiftsObj(o.obj, o.shifts, o.eshifts);
	// Objects motions
	this.frames = 0;
	for (o of this.objects) {
		//if (o.txt == "") o.obj.txt = o.obj.innerHTML;
		f0 = this.initShiftsObj(o.obj, o.shifts, o.eshifts);
		if (this.frames < f0) this.frames = f0;
	}

	this.mpf = 1000 / this.fps;
	this.duration = this.frames / this.fps;
	this.pause = true;
};

// ------------------------------------

Animation.prototype.createPlayer = function(img) {
	var hide = this.noPlay ? " class='hide' " : " " ;
	var a = this;

	this.animationSlider = createElementFromHTML('<input'+hide+'type="range" min="0" max="100" value="0" style="vertical-align:middle;">');
	this.animationSlider.addEventListener('input', function() { a.move(this.value); }, false);
	this.animationSlider.addEventListener('change', function() { a.move(this.value); }, false);
	this.animationSlider.addEventListener('mousedown', function() { a.halt(); }, false);

	this.playButton = createElementFromHTML('<svg class="pbutton '+(this.noPlay ? " hide" : "")+'" viewbox="0 0 48 48"><path style="fill:#3020a8" d="M 4,40 C 5,41 7,43 24,43 41,43 43,41 44,40 45,39 47,37 47,24 47,11 45,9 44,8 43,7 41,5 24,5 7,5 5,7 4,8 3,9 1,11 1,24 1,37 3,39 4,40 Z M 17,35 V 13 L 34,24 Z" /></svg>');
	this.playButton.addEventListener('click', function() { a.play(); }, false);

	// ATENCIÓ: img.after(...) encara és experimental i no funciona en Edge.
	//img.after(this.animationSlider);
	//img.after(this.playButton);
	img.parentNode.insertBefore(this.animationSlider, img.nextSibling);
	img.parentNode.insertBefore(this.playButton, img.nextSibling);
	sliderW(this);
	if (!this.noPlay) img.insertAdjacentHTML('afterend', '<br>');
	this.animationSlider.max = this.frames;
};

// ------------------------------------

// Class
function Animation(img, ndx) {
	this.fps = 25;				// frames per second (10 - 100)
	this.autoStart = undefined;	// begin animation automaticaly X miliseconds after load image
	this.repeat = undefined;	// number of repetitions: 0 = infinite
	this.waitRepeat = undefined;// wait time between repetitions
	this.noPlay = false;		// if 'true', don't show player button & slider
	this.speed = 1;				// 

	this.pause = true;
	this.stop = 0;
	this.frame = 0;

	this.frames = undefined;
	this.duration = undefined;
	this.mpf = undefined;

	this.labels = [];
	this.stops = [];
	this.objects = [];	// objects moves
	this.sub = [];		// subMoves
	this.errors = [];	// to show errors
	this.useLoop = [];	// to detect recursive loops calling subMoves
	this.waitLocks = [];// to detect wait locks

	this.playButton = undefined;
	this.animationSlider = undefined;
	this.idTimer = undefined;

	this.image = (img.contentDocument ? img.contentDocument.documentElement : img);	// svg inside <object> or svg as is

	var result = this.image.querySelectorAll("motionconfig");
	for (var i = 0; i < result.length; i++) {
		this.fps = this.getVal(result[i], "fps", 25, 10, 100);
		if (result[i].hasAttribute("noplay")) this.noPlay = true;
		if (result[i].hasAttribute("autostart")) this.autoStart = this.getVal(result[i], "autostart", 0, 0);
		if (result[i].hasAttribute("repeat") || result[i].hasAttribute("waitrepeat")) {
			this.repeat = Math.floor(this.getVal(result[i], "repeat", -1, -1));
			this.waitRepeat = this.getVal(result[i], "waitrepeat", 0, 0);
		}
		if (result[i].hasAttribute("speed")) this.speed = this.getVal(result[i], "speed", 1, 0.1, 10);
	}

	console.log("MOTION "+ndx);
	this.cleanMotion();
	this.initMotion();
	this.checkKeyPoints();
	this.initShifts();
	for (var i = 0; i < this.errors.length; i++) console.error(this.errors[i]);

	this.createPlayer(img);
	console.log(dec1(this.duration)+"s   "+this.frames+"fr   "+this.fps+"fps   "+decN(1/this.fps,3)+"s/fr\n"+"noPlay:"+this.noPlay+"   autoStart:"+(this.autoStart || "no")+"\nrepeat:"+(this.repeat || "no")+"   waitRepeat:"+(this.waitRepeat || 0));
	console.log("------------------------");
	this.move(0);

	var a = this;
	if (this.autoStart != undefined) this.idTimer = setTimeout(function() { a.play(); }, this.autoStart * 1000 / this.speed);
}


//*****************************************************************************
// INIT ANIMATION ON LOAD
//*****************************************************************************

function initAnimation(img) {
	// TODO: detect if (img o img.contentDocument.documentElement).nodeName == "svg"
	if (animations.length == 0) {
		window.addEventListener("resize", resizeSlider);
		var url = window.location.href;
		offline = !url.startsWith("http");
	}

	var animation = new Animation(img, animations.length);
	animations.push(animation);
}

