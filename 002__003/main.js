/*

1) Haciendo uso de funciones y new, realiza una "clase" Vikingo que almacene la información de un vikingo:

nombre
salud (0 - 1000)
potenciaAtaque (1 - 20)
valocidad (0 - 100)

2) Haz uso de prototype y añade un método .ataca(vikingo) a un vikingo para que ataque a su oponente.
el ataque quitara salud al vikingo atacado (la potencia de ataque del atacante)

3) Realiza una clase Batalla() cuyas instancias enfrenten a dos vikingos.

Batalla tendrá un método iniciarPelea que hará de comienzo.

Una batalla tendrá una serie de asaltos en los que:

atacará primero el que más valocidad tenga,
y queitará de saludo su potencia de ataque al rival,
hasta que uno muera.

4) Crear la clase Arma() tenga un tipo: (espada/cuchillo...etc), una potencia (20 - 50) y un ataquesRestantes (0 -10).

5) Añade una propiedad armas a Vikingo para que pueda poseer varias armaspara su batalla.
Añade el método addArma() para añadir armas a los vikingos,

6) Modifica la función ataca del vikingo, para que si tiene armas disponibles ataque con el arma más potente.
Cada vez que se use un arma, debera restar uno a ataquesRestantes de ese arma.
Cuando el arma tenga 0 ataquesRestantes, el vikingo deberá abandonar el arma (añade la función abandonarArma al vikingo).

 */


// saludMaxima se usa como constante donde queramos usar la salud máxima (la bajé a 500 para que la batalla dure menos)
var saludMaxima = 500;
var nombrePersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran", "Conan", "Olaf", "Barbaro", "Destructor", "Erik"];


/* ********** Clase Vikingo ********** */
function Vikingo() {
    this.nombre = "";
    this.salud = 100;
    this.dinero = Math.floor(Math.random() * 1000) + 200;
}

Vikingo.prototype.initVikingo = function() {
    this.nombre = generarNombreAleatorio();
}

Vikingo.prototype.ataca = function(vikingo) {
    var armaElegida = this.armaElegida || this.elegirArma();
    var potenciaAtaque = this.getPotenciaActual();
    var nombreArma = "sus puños";
    if (armaElegida) {
        armaElegida.usar();
        potenciaAtaque = armaElegida.potencia;
        nombreArma = armaElegida.tipo + "(" + armaElegida.ataquesRestantes + ")";
    }
    console.log(this.nombre + " atacará a " + vikingo.nombre + " con potencia " + potenciaAtaque + " usando " + nombreArma);
    vikingo.modificarSalud(-potenciaAtaque);
    if (armaElegida && armaElegida.ataquesRestantes === 0) {
        this.abandonarArma(armaElegida);
    }
};
Vikingo.prototype.getPotenciaActual = function() {
    var potenciaActual = Math.round(this.potenciaAtaque * 0.8 + this.potenciaAtaque * 0.2 * this.salud / saludMaxima);
    return potenciaActual;
};
Vikingo.prototype.modificarSalud = function(cantidad) {
    this.salud += cantidad;
    if (this.salud < 0) {
        this.salud = 0;
    } else {
        if (this.salud > saludMaxima) {
            this.salud = saludMaxima;
        }
    }
    console.log("    La salud de " + this.nombre + " ahora es " + this.salud);
};
Vikingo.prototype.getEstado = function() {
    var estado = this.nombre + " [salud:" + this.salud + ", potencia:" + this.potenciaAtaque + "(" + this.getPotenciaActual() + "), velocidad:" + this.velocidad + ", dinero:" + this.dinero + "]";
    for (var i = 0; i < this.armas.length; i++) {
        var arma = this.armas[i];
        estado += "\n    " + arma.tipo + " [potencia:" + arma.potencia + ", ataquesRestantes:" + arma.ataquesRestantes + "]";
    }
    return estado;
};



/* ********** Clase Batalla ********** */
function Batalla(ejercito1, ejercito2) {
    this.battle = [ejercito1, ejercito2];
    this.vikingos = [];
}

