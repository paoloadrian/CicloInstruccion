$(document).ready(function(){
	var cantInstrucciones=0, mensaje, inicio, fin, pc, comando, comandoCorrecto, contenidoCorrecto, storeUsado, jump;
	$("#assembler-cells input[type='text']").regexMask(/^[0-9A-Za-z ,]+$/);
	$("#assembler-cells input[type='text']").keyup(function(){
    	this.value = this.value.toUpperCase();
	});
	pc = $("#pc").text();
	$("#create_assembler_specific_ram").on('click', function(e){
		if (!correcto()){
            cantInstrucciones = 0;
            console.log(mensaje);
			alert(mensaje);
            e.preventDefault();
		}
		else {
			$("#cant_instrucciones").val(cantInstrucciones);
			console.log("Cantidad de instrucciones: "+$("#cant_instrucciones").val());
			console.log("Formato correcto");
			alert("Formato correcto");
			cantInstrucciones = 0;
		}
	});

	function correcto(){
	    var texto, dir;
	    comando = "";
	    inicio = false;
	    fin = false;
	    storeUsado = false;
	    pc = $("#pc").text();
	    for (var i = 0; i < 30 && !fin; i++){
	        comandoCorrecto = false;
	        contenidoCorrecto = false;
	        dir = $("#assembler_dir"+i.toString()).val();
	        texto = $("#assembler_cont"+i.toString()).val();
	        if (dir != ""){
                if (!inicio){
                    if (CompararConPC(dir, texto)){
                        if (!InicioDeProgramaCorrecto(dir))
                            return false;
                        else{
                            if (!contenidoCorrecto)
                                return false;
                        }
                    }
                }
                else{
                    if (!fin){
                    	if (CompararConPC(dir, texto)){
                    		if(!fin){
	                            if (comandoCorrecto){
	                                if (!contenidoCorrecto)
	                                    return false;
	                                incrementarPC();
	                            }
	                            else{
	                                if (RegistroErroneo(texto)){
	                                    mensaje = "La direccion " + dir + " de la RAM debe contener un codigo de operacion";
	                                    return false;
	                                }
	                                else
	                                	fin = true;
	                            }
                        	}
                        }
                        else{
                            if (cantInstrucciones > 1 && storeUsado)
                                fin = true;
                            else{
                                mensaje = "Debe usarse al menos una vez el CO STORE";
                                return false;
                            }
                        }
                    }
                }
	        }
	        else{
	            if (texto = ""){
	                mensaje = "Todos los registros y direcciones deben ser de " + $("#pc").text().length.toString() * 4 + " bits";
	                return false;
	            }
	        }
	    }
	    if (!inicio){
	        mensaje = "La RAM no contiene la direccion con el valor del PC";
	        return false;
	    }
	    return true;
	}

	function ComprobarContenidoComando(dir){
		if(dir==""){
			mensaje = "Los registros con un código de operación deben tener al menos una dirección";
	        return false;
		}
	    for (var j = 0; j < 30; j++){
	        if ($("#assembler_dir"+j.toString()).val() == dir){
	            var texto = $("#assembler_cont"+j.toString()).val();
	            if (comando == "STORE" && texto == "")
	            	return true;
	            else{
	            	if (texto == ""){
	            		mensaje = "La dirección " + dir + " debe contener un dato";
	            		return false;
	            	}
	            	else{
		                for (var i = 0; i < texto.length; i++){
		                    if (texto.charCodeAt(i) < 48 || texto.charCodeAt(i) > 57){
		                    	mensaje = "La dirección " + dir + " de la RAM debe contener un dato";
		                        return false;
		                    }
		                }
		            	return true;
	            	}
	            }
	        }
	    }
	    mensaje = "No existe la direccion " + dir + " de la RAM";
	    return false;
	}

	function ContieneComando(contenido){
		var content = contenido.split(" ");
		if(content.length != 2){
			mensaje = "El formato de una instruccion debe ser el CO seguido de un espacio y la(s) direccion(es) separadas por comas";
			return false;
		}
		cod = content[0];
		switch(cod){
			case "LOAD":
				break;
			case "STORE":
				storeUsado = true;
				break;
			case "ADD":
				break;
			case "SUB":
				break;
			case "MPY":
				break;
			case "DIV":
				break;
			case "MOVE":
				break;
			case "JUMP":
				jump = content[1];
				break;
			default:
				return false;
		}
		comando = cod;
		comandoCorrecto = true;
        contenidoCorrecto = ComprobarContenidoComando(content[1]);
	    return true;
	}

	function CompararConComandos(texto){
	    var dir = "";
	    if (texto != ""){
	    	if(ContieneComando(texto))
	        	return true;
	        else
	        	return false;
	    }
	    else{
	    	if(storeUsado){
	    		fin = true;
	    		return true;
	    	}
	    	else
	        	return false;
	    }
	}

	function CompararConPC(dir, texto){
	    if (dir == pc){
	    	CompararConComandos(texto);
	        return true;
	    }
	    return false;
	}

	function incrementarPC(){
		if(comando != "JUMP")
			pc = (parseInt(pc) + 1).toString();
		else
			pc = jump;
	    cantInstrucciones++;
	}

	function InicioDeProgramaCorrecto(dir){
	    inicio = true;
	    if (comandoCorrecto){
	        if (comando == "LOAD"){
	            incrementarPC();
	            return true;
	        }
	        else{
	            mensaje = "El comando contenido en la direccion del PC debe ser LOAD";
	            return false;
	        }
	    }
	    else{
	        mensaje = "La direccion " + dir + " de la RAM debe contener un codigo de operacion";
	        return false;
	    }
	}

	function RegistroErroneo(texto){
	    if (cantInstrucciones < 2)
	        return true;
	    if (!storeUsado)
	        return true;
	    for (var i = 0; i < parseInt($("#co").text()); i++){
	        if (texto.charCodeAt(i) < 48 || texto.charCodeAt(i) > 57)
	            return true;
	    }
	    return false;
	}
});