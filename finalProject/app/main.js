class App {
    constructor() {
        this._loginController = new LoginController();
        this._navigationController = new NavigationController();
        this._initAplication = this.initApp();
    }

    initApp() {
        this._navigationController._arrayPages.push(new LoginPage({ _url: "#login", _titulo: "login", _nav: this._navigationController, _log: this._loginController }));
        this._navigationController._arrayPages.push(new Home({ _url: "#home", _titulo: "home", _nav: this._navigationController, _log: this._loginController }));
        this._navigationController._arrayPages.push(new AdmComidas({ _url: "#comida", _titulo: "comida", _nav: this._navigationController, _log: this._loginController }));
        this._navigationController._arrayPages.push(new AdmBebidas({ _url: "#bebida", _titulo: "bebida", _nav: this._navigationController, _log: this._loginController }));
        this._navigationController._arrayPages.push(new CrearUsuario({ _url: "#user", _titulo: "crear-usuario", _nav: this._navigationController, _log: this._loginController }));
        this._navigationController._arrayPages.push(new Perfil({ _url: "#perfil", _titulo: "gestionar perfil", _nav: this._navigationController, _log: this._loginController }));
    }
}

class NavigationController {
    constructor() {
        this._arrayPages = [];
    }

    changePage(data) {
        //window.history.pushState("Datos a enviar", "Nuevo título", "/nueva-url");
        window.history.pushState(data.enviar, data.titulo, data.url);
    }

    navigateToUrl(url) {
        let _page = this._arrayPages.find((x) => x._url == url);
        this.changePage({ enviar: "", titulo: _page.titulo, url: url });
        _page.pintarPage();
    }

    navigateToHome() {
        this.changePage({ enviar: "", titulo: "home", url: "#home" });
        this._arrayPages.find((x) => x._titulo == "home").pintarPage();
    }
}

class Page {
    constructor(data) {
        this._url = data._url;
        this._titulo = data._titulo;
        this._navigationController = data._nav;
        this._logController = data._log;
    }

    pintarMensaje() {
        console.warn("Debes implementar el pintado");
    }

    pintarPage() {
        console.warn("Debes implementar el pintado");
    }
}

class LoginPage extends Page {
    constructor(data) {
        super({ _url: data._url, _titulo: data._titulo, _nav: data._nav, _log: data._log });
    }

    pintarPage() {
        this._logController.obtenerPerfiles();
        this._logController.doLoginStorage(this._navigationController);
        //crearElemento(element, id, text, name, clase, tipo, para, tamanio, patron, ejemplo)
        //crearElemento("input", "id", "text", {name: "input","class": "prueba",type: "email",size: "30",pattern: "/R/",placeholder: "eje: a@a.com",href: "####"});
        let contenedor = document.getElementById("content");
        if (contenedor) {
            let body = document.querySelector("body");
            body.removeChild(contenedor);
        }
        let divContainer = Utilities.crearElemento("div", "content", "", { "class": "container" });
        let h3Element = Utilities.crearElemento("h3", "", "Login", null);
        let pElement = Utilities.crearElemento("p", "", "Esta aplicación es genérica.", null);
        let formElement = Utilities.crearElemento("form", "formLogin", "", { "class": "form" });
        let divElementRow = Utilities.crearElemento("div", "", "", { "class": "row" });
        let divElementUser = Utilities.crearElemento("div", "", "", { "class": "col-sm-6 form-group" });
        let labelElementUser = Utilities.crearElemento("label", "", "Email", { for: "user" });
        let inputElementUser = Utilities.crearElemento("input", "user", "", { "class": "form-control", name: "user", type: "email", placeholder: "ej: a@a.com" });

        inputElementUser.required = true;
        divElementUser.appendChild(labelElementUser);
        divElementUser.appendChild(inputElementUser);

        let divElementPass = Utilities.crearElemento("div", "", "", { "class": "col-sm-6 form-group" });
        let labelElementPass = Utilities.crearElemento("label", "", "Clave", { for: "clave" });
        let inputElementPass = Utilities.crearElemento("input", "clave", "", { "class": "form-control", name: "clave", type: "password" });
        inputElementPass.required = true;
        divElementPass.appendChild(labelElementPass);
        divElementPass.appendChild(inputElementPass);
        divElementRow.appendChild(divElementUser);
        divElementRow.appendChild(divElementPass);

        let divButton = Utilities.crearElemento("div", "", "", { "class": "row" });
        let divButtonContent = Utilities.crearElemento("div", "", "", { "class": "col-sm-push-3 col-sm-6 form-group" });
        let buttonElement = Utilities.crearElemento("button", "btnLogin", "Login", { "class": "btn btn-primary btn-block", type: "submit" });
        divButtonContent.appendChild(buttonElement);
        divButton.appendChild(divButtonContent);

        formElement.appendChild(divElementRow);
        formElement.appendChild(divButton);
        let divElementLast = Utilities.crearElemento("div", "", "", { "class": "center" });
        let aElement = Utilities.crearElemento("a", "", "Crear Usuario", { "class": "small", href: "#" });
        aElement.addEventListener("click", (event) => this._navigationController.navigateToUrl("#user"));
        divElementLast.appendChild(aElement);
        divContainer.appendChild(h3Element);
        divContainer.appendChild(pElement);
        divContainer.appendChild(formElement);

        divContainer.appendChild(divElementLast);
        document.body.appendChild(divContainer);
        buttonElement.addEventListener("click", () => this._logController.doLogin(event, this._navigationController));

    }
}

