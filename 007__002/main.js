/*
vehiculo - velocidad []
motocicleta
autos
carrera
*/
var marca = ["Chevrolet", "Toyota", "Mazda", "Cetroen", "Dodge", "Ferrari"];
var modelo = ["Optra", "Corolla", "6", "Enduro", "Uno"];
var tipo = ["motocicleta", "coche"];
var imagen = ["vehiculos/vehiculo1.png", "vehiculos/vehiculo2.png", "vehiculos/vehiculo3.png", "vehiculos/vehiculo4.png", "vehiculos/vehiculo5.png", "vehiculos/vehiculo6.png"];

function Vehiculo(newVehiculo) {
    this.marca = newVehiculo.marca;
    this.modelo = newVehiculo.modelo;
    this.velocidad = newVehiculo.velocidad;
    this.imagen = newVehiculo.imagen;
}

Vehiculo.prototype.acelerar = function() {
    var _aceleracion = this.getRandomInteger(100, 200);
    this.velocidad += this.velocidad < 200 ? _aceleracion : 0;
    return _aceleracion;
}

Vehiculo.prototype.getRandomInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vehiculo.prototype.generarDatosAleatorio = function(array) {
    var aleatorio = Math.floor(Math.random() * array.length);
    return array[aleatorio];
}

function Carrera(premio) {
    this.arrayVehiculo = [];
    this.premio = premio;
    this.distancia = 0;
}

Carrera.prototype.addVehiculo = function(vehiculo) {
    this.arrayVehiculo.push(vehiculo);
    console.info("Vehiculo añadido");
}

Carrera.prototype.finalizarCarrera = function(carrera) {
    if (this.win != "") {
        console.info(" Copa: " + this.premio);
        clearInterval(idInterval);
    }
}

var distance = [];
var race = 0;

Carrera.prototype.ejecutarCiclo = function() {
    console.info("Comienza la carrera");

    for (var c = 0; c < this.arrayVehiculo.length; c++) {
        distance[c] += Math.round(Math.round(this.getMetros(this.arrayVehiculo[c].acelerar())) * 4);
        console.info("Vehiculo " +c+ " distancia " +distance[c]);

        if (distance[c] >= race) {
            console.log("Tenemos un ganador");
            this.finalizarCarrera();
            distance[c] = race;
        }

        document.getElementById("img" + c).style['padding-left'] = distance[c] + 'px';
    }
    /*distancia1 += Math.round(Math.round(this.getMetros(this.vehiculoArr.acelerar())) * 4);
    console.info("avanza vehiculo1: " + distancia1);
    distancia2 += Math.round(Math.round(this.getMetros(this.vehiculoAba.acelerar())) * 4);
    console.info("avanza vehiculo2: " + distancia2);*/


    //document.getElementById("img2").style['padding-left'] = distancia2 + 'px';    
}

Carrera.prototype.getMetros = function(velocidad) {
    var metros = velocidad * 1000 / 3600;
    return metros;
}

Carrera.prototype.posiciones = function() {
    document.getElementById("img1").setAttribute("src", this.vehiculoArr.imagen);
    document.getElementById("img2").setAttribute("src", this.vehiculoAba.imagen);
}

var idInterval = 0;

var llenarCarros = function() {
    var myBrand = document.getElementById("marcaSelect");
    var myCar = document.getElementById("carsSelect");
    var myImage = document.getElementById("imgSelect");
    for (var i in marca) {
        var option = document.createElement("option");
        option.text = marca[i];
        option.value = marca[i];
        myBrand.add(option);
    }

    for (var i in modelo) {
        var optionM = document.createElement("option");
        optionM.text = modelo[i];
        optionM.value = modelo[i];
        myCar.add(optionM);
    }

    for (var i in imagen) {
        var optionI = document.createElement("option");
        optionI.text = imagen[i];
        optionI.value = imagen[i];
        myImage.add(optionI);
    }
}

//window.onload = function(){ carrera.posiciones();};

var auto = {
    marca: "",
    modelo: "",
    imagen: "",
    velocidad: ""
}

window.onload = llenarCarros;

var setImg = function(val) {
    auto.imagen = val;
}

var setBrand = function(val) {
    auto.marca = val;
}

var setModel = function(val) {
    auto.modelo = val;
}

var carrera = new Carrera("Monaco");

var addCar = function() {
    auto.velocidad = Number.parseInt(document.getElementById("velocidad").value) || 100;
    document.getElementById("velocidad").value = "";
    document.getElementById("marcaSelect").selectedIndex = 0;
    document.getElementById("carsSelect").selectedIndex = 0;
    document.getElementById("imgSelect").selectedIndex = 0;
    var vehiculo = new Vehiculo(auto);
    carrera.addVehiculo(vehiculo);
}

var engine = function() {
    document.getElementById("imgSelected").style["display"] = "none";
    var divRacing = document.getElementById("racing");
    for (var i = 0; i < carrera.arrayVehiculo.length; i++) {
        var line = '<div id="pista' + i + '" class="div-pista-arr"><img id="img' + i + '" src="' + carrera.arrayVehiculo[i].imagen + '"></div><div class="div_seprator"></div>';
        divRacing.innerHTML += line;
    }
    distance = new Array(carrera.arrayVehiculo.length).fill(0);
	//race = document.getElementById("racing").offsetWidth;
	race = window.innerWidth - 300;
    idInterval = setInterval(function() { carrera.ejecutarCiclo(); }, 1000);
}