var log = x => console.log(x);

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 70,
	numeroVisitantes: 0,
	enfermeria:{},
	caja: 10000
};

var ubicacion = {
	dirreccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

function area(nombre, aforo, recintos, animales){
	return {
		nombre: nombre,
		aforoMaximo: aforo,
		recintos: recintos,
	};
}

function recintoDetalles(nombre, animales, capacidad, detalle){
	return {
		nombre: nombre,
		animales: animales,
		capacidad: capacidad,
		detalle: detalle,
		visitantes: []
	};
}

function animales(nombre, especie, salud, hambre, pais){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais
	};
}

zoo.enfermeria = {
	enfermos: []
};

var tigreBlanco = animales("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = animales("Tigre", "Felino", 90, 60, "Africa");

var palomas = animales("Palomas", "Avis Chilensis", 100, 100, "Chile");
var flamencos = animales("Flamenco", "Phoenicopteridae", 10, 0, "Colombia");

var tigres = [];
tigres.push(tigreBlanco, tigreNormal);

var aves = [];
aves.push(palomas, flamencos);

var recinto1 = recintoDetalles("Jaula de tigres", tigres, 10, "Jaula super reforzada con titanium");
var recinto2 = recintoDetalles("Baños", [], 50, "Baños para hombres y mujeres, aptos para personas con discapacidad");
var recinto3 = recintoDetalles("Jaula para aves", aves, 10, "Algunas aves que se pelean a seguido");

var recintoTigres = [];
recintoTigres.push(recinto1, recinto2);

var recintoAves = [];
recintoAves.push(recinto3);

var area1 = area("Mamíferos", 5000, recintoTigres);
var area2 = area("Aves", 200, recintoAves);

zoo.ubicacion = ubicacion;
zoo.areas.push(area1, area2);

log(zoo);

function ejecutarCiclo(){
	addPersona();
	modificarSaludTodosLosAnimales();
	log("Ciclo ejecutado!!!!");
}

var nombrePersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];

function addPersona(){
	var persona = "";
	if(zoo.numeroVisitantes < zoo.aforo){
		persona = crearPersona(generarNombreAleatorio(), generarEdad(), 500, generarEstudiante());
		cobrarEntrada(persona);
		var recintoLibre = primerRecintoLibre();
		recintoLibre.visitantes.push(persona);
		zoo.numeroVisitantes++;
	}else{
		// Podemos añadir cartel de lleno
		log("el zoo esta lleno");
		cerrarCiclo();
	}
	 	
}

//Constructor personas
function crearPersona(nombre, edad, wallet, estudiante){
	return {
		nombre: nombre,
		edad: edad,
		wallet: wallet,
		estudiante: estudiante
	};
}

function generarNombreAleatorio(){
	var aleatorio = Math.floor(Math.random() * nombrePersonas.length);
	return nombrePersonas[aleatorio];
}

function generarEdad(){
	return edad = Math.floor(Math.random() * 100);
}

function generarEstudiante(){
	return edad = Math.round(Math.random());
}

function cobrarEntrada(persona){
	var importeEntrada = 5;

	if(persona.edad < 14 || persona.edad > 65){
		importeEntrada = 0;
	}else if (persona.estudiante){
		importeEntrada = 3;
	}

	persona.wallet = persona.wallet - importeEntrada;
	zoo.caja = zoo.caja + importeEntrada;
}

function primerRecintoLibre(){
	var recintoLibre = null;
	var refZoo = zoo.areas;
	for(var i = 0; i < refZoo.length; i++){
		var area = refZoo[i];
		for(var j = 0; j < area.recintos.length; j++){
			var recinto = area.recintos[j];
			if(!recintoLibre && recinto.visitantes.length < recinto.capacidad){
				recintoLibre = recinto;
			}
		}
	}
	return recintoLibre;
}
var intervalId = setInterval(ejecutarCiclo, 1000);

function crearEnfermo(animal, recinto){
	return {
		animal: animal,
		recinto: recinto,
		enfermedad: enfermedad
	};
}

