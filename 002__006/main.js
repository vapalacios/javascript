/*

siguiente código.

var parqueNatural = {
areas = [],
parqueDeBomberos = {}
}

En cada una de las áreas (añade 10 áreas) encontraremos un array de árboles (100 por área) y un array de visitantes (100 en todo el parque).
En el parque de bomberos encontraremos un array de bomberos (10) y posiblemente más propiedades que se te puedan ocurrir.
Los bomberos y los visitantes deberán heredar de la clase Persona.

2) Añade un método ejecutar ciclo que represente el paso de 1h en el parque.
Cada ciclo que pase debemos llamar a ejecutar ciclo de los visitantes que se irán cambiando de recinto de forma aleatoria.
Haz que el método se ejecute cada segundo.

3) En cada paso de un ciclo se puede originar un fuego (probabilidad del 5%) que empezaría quemando un arbol aleatorio dentro del parque.
Cada ciclo que pase el fuego se extenderá al arbol al arbol siguiente, si no hay arbol siguiente, deberá saltar al primer arbol del área siguiente.
Asi sucesivamente hasta expandirse por todo el parque. Cada ciclo que pase el fuego en los arboles, estos estarán un 10% más quemados.
Cuando lleguen al 100% de quemados, se habrá perdido el arbol. (Quitarlo del área).​


areas - arboles100
visitantes100
bomberos10
ejecutarCiclo
*/
var nombrePersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran", "Conan", "Olaf", "Barbaro", "Destructor", "Erik"];

function generarEdadAleatorio() {
    var edad = Math.floor(Math.random() * 35);
    return edad;
}

function generarNombreAleatorio() {
    var aleatorio = Math.floor(Math.random() * nombrePersonas.length);
    return nombrePersonas[aleatorio];
}

function ParqueNatural() {
    this.areas = [];
    this.arbolesQuemados = [];
    this.totalVisitantes = 100;
    this.parqueDeBombreros = new ParqueBomberos();

    for (var i = 0; i < 8; i++) {
        this.areas.push(new Area("a15_" + i));
    }

    for (var i = 0; i < 10; i++) {
        this.parqueDeBombreros.arrayBomberos.push(new Bombero("b15_" + i));
    }
}

ParqueNatural.prototype.getVisitantes = function() {
    var _areas = this.areas;
    var _visitantes = 0;
    for (var i in _areas) {
        var _area = _areas[i];
        _visitantes += _area.visitantes.length;
    }
    return _visitantes;
}

ParqueNatural.prototype.burnArboles = function() {
    var _areas = this.areas;
    for (var i = 0; i < _areas.length; i++) {
        var _visitantes = _areas[i].visitantes;
        if (_visitantes.length > 0 && !_visitantes.fumador) {
            var _arbol = _areas[i].arboles[this.getArbolAleatorio(_areas[i].arboles)];
            if (_arbol && !_arbol.incendiandose) {
                _arbol.porcentajeQuemadura -= 10;
                _arbol.incendiandose = true;
                console.warn("***** Estado incendio arbol: " + _arbol.idArbol + " Porcentaje quemadura: " + _arbol.porcentajeQuemadura);
            }
        }
    }
    //var _area = _areas[this.getAreaAleatoria()];
    //var _arbol = _area.arboles[this.getArbolAleatorio(_area.arboles)];
}

ParqueNatural.prototype.exparsirIncendio = function() {
    var _areasExpa = this.areas;
    console.info("Exparsir árboles");
    for (var i = 0; i < _areasExpa.length; i++) {
        var _arbol = _areasExpa[i].arboles;
        if (_arbol.length > 0) {
            for (var a = _arbol.length - 1; a >= 0; a--) {
                if (_arbol[a].incendiandose) {
                    var _b = a + 1;
                    if (_arbol[_b] && !_arbol[_b].incendiandose) {
                        _arbol[_b].porcentajeQuemadura -= 10;
                        _arbol[_b].incendiandose = true;
                        console.warn("Se experse incendio: " + _arbol[_b].idArbol);
                    }
                    //wind = this.quemarArbol(_arbol, _b, wind);
                }
            }
        }
    }
}

/*ParqueNatural.prototype.quemarArbol = function(arbol, b, wind) {
    var index = b;
    if (wind > 0) {
        for (var i = 0; i < wind; i++) {
            if (arbol[index] && !arbol[index].incendiandose) {
                arbol[index].porcentajeQuemadura -= 10;
                arbol[index].incendiandose = true;
                console.warn("Se experse incendio: " + arbol[index].idArbol);
                index++;
            }
        }
    } else {
       
    }
    return 0;
}*/

