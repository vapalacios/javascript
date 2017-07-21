
// 1) haz una función que añada un visitante nuevo
// Si el zoo está lleno no podrá entrar
// Para entrar deberá pagar la entrada:
//     Niños  menores de 14 años  gratis
//     Mayores de 65 gratis
//     Estudiantes 3 pesos
//     Resto 5 pesos
// 2) 

var log = x => console.log(x);

var nombresPersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];

var costoAlimento = 1000;

var intervalID;

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 70,
	numeroVisitantes: 0,
	caja : 10000,
	encargado: null,
	enfermeria: null,
	getListadoDeAnimalesSanos: function(){
		var listadosAnimales = [];
		for (var a=0; a < this.areas.length; a++) {
			var area = this.areas[a];
			for (var r=0; r < area.recintos.length; r++) {
				var recinto = area.recintos[r];
				if (recinto.animales) {
					var animalesEnfermos = [];
					for (var n=0; n < recinto.animales.length; n++) {
						var animal = recinto.animales[n];
						listadosAnimales.push(animal);
					}
				}
			}
		}
		return listadosAnimales;
	},
	getRecintoDeEspecie: function(especie){
		var recinto = null;
		var indiceArea = 0;
		while(!recinto && indiceArea < this.areas.length){
			var area = this.areas[indiceArea];
			var indiceRecintos = 0;
			while(!recinto && indiceRecintos < area.recintos.length){
				var recintoAux = area.recintos[indiceRecintos];
				if(especie == recintoAux.especie){
					recinto = recintoAux;
				}
				indiceRecintos++;
			}
			indiceArea++;
		}
		return recinto;
	}
};

zoo.encargado = {
	nombre: "El de mantenimiento...",
	edad: 68,
	revisarAnimales: function(){
		var listadoAnimales = zoo.getListadoDeAnimalesSanos();
		for(var a in listadoAnimales){
			 var animal = listadoAnimales[a];
			if(animal.estaEnfermo()){
				//saca al animal del recinto
				var recinto = zoo.getRecintoDeEspecie(animal.especie);
				var indice = recinto.animales.indexOf(animal);
				//lleva el animal a enfermeria
				recinto.animales.splice(indice, 1);
				zoo.enfermeria.admitirPaciente(animal);
			}
			if(animal.tieneHambre()){
				//TODO: reducir dinero de Zoo
				animal.alimentarAnimal();
			}
		}
	},
	// 5) Si el animal llega a 100 de salud deberá volver a su area (debemos saber a que area perteniecía)
	devolverAnimalesRecuperados: function () {
		//movemos animales recuperados de la enfermería a su recinto de origen
		var animalesRecuperados = zoo.enfermeria.getListadoAnimalesListosParaAlta();
		for (var i = 0; i < animalesRecuperados.length; i++) {
			var animal = animalesRecuperados[i];
			zoo.enfermeria.darDeAltaPaciente(animal);
			var recinto = zoo.getRecintoDeEspecie(animal.especie);
			recinto.animales.push(animal);
		};
	}
};

zoo.enfermeria = {
	pacientes: [],
	admitirPaciente: function (animalEnfermo) {
		this.pacientes.push(animalEnfermo);
	},
	recuperarSaludAnimales: function () {
		//recuperamos la salud de los animales en la enfermeria y devuelolvemos a su recinto de origen los que ham mejorado
		for (var i = 0; i < this.pacientes.length; i++) {
			var animal = this.pacientes[i];
			animal.modificarSalud(10);
		}
	},
	darDeAltaPaciente: function(animal){
		var indice = this.pacientes.indexOf(animal);
		this.pacientes.splice(indice,1);
	},
	getListadoAnimalesListosParaAlta: function(){
		var animalesRecuperados = [];
		for (var i in this.pacientes){
			var animal = this.pacientes[i];
			if(animal.salud == 100){
				animalesRecuperados.push(animal);
			}
		}
		return animalesRecuperados;
	}
};

var ubicacion = {
	dirreccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
};

var Area = function(nombre, aforo, recintos, animales) {
	nombre = nombre;
	aforoMaximo = aforo;
	recintos = recintos;
}
var Recinto = function(nombre, animales, capacidad, detalle, especie){
	this.nombre = nombre;
	this.animales = animales;
	this.capacidad = capacidad;
	this.detalle = detalle;
	this.visitantes = [];
	this.especie = especie;
}

var Animal = function(nombre, especie, salud, hambre, pais) {
    this.nombre = nombre;
    this.especie = especie;
    this.salud = salud;
    this.hambre = hambre;
    this.pais = pais;
}

