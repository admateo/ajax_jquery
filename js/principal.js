{

String.prototype.transformaCaracteresEspeciales = function() {
return unescape(escape(this).
    	replace(/%0A/g, '<br/>').
      	replace(/%3C/g, '&lt;').
    	replace(/%3E/g, '&gt;'));
}

$(function(){

	let $listaEstadoAjax = $("#estadoAjax");
	let $estadoServidor = $("#estadoServidor");
	let $contenidoFichero = $("#contenidoFichero");

	function cargarFichero() {
		$listaEstadoAjax.html("");
		$contenidoFichero.html("");
		let $urlArchivo = $("#url").val();

		let peticion = $.ajax({
			url: $urlArchivo,
			beforeSend: function(xhr) {
				$listaEstadoAjax.append("<li>"+xhr.readyState+" No iniciada"+"</li>");
		  	},		  	
		  	complete: function(xhr){
		  		$listaEstadoAjax.append("<li>"+xhr.readyState+" Completada"+"</li>");
		  		$estadoServidor.html(xhr.status+" "+xhr.statusText);
		  		
		  	}
		}).done(function(data){
		  		$contenidoFichero.html(data.transformaCaracteresEspeciales());
		  	});
	}

	$("#mostrar").on("click", cargarFichero);

});

	

}