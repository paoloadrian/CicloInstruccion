$(document).ready(function(){
	var co = $("#instruccion").val(), origen="", destino="", contenido="", pc = $("#assembler_pc").val();
	var dirRam = $("#direccion").val(), regRam = $("#registro").val(), ac = $("#assembler_ac").val();
    var paso = parseInt($("#paso").val()), cantInstrucciones = parseInt($("#cant_instrucciones").text());
    var instruccionesEjecutadas = parseInt($("#instrucciones_ejecutadas").text());
    var fails = parseInt($("#fails").val()), intents = parseInt($("#intents").val());
    var ejec = ($("#ejec").val() === "true"), repetirStore = ($("#store").val() === "true");
    $('#assembler_cycle_form input[type="text"]').each(function () {
		$(this).regexMask(/^[0-9A-Za-z ,]+$/);
		$(this).keyup(function(){
	    	this.value = this.value.toUpperCase();
		});
	});
	$("#assembler_dr").regexMask(/^[0-9]+$/);
	$("#assembler_ac").regexMask(/^[0-9]+$/);
	
	$('#assembler_cycle_form input[type="text"]').keypress(function(e){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#assembler_pc").attr("id")){
			console.log("cambiando PC");
		}
		else{
			if (ejec && InstruccionEsDeALU() && paso == 13 && $(this).attr("id") === $("#assembler_ac").attr("id")){
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
	$('#assembler_cycle_form input[type="text"]').focusout(function(){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#assembler_pc").attr("id")){
			if (!correcto()){
				$("#assembler_pc").val(pc);
				fails++;
				guardar();
				alert("El PC no tiene el valor de la siguiente instruccion");
			}
		}
		else{
			if (ejec && InstruccionEsDeALU() && paso == 13 && $(this).attr("id") === $("#assembler_ac").attr("id")){
				if(!correcto()){
					$("#assembler_ac").val(ac);
					fails++;
					guardar();
					alert("El contenido de AC no es el correcto");
				}
			}
		}
	});
	$('#assembler_cycle_form input[type="text"]').on("dblclick", function(event) {
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

	function InstruccionEsDeALU(){
		switch(co){
			case "ADD":
				return true;
			case "SUB":
				return true;
			case "MPY":
				return true;
			case "DIV":
				return true;
			default:
				return false;
		}
	}

	function obtenerDirDeRamSeleccionada(){
		var splited = regRam.split("-");
		dirRam = $("#assembler_dir-"+splited[1]).val();
		regRam = "assembler_cont-"+splited[1];
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                push_to_log("Ejecucion "+co+":");
	                ejec = true;
	                intents+=7;
	                guardar();
	                alert("Ciclo de captación TERMINADO");
	            }
	            break;
	    }
	    return resp;
	}

	function obtenerCO(){
	    ir_content = $("#assembler_ir").val().split(" ");
	    co = ir_content[0];
	}

	function incrementoPC(){
	   if ((parseInt(pc) + 1).toString() == $("#assembler_pc").val()){
	       pc = $("#assembler_pc").val();
	       return true;
	   }
	   return false;
	}

	function copiarDir(ind){
	    var ir_content = $("#assembler_ir").val().split(" ");
	    var dirs = ir_content[1].split(",");
	    contenido = dirs[ind];
	}

	function ALU(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                copiarDir(0);
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                paso++;
	            }
	            else{
					fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 7:
	            if ("ir" == origen && "mar" == destino){
	                copiarDir(1);
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
	        case 8:
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
	        case 9:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	        case 10:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	        case 11:
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
	        case 12:
	            if ("mbr" == origen && "dr" == destino){
	                resp = true;
	                push_to_log(origen + " -> " + destino);
	                paso++;
	                ac = $("#assembler_ac").val();
	            }
	            else{
					fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        case 13:
	            resp = OperacionALU();
	            break;
	        default:
	        	resp = Store();
	        	break;
	    }
	    return resp;
	}

	function OperacionALU(){
		var resp = false;
		switch(co){
			case "ADD":
				if ((parseInt(ac) + parseInt($("#assembler_dr").val())).toString() == $("#assembler_ac").val()){
					resp = true;
					push_to_log("ac + dr -> ac");
					alert("Suma correcta");
				}
				break;
			case "SUB":
				if ((parseInt(ac) - parseInt($("#assembler_dr").val())).toString() == $("#assembler_ac").val()){
					resp = true;
					push_to_log("ac - dr -> ac");
					alert("Resta correcta");
				}
				break;
			case "MPY":
				if ((parseInt(ac) * parseInt($("#assembler_dr").val())).toString() == $("#assembler_ac").val()){
					resp = true;
					push_to_log("ac * dr -> ac");
					alert("Multiplicación correcta");
				}
				break;
			case "DIV":
				if ((~~(parseInt(ac) / parseInt($("#assembler_dr").val()))).toString() == $("#assembler_ac").val()){
					resp = true;
					push_to_log("ac / dr -> ac");
					alert("División correcta");
				}
				break;
		}
		if (resp){
			ac = $("#assembler_ac").val();
			paso++;
			intents+=13;
			instruccionesEjecutadas++;
            $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
			guardar();
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

	function Move(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                copiarDir(1);
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                paso++;
	                intents+=6;
	            }
	            else{
					fails++;
					guardar();
	                alert("Secuencia incorrecta");
	            }
	            break;
	        default:
	            resp = Store();
	            break;
	    }
	    return resp;
	}

	function Jump(){
	    if ("ir" == origen && "pc" == destino){
            var ir_content = $("#assembler_ir").val().split(" ");
	    	contenido = ir_content[1];
	    	pc = contenido;
            push_to_log(origen + " -> " + destino);
            ejec = false;
            intents++;
            instruccionesEjecutadas++;
            $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
            alert("JUMP TERMINADO");
            return true;
        }
        else{
			fails++;
			guardar();
            alert("Secuencia incorrecta");
            return false;
        }
	}

	function Store(){
	    var resp = false;
	    var store_step;
	    if(co == "MOVE")
	    	store_step = paso - 6;
	    else
	    	store_step = paso - 13;
	    switch (store_step){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                copiarDir(0);
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
	                copiarDir(0);
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
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    $("#"+regRam).val(contenido);
	                    resp = true;
	                    push_to_log(origen + " -> " + destino + "[" + dirRam + "]");
	                    paso = 1;
	                    ejec = false;
	                    instruccionesEjecutadas++;
	                    intents+=5;
	                    $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
	                    alert(co+" TERMINADO");
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
	    switch (co){
	        case "MOVE":
				return Move();
			case "JUMP":
				return Jump();
			default:
				return ALU();
		}
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
		$("#instruccion").val(co);
		$("#ejec").val(ejec);
		$("#store").val(repetirStore);
		$("#ejecutadas").val(instruccionesEjecutadas);
		$("#direccion").val(dirRam);
		$("#registro").val(regRam);
		$("#intents").val(intents);
		$("#fails").val(fails);
		var form = $("#assembler_cycle_form");
		$.ajax({
			type: "post",
			url: form.attr("action"),
			data: form.serialize(),
			success: function(data){
				console.log("envio correcto");
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