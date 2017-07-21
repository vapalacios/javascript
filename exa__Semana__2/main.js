function Tienda(shop) {
    this.nombre = shop.nombre;
    this.url = shop.url;
    this.arrayProductos = [];
    this.stock = ["blusa","camisa","chemise","pantalon","tenis","vestido","zandalia-dama","zapato-caballero","zapato-dama"];
}

Tienda.prototype.addProduc = function(){
	const path = "img/";
	var producto = {
        nombre: document.getElementById("nameProducto").value,
        precio: document.getElementById("precio").value,
        descripcion: document.getElementById("descripcion").value,
        urlImg: path.concat(img)
    }
    document.getElementById("nameProducto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("urlImagen").value = "";
    this.arrayProductos.push(new Producto(producto));
    pintarItems();
}

Tienda.prototype.pintarItem = function(){
	var tbody = document.getElementById("tbody");
	tbody.innerHTML = "";
    if (this.arrayProductos.length > 0) {
        for (var i = 0; i < this.arrayProductos.length; i++) {
            var line = '<tr id="tr' + i + '"> \
	        			<td id="tdUrlImg' + i + '"><img src="' + this.arrayProductos[i].urlImagen + '.png"></td> \
	        			<td id="tdNombre' + i + '">' + this.arrayProductos[i].nombre + '</td> \
	        			<td id="tdPrecio' + i + '">' + this.arrayProductos[i].precio + '</td> \
	        			<td id="tdDescripcion' + i + '">' + this.arrayProductos[i].descripcion + '</td> \
	        			<td id="tdButton' + i + '"><button onclick="eraseProduct('+i+')">Borrar</button></td> \
	        			</tr>';
            tbody.innerHTML += line;
        }
    }else{
    	tbody.innerHTML = "<tr><td colspan='5'>No hay productos a listar</td></tr>"
    }
}

Tienda.prototype.eraseProducto = function(id){
	this.arrayProductos.splice(id,1);
	this.pintarItem();
}

Tienda.prototype.llenarImagenes = function() {
    var urlImagen = document.getElementById("urlImagen");
    
    for (var i in tienda.stock) {
        var option = document.createElement("option");
        option.text = tienda.stock[i];
        option.value = tienda.stock[i];
        urlImagen.add(option);
    }
}

function Producto(product) {
    this.nombre = product.nombre;
    this.precio = product.precio;
    this.descripcion = product.descripcion;
    this.urlImagen = product.urlImg;
}

var miTienda = {
    nombre: "Nike",
    url: "#nike.com"
}

var tienda = new Tienda(miTienda);

var pintarItems = function() {
    tienda.pintarItem();
}

var addProduct = function() {
    tienda.addProduc();
}

var eraseProduct = function(id){
	tienda.eraseProducto(id);
}

var img = "";

var setImg = function(val) {
    img = val;
}

window.onload = function(){tienda.llenarImagenes();};



