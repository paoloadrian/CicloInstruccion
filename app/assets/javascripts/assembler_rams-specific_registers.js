$(document).ready(function(){
	var cantInstrucciones=0, mensaje, inicio, fin, pc, comando, comandoCorrecto, contenidoCorrecto, storeUsado;
	$("#assembler-cells input[type='text']").regexMask(/^[0-9A-Za-z]+$/);
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
                                mensaje = "Debe usarse al menos una vez el CO 'Almacenar en RAM'";
                                return false;
                            }
                        }
                    }
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
	        if ($("#assembler_dir"+j.toString()).val() == dir){
	            var texto = $("#assembler_cont"+j.toString()).val();
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

	function ContieneComando(contenido){
		var content = contenido.split(" ");
		if(content.length < 2){
			mensaje = "El formato de una instruccion debe ser el CO seguido de un espacio y la(s) direccion(es)";
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
				break;
			default:
				return false;
		}
		comando = cod;
		comandoCorrecto = true;
        contenidoCorrecto = ComprobarContenidoComando(content[1], cod);
	    return true;
	}

	function CompararConComandos(texto){
	    var dir = "";
	    if (texto != ""){
	    	if(ContieneComando(texto, $("#load").text()))
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
		pc = sumarassembler(pc, DecimalAassembler(1, pc.length), pc.length);
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

	function sumarassembler(num1, num2, tam){
		var res = assemblerADecimal(num1) + assemblerADecimal(num2);
	    return DecimalAassembler(res, tam);
	}

	function DecimalAassembler(num, tam){
	    var assembler = "";
	    var cosciente = num;
	    while (cosciente > 1){
	        assembler = toassembler(cosciente % 16) + assembler;
	        cosciente = ~~(cosciente / 16);
	    }
	    assembler = toassembler(cosciente) + assembler;
	    for (var i = assembler.length; i < tam; i++){
	        assembler = "0" + assembler;
	    }
	    return assembler;
	}

	function toassembler(num){
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

	function assemblerADecimal(num){
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