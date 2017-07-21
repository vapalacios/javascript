window.onload = function(){
   var header = document.querySelector("header");
   header.addEventListener("click", function(e){
       console.log("Has clickeado en " + e.target.nodeName);
       e.stopPropagation();
   });
   var body = document.querySelector("body");
   body.addEventListener("click", function(e){
       console.log("clickeado en " + e.target.nodeName);
   });
}

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

	function publish(event){
		if(suscriptores[event]){
			suscriptores[event].forEach(function(callback){
				callback();
			});
		}
	}
	return{
		pub: publish,
		sub: subscribe
	};
}());
