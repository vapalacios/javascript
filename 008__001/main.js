// Realiza una agenda de contactos que se persista en el navegador.

// Trata de realizar la mayor abstracción posib​le: en el HTML no puede haber nada más que la importación del script JS. Los botones de acciones no pueden hacer referencia a ningún objeto (deberás añadir las acciones con addEventListener de arrow functions o funciones bindeadas). Haz que la agenda se pinte haciendo llamadas a pintar de cada contacto.

// Pasos:

// 1) Crea la clase contacto que almacenará los datos básicos de una persona:

// - Nombre
// - Apellidos
// - Email
// - URL fotografía

// 2) Crea la clase Agenda que almacene los contactos de un usuario.

// 3) Maqueta la agenda de contactos. Puedes hacer uso de una tabla o si lo quieres hacer más visual puedes usar divs y darles el estilo que quieras.

// 4) Crea un botón que al ser pulsado muestre un formulario que permita la creación de un contacto en la agenda. El formulario tendrá los campos necesarios para la creación y además los botones "Guardar" y "Cerrar". Guardar se encargará de guardar el contacto y cerrar ocultará de nuevo el formulario. Cuando se cree un contacto se deberá mostrar en el listado de contactos de la agenda.

// 5) Haz que la agenda completa se guarde en LocalStorage de manera que cada vez que abramos la página web se muestre la agenda completa.

// BONUS:

// 6) Añade un botón eliminar en cada contacto que permita el borrado de este.

// 7) Añade un botón modificar que haga editable la información de un usuario. 

// 8) Permite la ordenación de la agenda por Nombre o por apellido​

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

    static crearBoton(text, clases) {
        let buttonElement = document.createElement("button");
        buttonElement.textContent = text;
        buttonElement.setAttribute("class", clases);
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
}

class Contacto {
    constructor(data) {
        this._nombre = data._nombre;
        this._apellidos = data._apellidos;
        this._email = data._email;
        this._urlFotografia = data._urlFotografia;
    }

    pintarContacto(botones) {
        let trElement = document.createElement("tr");
        let tdElement1 = Utilities.crearTd(this._nombre);
        let tdElement2 = Utilities.crearTd(this._apellidos);
        let tdElement3 = Utilities.crearTd(this._email);
        let tdElement4 = Utilities.crearTd("");
        let imgElement = Utilities.crearImg("img/" + this._urlFotografia + ".jpg");
        tdElement4.appendChild(imgElement);
        let tdElementAction = document.createElement("td");
        trElement.appendChild(tdElement1);
        trElement.appendChild(tdElement2);
        trElement.appendChild(tdElement3);
        trElement.appendChild(tdElement4);

        if (botones) {
            let buttonElement = null;
            for (let i in botones) {
                botones[i].forEach((x) => {
                    buttonElement = Utilities.crearBoton(x.nombre, "btn btn-danger");
                    buttonElement.addEventListener("click", () => x.eventoClick(this._nombre));
                });
                tdElementAction.appendChild(buttonElement);
            }
            trElement.appendChild(tdElementAction);
        }

        return trElement;
    }
}

class Agenda {
    constructor() {
        this._contactos = [];
    }

    datosContacto() {

        let divElement = document.createElement("div");
        divElement.setAttribute("class", "row");
        divElement.setAttribute("id", "inContactos");
        let divColumn = document.createElement("div");
        divColumn.setAttribute("class", "col-lg-12 form-group");
        let formElement = document.createElement("form");
        divColumn.appendChild(Utilities.crearLabel("Nombre", "nombre"));
        divColumn.appendChild(Utilities.crearInput("text", "30", "nombre", "[A-Za-z][0-9]", "ej: Andrés")); //crearInput(type, size, name, pattern, placeholder)
        divColumn.appendChild(Utilities.crearLabel("Apellidos", "apellido"));
        divColumn.appendChild(Utilities.crearInput("text", "30", "apellido", "[A-Za-z][0-9]", "ej: Gonzalez"));
        divColumn.appendChild(Utilities.crearLabel("Email", "mail"));
        divColumn.appendChild(Utilities.crearInput("email", "30", "mail", "[A-Za-z]", "ej: a@a.com"));
        divColumn.appendChild(Utilities.crearLabel("URL Fotografía", "url"));
        divColumn.appendChild(Utilities.crearInput("text", "30", "url", "[A-Za-z][0-9]", "ej: pedro"));
        let buttonElement = Utilities.crearBoton("Crear Contacto", "btn btn-info");
        buttonElement.addEventListener("click", () => this.incluirContacto(event));
        divColumn.appendChild(buttonElement);
        formElement.appendChild(divColumn);
        divElement.appendChild(formElement);
        return divElement;
    }