ParqueNatural.prototype.checkArbol = function() {
    var _areasCheck = this.areas;
    console.info("Verificar árboles");
    for (var i in _areasCheck) {
        var _arboles = _areasCheck[i].arboles;
        for (var a in _arboles) {
            if (_arboles[a].incendiandose && _arboles[a].porcentajeQuemadura > 0 && _arboles[a].sensor) {
            	this.parqueDeBombreros.areaAsignada = _areasCheck[i].idArea;
                this.publicarPub();
            }

            if (_arboles[a].incendiandose && _arboles[a].porcentajeQuemadura == 0) {
                console.error("Se ha quemado este arbol : " + _arboles[a].idArbol + " :(");
                this.arbolesQuemados.push(_arboles[a]);
                _arboles.splice(a, 1);
            }
        }
    }
}

ParqueNatural.prototype.incendio = function() {
    var _areasIncend = this.areas;
    console.info("Incendio");
    for (var i in _areasIncend) {
        var _arbolQuema = _areasIncend[i].arboles;
        for (var a in _arbolQuema) {
            if (_arbolQuema[a].incendiandose && _arbolQuema[a].porcentajeQuemadura > 0) {
                _arbolQuema[a].porcentajeQuemadura -= 10;
                console.error("El incendio no para: " + _arbolQuema[a].idArbol + " :(" + _arbolQuema[a].incendiandose);
            }
        }
    }
}

/*ParqueNatural.prototype.getArbol = function(){
	var _areas = this.areas;
	var _resultArbol;
	for(var i in _areas){
		var _arboles = _areas[i].arboles;
		for(var a in _arboles){
			if(_arboles[a].incendiandose && _arboles[a].porcentajeQuemadura == 0){
				_arboles[a].quemado = true;
				console.error("Se ha quemado este arbol : " + _arboles[a] + " :(");
				break;
			}
		}
	}

}*/

/*ParqueNatural.prototype.abrirParque = function(){

}*/

ParqueNatural.prototype.cerrarParque = function() {
    if (this.arbolesQuemados && this.arbolesQuemados.length == 100) {
        clearInterval(idInterval);
        console.log("***** Se ha quemado el parque **********");
    }

}

ParqueNatural.prototype.getAreaAleatoria = function() {
    return getRandomInteger(0, this.areas.length - 1);
}

ParqueNatural.prototype.getArbolAleatorio = function(arboles) {
    return getRandomInteger(0, arboles.length - 1);
}

ParqueNatural.prototype.addVisitante = function(visitante) {
    var areaAleatoria = this.getAreaAleatoria();
    this.areas[areaAleatoria].visitantes.push(visitante);
}

ParqueNatural.prototype.subscribirPub = function() {
    pubsub.sub("Fire",() => this.atenderFuego());
    console.info("Subscrito al pusub: ");
}

ParqueNatural.prototype.atenderFuego = function() {
    var _area = this.getAreaById(this.parqueDeBombreros.areaAsignada);
    if(!this.parqueDeBombreros.busy){
    	this.parqueDeBombreros.busy = true;
    	this.parqueDeBombreros.areaAsignada = this.parqueDeBombreros.areaAsignada;
    	_area.bomberosArea = this.parqueDeBombreros.arrayBomberos;
    }
    this.apagarFuego();
}

ParqueNatural.prototype.apagarFuego = function() {
    var _area = this.getAreaById(this.parqueDeBombreros.areaAsignada);
    var _apagar = 0;
    var _index = 0;
    while(_apagar < 2){
	    for(var i in this.parqueDeBombreros.arrayBomberos){
	    	if(_area[0].arboles[i] && _area[0].arboles[i].incendiandose){
	    		_area[0].arboles[i].incendiandose = false;
	    	}
	    }
	    _apagar++;
    }
    var _fuegoApagado = _area[0].arboles.every(x=>!x.incendiandose);
    if(_fuegoApagado){
    	this.parqueDeBombreros.busy = false;
	    this.parqueDeBombreros.areaAsignada = "";
	    _area.bomberosArea = [];
    }
}

ParqueNatural.prototype.getAreaById = function(idArea){
	return this.areas.filter((area, index) => {
        return area.idArea == idArea ? area : "";
    });
}

ParqueNatural.prototype.publicarPub = function() {
    pubsub.pub("Fire", this.parqueDeBombreros.areaAsignada);
    console.info("Publicado el pusub");
}

ParqueNatural.prototype.pubSubFire = function() {
    pubsub.pub("Fire", this.parqueDeBombreros.areaAsignada);
    console.info("Publicado el pusub");
}

ParqueNatural.prototype.pubSubAtender = function() {
    pubsub.pub("Help", this.parqueDeBombreros.areaAsignada);
    console.info("Publicado el pusub");
}

ParqueNatural.prototype.pubSubMoverBomber = function() {
    pubsub.pub("Move", this.parqueDeBombreros.areaAsignada);
    console.info("Publicado el pusub");
}

ParqueNatural.prototype.subscribirPub = function() {
    pubsub.sub("Fire",() => this.atenderFuego());
    console.info("Subscrito al pusub: ");
}

