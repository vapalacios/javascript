var array = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
var fraseLarga = function(arr) {
    var longitud = 0;
    for (var i of arr) {
        longitud = (i.length > longitud) ? i.length : longitud;
    }
    return longitud;
}


var fraseLarga = function(arr) {
    var longitud = 0;
    for (var i= 0; i < arr.length;i++) {
        longitud = (arr[i].length > longitud) ? arr[i].length : longitud;
    }
    return longitud;
}

var fraseLarga = function(arr) {
    var longitud = 0;

    arr.reduce(function(ant, act){
        longitud = (ant.length > act.length)?ant.length:act.length;
        return longitud;
    })
   
    return longitud;
}

fraseLarga(array);