class LoginController {
    constructor() {
        this._userApi = new UserApi();
        this._arrayClientes = [];
    }

    pintarMensaje(data) {
        console.log(data);
        let divElement = Utilities.crearElemento("div", "", "", null);
        let msg = data.msg.errors ? data.msg.message : "Usuario creado exitosamente.";
        let template = `<p class="message">${msg}</p>`;
        divElement.innerHTML = template;
        document.getElementById("content").appendChild(divElement);
        if (data.msg.username) {
            setTimeout(() => this._navigationController.navigateToUrl("#login"), 1500);
        }
    }

    doLogin(event, nav) {
        event.preventDefault();
        event.stopPropagation();
        let _userLogin = {
            username: document.getElementById("user").value,
            password: document.getElementById("clave").value
        }
        if ((_userLogin.username && _userLogin.password) && (_userLogin.username.length >= 4 && _userLogin.password.length >= 4)) {
            this._userApi.postLogin(_userLogin).then(
                (data) => {
                    if (data.msg.username) {
                        this.setLocalStorage(data.msg, _userLogin.password);
                        nav.navigateToHome();
                    } else {
                        this.pintarMensaje(data.msg);
                    }
                }
            );
        } else {
            this.pintarMensaje({
                msg: {
                    errors: "ocurrió un error",
                    message: "Usuario o clave incorrectos, intente de nuevo"
                }
            });
        }

    }

    doLoginStorage(nav) {
        event.preventDefault();
        event.stopPropagation();
        let savedClient = this.getLocalStorage();
        let _userLogin = null;
        if (savedClient && savedClient.username) {
            _userLogin = {
                username: savedClient.username,
                password: savedClient.password
            }
            this._userApi.postLogin(_userLogin).then(
                (data) => {
                    if (data.msg.username) {
                        this.setLocalStorage(data.msg, _userLogin.password);
                        nav.navigateToHome();
                    } else {
                        this.pintarMensaje(data.msg);
                    }
                }
            );
        }
    }

    obtenerPerfiles() {
        this._userApi.getUser().then(
            (data) => {
                this._arrayClientes = data;
            }
        );
    }

    setLocalStorage(client, password) {
        console.log("login exitoso");
        client.password = password;
        localStorage.removeItem('client');
        let _clientsAsString = JSON.stringify(client);
        localStorage.setItem("client", _clientsAsString);
    }

    getLocalStorage() {
        let _clientsAsString = localStorage.getItem("client");
        let _clients = JSON.parse(_clientsAsString);
        return _clients;
    }
}

class NavigablePage extends Page {
    constructor(data) {
        super(data);
    }

    pintarMenu() {
        let navElement = Utilities.crearElemento("nav", "divNavContainer", "", { "class": "navbar navbar-inverse" });
        let divElementNavC = Utilities.crearElemento("div", "divNav", "", null);
        let divElementNav = Utilities.crearElemento("div", "", "", { "class": "navbar-header" });
        let aElement = Utilities.crearElemento("a", "", "My Website", { "class": "navbar-brand", href: "#" });
        divElementNav.appendChild(aElement);
        let divElementNavII = Utilities.crearElemento("div", "", "", { "class": "navbar-header" });
        let uElementNav = Utilities.crearElemento("ul", "", "", { "class": "nav navbar-nav" });
        let liElement1 = Utilities.crearElemento("li", "", "", { "class": "active" });
        let aHome = Utilities.crearElemento("a", "", "Home", { "class": "navbar-brand", href: "#home" });
        aHome.addEventListener("click", () => this._navigationController.navigateToHome());
        liElement1.appendChild(aHome);
        let liElement2 = Utilities.crearElemento("li", "", "", null);
        let aComidas = Utilities.crearElemento("a", "", "Administrador de Comidas", { href: "#comida" });
        aComidas.addEventListener("click", () => this._navigationController.navigateToUrl("#comida"));
        liElement2.appendChild(aComidas);
        let liElement3 = Utilities.crearElemento("li", "", "", null);
        let aBebidas = Utilities.crearElemento("a", "", "Administrador de Bebidas", { href: "#bebida" });
        aBebidas.addEventListener("click", () => this._navigationController.navigateToUrl("#bebida"));
        liElement3.appendChild(aBebidas);
        let liElement4 = Utilities.crearElemento("li", "", "", null);
        let aPerfil = Utilities.crearElemento("a", "", "Perfil", { href: "#perfil" });
        aPerfil.addEventListener("click", () => this._navigationController.navigateToUrl("#perfil"));
        liElement4.appendChild(aPerfil);
        let liElement5 = Utilities.crearElemento("li", "", "", null);
        let aExit = Utilities.crearElemento("a", "", "", { href: "#login" });
        aExit.addEventListener("click", () => {
            localStorage.removeItem('client');
            this._navigationController.navigateToUrl("#login")
        });
        let imgElement = Utilities.crearElemento("img", "exit", "", { src: "img/exit.jpg", "class": "img-rounded imgMaxWidth" });
        aExit.appendChild(imgElement);
        liElement5.appendChild(aExit);

        uElementNav.appendChild(liElement1);
        uElementNav.appendChild(liElement2);
        uElementNav.appendChild(liElement3);
        uElementNav.appendChild(liElement4);
        uElementNav.appendChild(liElement5);
        divElementNavII.appendChild(uElementNav);
        divElementNavC.appendChild(divElementNav);
        divElementNavC.appendChild(divElementNavII);
        navElement.appendChild(divElementNavC);
        return navElement;
    }

