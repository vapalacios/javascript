function stringToMayusculas(str){
    return str.toUpperCase();
}

stringToMayusculas("Esta es otra prueba");

function stringInverso(str){
    return str.split("").reverse().join("");
}

stringInverso("Hola clase");

function eliminarEspacios(str){
    return str.trim().replace(/\s/g, "");
}

eliminarEspacios("[e s u n a prueba ]");

function esPalindromo(str){
    var ori = str.trim().replace(/\s/g, "").toUpperCase();
    var chg = ori.split("").reverse().join("");
    return (ori == chg);
}

esPalindromo("Arde ya la yedra");
