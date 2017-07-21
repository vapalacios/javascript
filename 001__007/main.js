var buscarParejas = function(array) {
    var result = [];
    for (var i in array) {
        for (var j = i;j < array.length; j++) {
            if (array[i] + array[j] == 0) {
                result.push(i + "," + j);
            }
        }
    }
    return result;
}

buscarParejas([2, -5, 10, 5, 4, -10, 0, -5]);