    pintarBody() {}

    pintarFooter() {
        let divContainer = Utilities.crearElemento("div", "divFooterContainer", "", null);
        let divFooter = Utilities.crearElemento("div", "divFooter", "", { "class": "panel-footer" });
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let date = new Date();
        let text = "Javascript, " + date.getUTCDate() + "/" + meses[date.getUTCMonth()] + "/" + date.getUTCFullYear();
        let h4Element = Utilities.crearElemento("h5", "", text, { "class": "center" });
        divFooter.appendChild(h4Element);
        divContainer.appendChild(divFooter);
        return divContainer;
    }

    pintarPage() {}

}

class Home extends NavigablePage {
    constructor(data) {
        super({ _url: data._url, _titulo: data._titulo, _nav: data._nav, _log: data._log });
        this._bebidasApi = new BebidasApi();
        this._comidasApi = new ComidasApi();
        this._arrayBebidas = [];
        this._arrayComidas = [];
        this._itemBebida = [];
        this._itemComida = [];
        this._mensajeBebida = null;
        this._mensajeComida = null;
    }

    pintarPage() {
        this._bebidasApi.getBebidas().then(
            (data) => {
                this._arrayBebidas = data.arrayBebidas;
                this.obtenerComidas();
            }
        );
    }

    obtenerComidas() {
        this._comidasApi.getComidas().then(
            (data) => {
                this._arrayComidas = data.arrayComidas;
                this.resumenHome();
            }
        );
    }

    resumenHome() {
        this._itemBebida = this._arrayBebidas.filter((x) => x.precio <= 90).sort((y, z) => y.nombre - z.nombre);
        this._itemComida = this._arrayComidas.filter((x) => x.precio <= 90).sort((y, z) => y.nombre - z.nombre);
        this._mensajeBebida = "Oferta del día: " + this._itemBebida[0].nombre.toUpperCase() + " a: " + Utilities.getFormatCurrencyNumber(this._itemBebida[0].precio);
        this._mensajeComida = "Oferta del día: " + this._itemComida[0].nombre.toUpperCase() + " a: " + Utilities.getFormatCurrencyNumber(this._itemComida[0].precio);
        this._pintarPage();
    }


    pintarDashboard() {
        let divCarousel = Utilities.crearElemento("div", "myDash", "", { "class": "carousel", 'data-ride': 'carousel' });
        divCarousel.innerHTML = `<ol class="carousel-indicators">
						      		<li data-target="#myDash" data-slide-to="0" class="active"></li>
						      		<li data-target="#myDash" data-slide-to="1"></li>
						    	</ol>`;
        let divElement = Utilities.crearElemento("div", "", "", { "class": "carousel-inner" });

        let divCaro1 = Utilities.crearElemento("div", "", "", { "class": "item active" });
        let divImage1 = Utilities.crearElemento("div", "", "", null);
        let imgBebidas = Utilities.crearElemento("img", "", "", { 'src': "img/bebidas.jpg", 'alt': "Bebidas", "class": "anchoImgDash", "data-link": "#bebida" });
        divImage1.appendChild(imgBebidas);
        let divDetaBebida = Utilities.crearElemento("div", "", "", { "class": "carousel-caption" });
        let h3Bebidas = Utilities.crearElemento("h3", "", "Bebidas", null);
        let pBebidas = Utilities.crearElemento("p", "", this._mensajeBebida, null);
        divCaro1.appendChild(divImage1);
        divDetaBebida.appendChild(h3Bebidas);
        divDetaBebida.appendChild(pBebidas);
        divCaro1.appendChild(divDetaBebida);

        let divCaro2 = Utilities.crearElemento("div", "", "", { "class": "item" });
        let divImage2 = Utilities.crearElemento("div", "", "", null);
        let imgComidas = Utilities.crearElemento("img", "", "", { 'src': "img/comidas.jpg", 'alt': "Comidas", "class": "anchoImgDash", "data-link": "#comida" });
        divImage2.appendChild(imgComidas);
        let divDetaComida = Utilities.crearElemento("div", "", "", { "class": "carousel-caption" });
        let h3Comidas = Utilities.crearElemento("h3", "", "Comidas", null);
        let pComidas = Utilities.crearElemento("p", "", this._mensajeComida, null);
        divCaro2.appendChild(divImage2);
        divDetaComida.appendChild(h3Comidas);
        divDetaComida.appendChild(pComidas);
        divCaro2.appendChild(divDetaComida);

        divElement.appendChild(divCaro1);
        divElement.appendChild(divCaro2);
        divCarousel.appendChild(divElement);

        divCarousel.innerHTML += `<a class="left carousel-control" href="#myDash" data-slide="prev">
      								<span class="glyphicon glyphicon-chevron-left"></span>
      								<span class="sr-only">Previous</span>
    							</a>
    							<a class="right carousel-control" href="#myDash" data-slide="next">
      								<span class="glyphicon glyphicon-chevron-right"></span>
      								<span class="sr-only">Next</span>
    							</a>`;
        divCarousel.addEventListener("click", (event) => {
            let img = event.target;
            let url = img.getAttribute("data-link");
            if (url) {
                this._navigationController.navigateToUrl(url);
            }
        });

        return divCarousel;
    }

