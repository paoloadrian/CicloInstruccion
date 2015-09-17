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
	$("#assembler_ac").regexMask(/^[0-9]+$/);
	$("#assembler_dr").regexMask(/^[0-9]+$/);
	
	$('#assembler_cycle_form input[type="text"]').keypress(function(e){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#assembler_pc").attr("id")){
			console.log("cambiando PC");
		}
		else{
			if (ejec && InstruccionEsDeALU() && paso == 7 && $(this).attr("id") === $("#assembler_ac").attr("id")){
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
			if (ejec && InstruccionEsDeALU() && paso == 7 && $(this).attr("id") === $("#assembler_ac").attr("id")){
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
						intents++;
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

	function PasoIncorrecto(ori, dest){
		fails++;
		guardar();
		if (ori !== origen)
			alert("El registro origen debe ser '"+ ori.toUpperCase() +"'");
		else
			alert("El registro destino debe ser '"+ dest.toUpperCase() +"'");
	}

	function PasoCorrecto(){
		push_to_log(origen.toUpperCase() + " -> " + destino.toUpperCase());
	    paso++;
	}

	function captacion(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("pc" == origen && "mar" == destino){
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("pc", "mar");
	            }
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("mar", "busDirs");
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log("busDirs -> RAM[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else{
						fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else
	            	PasoIncorrecto("busDirs", "ram");
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log("RAM[" + dirRam + "] -> busDatos");
	                    paso++;
	                }
	                else{
						fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else
	            	PasoIncorrecto("ram", "busDatos");
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("busDatos", "mbr");
	            break;
	        case 6:
	            if ("mbr" == origen && "ir" == destino){
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("mbr", "ir");
	            break;
	        case 7:
	            if (incrementoPC()){
	                resp = true;
	                push_to_log("PC + 1 -> PC");
	                paso = 1;
	                obtenerCO();
	                push_to_log("Ejecucion "+co+":");
	                ejec = true;
	                intents++;
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

	function copiarIR(){
	    var ir_content = $("#assembler_ir").val().split(" ");
	    contenido = ir_content[1];
	}

	function ALU(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                copiarIR();
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("ir", "mar");
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("mar", "busDirs");
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log("busDirs -> RAM[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else
	                    alert("Dirección de Memoria incorrecta");
	            }
	            else
	            	PasoIncorrecto("busDirs", "ram");
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log("RAM[" + dirRam + "] -> busDatos");
	                    paso++;
	                }
	                else{
						fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else
	            	PasoIncorrecto("ram", "busDatos");
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("busDatos", "mbr");
	            break;
	        case 6:
	            if ("mbr" == origen && "dr" == destino){
	                resp = true;
	                ac = $("#assembler_ac").val();
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("mbr", "dr");
	            break;
	        case 7:
	            resp = OperacionALU();
	            break;
	        default:
	            return false;
	    }
	    return resp;
	}

	function OperacionALU(){
		var resp = false;
		switch(co){
			case "ADD":
				if ((parseInt(ac) + parseInt($("#assembler_dr").val())).toString() == $("#assembler_ac").val()){
					resp = true;
					push_to_log("AC + DR -> AC");
				}
				break;
			case "SUB":
				if ((parseInt(ac) - parseInt($("#assembler_dr").val())).toString() == $("#assembler_ac").val()){
					resp = true;
					push_to_log("AC - DR -> AC");
				}
				break;
			case "MPY":
				if ((parseInt(ac) * parseInt($("#assembler_dr").val())).toString() == $("#assembler_ac").val()){
					resp = true;
					push_to_log("AC * DR -> AC");
				}
				break;
			case "DIV":
				if ((~~(parseInt(ac) / parseInt($("#assembler_dr").val()))).toString() == $("#assembler_ac").val()){
					resp = true;
					push_to_log("AC / DR -> AC");
				}
				break;
		}
		if (resp){
			paso = 1;
            instruccionesEjecutadas++;
            $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
        	ejec = false;
        	intents++;
        	guardar();
            alert(co + " TERMINADO");
            comprobarFinal();
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
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("ir", "mar");
	            break;
	        case 2:
	            if ("mar" == origen && "busDirs" == destino){
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("mar", "busDirs");
	            break;
	        case 3:
	            if ("busDirs" == origen && "ram" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log("busDirs -> RAM[" + dirRam + "]");
	                    contenido = $("#"+regRam).val();
	                    paso++;
	                }
	                else{
						fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else
	            	PasoIncorrecto("busDirs", "ram");
	            break;
	        case 4:
	            if ("ram" == origen && "busDatos" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    resp = true;
	                    push_to_log("RAM[" + dirRam + "] -> busDatos");
	                    paso++;
	                }
	                else{
						fails++;
						guardar();
	                    alert("Dirección de Memoria incorrecta");
	                }
	            }
	            else
	            	PasoIncorrecto("ram", "busDatos");
	            break;
	        case 5:
	            if ("busDatos" == origen && "mbr" == destino){
	                resp = true;
	                PasoCorrecto();
	            }
	            else
	            	PasoIncorrecto("busDatos", "mbr");
	            break;
	        case 6:
	            if ("mbr" == origen && "ac" == destino){
	                resp = true;
	                push_to_log(origen.toUpperCase() + " -> " + destino.toUpperCase());
	                paso = 1;
	                ejec = false;
	                instruccionesEjecutadas++;
	                intents++;
	                $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
	                alert("LOAD TERMINADO");
	                comprobarFinal();
	            }
	            else
	            	PasoIncorrecto("mbr", "ac");
	            break;
	        default:
	            return false;
	    }
	    return resp;
	}

	function Jump(){
	    if ("ir" == origen && "pc" == destino){
            copiarIR();
            pc = contenido;
            push_to_log(origen + " -> " + destino);
            ejec = false;
            instruccionesEjecutadas++;
            intents++;
            $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
            alert("JUMP TERMINADO");
            return true;
        }
        else{
        	PasoIncorrecto("ir", "pc");
            return false;
        }
	}

	function PasoDobleIncorrecto(ori1, dest1, or2, dest2){
		fails++;
		guardar();
		if (ori1 !== origen){
			if (ori2 !== origen)
				alert("El registro origen debe ser '"+ ori1.toUpperCase() +"' o "+ ori2.toUpperCase() +"'");
			else
				alert("El registro destino debe ser '"+ dest2.toUpperCase() +"'");
		}
		else
			alert("El registro destino debe ser '"+ dest1.toUpperCase() +"'");
	}

	function Store(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                copiarIR();
	                repetirStore = true;
	                resp = true;
	                PasoCorrecto();
	            }
	            else{
	                if ("ac" == origen && "mbr" == destino){
	                    repetirStore = false;
	                    resp = true;
	                	PasoCorrecto();
	                }
	                else
	                	PasoDobleIncorrecto("ir", "mar", "ac", "mbr");
	            }
	            break;
	        case 2:
		        if (!repetirStore){
		            if ("ir" == origen && "mar" == destino){
		                copiarIR();
		                resp = true;
		                PasoCorrecto();
		            }
		            else
		            	PasoIncorrecto("ir", "mar");
		        }
	            else{
	                if ("ac" == origen && "mbr" == destino && repetirStore){
	                    resp = true;
		                PasoCorrecto();
		            }
		            else
		            	PasoIncorrecto("ac", "mbr");
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
	                	PasoCorrecto();
	                }
	                else
	                	PasoDobleIncorrecto("mar", "busDirs", "mbr", "busDatos");
	            }
	            break;
	        case 4:
		        if (!repetirStore){
		            if ("mar" == origen && "busDirs" == destino){
		                resp = true;
		                PasoCorrecto();
		            }
		            else
		            	PasoIncorrecto("mar", "busDirs");
		        }
	            else{
	                if ("mbr" == origen && "busDatos" == destino){
	                    resp = true;
		                PasoCorrecto();
		            }
		            else
		            	PasoIncorrecto("mbr", "busDatos");
	            }
	            break;
	        case 5:
	            if ("busDatos" == origen && "ram" == destino){
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    $("#"+regRam).val(contenido);
	                    resp = true;
	                    push_to_log("busDatos -> RAM[" + dirRam + "]");
	                    paso = 1;
	                    ejec = false;
	                    instruccionesEjecutadas++;
	                    intents++;
	                    $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
	                    alert("STORE TERMINADO");
	                    comprobarFinal();
	                }
	                else{
						fails++;
						guardar();
	                    alert("Dirección de memoria incorrecta");
	                }
	            }
	            else
	            	PasoIncorrecto("busDatos", "ram");
	            break;
	        default:
	            return false;
	    }
	    return resp;
	}

	function ejecucion(){
	    switch (co){
	        case "LOAD":
				return Load();
			case "STORE":
				return Store();
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