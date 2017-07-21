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
}

class Personaje {
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._occupation = data.occupation;
        this._debt = data.debt;
        this._weapon = data.weapon;
    }

    pintarPersonaje(botones) {
        let trElement = document.createElement("tr");
        let template = `<td>${this._id}</td>
    					<td>${this._name}</td>
    					<td>${this._occupation}</td>
    					<td>${this._debt}</td>
    					<td>${this._weapon}</td>
    					`;
        let tdElement = document.createElement("td");
        let buttonElement = null;
        for (let i in botones) {
            botones[i].forEach((x) => {
                buttonElement = Utilities.crearBoton(x.nombre);
                buttonElement.addEventListener("click", ()=>x.eventoClick(this._id));
            });
            tdElement.appendChild(buttonElement);
        }

        trElement.innerHTML = template;
        trElement.appendChild(tdElement);
        return trElement;
    }
}

class PersonajeApi {
    constructor() {
        this._urlBase = "https://ironhack-characters.herokuapp.com";
        this._urlPath = "/characters";
        this.apiClient = new APIClient();
    }

    getPersonajes() {
        let url = this._urlBase + this._urlPath;
        let arrayPersonajes = [];
        let promise = this.apiClient.xhrPeticion(url, null, "GET").then(
            (response) => {
                response.forEach((x) => {
                    console.log(x);
                    let personaje = new Personaje(x);
                    arrayPersonajes.push(personaje);
                    console.log(arrayPersonajes);
                });
                return arrayPersonajes;
            }
        );
        console.log(promise);
        return promise; 
    }
    postPersonajes(dataPersonajes, callBack) {
        let url = this._urlBase + this._urlPath;
        let parseResponse = (response) => {
            let personaje = new Personaje(response);
            callBack(personaje);
        }
        let data = {};
        for (let i in dataPersonajes) {
            data[i] = dataPersonajes[i];
        }
        this.apiClient.xhrPeticion(url, data, "POST", parseResponse);
    }

    delPersonajes(id, callBack) {
        let url = this._urlBase + this._urlPath + "/" +id;
        let parseResponse = (response) => {
 			console.log(response);
            callBack();
        }
        this.apiClient.xhrPeticion(url, null, "DELETE", parseResponse);
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
            (response)=>response.json()
        );

        return promise;
    }

}

class AlmacenPersonajes {
    constructor() {
        this._personajes = [];
        this._personajesApi = new PersonajeApi();
    }

    obtenerPersonajes() {
        this._personajesApi.getPersonajes().then(
            (data)=>{
                this._personajes = data;
                console.log(this._personajes);
                this.pintarAlmacen();
            }
        );
    }

    incluirPersonaje(event) {
        event.preventDefault();
        event.stopPropagation();
        let insertPersonaje = (respons) => {
            console.log(respons);
            this._personajes.push(respons);
            this.obtenerPersonajes();
            this.pintarAlmacen();
        }
        let dataPersonaje = {
            name: document.getElementById("nombre").value,
            occupation: document.getElementById("ocupacion").value,
            debt: document.getElementById("debt").value,
            weapon: document.getElementById("arma").value
        }
        this._personajesApi.postPersonajes(dataPersonaje, insertPersonaje);
    }

    eliminarPersonaje(id) {
        let deletePersonaje = () => {
           	this.obtenerPersonajes();
            this.pintarAlmacen();
        }
        this._personajesApi.delPersonajes(id, deletePersonaje);
    }

    tablaPersonaje() {
        let tableElement = document.createElement("table");
        let theadElement = document.createElement("thead");
        let trElement = document.createElement("tr");
        let template = `<td>ID Personaje</td>
    					<td>Nombre</td>
    					<td>Ocupación</td>
    					<td>Debt</td>
    					<td>Arma</td>
    					<td>Acción</td>
    					`;
        trElement.innerHTML = template;
        theadElement.appendChild(trElement);
        tableElement.appendChild(theadElement);
        return tableElement;
    }

    pintarAlmacenBase() {
        let header = document.createElement("header");
        let divElement = document.createElement("div");
        let formElement = document.createElement("form");
        formElement.appendChild(Utilities.crearLabel("Nombre", "nombre"));
        formElement.appendChild(Utilities.crearInput("text", "30", "nombre", "[A-Za-z][0-9]", "Nombre del Personaje")); //crearInput(type, size, name, pattern, placeholder)
        formElement.appendChild(Utilities.crearLabel("Ocupación", "ocupacion"));
        formElement.appendChild(Utilities.crearInput("text", "30", "ocupacion", "[A-Za-z][0-9]", "Ocupación del Personaje"));
        formElement.appendChild(Utilities.crearLabel("Debt", "debt"));
        formElement.appendChild(Utilities.crearInput("text", "30", "debt", "[A-Za-z]", "true o false"));
        formElement.appendChild(Utilities.crearLabel("Arma", "arma"));
        formElement.appendChild(Utilities.crearInput("text", "30", "arma", "[A-Za-z][0-9]", "ej: aka47"));
        let buttonElement = Utilities.crearBoton("Crear Personaje");
        buttonElement.addEventListener("click", () => this.incluirPersonaje(event));
        formElement.appendChild(buttonElement);
        divElement.appendChild(formElement)
        header.appendChild(divElement);
        return header;
    }

    pintarAlmacen() {
        let botones = {
            eliminar: [{ nombre: "eliminar", eventoClick: (id) => this.eliminarPersonaje(id) }]
        }
        document.body.innerHTML = "";
        let divElement = document.createElement("div");
        let tableElement = this.tablaPersonaje();
        let tbodyElement = document.createElement("tbody");
        this._personajes.forEach((x) => {
            tbodyElement.appendChild(x.pintarPersonaje(botones));
        });
        tableElement.appendChild(tbodyElement);
        divElement.appendChild(tableElement);
        document.body.appendChild(this.pintarAlmacenBase());
        document.body.appendChild(divElement);
    }
}



let almacenPersonajes = null;

window.onload = function() {
    almacenPersonajes = new AlmacenPersonajes();
    almacenPersonajes.obtenerPersonajes();
};
