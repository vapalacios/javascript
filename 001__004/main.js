var array = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
var array2 = ["pedro", "pabloc", "participe"];
var array3 = ["honda", "chevrolet", "pegeout", "toyota"];
var array4 = ["latam", "avianca", "copa", "iberia"];
var resultado = [];
var avg = 0;
var div = 0;

var fraseLarga = function(arr) {
    var longitud = 0;
    for (var i= 0; i < arr.length;i++) {
        longitud = (arr[i].length > longitud) ? arr[i].length : longitud;
    }
    return longitud;
}

resultado.push(fraseLarga(array));
resultado.push(fraseLarga(array2));
resultado.push(fraseLarga(array3));
resultado.push(fraseLarga(array4));

avg = (resultado.reduce(function(ant, act){
    return ant + act;
})) / resultado.length;

console.log(resultado);

console.log(avg);
