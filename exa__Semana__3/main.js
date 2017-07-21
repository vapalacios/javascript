/*


1) 1 Punto

Modela la clase Pokedex, la cual será nuestra enciclopedia de pokemons.
La clase Pokedex deberá tener:

- Array de Pokemons (contendrá solo los pokemons de la página en la que nos encontremos)
- Página actual (numérico)
- Número total de pokemons

Modela la clase Pokemon. Pokemon deberá tener:

- Nombre
- UrlDetalle

2) 1 Punto

Modela la clase ApiClient que se encargue de realizar peticiones get genéricas.
Sólo recibirá la URL sobre la que ejecutará la petición y debe devoler el body de respuesta ya parseado.
Se valorará el uso de Promesas en vez de callbacks.

4) 2 Puntos

Modela la clase PokemonApi que ofrezca:

- El método getPokemonsAtPage(numeroPagina): que devuelva el array de Pokemon de esa página.
- El método getPokemonByUrl(urlDePokemon): que devuelva el Pokemon de esa URL.

Esta clase deberá hacer uso de la clase ApiClient para pedir que haga el get de las URLs que necesite.
Al igual que en el anterior se valorará el uso de Promesas en vez de callbacks.

5) 2 Puntos 

Implementa las funciones pintarEstructura() y pintarPagina() en la clase pokedex .
Por ahora solo HTML y CSS, la funcionalidad de los botones puedes hacerla más tarde.

	pintarEstructura() debe pintar la estructura básica de la Pokedex:
	
		En la parte superior tendremos un paginador que tendrá:
			- Número de página actual.
			- Botón de página siguiente y página anterior

		En la parte media mostrará una tabla con los pokemons. La tabla tendrá 2 columnas: 
			- Nombre: tendrá el nombre del pokemon
			- Acciones. tendrá un botón ver detalles cuya acción implementaremos más tarde

	pintarPagina() debe rellenar la tabla con los pokemons de la página actual.


5) 1 Puntos

Haz que al cargar la página:
	- Se pinte la estructura de la pokedex.
	- Se pida la página 1
	- Se pinte la página actual

6) 1 Puntos

Implementa el paginador.
Cuando pulsemos en siguiente o anterior deberás pedir la página que corresponda al PokemonClient y posteriormente pintarla.

7) 2 Puntos

Implementa la funcionalidad del botón ver detalles:

	- Deberás pedir los detalles de ese Pokemon llamando a la función getPokemonByUrl de PokemonApi.
	- Deberás mostrar los detalles de ese pokemon, al menos:
		- Nombre
		- Una imagen (cualquiera dentro del array sprites)
		- Peso (weight)
		- Altura (height)

	Puedes hacer uso de una modal o mostrar los detalles debajo de la propia tabla.



INFO DE LA API:

URL de la API: http://pokeapi.co/api/v2/pokemon
URL de la API paginada: http://pokeapi.co/api/v2/pokemon/?offset=0

El offset en la API paginada es el número de pokemons que nos "saltamos", 
puesto que esta API devuelve los resultados de 20 en 20 para paginar debemos saltar de 20 en 20

Por ejemplo:

Página 1: http://pokeapi.co/api/v2/pokemon/?offset=0
Página 2: http://pokeapi.co/api/v2/pokemon/?offset=20
Página 3: http://pokeapi.co/api/v2/pokemon/?offset=40
..
..
..
Página n: offset = (n-1)*20


*/

class Utilities {
    constructor() {}
    static crearLabel(text, para) {
        let labelElement = document.createElement("label");
        labelElement.textContent = text;
        labelElement.setAttribute("for", para);
        return labelElement;
    }

    static crearInput(type, size, name, pattern, placeholder) {
        let inputElement = document.createElement("input");
        inputElement.setAttribute("type", type);
        inputElement.setAttribute("size", size);
        inputElement.setAttribute("name", name);
        inputElement.setAttribute("id", name);
        inputElement.setAttribute("pattern", pattern); //pattern="[A-Za-z]{3}";
        inputElement.setAttribute("placeholder", placeholder);
        inputElement.setAttribute("required", true);
        return inputElement;
    }

    static crearBoton(text) {
        let buttonElement = document.createElement("button");
        buttonElement.textContent = text;
        return buttonElement;
    }

    static crearTd(text) {
        let tdElement = document.createElement("td");
        tdElement.textContent = text;
        return tdElement;
    }

    static crearImg(text) {
        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", text);
        return imgElement;
    }

    static crearSpan(text) {
        let spanElement = document.createElement("span");
        spanElement.textContent = text;
        return spanElement;
    }
}

class Pokedex {
    constructor() {
        this._arrayPokemons = [];
        this._pagActual = 0;
        this._totalPokemons = 0;
        this._pokemonApi = new PokemonApi();
        this._previous = null;
        this._next = null;
    }

    obtenerPokemonByPage(pag) {
    	let pg = (this._pagActual - 1) * 20;
        this._pokemonApi.getPokemonsAtPage(pg).then(
            (data) => {
                this._arrayPokemons = data.arrayPokemons;
                this._totalPokemons = data.count;
                this._previous = data.previous;
                this._next = data.next;
                this._pagActual = this._pagActual + 1;
                console.log(this._arrayPokemos);

                this.mostrarPokemos();


            }
        );
    }

