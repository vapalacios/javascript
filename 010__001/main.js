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
        this._arrow = () => console.log("Arrow function");
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

    static getFormatCurrencyNumber(number) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
    }

    get arrayAlcoholic() {
        return this._bebidasAlcoholicas;
    }

    get arrayNoAlcoholic() {
        return this._bebidasNoAlcoholicas;
    }

    static createButton(texto, funcion){
        let button = document.createElement("button");
        button.textContent = texto;
        button.addEventListener("click", funcion());
        return button;
    }
}

const UTIL = new Utilities();

class Persona {
    constructor() {
        this._nombre = Utilities.generarArrayAleatorio(UTIL._nombrePersonas);
        this._nacionalidad = Utilities.generarArrayAleatorio(UTIL._nacionality);
        this._edad = Utilities.getRandomInteger(20, 60);
        this._nivelDeEnfado = 0;
    }
}

class Camarero extends Persona {
    constructor() {
        super();
        this._cargo = Utilities.generarArrayAleatorio(UTIL._queHace);
    }
    ejecutarCiclo() {
        console.log("ejecutar Ciclo Camarero");
    }
}


class Cliente extends Persona {
    constructor() {
        super();
        this._dinero = Utilities.getRandomInteger(0, 1500);
    }
    ejecutarCiclo() {
        console.log("ejecutar Ciclo Cliente");
    }
}

class Mesa {
    constructor(id) {
        this._idMesa = "mesa" + id;
        this._capacidad = Utilities.getRandomInteger(2, 10);
        this._ocupada = false;
        this._personasSentadas = [];
        this._ordenesMesa = new Orden();
    }

    getTable() {
        let divElement = document.createElement("div");
        divElement.setAttribute("class", "divMesa");
        let divMesa = '<span>Código de la mesa: ' + this._idMesa + '</span> \
                        <span>Número de personas: ' + this._capacidad + '</span> \
                        <span>Ocupada: ' + this._ocupada + '</span> \
                        <span>Personas sentadas: ' + this._personasSentadas.length + '</span> \
                        <span>Ordenes de la mesa: ' + this._ordenesMesa._ordenes.length + '</span>';
        divElement.innerHTML = divMesa;
        return divElement;
    }

    showTables() {
        let divDerecho = document.getElementById("contentMesa");
        divDerecho.appendChild(this.getTable());
    }
}

class Producto {
    constructor() {
        this._numExistencias = Utilities.getRandomInteger(1, 500);
        this._calorias = Utilities.getRandomInteger(0, 300);
        this._precio = Utilities.getRandomInteger(0, 350);
    }
}

class Bebida extends Producto {
    constructor(alcoholica, grados) {
        super();
        this._desc = "drink";
        this._esAlcoholica = alcoholica;
        this._gradosAlcohol = grados;
    }

    getRowForDrink() {
        let _desDrink = this._esAlcoholica ? Utilities.generarArrayAleatorio(UTIL._bebidasAlcoholicas) : Utilities.generarArrayAleatorio(UTIL._bebidasNoAlcoholicas);
        let _alcoholic = this._esAlcoholica ? "Si" : "No";
        let _trElement = document.createElement("tr");
        let _rowDrink = `<td>${_alcoholic}</td> \
                        <td>${_desDrink}</td> \
                        <td>${this._gradosAlcohol}</td> \
                        <td>${Utilities.getFormatCurrencyNumber(this._precio)}</td>`;
        _trElement.innerHTML = _rowDrink;
        return _trElement;
    }

    getDrinksToShow() {
        let divIzquierdo = document.querySelectorAll("#contentCarta tbody");
        divIzquierdo[1].appendChild(this.getRowForDrink());
    }
}

class Comida extends Producto {
    constructor() {
        super();
        this._desc = "meal";
        this._tipo = Utilities.generarArrayAleatorio(UTIL._tipoComida);
    }

    getRowForMeal() {
        let _result = null;
        switch (this._tipo) {
            case "entrante":
                _result = Utilities.generarArrayAleatorio(UTIL._entradas);
                break;
            case "principal":
                _result = Utilities.generarArrayAleatorio(UTIL._principal);
                break;
            case "postre":
                _result = Utilities.generarArrayAleatorio(UTIL._postres);
                break;
        }
        let _trElement = document.createElement("tr");
        let _rowMeal = `<td>${this._tipo}</td>
                        <td>${_result}</td>
                        <td>${this._calorias}</td>
                        <td>${Utilities.getFormatCurrencyNumber(this._precio)}</td>`;
        _trElement.innerHTML = _rowMeal;
        return _trElement;
    }

