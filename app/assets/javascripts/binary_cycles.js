$(document).ready(function(){
	var co, origen="", destino="", contenido="", pc = $("#binary_pc").val(),  ac = $("#binary_ac").val();
	var dirRam = $("#direccion").val(), regRam = $("#registro").val();
    var tamDIR = parseInt($("#dir").text()), tamCO = parseInt($("#co").text()), tam = $("#pc").text().length;
    var paso = parseInt($("#paso").val()), cantInstrucciones = parseInt($("#cant_instrucciones").text());
    var instruccionesEjecutadas = parseInt($("#instrucciones_ejecutadas").text()), instruccion = parseInt($("#instruccion").val());
    var fails = parseInt($("#fails").val()), intents = parseInt($("#intents").val());
    var ejec = ($("#ejec").val() === "true"), repetirStore = ($("#store").val() === "true");
    var cods = [ $("#load").text(), $("#add").text(), $("#sub").text(), $("#store").text() ];
	$('#cycle-binary input[type="text"]').each(function () {
		$(this).attr("maxlength",tam);
		$(this).regexMask(/^[01]+$/);
	});
	$('#cycle-binary input[type="text"]').keypress(function(e){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#binary_pc").attr("id")){
			console.log("cambiando PC");
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#binary_ac").attr("id")){
				console.log("cambiando ALU");
			}
			else{
				e.preventDefault();
				fails++;
				guardar();
				alert("Este registro no debe ser cambiado manualmente en este paso");
        		console.log("bloqueado");
			}
		}
	});
	$('#cycle-binary input[type="text"]').change(function(){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#binary_pc").attr("id")){
			correcto();
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#binary_ac").attr("id")){
				correcto();
			}
			else{
				alert("Este registro no debe ser cambiado manualmente en este paso");
        		console.log("bloqueado");
			}
		}
	});
	$('#cycle-binary input[type="text"]').focusout(function(){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#binary_pc").attr("id")){
			if (!correcto()){
				fails++;
				guardar();
				alert("El PC no tiene el valor de la siguiente instruccion");
			}
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#binary_ac").attr("id")){
				if(!correcto()){
					fails++;
					guardar();
					alert("El contenido de AC no es el correcto");
				}
			}
		}
	});
	$('#cycle-binary input[type="text"]').on("dblclick", function(event) {
	    if (event.target === this) {
	        if (origen == "" && $(this).val() != ""){
	            origen = $(this).attr("name");
	            var array_origen = origen.split("-");
				if(array_origen.length > 1){
					origen = "ram";
				}
		 		contenido = $(this).val();
	        }
	        else{
	        	if(contenido != ""){
					destino = $(this).attr("name");
					var array_destino = destino.split("-");
					if(array_destino.length > 1){
						destino = "ram";
						regRam = $(this).attr("id");
						obtenerDirDeRamSeleccionada();
					}
					if(origen != destino && correcto()){
						$(this).val(contenido);
						guardar();
					}
				}
				else{
					fails++;
					guardar();
					alert("El registro origen no puede ser vacio");
				}
	        	eliminarDatos();
	        }
	    }
	});

	function obtenerDirDeRamSeleccionada(){
		var splited = regRam.split("-");
		dirRam = $("#dir-"+splited[1]).val();
		regRam = "cont-"+splited[1];
		$("#direccion").val(dirRam);
		$("#registro").val(regRam);
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
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#binary_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log(origen + " -> " + destino + "[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#binary_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log(origen + "[" + dirRam + "]" + " -> " + destino);
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 6:
	            if ("mbr" == origen && "ir" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 7:
	            if (incrementoPC()){
	                resp = true;
	                push_to_log("pc + 1 -> pc");
	                paso = 1;
	                obtenerCO();
	                imprimirCO();
	                ejec = true;
	                intents += 7;
	                guardar();
	                alert("Ciclo de captación TERMINADO");
	            }
	            break;
	    }
	    return resp;
	}

	function obtenerCO(){
	    co = "";
	    for (var i = 0; i < tamCO; i++){
	        co = co + $("#binary_ir").val().charAt(i);
	    }
	    for (var i = 0; i < 4; i++){
	        if (co == cods[i])
	            instruccion = i;
	    }
	}

	function imprimirCO(){
		switch (instruccion){
	        case 0:
	            push_to_log("Ejecucion LOAD:");
	            break;
	        case 1:
	            push_to_log("Ejecucion ADD:");
	            break;
	        case 2:
	            push_to_log("Ejecucion SUB:");
	            break;
	        case 3:
	            push_to_log("Ejecucion STORE:");
	            break;
	    }
	}

	function incrementoPC(){
	   if (sumarBinario(pc, DecimalABinario(1, tam), tam) == $("#binary_pc").val()){
	       pc = $("#binary_pc").val();
	       return true;
	   }
	   return false;
	}

	function sumarBinario(num1, num2, tam){
		var res = BinarioADecimal(num1) + BinarioADecimal(num2);
	    return DecimalABinario(res, tam);
	}

	function restarBinario(num1, num2, tam){
		var res = BinarioADecimal(num1) - BinarioADecimal(num2);
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

	function copiarIR(){
	    var dir = "";
	    for (var i = 0; i < tamCO; i++){
	        dir = dir + "0";
	    }
	    for (var i = tamCO; i < tam; i++){
	        dir = dir + $("#binary_ir").val().charAt(i);
	    }
	    contenido = dir;
	}

	function SumaCorrecta(){
		if (sumarBinario(ac, $("#binary_dr").val(), tam) == $("#binary_ac").val())
	        return true;
	    return false;
	}

	function RestaCorrecta(){
		if (restarBinario(ac, $("#binary_dr").val(), tam) == $("#binary_ac").val())
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
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#binary_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log(origen + " -> " + destino + "[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#binary_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log(origen + "[" + dirRam + "]" + " -> " + destino);
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 6:
	            if ("mbr" == origen && "dr" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                ac = $("#binary_ac").val();
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 7:
	            if (instruccion == 1){
	                if (SumaCorrecta()){
	                    resp = true;
	                    push_to_log("ac + dr -> ac");
	                    paso = 1;
	                    instruccionesEjecutadas++;
	                    $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
	                    ejec = false;
	                    intents += 7;
	                    guardar();
	                    alert("Suma correcta");
	                    alert("ADD TERMINADO");
	                    comprobarFinal();
	                }
	            }
	            else{
	                if (instruccion == 2){
	                    if (RestaCorrecta()){
	                        resp = true;
	                        push_to_log("ac - dr -> ac");
	                        paso = 1;
	                        instruccionesEjecutadas++;
	                        $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
	                    	ejec = false;
	                    	intents += 7;
	                        guardar();
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
	        push_to_log("Captacion: ");
	    }
	    else{
	        push_to_log("Programa Finalizado");
	        alert("Programa Finalizado\n"+"Tuvo "+intents+" de "+(intents+fails)+" intentos correctos");
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
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#binary_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log(origen + " -> " + destino + "[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#binary_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log(origen + "[" + dirRam + "]" + " -> " + destino);
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 6:
	            if ("mbr" == origen && "ac" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso = 1;
	                ejec = false;
	                instruccionesEjecutadas++;
	                intents += 6;
	                $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
	                alert("LOAD TERMINADO");
	                comprobarFinal();
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
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
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if ("ac" == origen && "mbr" == destino){
	                    repetirStore = false;
	                    resp = true;
	                    push_to_log(origen + " -> " + destino);
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Secuencia incorrecta");
	                }
	            }
	            break;
	        case 2:
	            if ("ir" == origen && "mar" == destino && !repetirStore){
	                copiarIR();
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if ("ac" == origen && "mbr" == destino && repetirStore){
	                    resp = true;
	                    push_to_log(origen + " -> " + destino);
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Secuencia incorrecta");
	                }
	            }
	            break;
	        case 3:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                repetirStore = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if ("mbr" == origen && "busDatos" == destino){
	                    resp = true;
	                    repetirStore = false;
	                    push_to_log(origen + " -> " + destino);
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Secuencia incorrecta");
	                }
	            }
	            break;
	        case 4:
	            if ("mar" == origen && "busDirs" == destino && !repetirStore){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if ("mbr" == origen && "busDatos" == destino && repetirStore){
	                    resp = true;
	                    push_to_log(origen + " -> " + destino);
	                    paso++;
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Secuencia incorrecta");
	                }
	            }
	            break;
	        case 5:
	            if ("busDatos" == origen && "ram" == destino){
	                if ($("#binary_dir_bus").val() == dirRam){
	                    $("#"+regRam).val(contenido);
	                    resp = true;
	                    push_to_log(origen + " -> " + destino + "[" + dirRam + "]");
	                    paso = 1;
	                    ejec = false;
	                    instruccionesEjecutadas++;
	                    intents += 5;
	                    $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
						alert("STORE terminado");
						comprobarFinal();
	                }
	                else{
		                fails++;
						guardar();
	                    alert("Dirección de memoria incorrecta");
	                }
	            }
	            else{
	                fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
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

	function push_to_log(text){
		var log = $("#log").val();
		log = log + "\n" + text;
		$("#log").val(log);
	}

	function guardar(){
		$("#paso").val(paso);
		$("#instruccion").val(instruccion);
		$("#ejec").val(ejec);
		$("#store").val(repetirStore);
		$("#ejecutadas").val(instruccionesEjecutadas);
		$("#direccion").val(dirRam);
		$("#registro").val(regRam);
		$("#intents").val(intents);
		$("#fails").val(fails);
		var form = $("#binary_cycle_form");
		$.ajax({
			type: "post",
			url: form.attr("action"),
			data: form.serialize(),
			success: function(data){
				console.log(data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			},
			dataType: 'JSON'
		});
	}
});