Batalla.prototype.iniciarBatalla = function() {
    var _ejercito = null;
    var _arrayVikings = [];
    var _rep = 0;
    while (_rep < 100) {
        for (var i = 0; i < this.battle.length; i ++) {
            _ejercito = this.battle[i];
            for (var j in _ejercito.vikingos) {
                if (_ejercito.vikingos[j].salud > 0) {
                    _arrayVikings.push(_ejercito.vikingos[i]);
                    _ejercito.vikingos[i].ejercito = i;
                    break;
                }
            }
        }
        this.vikingos = _arrayVikings;
        this.iniciarPelea();
        _rep++;
    }

}

Batalla.prototype.iniciarPelea = function() {
    console.log("***** " + this.vikingos[0].nombre + " y " + this.vikingos[1].nombre + " entraran en batalla *****");
    console.log(this.vikingos[0].getEstado());
    console.log(this.vikingos[1].getEstado());

    var v1 = this.vikingos[0].velocidad;
    var v2 = this.vikingos[1].velocidad;
    var turno = v1 > v2 ? 0 : v1 < v2 ? 1 : Math.round(Math.random());

    var atacante;
    var atacado;

    while (this.vikingos[0].salud > 0 && this.vikingos[1].salud > 0) {
        atacante = this.vikingos[turno];
        atacado = this.vikingos[turno ? 0 : 1];
        atacante.ataca(atacado);
        turno = turno ? 0 : 1;
    }


    console.log("***** " + atacante.nombre + " ha ganado la batalla contra " + atacado.nombre + " *****");
    atacante.robarDinero(atacado);
    atacante.robarArmas(atacado);
    this.sanearBatalla(atacante, atacado);
    console.log(this.vikingos[0].getEstado());
    console.log(this.vikingos[1].getEstado());
};

Batalla.prototype.sanearBatalla = function(atacante, atacado){
    var army = this.getEjercito(atacante);
    var curar = this.battle[army].getCuradero();
    if(curar != null){
        curar.resucitar(atacado));
    }else{
        
    }
    
}


/* ********** Clase Arma ********** */
function Arma(tipo, potencia, ataquesRestantes) {
    this.tipo = tipo;
    this.potencia = potencia;
    this.ataquesRestantes = ataquesRestantes;
}
Arma.prototype.usar = function() {
    this.ataquesRestantes--;
};


function Ejercito() {
    this.vikingos = [];
    this.curanderosVik = [];
    this._totalEjercito = 25;
    this._totalCuranderos = 5;
}

Ejercito.prototype.getCuradero = function() {
    var _curandero = null;
    var _resucitaciones = 0;
    var _arrCuranderos = this.curanderosVik;
    console.log(this.curanderosVik);
    for (var i in _arrCuranderos) {
        var _bat = _arrCuranderos[i];
        _resucitaciones = _bat.resucitaciones;
        if (_resucitaciones > 0) {
            _curandero = _bat;
            break;
        }else{
            if(_arrCuranderos.length > 0){
                _arrCuranderos.splice(i,1);
            }
        }
    }
    console.log(_curandero);
    return _curandero;
}

Batalla.prototype.getEjercito = function(atacanteGanador){
    return atacanteGanador.ejercito;
}

function SoldadoVikingo(potencia, velocidad) {
    this.initVikingo(); // init del padre
    this.potenciaAtaque = potencia;
    this.velocidad = velocidad;
    this.armas = [];
    this.armaElegida = null;
    this.ejercito = null;
}

SoldadoVikingo.prototype = new Vikingo();

