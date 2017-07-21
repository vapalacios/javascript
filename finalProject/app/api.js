class Producto {
    constructor(data) {
        this.id = data.id;
        this.precio = data.precio;
        this.calorias = data.calorias;
        this.existencias = data.existencias;
        this.nombre = data.nombre;
    }

    pintarStock() {
        console.warn("Debes implementar el método");
    }
}

class Comida extends Producto {
    constructor(data) {
        super(data);
        this.tipo = data.tipo;
    }

    pintarStock(botones) {
        let _trElement = document.createElement("tr");
        let _rowMeal = `<td>${this.tipo}</td>
                        <td>${this.nombre}</td>
                        <td>${this.calorias}</td>
                        <td>${this.existencias}</td>
                        <td>${Utilities.getFormatCurrencyNumber(this.precio)}</td>`;
        _trElement.innerHTML = _rowMeal;
        let tdElement = Utilities.crearElemento("td", "", "", null);
        let buttonElement = null;
        for (let i in botones) {
            botones[i].forEach((x) => {
                buttonElement = Utilities.crearElemento("button", x.id, x.nombre, { class: "btn btn-primary btn-sm" });
                buttonElement.addEventListener("click", (event) => x.eventoClick(event, this.id));
            });
            tdElement.appendChild(buttonElement);
        }
        _trElement.appendChild(tdElement);
        return _trElement;
    }
}

class Bebida extends Producto {
    constructor(data) {
        super(data);
        this.grados = data.grados;
        this.esAlcoholica = data.esAlcoholica;
    }

    pintarStock(botones) {
        let _price = Utilities.getFormatCurrencyNumber(Number.parseInt(this.precio));
        let _alcoholic = this.esAlcoholica ? "Si" : "No";
        let _trElement = document.createElement("tr");
        let _rowDrink = `<td>${_alcoholic}</td>
                         <td>${this.grados} %</td>
                         <td>${this.nombre}</td>
                         <td>${this.calorias}</td>
                         <td>${this.existencias}</td>
                         <td>${_price}</td>`;
        _trElement.innerHTML = _rowDrink;
        let tdElement = Utilities.crearElemento("td", "", "", null);
        let buttonElement = null;
        for (let i in botones) {
            botones[i].forEach((x) => {
                buttonElement = Utilities.crearElemento("button", x.id, x.nombre, { class: "btn btn-primary btn-sm" });
                buttonElement.addEventListener("click", (event) => x.eventoClick(event, this.id));
            });
            tdElement.appendChild(buttonElement);
        }
        _trElement.appendChild(tdElement);
        return _trElement;
    }
}

class ConfApi {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api";
        this.apiClient = new APIClient();
    }
}

class BebidasApi extends ConfApi {
    constructor() {
        super();
        this._urlPathBebidas = "/bebidas";
        this._urlPath = "/";
    }

    getBebidas() {
        let url = this._urlBase + this._urlPathBebidas;
        let objResult = {
            //objeto de resspuesta
            arrayBebidas: []
        }
        let objToParse = { id: null, precio: null, calorias: null, existencias: null, nombre: null, grados: null, esAlcoholica: null }
        let promise = this.apiClient.xhrPeticion(url, null, "GET").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                response.forEach((x) => {
                    objToParse.id = x._id;
                    objToParse.precio = x.precio;
                    objToParse.calorias = x.calorias;
                    objToParse.existencias = x.existencias;
                    objToParse.nombre = x.nombre;
                    objToParse.grados = x.grados;
                    objToParse.esAlcoholica = x.esAlcoholica;
                    let bebida = new Bebida(objToParse);
                    objResult.arrayBebidas.push(bebida);
                    // console.log("getBebidas");
                    // console.log(objResult.arrayBebidas);
                });
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    delBebida(id) {
        let url = this._urlBase + this._urlPathBebidas + this._urlPath + id;
        let objResult = {
            //objeto de resspuesta
            msg: ""
        }
        let promise = this.apiClient.xhrPeticion(url, null, "DELETE").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    putBebida(id, dataPut) {
        let url = this._urlBase + this._urlPathBebidas + this._urlPath + id;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, dataPut, "PUT").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    postBebida(dataPost) {
        let url = this._urlBase + this._urlPathBebidas;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, dataPost, "POST").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }
}

class ComidasApi extends ConfApi {
    constructor() {
        super();
        this._urlPathComidas = "/comidas";
        this._urlPath = "/";
    }

