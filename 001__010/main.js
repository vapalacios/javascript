var zoo = {
    nombre: "El último zoológico",
    ubicacion: {},
    areas: [],
    aforo: 300
}

zoo.ubicacion = {
    direccion: "Calle de los animales 5",
    ciudad: "Paris",
    pais: "Francia",
    telefono: "111-11111"
}

function area(nombre, aforoMax, recinto, animals){
    return{
        nombre: nombre,
        aforoMaximoZona: aforoMax,
        recinto: recinto
    };
}

function recint(nombre, tipo, numeroAnimales, animales){
    return{
        nombre: nombre,
        tipo: tipo,
        numeroAnimales: numeroAnimales,
        animales: animales
    };
}

function animals(tipo, nombre, peso, veces, dieta, hambre, salud){
    return{
        tipo: tipo,
        nombre: nombre,
        peso: peso,
        vecesAlimentos: veces,
        dieta: dieta,
        hambre: hambre,
        salud : salud
    };
}

function diet(alimentos){
    return{
        alimentos: alimentos 
    };
}

var dieta1 = diet(["ratones", "personas"]);
var dieta2 = diet(["hojas", "frutos", "raices"]);

var animals1 = animals("Mamifero Omnifero", "Serpiente", 10, 2, dieta1, 1, 100);
var animals2 = animals("Mamifero Herbivero", "Hipopotamo", 50, 3, dieta2, 1, 100);


var recintos = [];
var recinto1 = recint("Jaula", "Acero", 20, animals1);
var recinto2 = recint("Jaula", "Acero", 6, animals2);


var area1 = area("Reptile", 50, recinto1);
var area2 = area("Mamifero", 50, recinto2);


zoo.areas.push(area1, area2);

console.log(zoo);