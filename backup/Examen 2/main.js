const URLIMAGENCAMISETA = "http://www.gasoilonline.com/images/CAMI%20ROJA.jpg";

class Producto{
	constructor(nombre, precio, descripcion, urlImagen){
		this._nombre = nombre;
		this._precio = precio;
		this._descripcion = descripcion;
		this._urlImagen = urlImagen;
	}
}

class Tienda{
	constructor(nombre, direccion, urlTienda){
		this._nombre = nombre;
		this._direccion = direccion;
		this._urlTienda = urlTienda;
		this._productos = [];
	}

	addProducto(producto){
		this._productos.push(producto);
	}

	addAndCreateProducto(nombre, precio, descripcion, urlImagen){
		var producto = new Producto(nombre, precio, descripcion, urlImagen);
		this._productos.push(producto);
	}

	// Para que Vlai no se enfade
	removeProductoByIndex(index){
		this.removeProductoAtIndex(index);
	}

	removeProductoAtIndex(index){
		this._productos.splice(index, 1);
	}
}

let miTienda = new Tienda("Tienda de Fran", "Calle Gral..", "google.es");
let prod1 = new Producto("Camiseta", "10€", "De algodón", URLIMAGENCAMISETA);
let prod2 = new Producto("Camiseta 2", "12€", "De lino", URLIMAGENCAMISETA);


miTienda.addProducto(prod1);
miTienda.addProducto(prod2);

console.log(miTienda);