Animal.prototype.emitirSonido = function() {
    log("Soy un: " + this.especie + "!!! y mi nombre es: " + this.nombre);
};
Animal.prototype.modificarSalud = function(incrementoSalud) {
    this.salud += incrementoSalud;
    this.salud = this.salud > 100 ? 100 : this.salud < 0 ? 0 : this.salud;
};
Animal.prototype.modificarHambre = function(incrementoHambre) {
    this.hambre += incrementoHambre;
};
Animal.prototype.alimentarAnimal = function() {
    this.hambre = 0;
};
Animal.prototype.ejecutarCicloAnimal = function() {
    // añadir Hambre
    this.modificarHambre(10);
    // modifcar salud Aleatoria
    this.modificarSalud(getRandomInteger(-20, 20));
};
Animal.prototype.estaEnfermo = function() {
    return this.salud <= 50;
};
Animal.prototype.tieneHambre = function() {
    return this.hambre >= 100;
};

var tigreBlanco = new Animal("Tigre Blanco", "tigre", 100, 0, "Egipto");
var tigreNormal = new Animal("Tigre", "tigre", 90, 0, "Africa");

var palomas = new Animal("Palomas", "ave", 100, 0, "Chile");
var flamencos = new Animal("Flamenco", "ave", 10, 0, "Colombia");

var tigres = [];
tigres.push(tigreBlanco, tigreNormal);

var aves = [];
aves.push(palomas, flamencos);

var recinto1 = new Recinto("Jaula de tigres", tigres, 10, "Jaula super reforzada con titanium", "tigre");
var recinto2 = new Recinto("Baños", [], 50, "Baños para hombres y mujeres, aptos para personas con discapacidad", "humano");
var recinto3 = new Recinto("Jaula para aves", aves, 10, "Algunas aves que se pelean a seguido","ave");

var recintoTigres = [];
recintoTigres.push(recinto1, recinto2);

var recintoAves = [];
recintoAves.push(recinto3);

var area1 = new Area("Mamíferos", 5000, recintoTigres);
var area2 = new Area("Aves", 200, recintoAves);

zoo.ubicacion = ubicacion;
zoo.areas.push(area1, area2);

log(zoo);


//Representa el paso de h en el zoo
function ejecutarCiclo(){
	//mueve los visitantes de cada recinto al siguiente y saca del zoo los que están en el último
	cambiarRecinto();

	//si es posible agrega nuevos visitantes
	addPersonas();

	//modifica aleatoriamente la salud y hambre de los animales en los distintos recintos y manda a la enfermeria si es necesario
	//modificarSaludAnimales();
	ejecutarCicloAnimales();

	//recupera la salud de los animales en la enfermeria y los devuelve a su recinto de origen si corresponde
	//recuperarSaludAnimales();
	zoo.enfermeria.recuperarSaludAnimales();

	//revisar salud y hambre de los animales
	zoo.encargado.revisarAnimales();

	// 5) Si el animal llega a 100 de salud deberá volver a su area (debemos saber a que area perteniecía)
	zoo.encargado.devolverAnimalesRecuperados();
	
	//modifica el hambre de los animales en los distintos recintos y los alimenta si es necesario
	//modificarHambreAnimales();

	//Para ver que está pasando
	pintarEstado();

	console.log("Ciclo ejecutado");
}

// Añade una persona al parque
function addPersona(){
	if (zoo.numeroVisitantes < capacidadZoo()) {
		var persona = crearPersona(generarNombreAleatorio(), generarCarteraAleatorio(), generarEdadAleatorio(), esEstudianteAleatoriao());
		var cobrado = cobrarEntrada(persona);
		if (cobrado) {
			var recintoLibre = primerRecintoLibre();
			recintoLibre.visitantes.push(persona);
			zoo.numeroVisitantes++;
		} else {
			console.error(persona.nombre + " no tiene dinero suficiente para pagar la entrada");
		}
	} else {
		// Podemos colgar el cartel de lleno
		throw "El ZOO está lleno";
	}
}
function addPersonas(){
	try {
		var cantidad = getRandomInteger(1, 20);
		for (var i=0; i<cantidad; i++){
			addPersona();
		}
	} catch (e) {
		console.error(e);
	}
}


function capacidadZoo() {
	var capacidad = 0;

	for (var a=0; a<zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r=0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			capacidad += recinto.capacidad;
		}
	}
	return capacidad;
}