    pintarBody() {
        let divContainer = Utilities.crearElemento("div", "divBody", "", { "class": "panel-body" });
        divContainer.appendChild(this.pintarDashboard());
        return divContainer;
    }

    _pintarPage() {
        let contenedor = document.getElementById("content");
        if (contenedor) {
            document.body.removeChild(contenedor);
        }
        let divContainer = Utilities.crearElemento("div", "content", "", { "class": "container" });
        divContainer.appendChild(this.pintarMenu());
        divContainer.appendChild(this.pintarBody());
        divContainer.appendChild(this.pintarFooter());
        document.body.appendChild(divContainer);
    }
}

class AdmComidas extends NavigablePage {
    constructor(data) {
        super({ _url: data._url, _titulo: data._titulo, _nav: data._nav, _log: data._log });
        this._comidasApi = new ComidasApi();
        this._arrayComidas = [];
    }

    pintarPage() {
        this._comidasApi.getComidas().then(
            (data) => {
                this._arrayComidas = data.arrayComidas;
                this._pintarPage();
            }
        );
    }

    deleteComida(event, id) {
        event.preventDefault();
        event.stopPropagation();
        this._comidasApi.delComida(id).then(
            (data) => {
                this.pintarPage();
            }
        );
    }

    incluirComida(event) {
        event.preventDefault();
        event.stopPropagation();
        let obj = new Comida({
            id: null,
            nombre: document.getElementById("name").value,
            tipo: document.getElementById("tipo").value,
            calorias: document.getElementById("calories").value,
            existencias: document.getElementById("qty").value,
            precio: document.getElementById("price").value
        });
        this._comidasApi.postComida(obj).then(
            (data) => {
                document.getElementById("inputModal").parentElement.removeChild(document.getElementById("inputModal"));
                this.pintarPage();
            }
        );
    }

    actualizarComida(event, id) {
        event.preventDefault();
        event.stopPropagation();
        let obj = new Comida({
            id: id,
            nombre: document.getElementById("name").value,
            tipo: document.getElementById("tipo").value,
            calorias: document.getElementById("calories").value,
            existencias: document.getElementById("qty").value,
            precio: document.getElementById("price").value
        });
        this._comidasApi.putComida(id, obj).then(
            (data) => {
                document.getElementById("inputModal").parentElement.removeChild(document.getElementById("inputModal"));
                this.pintarPage();
            }
        );
    }

    armarBodyModal(event, id, eventoClick) {
        event.preventDefault();
        event.stopPropagation();
        let obj = this._arrayComidas.find((x) => x.id == id);
        let evento = null;
        if (!obj) {
            obj = { id: "", nombre: "", tipo: "", calorias: "", existencias: "", precio: "" }
        }
        switch (eventoClick) {
            case "incluir":
                evento = (event2) => this.incluirComida(event2);
                break;
            case "eliminar":
                evento = (event2) => this.deleteComida(event2, id);
                break;
            case "modificar":
                evento = (event2) => this.actualizarComida(event2, id);
                break;
        }
        let divElement = Utilities.crearElemento("div", "", "", null);
        divElement.innerHTML = `<div class="input-group">
	    					<span class="input-group-addon">Nombre</span>
	    					<input id="name" type="text" class="form-control" name="name" placeholder="ej: Enchiladas" value="${obj.nombre}">
						</div>
						<div class="input-group">
	                    	<span class="input-group-addon">Tipo</span>
	                    	<input id="tipo" type="text" class="form-control" name="tipo" placeholder="ej: Entrante, Principal o Postre" value="${obj.tipo}">
	                	</div>
						<div class="input-group">
	    					<span class="input-group-addon">Calorías</span>
	    					<input id="calories" type="text" class="form-control" name="calories" placeholder="ej: 100" value="${obj.calorias}">
						</div>
	               		<div class="input-group">
	                    	<span class="input-group-addon">Existencias</span>
	                    	<input id="qty" type="text" class="form-control" name="qty" placeholder="ej: 3" value="${obj.existencias}">
	                	</div>
	                	<div class="input-group">
	                		<span class="input-group-addon">Precio</span>
	                		<input id="price" type="text" class="form-control" name="price" placeholder="ej: 380" value="${obj.precio}">
	               		</div>`;

        let divFooter = Utilities.crearElemento("div", "", "", { "class": "modal-footer" });
        let buttonCerrar = Utilities.crearElemento("button", "cerrar", "Cerrar", { "class": "btn btn-default" })
        buttonCerrar.addEventListener("click", () => document.getElementById("inputModal").parentElement.removeChild(document.getElementById("inputModal")));
        let buttonAction = Utilities.crearElemento("button", "act", "Enviar", { "class": "btn btn-default" });
        buttonAction.addEventListener("click", evento);
        divFooter.appendChild(buttonCerrar);
        divFooter.appendChild(buttonAction);

        let modal = new Modal();
        modal.pintarModal(divElement, divFooter, eventoClick.toUpperCase());
    }

