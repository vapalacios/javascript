var array = "abecedario";

var count = function(str){
    var obj = {};
    var i = 1;
    var cadena = str.split("").sort();
    for(var index of cadena){
        obj[index] = (obj.hasOwnProperty(index))? obj[index] + i : i;
    }
    return obj;
}

console.log(count(array));

Bonus

var array = "abecedario";

var count = function(str) {
    var obj = {
        data: {},
        error: ""
    };
    var i = 1;
    var cadena = ((typeof str) == "string") ? str.split("").sort() : "";
    for (var index of cadena) {
        if ((typeof index) == "string") {
            obj.data[index] = (obj.data.hasOwnProperty(index)) ? obj.data[index] + i : i;
            obj.error = null;
        } else {
            obj.error = "No se ha enviado un string";
        }
    }
    return obj;
}

console.log(count(array));
