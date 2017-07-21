class Producto {
    constructor(product) {
        this.idProduct = null;
        this.nombre = product.nombre;
        this.precio = product.precio;
        this.descripcion = product.descripcion;
        this.urlImagen = product.urlImg;
    }

    getRowProductHtml() {
        let row = '<tr id="tr"> \
                        <td><img src="' + this.urlImagen + '.png"></td> \
                        <td>' + this.nombre + '</td> \
                        <td>' + this.precio + '</td> \
                        <td>' + this.descripcion + '</td> \
                        <td><button onclick="tienda.removeProductById(' + this.idProduct + ')">Borrar</button></td> \
                        </tr>';
        return row;
    }
}

class Tienda {
    constructor(shop) {
        this.nombre = shop.nombre;
        this.url = shop.url;
        this.arrayProductos = [];
        this.stock = ["blusa", "camisa", "chemise", "pantalon", "tenis", "vestido", "zandalia-dama", "zapato-caballero", "zapato-dama"];
    }

    addProduc(producto) {
        this.arrayProductos.push(producto);
    }

    removeProductById(idProduct){
        
    }

    eraseProducto(index) {
        this.arrayProductos.splice(index, 1);
        this.pintarItem();
    }

    insertProduct() {
        event.preventDefault();
        event.stopPropagation();
        let product = new Producto(tienda.getProduct());
        tienda.addProduc(product);
        this.pintarItem();
    }

    pintarItem() {
        var tbody = document.getElementById("tbody");
        tbody.innerHTML = "";
        if (this.arrayProductos.length > 0) {
            for (var i = 0; i < this.arrayProductos.length; i++) {
                var line = this.arrayProductos[i].getRowProductHtml(i);
                tbody.innerHTML += line;
            }
        } else {
            tbody.innerHTML = "<tr><td colspan='5'>No hay productos a listar</td></tr>";
        }
    }

    llenarImagenes() {
        var urlImagen = document.getElementById("urlImagen");

        for (var i in tienda.stock) {
            var option = document.createElement("option");
            option.text = tienda.stock[i];
            option.value = tienda.stock[i];
            urlImagen.add(option);
        }
    }

    getProduct() {
        const PATH = "img/";
        let producto = {
            nombre: document.getElementById("nameProducto").value,
            precio: document.getElementById("precio").value,
            descripcion: document.getElementById("descripcion").value,
            urlImg: PATH.concat(img)
        }
        document.getElementById("nameProducto").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("urlImagen").selectedIndex = 0;
        return producto;
    }
}

var miTienda = {
    nombre: "Nike",
    url: "#nike.com"
}

var tienda = new Tienda(miTienda);

var img = "";

var setImg = function(val) {
    img = val;
}

window.onload = function() { tienda.llenarImagenes(); };