    getMealToShow() {
        let divIzquierdo = document.querySelectorAll("#contentCarta tbody");
        divIzquierdo[0].appendChild(this.getRowForMeal());
    }
}

class Restaurante {
    constructor() {
        this._nombre = Utilities.generarDatoAleatorio(UTIL._nombreRestaurante);
        this._mesas = [];
        this._camareros = [];
        this._carta = [];
        this._idsetInterval = null;
        this._recepcion = new Recepcion();
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
            let alcoholica = Utilities.getRandom() ? true : false;
            let grados = alcoholica ? Utilities.getRandomInteger(5, 45) + "%" : "0%"
            _bebidas.push(new Bebida(alcoholica, grados));
        }
        let _carta = new Carta(_comidas, _bebidas);
        this.setCarta(_carta);
    }



    genStructure() {
        let divButton = document.createElement("div");
        let buttonReception = document.createElement("button");
        buttonReception.textContent = "Traer Cliente";
        buttonReception.addEventListener("click", () => this._recepcion.workWithGroup());
        let buttonAtender = document.createElement("button");
        buttonAtender.textContent =  "Recibir Cliente";
        buttonAtender.addEventListener("click", () => this.atender());
        let buttonTakeANote = document.createElement("button");
        buttonTakeANote.textContent = "Atender Cliente";
        buttonTakeANote.addEventListener("click", () => this.tomarNota());
        let buttonServe = document.createElement("button");
        buttonServe.textContent = "Atender Ordenes";
        buttonServe.addEventListener("click", () => this.atenderOrden());
        divButton.appendChild(buttonReception);
        divButton.appendChild(buttonAtender);
        divButton.appendChild(buttonTakeANote);
        // divButton.appendChild(Utilities.createButton("Traer Cliente", ()=>this._recepcion.workWithGroup);
        // divButton.appendChild(Utilities.createButton("Recibir Cliente", ()=>this.atender);
        // divButton.appendChild(Utilities.createButton("Atender Cliente", ()=>this.tomarNota);
        let divRestaurant = document.createElement("div");
        let _structureRest = `<div class ="columna-izq columna columna-izq">
	            					<div id = "contentCarta">
		            					<h2>Carta</h2>
		            					<h3>Comidas:</h3>
							          	<table>
							          		<thead>
							          			<tr>
							          				<th>Tipo</th>
							          				<th>Plato</th>
							          				<th>Calorías</th>
							          				<th>Precio</th>
							          			</tr>
							          		</thead>
							          		<tbody>
							          		</tbody>
						        		</table>	
		            					<h3>Bebidas:</h3>
		            					<table>
							          		<thead>
							          			<tr>
							          				<th>Alcoholica</th>
							          				<th>Tipo</th>
							          				<th>Grados de Alcohol</th>
							          				<th>Precio</th>
							          			</tr>
							          		</thead>
							          		<tbody>
							          		</tbody>
						        		</table>	
		            					
	            					</div> 
            					</div> 
	            				<div class = "columna-der columna columna-der">
	            					<div id = "contentMesa"><h2 class='h2'>Listado de mesas</h2></div>
	            				</div>`;
        divRestaurant.innerHTML = _structureRest;
        let divReception = document.createElement("div");
        divReception.innerHTML = "<h4>Recepción</h4>";
        document.body.appendChild(divButton);
        document.body.appendChild(divRestaurant);
        document.body.appendChild(divReception);
    }

    ejecutarCiclo() {
        this._carta.showMealsAndDrinkHtml();
        let divDerecho = document.getElementById("contentMesa");
        divDerecho.innerHTML = "";
        this._mesas.forEach((x) => x.showTables());
        this._recepcion.paintRecepcion();
    }

    openRestaurant() {
        this.initRestaurant();
        this.genStructure();
        this.iniciarIntervalo();
    }

    iniciarIntervalo() {
        this._idsetInterval = window.setInterval(() => this.ejecutarCiclo(), 2000);
    }

    endCiclo() {
        window.clearInterval(this._idsetInterval);
    }

    sitDown(lobby) {
        console.log(lobby);
    }

    atender() {
        this._mesas.sort((x, y) => x._capacidad < y._capacidad && !x._ocupada);
        let mesaAsignada = this._mesas[0];
        if (this._recepcion._gruposEsperando[0] && mesaAsignada._capacidad >= this._recepcion._gruposEsperando[0]._integrantes.length) {
            mesaAsignada._ocupada = true;
            mesaAsignada._personasSentadas = this._recepcion._gruposEsperando[0]._integrantes;
        } else {
            console.warn("Grupo de Personas se marcha por no tener mesa");
        }
        this._recepcion._gruposEsperando.shift();
    }

    tomarNota() {
        this._mesas.sort((x) => x._ocupada).forEach((x) => {
            if (x._ocupada) {
                x._personasSentadas.forEach((p)=>{
                    x._ordenesMesa._ordenes.push(Utilities.generarArrayAleatorio(this._carta._comidas));
                    x._ordenesMesa._ordenes.push(Utilities.generarArrayAleatorio(this._carta._bebidas));
                    x._ordenesMesa._persona = p._nombre;
                });
            }
        });
    }

    atenderOrden(){
    	this._mesas.filter((x)=>x._ordenesMesa._ordenes.length > 0).forEach(
        (x)=>{
            x._ordenesMesa._atendida = true;
            x._ordenesMesa._ordenes.forEach((y)=>{
                if(y._numExistencias > 0){
                     y._numExistencias--;
                 }else{
                    x._personasSentadas.forEach((p)=>{
                    p._nivelDeEnfado += 10;
                        if(p._nivelDeEnfado >= 100){
                            console.warn("Grupo de Personas se marcha por no haber Productos suficientes. Nivel de Enfado: " + p._nivelDeEnfado);
                            x._personasSentadas = [];
                            x._ordenesMesa._ordenes = [];
                        }
                    });
                 }
            });
        });
    }

    checkEnfado(){
        this._mesas.filter((x)=>x._ordenesMesa._ordenes.length > 0).forEach(
        (x)=>{
            if(!x._ordenesMesa._atendida){
                x._personasSentadas.forEach((p)=>{
                    p._nivelDeEnfado += 10;
                    if(p._nivelDeEnfado >= 100){
                        console.warn("Grupo de Personas se marcha por no haber sido atendida. Nivel de Enfado: " + p._nivelDeEnfado);
                        x._personasSentadas = [];
                        x._ordenesMesa._ordenes = [];
                    }
                });
            }
        });
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

    showMealsAndDrinkHtml() {
    	let divIzquierdo = document.querySelectorAll("#contentCarta tbody");
    	divIzquierdo[0].innerHTML = "";
    	divIzquierdo[1].innerHTML = "";
        this._bebidas.forEach((x) => x.getDrinksToShow());
        this._comidas.forEach((x) => x.getMealToShow());
    }
}