/*
1. Crear función cerrar zoo:
Parar el intervalo
Sacar a todas las personas del zoo

2. Crear funcion modificarSaludAleatoria(animal) que de manera aleatoria sume o reste salud a un animal:
aleatorio entre -20 y +20 (máximo de salud es 100)

3. En cada ciclo ejecutar la función de modificarSaludAleatoria() para todos los animales, si alguno baja
de 50 de salud, deberá ir a la enfermeria

4. En la enfermeria en cada ciclo los animales recuperan 10 de salud (no se aplica modificarSaludAleatoria()).

5. Si el animal llega a 100 de salud deberá volver a su área (debemos saber a qué área pertenecia).

6. Crear addHambre() que en cada ciclo sume 10 al hambre de un animal. Cuando llegue a 100 el animal estará muy hambriento y deberá ser alimentado. Al alimentar un animal su hambre pasa a 0 y al zoo le cuesta 1000$

7. Si el zoo no tiene dinero para alimentar a los animales, no podrá hacerlo. Cuando un animal tenga más de 150 de hambre, se comerá a un visitante. El zoo se quedará con su caretera.

8. En cada ciclo los visitantes dedberán cambiar al siguiente recinto. Cuando hayan visitado todos abandonarán el parque.
*/

function cerrarCiclo(){
	clearInterval(intervalId);
	getOutPeople();
}

function getOutPeople(){
	var ref = zoo.areas;
	var clearCapacity = 0;
	zoo.numeroVisitantes = clearCapacity;
	for(var i = 0; i < ref.length; i++){
		var area = ref[i];
		for(var j = 0; j < area.recintos.length; j++){
			area.recintos[j].visitantes = [];
			area.recintos[j].capacidad = clearCapacity;
		}
	}
}
function healthAleatorio(){
    return Math.round(Math.random());
}
function modificarSaludAleatoria(recinto, index){
    var animal = recinto.animales;
    var saludable = 0;
    for(var i = 0; i < recinto.animales.length; i++){
    	if(healthAleatorio()){
    		saludable = animal[i].salud + 20;
	        animal[i].salud = saludable > 100? 100: saludable;
	   }else{
	   	 saludable = animal[i].salud - 20;
	     animal[i].salud = saludable < 0? 0: saludable;
	     if(animal[i].salud <= 50){
	     	visitarEnfermeria(animal.splice(i, 1), recinto, index);
	     }
	   }
    }
}

function modificarSaludTodosLosAnimales(){
	var ref = zoo.areas;
	for(var i = 0; i < ref.length; i++){
		var area = ref[i];
		for(var j = 0; j < area.recintos.length; j++){
			modificarSaludAleatoria(area.recintos[j], j);
		}
	}
}

function visitarEnfermeria(animal, recinto){
	var enfermo = crearEnfermo(animal, recinto, generarEnfermedadAleatorio());
	zoo.enfermeria.enfermos.push(enfermo);
}

var nombreEnfermedad = ["Desnutricion", "parasitos", "insolacion"];

function generarEnfermedadAleatorio(){
	var aleatorio = Math.floor(Math.random() * nombreEnfermedad.length);
	return nombreEnfermedad[aleatorio];
}

function recoveryHealth(animal){
	var saludable = animal.salud + 10;
	animal.salud = saludable > 100 ? 100 : saludable;
}

function checkHealth(){
	var enfermos = zoo.enfermeria.enfermos;
	var recoveryAnimal = [];
	for(var i in enfermos){
		var animalEnfermo = enfermos[i];
		recoveryHealth(animalEnfermo.animal);
		if(animalEnfermo.animal.salud == 100){
			recoveryAnimal.push(i);
		}
	}
	incorporarAnimalRecinto(recoveryAnimal);
}

function incorporarAnimalRecinto(indexAnimal){
	indexAnimals = indexAnimal.reverse();
	for (var i in indexAnimal) {
		var n = indexAnimal[i];
		var enfermo = zoo.enfermeria.enfermos.splice(n, 1)[0];
		enfermo.recinto.animales.push(enfermo.animal);
	};
}
