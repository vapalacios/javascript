function Persona(){
	this.nombre = "";
	this.edad = "";
	this.nacionalidad = "";
	this.altura = "";
	this.peso = "";
	this.enfermo = "";
}

Persona.prototype.getSalud = function(){
	return (Math.round(Math.random() * 10)) == 1? true : false;
}

Persona.prototype.getRandomInteger = function(min, max){
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

Persona.prototype.generarNacionalidadAleatorio = function() {
    var aleatorio = Math.floor(Math.random() * nacionality.length);
    return nacionality[aleatorio];
}

Persona.prototype.initPersona = function() {
    this.nombre = generarNombreAleatorio();
	this.edad = generarEdadAleatorio();
	this.nacionalidad = this.generarNacionalidadAleatorio();
	this.altura = this.getRandomInteger(160, 190);
	this.peso = this.getRandomInteger(70, 90);
	this.enfermo = this.getSalud();
}

function Jugador(posicion){
	this.initPersona();
	this.posicion = posicion;
	this.numero = this.getRandomInteger(1, 25);
	this.calidad = this.getRandomInteger(0, 100);
}

Jugador.prototype = new Persona();

Persona.prototype.getRandomInteger = function(min, max){
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Equipo(){
	this.jugadores = [];
	this.entrenador = {};
}

function Entrenador(){
	this.initPersona();
}

Entrenador.prototype = new Persona();

Entrenador.prototype.elegirPlantillaParaPartido = function(equipo, nombreEquipo){
	/*
	1 portero
    4 defensas
    4 mediocentros
    2 delanteros
 	*/
	var alineacion = {
		//nombreEquipo: "",
		portero: [],
		defensas: [],
		mediocentros: [],
		delanteros: []
	}
	//alineacion.nombreEquipo = nombreEquipo;
	alineacion.portero.push(this.seleccionarJugador(equipo.jugadores));
	for(var m = 0; m < 4; m++){
		alineacion.defensas.push(this.seleccionarJugador(equipo.jugadores));
		alineacion.mediocentros.push(this.seleccionarJugador(equipo.jugadores));
	}
	for(var d = 0; d < 2; d++){
		alineacion.delanteros.push(this.seleccionarJugador(equipo.jugadores));
	}
	
	return alineacion;
}

Entrenador.prototype.seleccionarJugador = function(jugadores){
	var _player;
	var _calidad = 0;
	var _index = 0;
	for(var i = 0; i < jugadores.length; i++){
		var _jugadorEvaluado = jugadores[i];
		if(!_jugadorEvaluado.enfermo){
			if(_jugadorEvaluado.calidad > _calidad){
				_calidad = _jugadorEvaluado.calidad;
				_player = _jugadorEvaluado;
				_index = i;
			}
		}
	}
	jugadores.splice(_index, 1);
	return _player;
}

function Copa(nombre){
	this.nombre = nombre;
	this.plantillas = [];
}

Copa.prototype.solicitarPlantilla = function(entrenador, equipo, nombreEquipo){
	this.plantillas.push(entrenador.elegirPlantillaParaPartido(equipo, nombreEquipo));
	console.log("Plantilla creada **********   " + nombreEquipo);
}

/*
Lógica del partido:

Cada equipo hará 10 ataques que funcionarán de la siguiente manera

Por ejemplo:

Si ataca el equipo 1 se calculará:

A = (Suma de calidad de medio centros equipo 1) - (Suma de calidad de medio centros equipo 1)
B = (Suma de calidad de delanteros 1) - (Suma de calidad de defensas equipo 2)
C = A + B - (Suma de calidad de portero equipo B)
Fortuna = numero aleatorio entre 0 y 100

Para cada jugador que no esté en su puesto del equipo 1: 
C = C - 10

Para cada jugador que no esté en su puesto del equipo 2: 
C = C + 10

TOTAL = C + Fortuna

Si total es mayor que cero -> GOOOOOOOL
Si total es igual a cero -> PALO !!!
Si total es menor que cero -> Ná de ná​ 
*/

Copa.prototype.jugar = function(){
	var _result = [];
	var _goles = 0;
	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 10; j++){
			_goles += this.atacar(i);
		}
		_result.push(_goles);
	}
	console.log("goles equipo a: " + _result[0] + "  goles equipo a: " + _result[1]);
}

