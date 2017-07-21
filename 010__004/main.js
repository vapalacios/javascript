class Utilities {
    constructor() {
        this._nombrePersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran", "Conan", "Olaf", "Barbaro", "Destructor", "Erik", "Michael", "Antonio", "Williams", "María", "Emilia", "Simón", "Jesús", "Carlos", "Karla", "Andrés", "Frank", "Kelvin", "Andrea", "Amor", "Manuel", "Natali", "Fernando", "Pedro", "Karim", "Kobe", "James"];
        this._nacionality = ["Venezolana", "Chilena", "Española", "Mexicana", "Argentina"];
        this._queHace = ["encargado", "mozo"];
        this._nombreRestaurante = ["El diez", "Quebracho", "Sol y Sombra", "Subway"];
        this._bebidasAlcoholicas = ["Cerveza", "Tequila", "Mezcal", "Whisky", "Ginebra", "Anis", "Frangelico", "Vino Tinto", "Vino Blanco", "Ron"];
        this._bebidasNoAlcoholicas = ["Coca", "Fanta", "Sprite", "Agua", "Jugo Naranja", "Jugo Verde", "Sandia", "Jugo Zanahoria", "Café", "Té"];
        this._tabla_inicio = "<table>";
    	this._tabla_fin = "</table>";
    	this._tableHeaderDrink = "<thead><tr><th>Alcoholica</th><th>Tipo</th><th>Grados de Alcohol</th><th>Precio</th></tr></thead>";
    	this._tbodyInicio = "<tbody>";
    	this._tbodyFin = "</tbody>";
    	this._tableHeaderMeal = "<thead><tr><th>Tipo</th><th>Plato</th><th>Calorías</th><th>Precio</th></tr></thead>";
    	this._postres = ["Brazo Gitano", "Selva Negra", "Tartaleta", "Cheesecake", "Tiramisú", "Torta de Chocolate", "Flan", "Brownies", "Keke", "Helado"];
    	this._entradas = ["Tacos Rib Eyes", "Ensalada Cesar", "Empanadas", "Crepes de Espinaca", "Huevos al Tomate", "Esparragos", "Aguacate Relleno", "Carpaccio", "Ensalada Capresa", "Arepas y Nata"];
    	this._principal = ["Rib Eyes", "Bife", "Lomo Vetado", "Salmón", "Corvina", "Pollo", "Lomo Saltado", "Camarones", "Pulpo", "Paella"];
    	this._tipoComida = ["entrante", "principal", "postre"];
    	this._arrow = ()=>console.log("Arrow function");
    }

    static generarDatoAleatorio(array) {
    	let result = null;
        let aleatorio = Math.floor(Math.random() * array.length);
        result = array[aleatorio];
        array.splice(aleatorio, 1);
        return result;
    }

    static generarArrayAleatorio(array) {
        let aleatorio = Math.floor(Math.random() * array.length);
        return array[aleatorio];
    }

    static getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandom() {
        return Math.round(Math.random());
    }

    static getFormatCurrencyNumber(number){
    	return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
    }

    get arrayAlcoholic(){
    	return this._bebidasAlcoholicas;
    }

    get arrayNoAlcoholic(){
    	return this._bebidasNoAlcoholicas;
    }
}

const UTIL = new Utilities();

class Persona {
    constructor() {
        this._nombre = Utilities.generarDatoAleatorio(UTIL._nombrePersonas);
        this._nacionalidad = Utilities.generarDatoAleatorio(UTIL._nacionality);
        this._edad = Utilities.getRandomInteger(20, 60);
    }
}

class Camarero extends Persona {
    constructor() {
        super();
        this._cargo = Utilities.generarDatoAleatorio(UTIL._queHace);
    }
}


class Cliente extends Persona {
    constructor() {
        super();
        this._dinero = Utilities.getRandomInteger(0, 1500);
    }
}

class Mesa {
    constructor(id) {
        this._idMesa = "mesa" + id;
        this._capacidad = Utilities.getRandomInteger(2, 10);
        this._ocupada = false;
        this._personasSentadas = [];
        this._ordenes = [];
    }

    getTable(){
    	let divMesa = '<div class="divMesa"> \
                        <span>Código de la mesa: ' + this._idMesa + '</span> \
                        <span>Número de personas: ' + this._capacidad + '</span> \
                        <span>Ocupada: ' + this._ocupada + '</span> \
                        <span>Personas sentadas: ' + this._personasSentadas.length + '</span> \
                        <span>Ordenes de la mesa: ' + this._ordenes.length + '</span> \
                        </div>';
        return divMesa;
    }
}

class Producto {
    constructor() {
        this._numExistencias = Utilities.getRandomInteger(0, 10);
        this._calorias = Utilities.getRandomInteger(0, 300);
        this._precio = Utilities.getRandomInteger(0, 350);
    }
}

class Bebida extends Producto {
    constructor(alcoholica, grados) {
        super();
        this._esAlcoholica = alcoholica;
        this._gradosAlcohol = grados;
    }

