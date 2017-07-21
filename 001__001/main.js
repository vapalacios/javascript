var calcularDni = function(numeroDni){
	var letra = "";
	if((typeof numeroDni) == "string"){
		return console.log("Debes introducir un valor numérico");
	}
	var indice = numeroDni%23;
	var tablaLetras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
	letra = tablaLetras[indice];
	return letra;
};

console.log("La letea del DNI 12312312K es: ");
console.log(calcularDni(12312312));
console.log("La letea del DNI 78163312C es: ");
console.log(calcularDni(78163312));
console.log("La letea del DNI 12345678Z es: ");
console.log(calcularDni(12345678));