    pintarBody() {
        let _botones = {
            eliminar: [{ nombre: "Eliminar", id: "eliminar", eventoClick: (event, id) => this.deleteComida(event, id) }],
            modificar: [{ nombre: "Actualizar", id: "update", eventoClick: (event, id) => this.armarBodyModal(event, id, "modificar") }]
        }
        let divContainer = Utilities.crearElemento("div", "divBody", "", { "class": "panel-body" });
        let h4Element = Utilities.crearElemento("h4", "", "Administrador de Comidas.", null);
        let pElement = Utilities.crearElemento("p", "", "Comidas:", null);
        let pElement2 = Utilities.crearElemento("p", "", "", { "class": "right" });
        let buttonIncluir = Utilities.crearElemento("button", "incluir", "Incluir", { "class": "btn btn-success btn-md" });
        buttonIncluir.addEventListener("click", (event) => this.armarBodyModal(event, "", "incluir"));
        pElement2.appendChild(buttonIncluir);
        divContainer.appendChild(pElement2);
        divContainer.appendChild(h4Element);
        divContainer.appendChild(pElement);
        let divRowForTable = Utilities.crearElemento("div", "", "", { "class": "row" });
        let divColForTable = Utilities.crearElemento("div", "", "", { "class": "col-sm-6" });
        let tableElement = Utilities.crearElemento("table", "", "", { "class": "table tableBackground" });
        let theadElement = Utilities.crearElemento("thead", "", "", null);
        let tbodyElement = Utilities.crearElemento("tbody", "tbodyComidas", "", null);

        let template = `<tr>
	                        <th>Tipo</th>
	                        <th>Nombre</th>
	                        <th>Calorías</th>
	                        <th>Existencias</th>
	                        <th>Precio</th>
	                        <th>Acciones</th>
	                    </tr>`;

        theadElement.innerHTML = template;
        this._arrayComidas.forEach((x) => tbodyElement.appendChild(x.pintarStock(_botones)));
        tableElement.appendChild(theadElement);
        tableElement.appendChild(tbodyElement);
        divColForTable.appendChild(tableElement);
        divRowForTable.appendChild(divColForTable);
        divContainer.appendChild(divRowForTable);
        return divContainer;
    }

    _pintarPage() {
        let contenedor = document.getElementById("content");
        if (contenedor) {
            document.body.removeChild(contenedor);
        }
        let divContainer = Utilities.crearElemento("div", "content", "", { "class": "container" });
        divContainer.appendChild(this.pintarMenu());
        divContainer.appendChild(this.pintarBody());
        divContainer.appendChild(this.pintarFooter());
        document.body.appendChild(divContainer);
    }
}

class AdmBebidas extends NavigablePage {
    constructor(data) {
        super({ _url: data._url, _titulo: data._titulo, _nav: data._nav, _log: data._log });
        this._bebidaApi = new BebidasApi();
        this._arrayBebidas = [];
    }

    pintarPage() {
        this._bebidaApi.getBebidas().then(
            (data) => {
                this._arrayBebidas = data.arrayBebidas;
                this._pintarPage();
            }
        );
    }

    deleteBedida(event, id) {
        event.preventDefault();
        event.stopPropagation();
        this._bebidaApi.delBebida(id).then(
            (data) => {
                this.pintarPage();
            }
        );
    }

    incluirBebida(event) {
        event.preventDefault();
        event.stopPropagation();
        let obj = new Bebida({
            id: null,
            nombre: document.getElementById("name").value,
            esAlcoholica: document.getElementById("alcohol").value,
            grados: document.getElementById("grades").value,
            calorias: document.getElementById("calories").value,
            existencias: document.getElementById("qty").value,
            precio: document.getElementById("price").value
        });
        this._bebidaApi.postBebida(obj).then(
            (data) => {
                document.getElementById("inputModal").parentElement.removeChild(document.getElementById("inputModal"));
                this.pintarPage();
            }
        );
    }

