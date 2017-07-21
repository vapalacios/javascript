var Vikingo = function(nombreVik, saludVik, potenciaAttack, velocidadVik) {
    this._nombre = nombreVik;
    this._salud = saludVik;
    this._potenciaAtaque = potenciaAttack;
    this._velocidad = velocidadVik;
    this._armas = [];
}

Vikingo.prototype.ataca = function(vikingoRival) {
    var _armaEnUso = 0;
    var _arma = null;
    var _armaAtaque = null;
    for (var i in this._armas) {
        _arma = this._armas[i];
        if (_arma._potenciaAtaque > _armaEnUso) {
            _armaEnUso = _arma._potenciaAtaque;
            _armaAtaque = _arma;
        }
    }
    console.log("Arma seleccionada: " + _armaAtaque._tipo);
    _armaAtaque._ataqueRestantes -= 1;
    if (_armaAtaque._ataqueRestantes <= 0) {
        this.abandonarArma(_armaAtaque);
    }
    console.log("Vikingo: " + this._nombre + " Ataca a Vikingo: " + vikingoRival._nombre + " con esta arma " + _armaAtaque._tipo.toUpperCase());
    return vikingoRival._salud -= _armaAtaque._potenciaAtaque;
}

Vikingo.prototype.addArma = function(weapons) {
    return this._armas = weapons;
}

Vikingo.prototype.abandonarArma = function(weaponDrop) {
    var _armaAbandonada = weaponDrop._tipo;
    var indexWeapon = 0;
    for (var i in this._armas) {
        if (this._armas[i]._tipo = weaponDrop._tipo) {
            indexWeapon = i;
            break;
        }
    }
    this._armas.splice(indexWeapon, 1);
    console.log("Arma Abandonada: " + _armaAbandonada + " Vikingo: " + this._nombre);
    return "Arma Abandonada " + _armaAbandonada;
}

Vikingo.prototype.robarArmas = function(vikingoPerdedor){
	if(vikingoPerdedor._armas.length > 0){
		for(var i in vikingoPerdedor._armas){
			this._armas.push(vikingoPerdedor._armas[i]);
		}
	}
}

var Batalla = function(vikingsRight, vikingsLeft) {
    this._vikingoRight = vikingsRight;
    this._vikingoLeft = vikingsLeft;
}

Batalla.prototype.iniciarBatalla = function() {
    var stamina = this._vikingoRight._velocidad > this._vikingoLeft._velocidad ? this._vikingoRight._salud : this._vikingoLeft._salud;
    var turno = this._vikingoRight._velocidad > this._vikingoLeft._velocidad ? "right" : "left";
    while (stamina > 0) {
        if (turno == "right") {
            stamina = this._vikingoRight.ataca(this._vikingoLeft);
            turno = "left";
        } else if (turno == "left") {
            stamina = this._vikingoLeft.ataca(this._vikingoRight);
            turno = "right";
        } else {
            stamina = (Math.round(Math.random)) ? this._vikingoRight.ataca(this._vikingoLeft) : this._vikingoLeft.ataca(this._vikingoRight);
            turno = (Math.round(Math.random)) ? "right" : "left";
        }
    }
    return this._vikingoRight._salud <= 0 ? "Muere vikingo 1" : "Muere vikingo 2";
}

var Arma = function(tipoArma, potenciaArma, attack) {
    this._tipo = tipoArma;
    this._potenciaAtaque = potenciaArma;
    this._ataqueRestantes = attack;
}


var vikingo1 = new Vikingo("Conan", 1000, 20, 89);
var vikingo2 = new Vikingo("El Barbaro", 1000, 19, 89);
var vikingo3 = new Vikingo("Fake", 820, 15, 75);

var weaponsVik1 = [];
var armaVik1 = new Arma("espada", 45, 7);
var armaVik1_2 = new Arma("cuchillo", 50, 10);
var armaVik1_3 = new Arma("manos", 35, 30);
weaponsVik1.push(armaVik1, armaVik1_2, armaVik1_3);
vikingo1.addArma(weaponsVik1);

var weaponsVik2 = [];
var armaVik2 = new Arma("atgeir", 50, 7);
var armaVik2_2 = new Arma("hacha", 48, 10);
var armaVik2_3 = new Arma("manos", 35, 30);
weaponsVik2.push(armaVik2, armaVik2_2, armaVik2_3);
vikingo2.addArma(weaponsVik2);


var batalla = new Batalla(vikingo1, vikingo2);
batalla.iniciarBatalla();