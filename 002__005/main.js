function loadScript(src, callback){
	var elem = document.createElement("script");
	elem.setAttribute("type", "text/javascript");
	elem.setAttribute("src", src);
	elem.onload = function(){ callback(src)};
	document.documentElement.insertBefore(elem, null);
}

function miCallBack(src){
	console.log("Genial, hemos cargado: " + src);
	console.log(jQuery);
}

function testCallBack(){
	loadScript("https://code.jquery.com/jquery-3.2.1.slim.min.js", miCallBack);
}



/* Sin CallBack */

function loadScripts(src){
	var elem = document.createElement("script");
	elem.setAttribute("type", "text/javascript");
	elem.setAttribute("src", src);
	document.documentElement.insertBefore(elem, null);
	console.log("Genial, hemos cargado: " + src);
	console.log(jQuery);
}

function testCallBacks(){
	loadScripts("https://code.jquery.com/jquery-3.2.1.slim.min.js");
}


/* Callback con control de errores */

function loadScripting(src, callback){
	var elem = document.createElement("script");
	elem.setAttribute("type", "text/javascript");
	elem.setAttribute("src", src);
	elem.onload = function(){ callback(null, src)};
	elem.onerror = function() { callback("Error al cargar: " + src, null)};
	document.documentElement.insertBefore(elem, null);
}

function miCallBacks(error, src){
	if(error){
		console.error(error);
	}else{
		console.log("Genial, hemos cargado: " + src);
		console.log(jQuery);
	}
}

function testCallBacking(){
	loadScripting("https://code.jquery.com/jquery-3.2.1.slim.min.js", miCallBacks);
}

function testCallBackError(){
	loadScripting("https://code.jquery.com/jquery-3.2.1.slim.min.j", miCallBacks);
}