Vikingo.prototype.addArma = function(arma) {
    this.armas = arma;
};
SoldadoVikingo.prototype.abandonarArma = function(arma) {
    var indice = this.armas.indexOf(arma);
    var abandonadas = this.armas.splice(indice, 1);
    if (abandonadas[0] == this.armaElegida) {
        this.armaElegida = null;
    }
    //console.log("    " + this.nombre + " ha abandonado su " + abandonadas[0].tipo);
};
SoldadoVikingo.prototype.elegirArma = function() {
    var armaElegida = null;
    for (var i = 0; i < this.armas.length; i++) {
        var arma = this.armas[i];
        if (!armaElegida || arma.potencia > armaElegida.potencia) {
            armaElegida = arma;
        }
    }
    if (armaElegida) {
        console.log("    " + this.nombre + " ha elegido su " + armaElegida.tipo);
        this.armaElegida = armaElegida;
    }
    return armaElegida;
};
SoldadoVikingo.prototype.robarDinero = function(vikingo) {
    this.dinero += vikingo.dinero;
    console.log(this.nombre + " ha robado " + vikingo.dinero + " monedas a " + vikingo.nombre);
    vikingo.dinero = 0;
};
SoldadoVikingo.prototype.robarArmas = function(vikingo) {
    if (vikingo.armas.length) {
        this.armas = this.armas.concat(vikingo.armas);
        console.log(this.nombre + " ha robado " + vikingo.armas.length + " armas a " + vikingo.nombre);
        vikingo.armas = [];
    }
};

function CuranderoVikingo() {
    this.initVikingo(); // init del padre
    this.resucitaciones = 5;
}

CuranderoVikingo.prototype = new Vikingo();

CuranderoVikingo.prototype.resucitar = function(vikingoResucitar) {
    var resucitado = true;
    if (this.resucitaciones > 0) {
        vikingoResucitar.salud = 100;
        this.resucitaciones -= 1;
        console.log("Vikingo resucitado: " + vikingoResucitar.nombre);
    }else{
        resucitado = false;
    }
    return resucitado;
}


function generarNombreAleatorio() {
    var aleatorio = Math.floor(Math.random() * nombrePersonas.length);
    return nombrePersonas[aleatorio];
}

/* ********** Declaramos los vikingos y sus armas ********** */

function generic(randMax) {
    Math.ceil(Math.random() * randMax);
}

var weaponsVik1 = [];
var armaVik1 = new Arma("espada", 45, 7);
var armaVik1_2 = new Arma("cuchillo", 50, 10);
var armaVik1_3 = new Arma("manos", 35, 30);
weaponsVik1.push(armaVik1, armaVik1_2, armaVik1_3);

var weaponsVik2 = [];
var armaVik2 = new Arma("atgeir", 50, 7);
var armaVik2_2 = new Arma("hacha", 48, 10);
var armaVik2_3 = new Arma("manos", 35, 30);
weaponsVik2.push(armaVik2, armaVik2_2, armaVik2_3);

var vikingosSur = new Ejercito();
var vikingosNorte = new Ejercito();
var generarArmy = function(ejercitoVikingo, i) {
    var genSol = 0,
        genCur = 0;
    while (genSol < 25) {
        ejercitoVikingo.vikingos.push(new SoldadoVikingo(generic(20), generic(100)));
        ejercitoVikingo.vikingos[genSol].addArma(i ? weaponsVik1 : weaponsVik2);
        genSol++;
    }
    while (genCur < 5) {
        ejercitoVikingo.curanderosVik.push(new CuranderoVikingo());
        genCur++;
    }
}

generarArmy(vikingosSur, false);
generarArmy(vikingosNorte, true);

/*var erik = new Vikingo("Erik", saludMaxima, 18, 50);
erik.addArma(new Arma("maza", 40, 5));
erik.addArma(new Arma("hacha", 45, 5));
erik.addArma(new Arma("espada", 33, 10));

var olaf = new Vikingo("Olaf", saludMaxima, 20, 50);
olaf.addArma(new Arma("espada", 35, 8));
olaf.addArma(new Arma("hacha", 42, 8));
olaf.addArma(new Arma("cuchillo", 24, 10));*/


/* ********** Inicia la batalla ********** */

var batalla = new Batalla(vikingosNorte, vikingosSur);

batalla.iniciarBatalla();