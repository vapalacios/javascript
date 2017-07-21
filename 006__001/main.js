

var peticionGET = function(){
	let xhr = new XMLHttpRequest();

	xhr.open("GET", "https://ironhack-characters.herokuapp.com/characters");
	xhr.onreadystatechange = (response)=>{
		if(xhr.readyState === 4){
			console.log(xhr.responseText);
		}
	}
	let data = new FormData();
	xhr.send(data);
}

var peticionPOST = ()=>{
	let xhr = new XMLHttpRequest();

	xhr.open("POST", "https://ironhack-characters.herokuapp.com/characters");
	xhr.onreadystatechange = (response)=>{
		if(xhr.readyState === 4){
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