Copa.prototype.atacar = function(atacante){
	var _result = 0;
	var _plantillas = this.plantillas;
	var _medios = [];
	var _defensas = [];
	var _qaDefensas = [];
	var _qaMedios = [];
	var _delanteros = [];
	var _qaDelanteros = [];
	var _qaPorteros = [];
	var _posicionPortero = [];
	var _posicionDefense = [];
	var _posicionMedios = [];
	var _posicionDelanteros = [];
	var _totalC = 0;
	var _totalA = 0;
	var _totalB = 0;
	var _total = 0;
	const VARIANTE = 10;
	const DEFENSA = "defensas";
	const PORTERO = "portero";
	const MEDIOSCENTROS = "mediocentros";
	const DELANTEROS = "delanteros";

	for(var c in _plantillas){
		var _equipo = _plantillas[c];
		for(var e in _equipo){
			var _portero = _equipo.portero;
			_qaPorteros.push(_portero[0].calidad);
			_posicionPortero.push(_portero[0].posicion == PORTERO? 1 : 0);
			var _defensa = _equipo.defensas;
			for(var d in _defensa){
				_defensas.push(_defensa[d].calidad);
				_posicionDefense.push(_defensa[d].posicion == DEFENSA? 1 : 0);
			}
			_qaDefensas.push(_defensas.reduce((x,y)=> x + y));
			var _mediocentros = _equipo.mediocentros;
			for(var m in _mediocentros){
				_medios.push(_mediocentros[m].calidad);
				_posicionMedios.push(_mediocentros[d].posicion == MEDIOSCENTROS? 1 : 0);
			}
			_qaMedios.push(_medios.reduce((x,y)=> x + y));
			var _delantero = _equipo.delanteros;
			for(var f in _delantero){
				_delanteros.push(_delantero[f].calidad);
				_posicionDelanteros.push(_delantero[f].posicion == DELANTEROS? 1 : 0);
			}
			_qaDelanteros.push(_delanteros.reduce((x,y)=> x + y));
		}
	}
	var _index = atacante? 0 : 1;
	
	_totalA = (Number.parseInt(_qaMedios[atacante])) - (Number.parseInt(_qaMedios[_index]));
	
	_totalB = _qaDelanteros[atacante] - _qaDefensas[_index];
	
	_totalC = _totalA + _totalB - _qaPorteros[_index];
	
	_totalC = _totalC  + (_posicionPortero[atacante]? + VARIANTE : - VARIANTE);

	for(var j = 0; j < _posicionDefense.length; j++){
		if(!j){
			_totalC = _totalC  + (_posicionDefense[j]? + 0 : - VARIANTE);
		}else{
			_totalC = _totalC  + (_posicionDefense[j]? + VARIANTE : - 0);
		}
		
	}
	for(var k = 0; k < _posicionMedios.length; k++){
		if(!j){
			_totalC = _totalC  + (_posicionMedios[k]? + 0 : - VARIANTE);
		}else{
			_totalC = _totalC  + (_posicionMedios[k]? + VARIANTE : - 0);
		}
	}
	for(var l = 0; l < _posicionDelanteros.length; l++){
		if(!j){
			_totalC = _totalC  + (_posicionDelanteros[l]? + 0 : - VARIANTE);
		}else{
			_totalC = _totalC  + (_posicionDelanteros[l]? + VARIANTE : - 0);
		}
	}
	
	_total = _totalC + this.getFortunaInteger(0, 100);
	console.log("Total caculado: " + _total);

	if(_total > 0){
		_result = 1;
		console.log("GOOOOOOOL");
	}else if(_total == 0){
		_result = 0;
		console.log("PALO");
	}else{
	    _result = 0;
	    console.log("NADA");
	}
	return _result;
}

Copa.prototype.getFortunaInteger = function(min, max){
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}


/*********************** pruebas *****************************/
var nombrePersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran", "Conan", "Olaf", "Barbaro", "Destructor", "Erik"];
var nacionality = ["Venezolana", "Chilena", "Española", "Mexicana", "Argentina"];


var posiciones = ["portero", "defensas", "mediocentro", "delanteros"];

function generarNombreAleatorio() {
    var aleatorio = Math.floor(Math.random() * nombrePersonas.length);
    return nombrePersonas[aleatorio];
}
function generarEdadAleatorio(){
	var edad = Math.floor(Math.random() * 35);
	return edad;
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generarPosicionAleatorio() {
    var aleatorio = Math.floor(Math.random() * posiciones.length);
    return posiciones[aleatorio];
}
var realMadrid = new Equipo();
var barcelona = new Equipo();
var entrenadorReal = new Entrenador();
var entrenadorBarc = new Entrenador();
var copa = new Copa("La Liga");

var generarJugadores = function(equipo, player) {
	for(var i = 0; i < player; i++){
		equipo.jugadores.push(new Jugador(generarPosicionAleatorio()));
	}
}

generarJugadores(realMadrid, 22);
generarJugadores(barcelona, 22);

//entrenadorBarc.elegirPlantillaParaPartido(barcelona, "Barcelona");
//entrenadorReal.elegirPlantillaParaPartido(realMadrid, "Real Madrid");

copa.solicitarPlantilla(entrenadorBarc, barcelona, "Barcelona");
console.log("Equipo A " + "Barcelona");
copa.solicitarPlantilla(entrenadorReal, realMadrid, "Real Madrid");
console.log("Equipo A " + "Real Madrid");

copa.jugar();