    tablaContacto() {
        let tableElement = document.createElement("table");
        let theadElement = document.createElement("thead");
        let trElement = document.createElement("tr");
        let template = `<td>Nombre</td>
                        <td>Apellidos</td>
                        <td>Email</td>
                        <td>Fotografía</td>
                        <td>Acciones</td>
                        `;
        trElement.innerHTML = template;
        theadElement.appendChild(trElement);
        tableElement.appendChild(theadElement);
        return tableElement;
    }

    incluirContacto(event) {
        event.preventDefault();
        event.stopPropagation();
        let dataContacto = {
            _nombre: document.getElementById("nombre").value,
            _apellidos: document.getElementById("apellido").value,
            _email: document.getElementById("mail").value,
            _urlFotografia: document.getElementById("url").value
        }
        this._contactos.push(new Contacto(dataContacto));
        this.setLocalStorage();
        let divContactos = document.getElementById("inContactos");
        let divContainer = document.getElementById("headerButton");
        this.mostraAgenda();
        divContainer.removeChild(divContactos);
        this.mostraAgenda();
    }

    setLocalStorage() {
        localStorage.removeItem('contactos');
        let contactosAsString = JSON.stringify(this._contactos);
        localStorage.setItem("contactos", contactosAsString);
    }

    getLocalStorage() {
        let contactosAsString = localStorage.getItem("contactos");
        let contactos = JSON.parse(contactosAsString);
        this._contactos = [];
        for (let i in contactos) {
            this._contactos.push(new Contacto(contactos[i]));
        }
        return contactosAsString;
    }

    mostraAgenda() {
        let local = this.getLocalStorage();
        let divContainer = document.getElementById("contenido");
        let botones = {
            eliminar: [{ nombre: "Eliminar", eventoClick: (id) => this.eliminarContacto(id) }]
        }
        let div = document.getElementById("agendaContactos");
        if (div) {
            divContainer.removeChild(div);
        }

        let divElement = document.createElement("div");
        divElement.setAttribute("class", "row");
        divElement.setAttribute("id", "agendaContactos");
        let divColumn = document.createElement("div");
        divColumn.setAttribute("class", "col-lg-12");
        if (local != null && local.length > 2) {
            let tableElement = this.tablaContacto();
            tableElement.setAttribute("class", "table");
            let tbodyElement = document.createElement("tbody");
            this._contactos.forEach((x) => {
                tbodyElement.appendChild(x.pintarContacto(botones));
            });
            tableElement.appendChild(tbodyElement);
            divColumn.appendChild(tableElement);
        }else{
            let pElement = document.createElement("p");
            pElement.textContent = "No hay contactos en su agenda";
            pElement.setAttribute("class", "bg-warning");
            divColumn.appendChild(pElement);
        }

        divElement.appendChild(divColumn);
        divContainer.appendChild(divElement);

        //document.body.appendChild(this.datosContacto());
        //document.body.appendChild(divElement);
    }

    mostarHeader() {
        let divPrincipal = document.getElementById("contenido");
        let div = document.createElement("div");
        div.setAttribute("id", "headerButton");
        let buttonElement = Utilities.crearBoton("Mostrar Agenda", "btn btn-primary");
        buttonElement.addEventListener("click", () => this.mostraAgenda(event));
        let buttonElementCrear = Utilities.crearBoton("Añadir Contacto", "btn btn-success");
        buttonElementCrear.addEventListener("click", () => this.solicitarDatos(event));
        div.setAttribute("class", "row");
        div.appendChild(buttonElement);
        div.appendChild(buttonElementCrear);
        divPrincipal.appendChild(div);
        document.body.appendChild(divPrincipal);
    }

    solicitarDatos() {
        let divElement = this.datosContacto();
        let header = document.getElementById("headerButton");
        header.appendChild(divElement);
    }

    eliminarContacto(id) {
        let indice = this._contactos.findIndex((x) => {
            x._nombre == id;
        });

        this._contactos.splice(indice, 1);
        this.setLocalStorage();
        this.mostraAgenda();
    }
}


let agenda = null;

window.onload = function() {
    agenda = new Agenda();
    //ejemplo
    // let obj ={
    //  _nombre: "vap",
    //        _apellidos: "vap",
    //        _email: "a@a.com",
    //        _urlFotografia: "hombre"
    // }
    // for(let i = 0; i< 4; i++){
    //  agenda._contactos.push(new Contacto(obj));
    // }
    agenda.mostarHeader();
}
