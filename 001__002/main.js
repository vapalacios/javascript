var calcularDni = function(numeroDni){
	var letra = "";
	var tablaLetras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
	var r = true;
	var fill = "";
	if((typeof numeroDni) == "string"){
		r = false;
		letra = "Debes introducir un valor numerico";
	}else if(numeroDni.toString().length < 8){
		r = false;
		letra = "Debes introducir un numero de 8 cifras";
	}else if(numeroDni < 0){
		r = false;
		letra = "Debes introducir un valor positivo";
	}

	if(r){
		letra = tablaLetras[numeroDni%23];
	}
	
	return letra;
};

console.log("La letra del DNI 12312312K es: ");
console.log(calcularDni("a"));
console.log("La letra del DNI 78163312C es: ");
console.log(calcularDni(8163312));
console.log("La letra del DNI 12345678Z es: ");
console.log(calcularDni(-111111111));