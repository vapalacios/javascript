function loadScript(src){
	var promise = new Promise(function(resolver, rechazar){
		var elem = document.createElement("script");
		elem.setAttribute("type", "text/javascript");
		elem.setAttribute("src", src);
		elem.onload = function(){ resolver(src)};
		elem.onerror = function(){ rechazar("Error al cargar: " + src)};
		document.documentElement.insertBefore(elem, null);
	});
	return promise;
}

function testPromise(){
	loadScript("https://code.jquery.com/jquery-3.2.1.slim.min.js").then(
		function(result){
			console.log("Genial, hemos cargado: " + result);
			console.log(jQuery);
		}
	).catch(
		function(error){
			console.error(error);
		}
	);
}

function testPromiseHandlingErrorInside(){
	loadScript("https://code.jquery.com/jquery-3.2.1.slim.min.j").then(
		function(result){
			console.log("Genial, hemos cargado: " + result);
			console.log(jQuery);
		},
		function(error){
			console.error(error);
		}
	);
}

function testMultiplePromise(){
	//cargamos lodash
	var promise1 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.j").catch((error)=> {console.error(error); throw error;});
	//cargamos jquery
	var promise2 = loadScript("https://code.jquery.com/jquery-3.2.1.slim.min.js").catch((error)=> console.error(error));

	//esperamos a que se resuelvan todas las promesas
	Promise.all([promise1, promise2]).then(
		function(result){
			console.log("Genial, hemos cargado: " + result);
			console.log(result);
		},
		function(error){
			console.error("Alguna promise ha fallado");
			console.error(error);
		}
	);
}