class Recepcion {
    constructor() {
        this._gruposEsperando = [];
    }

    addGruposEsperando(grupo) {
        this._gruposEsperando.push(grupo);
    }

    paintRecepcion() {
    	let _recpt = document.querySelector("h4");
    	_recpt.innerHTML = "";
        this._gruposEsperando.forEach((x) => x.pintarGrupo());
    }

    workWithGroup() {
        let longitud = Utilities.getRandomInteger(1, 4);
        let group = new GrupoPersonas();
        for (let i = 0; i < longitud; i++) {
            group.addIntegrantes(new Persona());
        }
        this.addGruposEsperando(group);
    }
}

class GrupoPersonas {
    constructor() {
        this._integrantes = [];
    }

    addIntegrantes(persona) {
        this._integrantes.push(persona);
    }
    pintarGrupo() {
        let _recpt = document.querySelector("h4");
        let divElement = document.createElement("div");
        let pElement = document.createElement("p");
        pElement.innerHTML = "Número de Personas: " + this._integrantes.length;
        divElement.appendChild(pElement);
        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", "img/comer.jpg");
        divElement.appendChild(imgElement);
        _recpt.appendChild(divElement);
    }
}

class Orden{
    constructor(){
        this._ordenes = [];
        this._atendida = false;
        this._persona = null;
    }
}

let rest = null;

window.onload = function() {
    rest = new Restaurante();
    rest.openRestaurant();
};