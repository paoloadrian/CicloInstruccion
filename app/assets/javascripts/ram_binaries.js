$(document).ready(function(){
	var cantInstrucciones=0, mensaje, inicio, fin, pc, comando, comandoCorrecto, contenidoCorrecto, storeUsado;
	for (var i=0;i<15;i++){
		$("#dir"+i).regexMask(/^[01]+$/);
		$("#cont"+i).regexMask(/^[01]+$/);
	}
	pc = $("#pc").text();
	$("#create_ram_binary").on('click', function(e){
		if (!correcto()){
            cantInstrucciones = 0;
            console.log(mensaje);
			alert(mensaje);
            e.preventDefault();
		}
		else {
			console.log("Formato correcto");
			alert("Formato correcto");
            e.preventDefault();
		}
	});

	function correcto(){
	    var texto, dir;
	    comando = "";
	    inicio = false;
	    fin = false;
	    storeUsado = false;
	    pc = $("#pc").text();
	    for (var i = 0; i < 15 && !fin; i++){
	        comandoCorrecto = false;
	        contenidoCorrecto = false;
	        dir = $("#dir"+i.toString()).val();
	        texto = $("#cont"+i.toString()).val();
	        if (dir != ""){
	            if (dir.length == $("#pc").text().length && (texto == "" || texto.length == $("#pc").text().length)){
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
	                                mensaje = "Debe usarse al menos una vez el CO 'Almacenar en RAM'";
	                                return false;
	                            }
	                        }
	                    }
	                }
	            }
	            else{
	                mensaje = "Todos los registros y direcciones deben ser de " + $("#pc").text().length.toString() + " bits";
	                return false;
	            }
	        }
	        else{
	            if (texto = "" && texto.length != $("#pc").text().length){
	                mensaje = "Todos los registros y direcciones deben ser de " + $("#pc").text().length.toString() + " bits";
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

	function ComprobarContenidoComando(dir, cod){
	    for (var j = 0; j < 15; j++){
	        if ($("#dir"+j.toString()).val() == dir){
	            var texto = $("#cont"+j.toString()).val();
	            if (texto.length == $("#pc").text().length){
	                for (var i = 0; i < parseInt($("#co").text()); i++){
	                    if (texto.charAt(i) != '0')
	                        return false;
	                }
	                return true;
	            }
	            else{
	                if (cod == $("#store").text() && texto == "")
	                    return true;
	                else{
	                	if(storeUsado)
	                		return true;
	                    mensaje = "Todos los registros usados de la RAM deben ser de " + $("#pc").text().length.toString() + " bits";
	                    return false;
	                }
	            }
	        }
	    }
	    mensaje = "No existe la direccion " + dir + " de la RAM";
	    return false;
	}

	function ContieneComando(contenido, cod){
		var dir = "";
		if (cod != ""){
	        for (var i = 0; i < parseInt($("#co").text()); i++){
	            if (contenido.charAt(i) == cod.charAt(i))
	                dir = dir + '0';
	            else
	                break;
	        }
	        if (dir.length == parseInt($("#co").text())){
	            comandoCorrecto = true;
	            for (var i = parseInt($("#co").text()); i < $("#pc").text().length; i++)
	                dir = dir + contenido.charAt(i);
	            contenidoCorrecto = ComprobarContenidoComando(dir, cod);
	            return true;
	        }
	        else
	            return false;
	    }
	    return false;
	}

	function CompararConComandos(texto){
	    var dir = "";
	    if (texto != ""){
	    	if(ContieneComando(texto, $("#load").text())){
	        	comando = "load";
	        	return true;
	        }
	        else{
	        	if(ContieneComando(texto, $("#store").text())){
		        	comando = "store";
		        	storeUsado = true;
		        	return true;
		        }
	        	else{
	        		if(ContieneComando(texto, $("#add").text())){
			        	comando = "add";
			        	return true;
			        }
	        		else{
			        	if(ContieneComando(texto, $("#sub").text())){
				        	comando = "sub";
				        	return true;
				        }
			        	else
			        		return false;
			        }
	        	}
	        }
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
		pc = sumarBinario(pc, DecimalABinario(1, pc.length), pc.length);
	    cantInstrucciones++;
	}

	function InicioDeProgramaCorrecto(dir){
	    inicio = true;
	    if (comandoCorrecto){
	        if (comando == "load"){
	            incrementarPC();
	            return true;
	        }
	        else{
	            mensaje = "El comando contenido en la direccion del PC debe ser 'Leer de RAM'";
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
	        if (texto.charAt(i) != '0')
	            return true;
	    }
	    return false;
	}

	function sumarBinario(num1, num2, tam){
		var res = BinarioADecimal(num1) + BinarioADecimal(num2);
	    return DecimalABinario(res, tam);
	}

	function DecimalABinario(num, tam){
	    var bin = "";
	    var cosciente = num;
	    while (cosciente > 1){
	        bin = (cosciente % 2).toString() + bin;
	        cosciente = ~~(cosciente / 2);
	    }
	    bin = cosciente.toString() + bin;
	    for (var i = bin.length; i < tam; i++){
	        bin = "0" + bin;
	    }
	    return bin;
	}

	function BinarioADecimal(num){
	    var dec = 0;
	    for (var i = 0; i < num.length; i++){
	        if (num.charAt(i) == '1')
	            dec = dec + Math.pow(2, num.length - 1 - i);
	    }
	    return dec;
	}
});