function primerRecintoLibre(){
	var recintoLibre = null;

	for (var a=0; a<zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r=0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			if (!recintoLibre && recinto.visitantes.length < recinto.capacidad) {
				recintoLibre = recinto;
			}
		}
	}
	return recintoLibre;
}

function cobrarEntrada(persona) {
	//Importe por defecto
	var importeEntrada = 5;
	if (persona.edad > 65 || persona.edad < 14) {
		importeEntrada = 0;
	}
	else if (persona.estudiante) {
		importeEntrada = 3;
	}
	var sePudoCobrar = false;
	if (persona.cartera >= importeEntrada) {
		persona.cartera -= importeEntrada;
		zoo.caja += importeEntrada;
		sePudoCobrar = true;
	}
	return sePudoCobrar;
}

//Constructor de personas
function crearPersona(nombre, dinero, edad, esEstudiante){
	var persona = {
		nombre: nombre,
		cartera: dinero,
		edad: edad,
		estudiante: esEstudiante
	};
	return persona;
}

function esEstudianteAleatoriao(){
	var edad = Math.round(Math.random() * 1);
	return edad;
}

function generarEdadAleatorio(){
	var edad = Math.floor(Math.random() * 70);
	return edad;
}

function generarCarteraAleatorio(){
	var edad = Math.floor(Math.random() * 500);
	return edad;
}

function generarNombreAleatorio(){
	var numeroAleatorio = Math.floor(Math.random() * nombresPersonas.length);
	return nombresPersonas[numeroAleatorio];
}

function abrirZoo() {
	intervalID = setInterval(ejecutarCiclo, 1000);
}

// 1) Crear funcion cerrarZoo :
//    Parar el intervalo
//    Sacar a todas las personas del zoo
function cerrarZoo() {
	clearInterval(intervalID);
	for (var a=0; a<zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r=0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			recinto.visitantes = [];
		}
	}
	zoo.numeroVisitantes = 0;
}

// 2) Crear funcion modificarSaludAleatoria(animal) que de manera aleatoria sume o reste salud a un animal
//     aleatorio entre -20 y +20 (máximo 100)
/*function modificarSaludAleatoria(animal) {
	var incrementoDeSalud = getRandomInteger(-20, 20);
	animal.modificarSalud(incrementoDeSalud);
}*/

// 3) En cada ciclo ejecutar la funcion modificarSaludAleatoria para todos los animales, si alguno baja de 50 de salud, deberá ir a la enfermería.
function crearPaciente(animal, recinto){
	log("Animal, estás malito. ¿Quién animal eres?");
	animal.emitirSonido();
	return {
		animal: animal,
		origen: recinto
	};
}

/*function modificarSaludAnimales(){
	//modificamos la salud de los animales en los distintos recintos y manda a la enfermeria si es necesario
	for (var a=0; a<zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r=0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			if (recinto.animales) {
				var animalesEnfermos = [];
				for (var n=0; n < recinto.animales.length; n++) {
					var animal = recinto.animales[n];
					modificarSaludAleatoria(animal);
					//animal.ejecutarCicloAnimal();
					if (animal.salud < 50) {
						animalesEnfermos.push(n);
					}
				}
				admitirPacientes(animalesEnfermos, recinto);
			}
		}
	}
}*/

// 4) En la enfermeria en cada ciclo los animales recuperan 10 de salud (no se aplica modificarSaludAleatoria)
function recuperarSaludAnimal(animal) {
	//Recuperamos la salud de un animal hasta unmáximo de 100
	//var nuevaSalud = 10;
	animal.modificarSalud(10);
}

// 6) Crear una función addHambre que en cada ciclo sume 10 al hambre del un animal, Cuando llegue a 100 el animal estará muy hambriento y deberá ser alimentado. Al alimentar un animal su hambre pasa a 0 y al zoo le cuesta 1000$.
function addHambre(animal) {
	animal.modificarHambre(10);
	if (animal.hambre >= 100) {
		if (zoo.caja >= costoAlimento) {
			zoo.caja -= costoAlimento;
			animal.alimentarAnimal(0);
		}
	}
}
function modificarHambreAnimales(){
	//modificamos el hambre de los animales en los distintos recintos
	for (var a=0; a<zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r=0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			if (recinto.animales) {
				for (var n=0; n < recinto.animales.length; n++) {
					var animal = recinto.animales[n];
					addHambre(animal);
					if (animal.hambre > 150) {
						comerVisitante(animal, recinto);
					}
				}
			}
		}
	}
}

