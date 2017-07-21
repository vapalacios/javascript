function vaciarPapelera(array) {
	// Esta función debe recibir un array y devolverlo habiéndole quitado los elementos que sean un asterisco (*)

	// Por ejeplo:
	// vaciarPapelera(['a',1,'*',5]) 

	// debe devolver:
	// ['a',1,5]

	return array.filter(elemento => elemento != "*");
}

vaciarPapelera(['a',1,'*',5]);


function agruparElementos(array) {
	// Esta función debe recibir un array con números y letras y devolverlo habiendo agrupado los elementos
	// En primer lugar se deben encontrar números, depués letras. El orden dentro de cada grupo no importa.

	// Por ejemplo: 
	// agruparElementos(['B', 'a', 4 , 23, 'J']) 

	// debe devolver:
	// [23, 4, 'B', 'a', 'J']
	return array.sort();
}

agruparElementos(['B', 'a', 4 , 23, 'J']);

function ponerBonitasLasLetras(array) {
    // Esta función debe recibir un array de números y letras y devolverlo con las letras vocales en mayúsculas 
    // y las consonantes en minúsculas. Los números no deben ser tratados.

    // Por ejemplo:
    // ponerBonitasLasLetras([1,5,7,'a','J',p,'E'])

    // debe devolver:
    // [1,5,7,'A','j',p,'E']
    var myRe = /[AaEeIiOoUu]/g;

    return array.map(function(i) {
        var result = i;
        if ((typeof i) == "string") {
            if ((i.search(myRe)) != -1) {
                result = i.toLowerCase();
            }
        }
        return result;
    });
}

ponerBonitasLasLetras([1, 5, 7, 'a', 'J', "p", 'E']);

function ponerBonitosLosNumeros(array) {// Esta función debe recibir un array de números y letras, y devolverlo con los números "bonitos". 
// Las letras no deben cambiar. 
// Para poner bonito número debemos sumar todas sus cifras.
// en caso de que el número resultante tenga más de una cifra, se petirá el proceso con este.
// 123 se convertirá en 6 porque 1+2+3 = 6
// 9 se convertirá en 9
// 9956 se convertirá en 2 porque 9+9+5+6 = 29, 2+9 = 11 y 1+1 = 2
// 793 se convertirá en 1 porque 7+9+3 = 19, 1+9 = 10 y 1+0 = 1

// Este proceso debemos realizarlo sobre un array de elementos y aplicarlo solo a los números.

// Por ejemplo: 
// ponerBonitosLosNumeros([23,59, 4,'A','b'])

// debe devolver
// [5, 5, 4, 'A', 'b']

    var newArray = array.map(function(i){
        if(!isNaN(i) && i.toString().length > 1){
            i = i.toString().split("").reduce((x,y)=> (+x)+(+y));
            if(i.toString().length > 1){
                i = i.toString().split("").reduce((x,y)=> (+x)+(+y));
            }
        }
        return i;
    });

   return newArray;

}

ponerBonitosLosNumeros([23,59, 4,'A','b']);

function ordenarArray(array) {
	//It receives an array with numbers and letters and returns it with its items sorted. Numbers on one side and letters on the other.
	//Example: ordenarArray([5,5, 4, 1, 'j', A','b', 'E']) returns [1, 4, 5, 5, 'A', 'b', 'E', 'j']
	return array.sort();
}

ordenarArray([5,5, 4, 1, "j", "A","b", "E"]);


function arrayToString(array) {
	//It receives an array and returns a string with all its elements.
	//Example: arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j']) returns "1455AbEj"
	return array.join("");
}

arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j']);