    obtenerPokemonByUrl(url) {
        this._pokemonApi.getPokemonByUrl(url).then(
            (data) => {
                console.log(data);
                this.mostrarImgPokemon(data);
            }
        );
    }

    tablaPokemon() {
        let table = document.querySelector("table");
        if (table) {
            table.parentNode.removeChild(table);
        }

        let tableElement = document.createElement("table");
        let theadElement = document.createElement("thead");
        let trElement = document.createElement("tr");
        let template = `<td>Nombre</td>
    					<td>Acciones</td>
    					`;
        trElement.innerHTML = template;
        theadElement.appendChild(trElement);
        tableElement.appendChild(theadElement);
        return tableElement;
    }

    mostrarPokemos() {
        let tableElement = this.tablaPokemon();
        let divElement = document.createElement("div");
        let tbodyElement = document.createElement("tbody");
        this._arrayPokemons.forEach((x) => {
            tbodyElement.appendChild(x.pintarPokemon((url) => this.obtenerPokemonByUrl(url)));
        });
        tableElement.appendChild(tbodyElement);
        divElement.appendChild(tableElement);
        document.body.appendChild(divElement);
    }

    mostarHeader() {
        let header = document.createElement("header");
        let divElement = document.createElement("div");
        divElement.textContent = "La Pokedex Xanxa";
        let buttonElement = Utilities.crearBoton("Anterior");
        buttonElement.addEventListener("click", () => this.obtenerPokemonByPage(this._previous));
        let buttonElementCrear = Utilities.crearBoton("Siguiente");
        buttonElementCrear.addEventListener("click", () => this.obtenerPokemonByPage(this._next));
        let spanElement = Utilities.crearSpan("Página actual " + this._pagActual);
        header.appendChild(divElement);
        header.appendChild(buttonElement);
        header.appendChild(spanElement);
        header.appendChild(buttonElementCrear);
        document.body.appendChild(header);
    }

    mostrarImgPokemon(imagen) {
        let divElement = document.createElement("div");
        let spanElement1 = Utilities.crearSpan("Detalle del Pokemon");
        let spanElement2 = Utilities.crearSpan("");
        let imgElement = Utilities.crearImg(imagen.image);
        spanElement2.appendChild(imgElement);
        let spanElement3 = Utilities.crearSpan("Nombre: " + imagen.name);
        let spanElement4 = Utilities.crearSpan("Peso: " + imagen.weight);
        let spanElement5 = Utilities.crearSpan("Altura: " + imagen.height);
        divElement.appendChild(spanElement1);
        divElement.appendChild(spanElement2);
        divElement.appendChild(spanElement3);
        divElement.appendChild(spanElement4);
        divElement.appendChild(spanElement5);
        document.body.appendChild(divElement);
    }

    initPokedex() {
        this.obtenerPokemonByPage(0);
        this.mostarHeader();
    }
}

class Pokemon {
    constructor(data) {
        this._nombre = data.name;
        this._urlDetalle = data.url;
    }

    pintarPokemon(eventoClick) {
        let trElement = document.createElement("tr");
        let tdElement1 = Utilities.crearTd(this._nombre);
        let tdElementAction = document.createElement("td");
        trElement.appendChild(tdElement1);
        let buttonElement = Utilities.crearBoton("Ver Detalles");
        buttonElement.addEventListener("click", () => eventoClick(this._urlDetalle));
        tdElementAction.appendChild(buttonElement);
        trElement.appendChild(tdElementAction);
        return trElement;
    }
}

class APIClient {
    constructor() {}

    xhrPeticion(url, dataPost, type) {
        let myHeaders = new Headers();

        let init = {
            method: type,
            headers: myHeaders
        };

        let promise = fetch(url, init).then(
            (response) => response.json()
        );

        return promise;
    }

}

class PokemonApi {
    constructor() {
        this._urlBase = "http://pokeapi.co/api/v2/pokemon";
        this._urlPath = "/?offset=";
        this.apiClient = new APIClient();
    }

    getPokemonsAtPage(pag) {
        let url = this._urlBase + this._urlPath + pag;
        let objResult = {
            count: 0,
            arrayPokemons: [],
            previous: "",
            next: ""
        }
        let promise = this.apiClient.xhrPeticion(url, null, "GET").then(
            (response) => {
                objResult.count = response.count;
                objResult.next = response.next;
                objResult.previous = response.previous;
                response.results.forEach((x) => {
                    console.log(x);
                    let pokemon = new Pokemon(x);
                    objResult.arrayPokemons.push(pokemon);
                    console.log(objResult.arrayPokemons);
                });
                return objResult;
            }
        );
        console.log(promise);
        return promise;
    }

    getPokemonByUrl(urlPokemon) {
        let url = urlPokemon;
        let objResult = {
            height: 0,
            weight: 0,
            name: "",
            image: ""
        }
        let promise = this.apiClient.xhrPeticion(url, null, "GET").then(
            (response) => {
                console.log(response);
                objResult.height = response.height;
                objResult.weight = response.weight;
                objResult.image = response.sprites.front_default;
                objResult.name = response.name;
                return objResult;
            }
        );
        console.log(promise);
        return promise;
    }
}


let pokedex = null;

window.onload = function() {
    pokedex = new Pokedex();
    pokedex.initPokedex();
}