// 7) Si el zoo no tiene dinero para alimentar a los animales, no podrá hacerlo.Cuando un animal tenga más de 150 de hambre, se comerá un visitante. El zoo se quedará con su cartera.
function comerVisitante(animal, recinto) {
	if (recinto.visitantes.length) {
		var numeroAleatorio =  getRandomInteger(0, recinto.visitantes.length - 1);
		var visitante = recinto.visitantes.splice(numeroAleatorio, 1)[0];
		animal.alimentarAnimal(0);
		zoo.caja += visitante.cartera;
		zoo.numeroVisitantes--;
		console.error(animal.nombre + " se ha comido a " + visitante.nombre + ", el ZOO ha conseguigo " + visitante.cartera + "$");
	} else {
		var recintoConVisitantes = encontrarRecintoConVisitantes();
		if (recintoConVisitantes) {
			console.warn(animal.nombre + " no ha encontrado visitantes en " + recinto.nombre + " y ha escapado para buscar en " + recintoConVisitantes.nombre);
			comerVisitante(animal, recintoConVisitantes);
		}
	}
}
function encontrarRecintoConVisitantes(){
	var recintoConVisitantes = null;

	for (var a=0; a<zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r=0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			if (!recintoConVisitantes && recinto.visitantes.length) {
				recintoConVisitantes = recinto;
			}
		}
	}
	return recintoConVisitantes;
}

// 8) En cada ciclo los visitantes deben cambiar al siguiente recinto, cuando hayan visitado todos abandonaran el parque
function cambiarRecinto(){
	var siguienteRecinto = null;
	for (var a=zoo.areas.length-1; a>=0; a--) {
		var area = zoo.areas[a];
		for (var r=area.recintos.length-1; r>=0; r--) {
			var recinto = area.recintos[r];
			if (siguienteRecinto) {
				var espacioDisponible = siguienteRecinto.capacidad - siguienteRecinto.visitantes.length;
				var visitantesQueCambian = recinto.visitantes.splice(0,espacioDisponible);
				siguienteRecinto.visitantes = siguienteRecinto.visitantes.concat(visitantesQueCambian);
				if (recinto.visitantes.length) {
					console.warn(recinto.visitantes.length + " visitantes no se han podido mover de " + recinto.nombre + " a " + siguienteRecinto.nombre + " porque no hay espacio");
				}
			} else {
				zoo.numeroVisitantes -= recinto.visitantes.length;
				recinto.visitantes = [];
			}
			siguienteRecinto = recinto;
		}
	}
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Pinta algunos datos en la consola para veer que va pasando en el ZOO
function pintarEstado() {
	pintarEstadoVisitantes();
	pintarEstadoAnimalesSanos();
	pintarEstadoAnimalesEnfermos();
	console.log("Caja:" + zoo.caja + "$; Visitantes:" + zoo.numeroVisitantes);
}
function pintarEstadoAnimalesSanos(){
	for (var a=0; a<zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r=0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			var estadoAnimales = "";
			if (recinto.animales) {
				estadoAnimales += recinto.animales.length + " animales";
				for (var n=0; n < recinto.animales.length; n++) {
					var animal = recinto.animales[n];
					estadoAnimales += "«" + animal.nombre + "; salud:" + animal.salud + "; hambre:" + animal.hambre + "»";
				}
			}
			console.log(area.nombre + "." + recinto.nombre + ":" + estadoAnimales);
		}
	}
}
function pintarEstadoAnimalesEnfermos(){
	var estadoPacientes = zoo.enfermeria.pacientes.length + " pacientes";
	for (var i = 0; i < zoo.enfermeria.pacientes.length; i++) {
		var paciente = zoo.enfermeria.pacientes[i];
		estadoPacientes += "«" + paciente.nombre + "; salud:" + paciente.salud + "; hambre:" + paciente.hambre + "; origen:" + paciente.especie + "»"
	}
	console.warn("Enfermería:" + estadoPacientes);
}
function pintarEstadoVisitantes(){
	for (var a=0; a<zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r=0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			var estadoVisitantes = recinto.visitantes.length + " visitantes";
				for (var v=0; v < recinto.visitantes.length; v++) {
					var visitante = recinto.visitantes[v];
					estadoVisitantes += "«" + visitante.nombre + "»";
				}
			console.log(area.nombre + "." + recinto.nombre + ":" + (estadoVisitantes.length < 100 ? estadoVisitantes : estadoVisitantes.substr(0,97) + "..." ));
		}
	}
}

function ejecutarCicloAnimales(){
	var animales = zoo.getListadoDeAnimalesSanos();
	for(var a in animales){
		animales[a].ejecutarCicloAnimal();
	}
}

pintarEstado();
abrirZoo();

