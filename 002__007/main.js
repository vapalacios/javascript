var pubsub;

pubsub = (function(){

    var suscriptores = {};
    function subscribe(event, callback){
        if(!suscriptores[event]){
            var suscriptorArray = [callback];
            suscriptores[event] = suscriptorArray;
        }else{
        suscriptores[event].push(callback);
        }
    }

    function publish(event, data){
        if(suscriptores[event]){
            suscriptores[event].forEach(function(callback){
                callback(data);
            });
        }
    }
    return{
        pub: publish,
        sub: subscribe
    };
}());

var nombrePersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran", "Conan", "Olaf", "Barbaro", "Destructor", "Erik"];
var nacionality = ["Venezolana", "Chilena", "Española", "Mexicana", "Argentina"];

function generarNombreAleatorio() {
    var aleatorio = Math.floor(Math.random() * nombrePersonas.length);
    return nombrePersonas[aleatorio];
}
function generarEdadAleatorio(){
    var edad = Math.floor(Math.random() * 35);
    return edad;
}


function Persona(modeloTelephone, idDispositivo){
    this.nombre = generarNombreAleatorio();
    this.edad = generarEdadAleatorio();
    this.nacionalidad = this.generarNacionalidadAleatorio();
    this.dispositivo = new Dispositivo(modeloTelephone, idDispositivo);
    this.dispositivo.enrolarEnvio(idDispositivo);
}

Persona.prototype.getRandomInteger = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

Persona.prototype.generarNacionalidadAleatorio = function() {
    var aleatorio = Math.floor(Math.random() * nacionality.length);
    return nacionality[aleatorio];
}

Persona.prototype.getRandomInteger = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Dispositivo(modeloTelephone, idDispositivo){
    this.tipo = modeloTelephone;
    this.idDispositivo = idDispositivo;
}

Dispositivo.prototype.recordMessage = function(evento, chat){
    pintarMensaje(chat.origen, chat.mensaje, true);
    pubsub.pub(evento, chat);
}

Dispositivo.prototype.sendMessage = function(data){
    pintarMensaje(data.destino, data.mensaje, false);
}

Dispositivo.prototype.enrolarEnvio = function(evento) {
    pubsub.sub(evento,(data) => this.sendMessage(data));
    console.info("Dispositivo subscrito al pubsub:");
}

function Conversacion(mensaje){
    this.mensaje = mensaje.chat;
    this.origen = mensaje.origen; 
    this.destino = mensaje.destino;
}

var xaxo1 = new Persona("ios", "iphone1");

var xaxo2 = new Persona("ios", "iphone2");

var enviarMensaje = function(idIphone) {
    var chat = null;
    var mensaje = getMensaje(idIphone);
    console.log("Mensaje enviado por: " + idIphone);
    console.log(mensaje);
    if(idIphone == "iphone1"){
        chat = new Conversacion({
            chat : mensaje,
            origen: "iphone1",
            destino: "iphone2"
        });
        xaxo1.dispositivo.recordMessage("iphone2", chat);
    }else{
        chat = new Conversacion({
            chat : mensaje,
            origen: "iphone2",
            destino: "iphone1"
        });
        xaxo2.dispositivo.recordMessage("iphone1", chat);
    }
}