    actualizarBebida(event, id) {
        event.preventDefault();
        event.stopPropagation();
        let obj = new Bebida({
            id: id,
            nombre: document.getElementById("name").value,
            esAlcoholica: document.getElementById("alcohol").value,
            grados: document.getElementById("grades").value,
            calorias: document.getElementById("calories").value,
            existencias: document.getElementById("qty").value,
            precio: document.getElementById("price").value
        });
        this._bebidaApi.putBebida(id, obj).then(
            (data) => {
                document.getElementById("inputModal").parentElement.removeChild(document.getElementById("inputModal"));
                this.pintarPage();
            }
        );
    }

    armarBodyModal(event, id, eventoClick) {
        event.preventDefault();
        event.stopPropagation();
        let obj = this._arrayBebidas.find((x) => x.id == id);
        let evento = null;
        if (!obj) {
            obj = { id: "", nombre: "", esAlcoholica: "", grados: "", calorias: "", existencias: "", precio: "" }
        }
        switch (eventoClick) {
            case "incluir":
                evento = (event2) => this.incluirBebida(event2);
                break;
            case "eliminar":
                evento = (event2) => this.deleteBedida(event2, id);
                break;
            case "modificar":
                evento = (event2) => this.actualizarBebida(event2, id);
                break;
        }
        let divElement = Utilities.crearElemento("div", "", "", null);
        divElement.innerHTML = `<div class="input-group">
	    					<span class="input-group-addon">Nombre</span>
	    					<input id="name" type="text" class="form-control" name="name" placeholder="ej: CocaCola" value="${obj.nombre}">
						</div>
						<div class="input-group">
	                    	<span class="input-group-addon">Alcoholica</span>
	                    	<input id="alcohol" type="text" class="form-control" name="alcohol" placeholder="ej: si o no" value="${obj.esAlcoholica}">
	                	</div>
	                	<div class="input-group">
	                   		<span class="input-group-addon">Grados</span>
	                    	<input id="grades" type="text" class="form-control" name="grades" placeholder="ej: 45" value="${obj.grados}">
	                	</div>
						<div class="input-group">
	    					<span class="input-group-addon">Calorías</span>
	    					<input id="calories" type="text" class="form-control" name="calories" placeholder="ej: 100" value="${obj.calorias}">
						</div>
	               		<div class="input-group">
	                    	<span class="input-group-addon">Existencias</span>
	                    	<input id="qty" type="text" class="form-control" name="qty" placeholder="ej: 3" value="${obj.existencias}">
	                	</div>
	                	<div class="input-group">
	                		<span class="input-group-addon">Precio</span>
	                		<input id="price" type="text" class="form-control" name="price" placeholder="ej: 380" value="${obj.precio}">
	               		</div>`;

        let divFooter = Utilities.crearElemento("div", "", "", { "class": "modal-footer" });
        let buttonCerrar = Utilities.crearElemento("button", "cerrar", "Cerrar", { "class": "btn btn-default" })
        buttonCerrar.addEventListener("click", () => document.getElementById("inputModal").parentElement.removeChild(document.getElementById("inputModal")));
        let buttonAction = Utilities.crearElemento("button", "act", "Enviar", { "class": "btn btn-default" });
        buttonAction.addEventListener("click", evento);
        divFooter.appendChild(buttonCerrar);
        divFooter.appendChild(buttonAction);

        let modal = new Modal();
        modal.pintarModal(divElement, divFooter, eventoClick.toUpperCase());
    }

    pintarBody() {
        let _botones = {
            eliminar: [{ nombre: "Eliminar", id: "eliminar", eventoClick: (event, id) => this.deleteBedida(event, id) }],
            modificar: [{ nombre: "Actualizar", id: "update", eventoClick: (event, id) => this.armarBodyModal(event, id, "modificar") }]
        }
        let divContainer = Utilities.crearElemento("div", "divBody", "", { "class": "panel-body" });
        let h4Element = Utilities.crearElemento("h4", "", "Aministrador de Bebidas.", null);
        let pElement = Utilities.crearElemento("p", "", "Bebidas:", null);
        let pElement2 = Utilities.crearElemento("p", "", "", { "class": "right" });
        let buttonIncluir = Utilities.crearElemento("button", "incluir", "Incluir", { "class": "btn btn-success btn-md" });
        buttonIncluir.addEventListener("click", (event) => this.armarBodyModal(event, "", "incluir"));
        pElement2.appendChild(buttonIncluir);
        divContainer.appendChild(pElement2);
        divContainer.appendChild(h4Element);
        divContainer.appendChild(pElement);
        let divRowForTable = Utilities.crearElemento("div", "", "", { "class": "row" });
        let divColForTable = Utilities.crearElemento("div", "", "", { "class": "col-sm-6" });
        let tableElement = Utilities.crearElemento("table", "", "", { "class": "table tableBackground" });
        let theadElement = Utilities.crearElemento("thead", "", "", null);
        let tbodyElement = Utilities.crearElemento("tbody", "tbodyBebidas", "", null);

        let template = `<tr>
	                        <th>Alcoholica</th>
	                        <th>Grados</th>
	                        <th>Nombre</th>
	                        <th>Calorías</th>
	                        <th>Existencias</th>
	                        <th>Precio</th>
	                        <th>Acciones</th>
	                    </tr>`;

        theadElement.innerHTML = template;
        this._arrayBebidas.forEach((x) => tbodyElement.appendChild(x.pintarStock(_botones)));
        tableElement.appendChild(theadElement);
        tableElement.appendChild(tbodyElement);
        divColForTable.appendChild(tableElement);
        divRowForTable.appendChild(divColForTable);
        divContainer.appendChild(divRowForTable);
        return divContainer;
    }

