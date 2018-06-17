var funcionSuperLenta = function(){
	var acumulado = 0;

	for(var i = 0; i<1000; i++){
		acumulado = acumulado + 1;
		console.log(acumulado);
	}
	return acumulado;
}

var result = funcionSuperlenta();

alert("Fin. " + result);

Callback


var funcionSuperLenta = function(miCallBack){
	var acumulado = 0;

	for(var i = 0; i<100000; i++){
		acumulado = acumulado + 1;
		console.log(acumulado);
	}
	miCallBack(acumulado);
}

var miCallBack = function(result){
	alert("Fin. " + result);
}