    getRowForDrink(){
    	let _desDrink = this._esAlcoholica?Utilities.generarDatoAleatorio(UTIL._bebidasAlcoholicas):Utilities.generarDatoAleatorio(UTIL._bebidasNoAlcoholicas);
    	let _alcoholic = this._esAlcoholica? "Si": "No";
    	let _rowDrink = '<tr> \
    					<td>' + _alcoholic + '</td> \
                        <td>' + _desDrink + '</td> \
                        <td>' + this._gradosAlcohol + '</td> \
                        <td>' + Utilities.getFormatCurrencyNumber(this._precio) + '</td> \
                        </tr>';
        return _rowDrink;
    }
}

class Comida extends Producto {
    constructor() {
        super();
        this._tipo = Utilities.generarArrayAleatorio(UTIL._tipoComida);
    }

    getRowForMeal(){
    	let _result = null;
    	switch(this._tipo){
    		case "entrante":
    			_result = Utilities.generarDatoAleatorio(UTIL._entradas);
    		break;
    		case "principal":
    			_result = Utilities.generarDatoAleatorio(UTIL._principal);
    		break;
    		case "postre":
    			_result = Utilities.generarDatoAleatorio(UTIL._postres);
    		break;
    	}
    	let _rowMeal = `<tr>
    					<td>${this._tipo}</td>
                        <td>${_result}</td>
                        <td>${this._calorias}</td>
                        <td>${Utilities.getFormatCurrencyNumber(this._precio)}</td>
                        </tr>`;
        return _rowMeal;
    }
}

class Restaurante {
    constructor() {
        this._nombre = Utilities.generarDatoAleatorio(UTIL._nombreRestaurante);
        this._mesas = [];
        this._camareros = [];
        this._carta = [];
    }
    addMesas(mesa) {
        this._mesas.push(mesa);
    }
    addCamareros(camarero) {
        this._camareros.push(camarero);
    }
    setCarta(carta) {
        this._carta = carta;
    }

    initRestaurant() {
        for (let c = 0; c < 5; c++) {
            this.addCamareros(new Camarero());
        }
        for (let m = 0; m < 30; m++) {
            this.addMesas(new Mesa(m));
        }
        let _comidas = [];
        let _bebidas = [];
        for (let k = 0; k < 5; k++) {
            _comidas.push(new Comida());
        }
        for (let j = 0; j < 5; j++) {
        	let alcoholica = Utilities.getRandom()?true:false;
        	let grados = alcoholica? Utilities.getRandomInteger(5, 45)+"%":"0%"
            _bebidas.push(new Bebida(alcoholica, grados));
        }
        let _carta = new Carta(_comidas, _bebidas);
        this.setCarta(_carta);
    }

    showMealsAndDrinkHtml(){
    	let divIzquierdo = document.getElementById("contentCarta");
    	let drinks = this.getDrinksToShow();
    	let meals = this.getMealToShow();
    	let htmlShow = meals.concat(drinks);
    	divIzquierdo.innerHTML = htmlShow;
    }

    getMealToShow(){
    	const H2_COMIDA = "<h2>Carta</h2>";
    	const H3_COMIDA = "<h3>Comidas:</h3>";
    	let paintMeal = H2_COMIDA;
    	paintMeal += H3_COMIDA + UTIL._tabla_inicio;
    	paintMeal += UTIL._tableHeaderMeal + UTIL._tbodyInicio;
    	let _meal = this._carta._comidas;
    	for(let i in _meal){
    		paintMeal += _meal[i].getRowForMeal();
    	}
   
    	return paintMeal += UTIL._tbodyFin + UTIL._tabla_fin;
    }

    getDrinksToShow(){
    	const H3_BEBIDA = "<h3>Bebidas:</h3>";
    	let paintDrink = H3_BEBIDA + UTIL._tabla_inicio;
    	paintDrink += UTIL._tableHeaderDrink + UTIL._tbodyInicio;
    	let _drank = this._carta._bebidas;
    	for(let j in _drank){
    		paintDrink += _drank[j].getRowForDrink();
    	}
    	return paintDrink += UTIL._tbodyFin + UTIL._tabla_fin;
    }

    showTables(){
    	const H2_MESA = "<h2 class='h2'>Listado de mesas</h2>";
    	let divDerecho = document.getElementById("contentMesa");
    	let paintTable = H2_MESA;
    	for(let m in this._mesas){
    		paintTable += this._mesas[m].getTable();
    	}
    	divDerecho.innerHTML = paintTable;
    }

}

class Carta {
    constructor(comidas, bebidas) {
        this._comidas = comidas;
        this._bebidas = bebidas;
    }

    addComida(comida) {
        this._comidas.push(comida);
    }

    addBebida(bebida) {
        this._bebidas.push(bebida);
    }
}

var rest = new Restaurante();

window.onload = function(){rest.initRestaurant();rest.showMealsAndDrinkHtml();rest.showTables();};