    _pintarPage() {
        let contenedor = document.getElementById("content");
        if (contenedor) {
            document.body.removeChild(contenedor);
        }
        let divContainer = Utilities.crearElemento("div", "content", "", { "class": "container" });
        divContainer.appendChild(this.pintarMenu());
        divContainer.appendChild(this.pintarBody());
        divContainer.appendChild(this.pintarFooter());
        document.body.appendChild(divContainer);
    }
}

class Modal {
    constructor() {}

    pintarModal(contet, divFooter, titulo) {
        let divMain = Utilities.crearElemento("div", "inputModal", "", { "class": "modal fade in", role: "dialog" });
        let divDialog = Utilities.crearElemento("div", "", "", { "class": "modal-dialog" });
        let divContent = Utilities.crearElemento("div", "", "", { "class": "modal-content back" });
        let divHeader = Utilities.crearElemento("div", "", "", { "class": "modal-header" });
        let buttonClose = Utilities.crearElemento("button", "", "X", { "class": "close" });
        let h4Element = Utilities.crearElemento("h4", "", titulo, { "class": "modal-title" });
        buttonClose.addEventListener("click", () => document.getElementById("inputModal").parentElement.removeChild(document.getElementById("inputModal")));
        divHeader.appendChild(buttonClose);
        divHeader.appendChild(h4Element);

        divContent.appendChild(divHeader);

        let divBody = Utilities.crearElemento("div", "", "", { "class": "modal-body" });
        let formElement = Utilities.crearElemento("form", "", "", { "class": "form" });

        formElement.appendChild(contet);
        formElement.appendChild(divFooter);
        divBody.appendChild(formElement);
        divContent.appendChild(divBody);
        divDialog.appendChild(divContent);
        divMain.appendChild(divDialog);
        document.body.appendChild(divMain);
    }
}

class CrearUsuario extends Page {
    constructor(data) {
        super({ _url: data._url, _titulo: data._titulo, _nav: data._nav, _log: data._log });
        this._userApi = new UserApi();
    }

    pintarMensaje(data) {
        let divElement = Utilities.crearElemento("div", "", "", null);
        let msg = data.msg.errors ? data.msg.message : "Usuario creado exitosamente.";
        let template = `<p class="message">${msg}</p>`;
        divElement.innerHTML = template;
        document.getElementById("content").appendChild(divElement);
        if (data.msg.username) {
            setTimeout(() => this._navigationController.navigateToUrl("#login"), 1500);
        }
    }

    pintarPage() {
        let contenedor = document.getElementById("content");
        if (contenedor) {
            let body = document.querySelector("body");
            body.removeChild(contenedor);
        }

        let divContainer = Utilities.crearElemento("div", "content", "", { "class": "container" });
        let divElement = Utilities.crearElemento("div", "", "", null);
        let h3Element = Utilities.crearElemento("h3", "", "Creación de Usuario", null);
        let pElement = Utilities.crearElemento("p", "", "My Website.", null);
        divElement.appendChild(h3Element);
        divElement.appendChild(pElement);
        let formElement = Utilities.crearElemento("form", "formCreate", "", { "class": "form" });
        formElement.innerHTML = `<div class="form-group">
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Nombre</span>
		                        <input type="text" class="form-control" id="name" required>
		                    </div>
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Apellidos</span>
		                        <input type="text" class="form-control" id="lastName" required>
		                    </div>
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Email</span>
		                        <input type="email" class="form-control" id="email" required>
		                    </div>
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Usuario</span>
		                        <input type="text" class="form-control" id="usr" required>
		                    </div>
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Password</span>
		                        <input type="password" class="form-control" id="pwd" required>
		                    </div>
                		</div>`;
        let divButtonContent = Utilities.crearElemento("div", "", "", null);
        let buttonElement = Utilities.crearElemento("button", "guardar", "Guardar", { "class": "btn btn-primary btn-sm" });
        divButtonContent.appendChild(buttonElement);
        formElement.appendChild(divButtonContent);
        divElement.appendChild(formElement);
        divContainer.appendChild(divElement);
        document.body.appendChild(divContainer);
        buttonElement.addEventListener("click", (event) => this.incluirUsuario(event));
    }

    incluirUsuario(event) {
        event.preventDefault();
        event.stopPropagation();
        let obj = new Cliente({
            id: null,
            email: document.getElementById("email").value,
            apellidos: document.getElementById("lastName").value,
            nombre: document.getElementById("name").value,
            username: document.getElementById("usr").value,
            password: document.getElementById("pwd").value
        });
        this._userApi.postUser(obj).then(
            (data) => {
                this.pintarMensaje(data);
            }
        );
    }
}

