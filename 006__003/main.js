var peticionFECTH = () => {
    let url = "https://ironhack-characters.herokuapp.com/characters";
    let myHeaders = new Headers();

    let init = {
        method: "GET",
        headers: myHeaders
    };

    // fetch(url, init).then(
    //     //(data) => console.log(data) retorna un objeto response
    //     (response)=>{
    //     	console.log(response);
    //     	response.json().then((dataJson)=>console.log(dataJson));
    //     }
    // ).catch(
    //     (error) => console.log("Error!!!! ")
    // );

    //otra forma, encadenar then

    var encadenado = fetch(url, init).then(
        (response)=>response.json()
    ).then(
    	(dataJson)=>{
    		console.log(dataJson);
    		return true;
    	}
    );
}

var peticionGET = function() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://ironhack-characters.herokuapp.com/characters");
    xhr.onreadystatechange = (response) => {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    }
    let data = new FormData();
    xhr.send(data);
}

var peticionPOST = () => {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://ironhack-characters.herokuapp.com/characters");
    xhr.onreadystatechange = (response) => {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    }

    let data = new FormData();

    data.append("name", "vap");
    data.append("occupation", "jedi");
    data.append("debt", "false");
    data.append("weapon", "Lightsaber");
    xhr.send(data);
}
