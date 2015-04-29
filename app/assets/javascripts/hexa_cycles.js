$(document).ready(function(){
	var co, origen="", destino="", contenido="", pc = $("#pc").text(), ac, dirRam, regRam;
    var tamDIR = parseInt($("#hexa_dir").text()), tamCO = parseInt($("#co").text()), tam = $("#pc").text().length;
    var paso = 1, cantInstrucciones = parseInt($("#cant_instrucciones").text()), instruccionesEjecutadas = 0, instruccion;
    var ejec = false, repetirStore = false, NuevaInstruccion = false;
    var cods = [ $("#load").text(), $("#add").text(), $("#sub").text(), $("#store").text() ];
	$('#hexa-cycle input[type="text"]').each(function () {
		$(this).attr("maxlength",tam);
		$(this).regexMask(/^[0-9A-Fa-f]+$/);
		$(this).keyup(function(){
	    	this.value = this.value.toUpperCase();
		});
	});
	$('#hexa-cycle input[type="text"]').keypress(function(e){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#hexa_pc").attr("id")){
			console.log("cambiando PC");
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#hexa_ac").attr("id")){
				console.log("cambiando ALU");
			}
			else{
				e.preventDefault();
				alert("Secuencia incorrecta");
        		console.log("bloqueado");
			}
		}
	});
	$('#hexa-cycle input[type="text"]').keydown(function(){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#hexa_pc").attr("id")){
			correcto();
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#hexa_ac").attr("id")){
				correcto();
			}
			else{
				alert("Secuencia incorrecta");
        		console.log("bloqueado");
			}
		}
	});
	$('#hexa-cycle input[type="text"]').focusout(function(){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#hexa_pc").attr("id")){
			if (!correcto())
				alert("El PC no tiene el valor de la siguiente instruccion");
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#hexa_ac").attr("id")){
				if(!correcto())
					alert("El contenido de AC no es el correcto");
			}
		}
	});
	$('#hexa-cycle input[type="text"]').on("dblclick", function(event) {
	    if (event.target === this) {
	        if (origen == "" && $(this).val() != ""){
	            origen = $(this).attr("name");
		 		contenido = $(this).val();
	        }
	        else{
	            if(contenido != ""){
					destino = $(this).attr("name");
					if(destino == "ram"){
						regRam = $(this).attr("id");
						obtenerDirDeRamSeleccionada();
					}
					if(origen != destino && correcto())
						$(this).val(contenido);
				}
	        	eliminarDatos();
	        }
	    }
	});

	function obtenerDirDeRamSeleccionada(){
		var splited = regRam.split("-");
		dirRam = $("#hexa_dir-"+splited[1]).val();
		regRam = "hexa_cont-"+splited[1];
	}

	function eliminarDatos(){
	    origen = "";
	    destino = "";
	    contenido = "";
	}

	function captacion(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("pc" == origen && "mar" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#hexa_dir_bus").val() == dirRam){
	                    resp = true;
	                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else
	                    alert("Dirección de Memoria incorrecta");
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#hexa_dir_bus").val() == dirRam){
	                    resp = true;
	                    console.log(origen + "[" + dirRam + "]" + " -> " + destino);
	                    paso++;
	                }
	                else
	                    alert("Dirección de Memoria incorrecta");
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 6:
	            if ("mbr" == origen && "ir" == destino)
	            {
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 7:
	            if (incrementoPC()){
	                resp = true;
	                console.log("PC + 1 -> PC");
	                paso = 1;
	                obtenerCO();
	                imprimirCO();
	                ejec = true;
	                alert("Ciclo de captación TERMINADO");
	            }
	            break;
	    }
	    return resp;
	}

	function obtenerCO(){
	    co = "";
	    for (var i = 0; i < tamCO; i++){
	        co = co + $("#hexa_ir").val().charAt(i);
	    }
	    for (var i = 0; i < 4; i++){
	        if (co == cods[i])
	            instruccion = i;
	    }
	}

	function imprimirCO(){
		switch (instruccion){
	        case 0:
	            console.log("Ejecucion LOAD:");
	            break;
	        case 1:
	            console.log("Ejecucion ADD:");
	            break;
	        case 2:
	            console.log("Ejecucion SUB:");
	            break;
	        case 3:
	            console.log("Ejecucion STORE:");
	            break;
	    }
	}

	function incrementoPC(){
	   if (sumarHexa(pc, DecimalAHexa(1, tam), tam) == $("#hexa_pc").val()){
	       pc = $("#hexa_pc").val();
	       return true;
	   }
	   return false;
	}

	function sumarHexa(num1, num2, tam){
		var res = HexaADecimal(num1) + HexaADecimal(num2);
	    return DecimalAHexa(res, tam);
	}

	function restarHexa(num1, num2, tam){
		var res = HexaADecimal(num1) - HexaADecimal(num2);
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

	function copiarIR(){
	    var dir = "";
	    for (var i = 0; i < tamCO; i++){
	        dir = dir + "0";
	    }
	    for (var i = tamCO; i < tam; i++){
	        dir = dir + $("#hexa_ir").val().charAt(i);
	    }
	    contenido = dir;
	}

	function SumaCorrecta(){
	    if (sumarHexa(ac, $("#hexa_dr").val(), tam) == $("#hexa_ac").val())
	        return true;
	    return false;
	}

	function RestaCorrecta(){
	    if (restarHexa(ac, $("#hexa_dr").val(), tam) == $("#hexa_ac").val())
	        return true;
	    return false;
	}

	function ALU(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                copiarIR();
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#hexa_dir_bus").val() == dirRam){
	                    resp = true;
	                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else
	                    alert("Dirección de Memoria incorrecta");
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#hexa_dir_bus").val() == dirRam){
	                    resp = true;
	                    console.log(origen + "[" + dirRam + "]" + " -> " + destino);
	                    paso++;
	                }
	                else
	                    alert("Dirección de Memoria incorrecta");
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 6:
	            if ("mbr" == origen && "dr" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	                ac = $("#hexa_ac").val();
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 7:
	            if (co == cods[1]){
	                if (SumaCorrecta()){
	                    resp = true;
	                    console.log("ac + dr -> ac");
	                    paso = 1;
	                    instruccionesEjecutadas++;
	                    ejec = false;
	                    alert("Suma correcta");
	                    alert("ADD TERMINADO");
	                    comprobarFinal();
	                }
	            }
	            else{
	                if (co == cods[2]){
	                    if (RestaCorrecta()){
	                        resp = true;
	                        console.log("ac - dr -> ac");
	                        paso = 1;
	                        instruccionesEjecutadas++;
	                    	ejec = false;
	                        alert("Resta correcta");
	                        alert("SUB TERMINADO");
	                        comprobarFinal();
	                    }
	                }
	            }
	            break;
	        default:
	            return false;
	    }
	    return resp;
	}

	function comprobarFinal(){
		if (instruccionesEjecutadas < cantInstrucciones){
	        console.log("Captacion: ");
	    }
	    else{
	        console.log("Programa Finalizado");
	        alert("Programa Finalizado");
	        paso = 0;
	    }
	}

	function Load(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                copiarIR();
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#hexa_dir_bus").val() == dirRam){
	                    resp = true;
	                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else
	                    alert("Dirección de Memoria incorrecta");
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#hexa_dir_bus").val() == dirRam){
	                    resp = true;
	                    console.log(origen + "[" + dirRam + "]" + " -> " + destino);
	                    paso++;
	                }
	                else
	                    alert("Dirección de Memoria incorrecta");
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 6:
	            if ("mbr" == origen && "ac" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso = 1;
	                ejec = false;
	                instruccionesEjecutadas++;
	                alert("LOAD TERMINADO");
	                comprobarFinal();
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        default:
	            return false;
	    }
	    return resp;
	}

	function Store(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                copiarIR();
	                repetirStore = true;
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if ("ac" == origen && "mbr" == destino){
	                    repetirStore = false;
	                    resp = true;
	                    console.log(origen + " -> " + destino);
	                    paso++;
	                }
	                else
	                    alert("Secuencia incorrecta");
	            }
	            break;
	        case 2:
	            if ("ir" == origen && "mar" == destino && !repetirStore){
	                copiarIR();
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if ("ac" == origen && "mbr" == destino && repetirStore){
	                    resp = true;
	                    console.log(origen + " -> " + destino);
	                    paso++;
	                }
	                else
	                    alert("Secuencia incorrecta");
	            }
	            break;
	        case 3:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                repetirStore = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if ("mbr" == origen && "busDatos" == destino){
	                    resp = true;
	                    repetirStore = false;
	                    console.log(origen + " -> " + destino);
	                    paso++;
	                }
	                else
	                    alert("Secuencia incorrecta");
	            }
	            break;
	        case 4:
	            if ("mar" == origen && "busDirs" == destino && !repetirStore){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if ("mbr" == origen && "busDatos" == destino && repetirStore){
	                    resp = true;
	                    console.log(origen + " -> " + destino);
	                    paso++;
	                }
	                else
	                    alert("Secuencia incorrecta");
	            }
	            break;
	        case 5:
	            if ("busDatos" == origen && "ram" == destino){
	                if ($("#hexa_dir_bus").val() == dirRam){
	                    $("#"+regRam).val(contenido);
	                    resp = true;
	                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
	                    paso = 1;
	                    ejec = false;
	                    instruccionesEjecutadas++;
	                    alert("STORE terminado");
	                    comprobarFinal();
	                }
	                else
	                    alert("Dirección de memoria incorrecta");
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        default:
	            return false;
	    }
	    return resp;
	}

	function ejecucion(){
	    var resp = true;
	    switch (instruccion){
	        case 0://load
	            resp = Load();
	            break;
	        case 3://store
	            resp = Store();
	            break;
	        default:
	            resp = ALU();
	            break;
	    }
	    return resp;
	}

	function correcto(){
	    var resp = false;
	    if (cantInstrucciones == instruccionesEjecutadas){
	        alert("Programa Finalizado");
	    }
	    else{
	        if (!ejec)
	            resp = captacion();
	        else
	            resp = ejecucion();
	    }
	    return resp;
	}
});