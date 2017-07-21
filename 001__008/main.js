var stringDeNumeros = "80:70:90:100";
var media = function(str) {
    var array = str.split(":");
    return array.reduce((ant,act)=>Number.parseInt(ant, 10) + Number.parseInt(act, 10)) / array.length;
}

media(stringDeNumeros);


var stringDeNumeros = "80:70:90:100";
var media = function(str) {
    var array = str.split(":");
    return array.reduce((ant,act)=> (+ant) + (+act) )/ array.length;
}

media(stringDeNumeros);

var stringDeNumeros = "80:100:70:90:100:100:100";
var media = function(str) {
    var array = str.split(":").sort();
    var result = array.filter(function(num, idx, array){
        return num != array[--idx];
    });
    return result.reduce((ant,act)=> (+ant) + (+act) )/ result.length;
}

media(stringDeNumeros);