class Perfil extends NavigablePage {
    constructor(data) {
        super({ _url: data._url, _titulo: data._titulo, _nav: data._nav, _log: data._log });
        this._userApi = new UserApi();
        this._borrarUser = false;
    }

    pintarMensaje(data) {
        let divElement = Utilities.crearElemento("div", "", "", null);
        let msg = (data.msg && data.msg.errors) ? data.msg.message : "Perfil modificado exitosamente.";
        let template = `<p class="message">${msg}</p>`;
        divElement.innerHTML = template;
        document.getElementById("content").appendChild(divElement);
        if (this._borrarUser) {
            localStorage.removeItem("client");
            this._navigationController.navigateToUrl("#login")
        }
    }

    pintarBody() {
        let _userLog = this._logController.getLocalStorage();
        let _user = this._logController._arrayClientes.arrayUsers.find((x) => x.user == _userLog.username);
        let divElement = Utilities.crearElemento("div", "", "", null);
        let h3Element = Utilities.crearElemento("h3", "", "Editar Perfil", null);
        let pElement = Utilities.crearElemento("p", "", "My Website.", null);
        divElement.appendChild(h3Element);
        divElement.appendChild(pElement);
        let formElement = Utilities.crearElemento("form", "formModificar", "", { "class": "form" });
        formElement.innerHTML = _user.pintarCliente();
        let divButtonContent = Utilities.crearElemento("div", "", "", { "class": "form-group" });
        divButtonContent.appendChild(_user.crearBotones("guardar", "Guardar", (event, id) => this.actualizarPerfil(event, id)));
        divButtonContent.appendChild(_user.crearBotones("borrar", "Eliminar", (event, id) => this.borrarPerfil(event, id)));
        formElement.appendChild(divButtonContent);
        divElement.appendChild(formElement);
        return divElement;
    }

    borrarPerfil(event, id) {
        this._borrarUser = true;
        event.preventDefault();
        event.stopPropagation();
        let obj = new Cliente({
            id: id,
            email: document.getElementById("email").value,
            apellidos: document.getElementById("lastName").value,
            nombre: document.getElementById("name").value,
            user: document.getElementById("usr").value,
            password: document.getElementById("pwd").value
        });
        obj.username = document.getElementById("usr").value;
        this._userApi.postUser(id, obj).then(
            (data) => {
                this.pintarMensaje(data.msg, "#login");
            }
        );
    }

    actualizarPerfil(event, id) {
        event.preventDefault();
        event.stopPropagation();
        let obj = new Cliente({
            id: id,
            email: document.getElementById("email").value,
            apellidos: document.getElementById("lastName").value,
            nombre: document.getElementById("name").value,
            user: document.getElementById("usr").value,
            password: document.getElementById("pwd").value
        });
        obj.username = document.getElementById("usr").value;
        this._userApi.putUser(id, obj).then(
            (data) => {
                this.pintarMensaje(data.msg);
            }
        );
    }

    pintarPage() {
        let contenedor = document.getElementById("content");
        if (contenedor) {
            document.body.removeChild(contenedor);
        }
        let divContainer = Utilities.crearElemento("div", "content", "", { "class": "container" });
        divContainer.appendChild(this.pintarMenu());
        divContainer.appendChild(this.pintarBody());
        divContainer.appendChild(this.pintarFooter());
        document.body.appendChild(divContainer);
    }
}

class Cliente {
    constructor(data) {
        this.id = data.id;
        this.user = data.user;
        this.password = data.password;
        this.email = data.email;
        this.apellidos = data.apellidos;
        this.nombre = data.nombre;
    }

    crearBotones(id, text, callBack) {
        let buttonElement = Utilities.crearElemento("button", id, text, { "class": "btn btn-primary btn-sm margenBotones " });
        buttonElement.addEventListener("click", (event) => callBack(event, this.id));
        return buttonElement;
    }

    pintarCliente() {
        let template = `<div class="form-group">
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Nombre</span>
		                        <input type="text" class="form-control" id="name" value="${this.nombre}" required>
		                    </div>
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Apellidos</span>
		                        <input type="text" class="form-control" id="lastName" value="${this.apellidos}" required>
		                    </div>
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Email</span>
		                        <input type="email" class="form-control" id="email" value="${this.email}" required>
		                    </div>
		                    <div class="col-xs-4 input-group spacing">
		                        <span class="input-group-addon">Usuario</span>
		                        <input type="text" class="form-control" id="usr" value="${this.user}" disabled>
		                    </div>
		                    <div class="col-xs-5 input-group spacing">
		                        <span class="input-group-addon">Password</span>
		                        <input type="password" class="form-control" id="pwd" value="" placeholder="Coloque su contraseña" required>
		                    </div>
                		</div>`;
        return template;
    }
}

let app = null;

window.onload = function() {
    app = new App();
    app._navigationController.navigateToUrl("#login");
}
