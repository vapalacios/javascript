/*
vehiculo - velocidad []
motocicleta
autos
carrera
*/
var marca = ["Chevrolet", "Toyota", "Mazda", "Suzuki", "Yamaha"];
var modelo = ["Optra", "Corolla", "6", "Enduro", "1000cc"];
var tipo = ["motocicleta", "coche"];
var imagen = ["vehiculos/vehiculo1.png", "vehiculos/vehiculo2.png", "vehiculos/vehiculo3.png", "vehiculos/vehiculo4.png", "vehiculos/vehiculo5.png", "vehiculos/vehiculo6.png", "vehiculos/vehiculo7.png", "vehiculos/vehiculo8.png", "vehiculos/vehiculo9.png", "vehiculos/vehiculo10.png"];

function Vehiculo(){
	this.marca = "";
	this.modelo = "";
	this.tipo = "";
	this.velocidad = 100;
	this.imagen = "";
}

Vehiculo.prototype.acelerar = function(){
	var _aceleracion = this.getRandomInteger(100, 200);
	this.velocidad += this.velocidad < 200? _aceleracion: 0;
	return _aceleracion;
}

Vehiculo.prototype.getRandomInteger = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

Vehiculo.prototype.generarDatosAleatorio = function(array) {
    var aleatorio = Math.floor(Math.random() * array.length);
    return array[aleatorio];
}

Vehiculo.prototype.initVehiculo = function(){
	this.marca = this.generarDatosAleatorio(marca);
	this.modelo = this.generarDatosAleatorio(modelo);
	this.tipo = this.generarDatosAleatorio(tipo);
	this.imagen = this.generarDatosAleatorio(imagen);
}

function Motocicleta(){
	this.initVehiculo();
}

Motocicleta.prototype = new Vehiculo();

function Coche(){
	this.initVehiculo();
}

Coche.prototype = new Vehiculo();

function Carrera(vehiculoArr, vehiculoAba, premio){
	this.vehiculoArr = vehiculoArr;
	this.vehiculoAba = vehiculoAba;
	this.premio = premio;
	this.distancia = 0;
}

Carrera.prototype.finalizarCarrera = function(carrera){
	if(this.win != ""){
		console.info(" Copa: " + this.premio);
		clearInterval(idInterval);
	}
}

Carrera.prototype.ejecutarCiclo = function(){
	console.info("Comienza la carrera");
	distancia1 += Math.round(Math.round(this.getMetros(this.vehiculoArr.acelerar()))*4);
	console.info("avanza vehiculo1: " + distancia1);
	distancia2 += Math.round(Math.round(this.getMetros(this.vehiculoAba.acelerar()))*4);
	console.info("avanza vehiculo2: " + distancia2);

	document.getElementById("img1").style['padding-left']= distancia1 + 'px';
	document.getElementById("img2").style['padding-left']= distancia2 + 'px';
	var _race = document.getElementById("racing").offsetWidth - 230;

	if(distancia1 >= _race || distancia2 >= _race){
		console.log("Tenemos un ganador");
		this.finalizarCarrera();
	}
}

Carrera.prototype.getMetros = function(velocidad){
	var metros = velocidad * 1000/3600;
	return metros;
}

Carrera.prototype.posiciones = function(){
	document.getElementById("img1").setAttribute("src", this.vehiculoArr.imagen);
	document.getElementById("img2").setAttribute("src", this.vehiculoAba.imagen);
}

var vehiculo1 = new Coche();
var vehiculo2 = new Motocicleta();

var carrera = new Carrera(vehiculo1, vehiculo2, "Copa Monaco");

var idInterval = 0;

var distancia1 = 0;
var distancia2 = 0;

window.onload = function(){ carrera.posiciones();};

idInterval = setInterval(function(){ carrera.ejecutarCiclo();}, 1000);