ParqueNatural.prototype.recuperarArbol = function(){
	var _areasIncend = this.areas;
    console.info("Incendio");
    for (var i in _areasIncend) {
        var _arbolQuema = _areasIncend[i].arboles;
        for (var a in _arbolQuema) {
            if (!_arbolQuema[a].incendiandose && _arbolQuema[a].porcentajeQuemadura < 100) {
                _arbolQuema[a].porcentajeQuemadura += 10;
                console.error("Recuperando arbol: " + _arbolQuema[a].idArbol + " :) ");
            }
        }
    }
}

function Persona() {
    this.nombre = "";
    this.edad = 0;
    this.fumador = false;
}

var getRandomInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Persona.prototype.initPersona = function() {
    this.nombre = generarNombreAleatorio();
    this.edad = generarEdadAleatorio();
    this.fumador = getRandomInteger(0, 100) <= 20 ? true : false;
}

function Visitante() {
    this.initPersona();
}

Visitante.prototype = new Persona();

Visitante.prototype.ejecutarCiclo = function() {

    if (this.areas.length < 10) {
        this.addVisitante(_visitante);
    }
}

function Bombero(id) {
    this.initPersona();
    this.idBombero = id;
}

Bombero.prototype = new Persona();

function Area(id) {
    this.idArea = id;
    this.arboles = [];
    this.visitantes = [];
    this.bomberosArea = [];

    for (var i = 0; i < 10; i++) {
        var _arbolId = this.idArea + "_" + i;
        this.arboles.push(new Arbol(_arbolId));
    }
}

ParqueNatural.prototype.imprimirEstadoArea = function() {
    var estadoArea = "";
    var _are = this.areas;
    var estadoArbol = "";
    for (var i = 0; i < _are.length; i++) {
        var _tree = _are[i].arboles;
        if (_tree > 0) {
            for (var j in _tree) {
                if (_tree[j].incendiandose) {
                    console.log(_tree[j].incendiandose);
                    estadoArbol = "";
                }
            }
        }
        estadoArea = estadoArea + estadoArbol;
        console.log("Estado del área " + _are[i].idArea);
        console.log("======================");
        console.log(estadoArea ? estadoArea : "quemado");
        console.log("======================");
    }
}

function Arbol(id) {
    this.idArbol = id;
    this.porcentajeQuemadura = 100;
    this.incendiandose = false;
    this.sensor = getRandomInteger(1, 15) == 1 ? true : false;
}

function Viento(velocidad) {
    this.velocidad = windVelocity[this.getVelocity()];
}

Viento.prototype.getVelocity = function() {
    return getRandomInteger(0, windVelocity.length - 1);
}

function ParqueBomberos(){
	this.arrayBomberos = [];
	this.busy = false;
	this.areaAsignada = "";
}

var windVelocity = [1, 2, 3];

var ejecutarCiclo = function() {
    if (parqueNatural.getVisitantes() < parqueNatural.totalVisitantes) {
        var _visitante = new Visitante();
        parqueNatural.addVisitante(_visitante);
    } else {
        console.info("**** Finalizado llenado del Visitantes *****");
    }

    //if (getRandomInteger(0, 10) <= 5) {
    parqueNatural.burnArboles();
    //}

    var wind = new Viento();
    while (wind.velocidad > 0) {
        parqueNatural.exparsirIncendio();
        wind.velocidad--;
    }

    parqueNatural.incendio();
    parqueNatural.checkArbol();
    parqueNatural.recuperarArbol();
    parqueNatural.imprimirEstadoArea();
    parqueNatural.cerrarParque();

    if (parqueNatural.getVisitantes() == parqueNatural.totalVisitantes) {
        console.info("**** Finalizado llenado del parque *****");
    }

}

//var pubsub = null;
//window.onload = function() {
var pubsub = (function() {
    var suscriptores = {};

    function subscribe(event, callback) {
        if (!suscriptores[event]) {
            var suscriptorArray = [callback];
            suscriptores[event] = suscriptorArray;
        } else {
            suscriptores[event].push(callback);
        }
    }

    function publish(event, data) {
        if (suscriptores[event]) {
            suscriptores[event].forEach(function(callback) {
                callback(data);
            });
        }
    }

    return {
        pub: publish,
        sub: subscribe
    };
}());

/*pubsub.sub("miEvento", function(e) {
    console.log("miEvento ha sido lanzado!");
    console.log(e);
});

pubsub.sub("miEvento", function(e) {
    console.log("otro miEvento ha sido lanzado!");
    console.log(e);
});

pubsub.pub("miEvento", {
    misDatos: "Estos unos datos"
});

pubsub.pub("miEvento", {
    misDatos: "Estos otros datos"
});*/
//};


var parqueNatural = new ParqueNatural();
parqueNatural.subscribirPub();
var idInterval = setInterval(ejecutarCiclo, 1000);