    getComidas() {
        let url = this._urlBase + this._urlPathComidas;
        let objResult = {
            //objeto de resspuesta
            arrayComidas: []
        }
        let objToParse = { id: null, precio: null, calorias: null, existencias: null, nombre: null, tipo: null }
        let promise = this.apiClient.xhrPeticion(url, null, "GET").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                response.forEach((x) => {
                    objToParse.id = x._id;
                    objToParse.precio = x.precio;
                    objToParse.calorias = x.calorias;
                    objToParse.existencias = x.existencias;
                    objToParse.nombre = x.nombre;
                    objToParse.tipo = x.tipo;
                    let comida = new Comida(objToParse);
                    objResult.arrayComidas.push(comida);
                    // console.log(objResult.arrayComidas);
                });
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    delComida(id) {
        let url = this._urlBase + this._urlPathComidas + this._urlPath + id;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, null, "DELETE").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    putComida(id, dataPut) {
        let url = this._urlBase + this._urlPathComidas + this._urlPath + id;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, dataPut, "PUT").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    postComida(dataPost) {
        let url = this._urlBase + this._urlPathComidas;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, dataPost, "POST").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }
}

class UserApi extends ConfApi {
    constructor() {
        super();
        this._urlPathLogin = "/login";
        this._urlPathUsers = "/users";
        this._urlPath = "/";
    }

    getUser() {
        let url = this._urlBase + this._urlPathUsers;
        let objResult = {
            //objeto de resspuesta
            arrayUsers: []
        }
        let objToParse = { id: null, email: null, apellidos: null, nombre: null, user: null, password: null }
        let promise = this.apiClient.xhrPeticion(url, null, "GET").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                response.forEach((x) => {
                    objToParse.id = x._id;
                    objToParse.email = x.email;
                    objToParse.apellidos = x.apellidos;
                    objToParse.nombre = x.nombre;
                    objToParse.user = x.username;
                    objToParse.password = x.password;
                    let user = new Cliente(objToParse);
                    objResult.arrayUsers.push(user);
                    // console.log(objResult.arrayUsers);
                });
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    delUser(id, data) {
        let url = this._urlBase + this._urlPathUsers + this._urlPath + id;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, data, "DELETE").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    putUser(id, dataPut) {
        let url = this._urlBase + this._urlPathUsers + this._urlPath + id;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, dataPut, "PUT").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    postUser(dataPost) {
        let url = this._urlBase + this._urlPathUsers;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, dataPost, "POST").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }

    postLogin(dataPost) {
        let url = this._urlBase + this._urlPathUsers + this._urlPathLogin;
        let objResult = { msg: "" }
        let promise = this.apiClient.xhrPeticion(url, dataPost, "POST").then(
            (response) => {
                //manejo de la respuesta de la clase APIClient
                objResult.msg = response;
                return objResult;
            }
        );
        //retornará una promesa
        return promise;
    }
}

class APIClient {
    constructor() {}

    xhrPeticion(url, dataRequest, type) {
        let myHeaders = new Headers();
        let dataSend = dataRequest;

        if (dataRequest) {
            dataSend = JSON.stringify(dataRequest);
            myHeaders.append('Content-Type', 'application/json');
        }

        let init = {
            method: type,
            headers: myHeaders,
            body: dataSend
        };

        let promise = fetch(url, init).then(
            (response) => response.json()
        );

        return promise;
    }

}
