class Persona{
	constructor(nombre = null, apellido = null){
		this._nombre = nombre;
		this._apellido = apellido;
	}
	getName(){
		console.log(this._nombre)
	}
	static createPersona(obj){
		let persona = new Persona(obj._nombre, obj._apellido);
		return persona;
	}
}

let getNameFromLocalStorage = ()=>{
	let personaAsString = localStorage.getItem("persona");
	let personaParseado = JSON.parse(personaAsString);
	let persona = Persona.createPersona(personaParseado);
	console.log(persona);
	return persona;
}

let setPersonaAtlocalStorage = (persona)=>{
	let personaAsString = JSON.stringify(persona);
	localStorage.setItem("persona", personaAsString);
}

let persona1 = new Persona("Vlairner", "Palacios");

setPersonaAtlocalStorage(persona1);

let persona2 = getNameFromLocalStorage();

console.log(persona1);
console.log(persona2);
