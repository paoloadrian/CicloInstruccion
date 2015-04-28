$(document).ready(function(){
	var cantInstrucciones=0, mensaje, inicio, fin, pc, comando, comandoCorrecto, contenidoCorrecto, storeUsado;
	$("#hexa-cells input[type='text']").regexMask(/^[0-9A-Fa-f]+$/);
	$("#hexa-cells input[type='text']").keyup(function(){
    	this.value = this.value.toUpperCase();
	});
	pc = $("#pc").text();
	$("#create_hexa_ram").on('click', function(e){
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
	        dir = $("#hexa_dir"+i.toString()).val();
	        texto = $("#hexa_cont"+i.toString()).val();
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
	                mensaje = "Todos los registros y direcciones deben ser de " + $("#pc").text().length.toString() * 4 + " bits";
	                return false;
	            }
	        }
	        else{
	            if (texto = "" && texto.length != $("#pc").text().length){
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

	function ComprobarContenidoComando(dir, cod){
	    for (var j = 0; j < 30; j++){
	        if ($("#hexa_dir"+j.toString()).val() == dir){
	            var texto = $("#hexa_cont"+j.toString()).val();
	            if (texto.length == $("#pc").text().length){
	                for (var i = 0; i < parseInt($("#co").text()); i++){
	                    if (texto.charAt(i) != '0'){
	                    	mensaje = "La dirección " + dir + " de la RAM no debe contener un código de operación";
	                        return false;
	                    }
	                }
	                return true;
	            }
	            else{
	                if (cod == $("#store").text() && texto == "")
	                    return true;
	                else{
	                	if(storeUsado)
	                		return true;
	                    mensaje = "Todos los registros usados de la RAM deben ser de " + $("#pc").text().length.toString() * 4 + " bits";
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
		pc = sumarHexa(pc, DecimalAHexa(1, pc.length), pc.length);
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

	function sumarHexa(num1, num2, tam){
		var res = HexaADecimal(num1) + HexaADecimal(num2);
	    console.log(res);
	    return DecimalAHexa(res, tam);
	}

	function DecimalAHexa(num, tam){
	    var hexa = "";
	    var cosciente = num;
	    while (cosciente > 1){
	        hexa = toHexa(cosciente % 16) + hexa;
	        cosciente = ~~(cosciente / 16);
	    }
	    hexa = toHexa(cosciente) + hexa;
	    for (var i = hexa.length; i < tam; i++){
	        hexa = "0" + hexa;
	    }
	    console.log(hexa);
	    return hexa;
	}

	function toHexa(num){
		switch(num){
			case 10:
				return "A";
			case 11:
				return "B";
			case 12:
				return "C";
			case 13:
				return "D";
			case 14:
				return "E";
			case 15:
				return "F";
			default:
				return num.toString();
		}
	}

	function HexaADecimal(num){
	    var dec = 0;
	    for (var i = 0; i < num.length; i++){
	        if (num.charAt(i) != '0')
	            dec = dec + toDec(num.charAt(i)) * Math.pow(16, num.length - 1 - i);
	    }
	    return dec;
	}

	function toDec(num){
		switch(num){
			case 'A':
				return 10;
			case 'B':
				return 11;
			case 'C':
				return 12;
			case 'D':
				return 13;
			case 'E':
				return 14;
			case 'F':
				return 15;
			default:
				return parseInt(num);
		}
	}
});