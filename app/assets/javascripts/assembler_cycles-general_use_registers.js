$(document).ready(function(){
	var co = $("#instruccion").val(), origen="", destino="", contenido="", pc = $("#assembler_pc").val();
	var dirRam = $("#direccion").val(), regRam = $("#registro").val();
    var paso = parseInt($("#paso").val()), cantInstrucciones = parseInt($("#cant_instrucciones").text());
    var instruccionesEjecutadas = parseInt($("#instrucciones_ejecutadas").text());
    var ejec = ($("#ejec").val() === "true"), repetirStore = ($("#store").val() === "true");
    var registros = [$("#R1").val(), $("#R1").val(), $("#R1").val(), $("#R1").val(), $("#R1").val(), $("#R1").val()];
    $('#assembler-cycle-general input[type="text"]').each(function () {
		$(this).regexMask(/^[0-9A-Za-z ,]+$/);
		$(this).keyup(function(){
	    	this.value = this.value.toUpperCase();
		});
	});
	$('#assembler-cycle-general input[type="text"]').keypress(function(e){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#assembler_pc").attr("id")){
			console.log("cambiando PC");
		}
		else{
			if (ejec && InstruccionEsDeALU() && paso == 1 && $(this).attr("id") === $("#"+obtenerDir(0)).attr("id")){
				console.log("cambiando ALU");
			}
			else{
				e.preventDefault();
				alert("Secuencia incorrecta");
        		console.log("bloqueado");
			}
		}
	});
	$('#assembler-cycle-general input[type="text"]').focusout(function(){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#assembler_pc").attr("id")){
			if (!correcto())
				alert("El PC no tiene el valor de la siguiente instruccion");
		}
		else{
			if (ejec && InstruccionEsDeALU() && paso == 1 && $(this).attr("id") === $("#"+obtenerDir(0)).attr("id")){
				if(!correcto())
					alert("El contenido de AC no es el correcto");
			}
		}
	});
	$('#assembler-cycle-general input[type="text"]').on("dblclick", function(event) {
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
					if(origen != destino && correcto()){
						$(this).val(contenido);
						guardar();
					}
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                console.log(co);
	                ejec = true;
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

	function obtenerDir(ind){
	    var ir_content = $("#assembler_ir").val().split(" ");
	    var dirs = ir_content[1].split(",");
	    return dirs[ind];
	}

	function BuscarRegistro(dir){
		for (var i = 1; i < 7; i++) {
			if(dir == ("R" + i)){
				return i;
			}
		}
		return false;
	}

	function ALU(){
	    var resp = false;
	   	var reg1 = BuscarRegistro(obtenerDir(0));
	    var reg2 = BuscarRegistro(obtenerDir(1));
	   	return OperacionALU(reg1,reg2);
	}

	function get_register(ind){
		if(registros[ind]!="")
			return parseInt(registros[ind]);
		else
			return 0;
	}

	function OperacionALU(reg1,reg2){
		var resp = false;
		switch(co){
			case "ADD":
				if ((get_register[reg1 - 1] + (get_register[reg2 - 1])).toString() == $("#R" + reg1).val()){
					resp = true;
					console.log("ac + dr -> ac");
				}
				break;
			case "SUB":
				if ((get_register[reg1 - 1] - (get_register[reg2 - 1])).toString() == $("#R" + reg1).val()){
					resp = true;
					console.log("ac - dr -> ac");
				}
				break;
			case "MPY":
				if ((get_register[reg1 - 1] * (get_register[reg2 - 1])).toString() == $("#R" + reg1).val()){
					resp = true;
					console.log("ac * dr -> ac");
				}
				break;
			case "DIV":
				if ((~~(get_register[reg1 - 1] / (get_register[reg2 - 1]))).toString() == $("#R" + reg1).val()){
					resp = true;
					console.log("ac / dr -> ac");
				}
				break;
		}
		if (resp){
			paso = 1;
			registros[reg1 - 1] = $("#R" + reg1).val();
            instruccionesEjecutadas++;
            $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
        	ejec = false;
        	guardar();
            alert(co + " TERMINADO");
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
	                contenido = obtenerDir(1);
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
	            if ("mbr" == origen && obtenerDir(0) == destino){
	                resp = true;
	                registros[BuscarRegistro(obtenerDir(0)) - 1] = contenido;
	                console.log(origen + " -> " + destino);
	                paso = 1;
	                ejec = false;
	                instruccionesEjecutadas++;
	                $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
	                alert("LOAD TERMINADO");
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        default:
	            return false;
	    }
	    return resp;
	}

	function Jump(){
	    if ("ir" == origen && "pc" == destino){
            var ir_content = $("#assembler_ir").val().split(" ");
	    	contenido = ir_content[1];
	    	pc = contenido;
            console.log(origen + " -> " + destino);
            ejec = false;
            instruccionesEjecutadas++;
            $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
            alert("JUMP TERMINADO");
            return true;
        }
        else{
            alert("Secuencia incorrecta");
            return false;
        }
	}

	function Store(){
	    var resp = false;
	    switch (paso){
	        case 1:
	            if ("ir" == origen && "mar" == destino){
	                contenido = obtenerDir(0);
	                repetirStore = true;
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if (obtenerDir(1) == origen && "mbr" == destino){
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
	                obtenerDir(0);
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	            }
	            else{
	                if (obtenerDir(1) == origen && "mbr" == destino && repetirStore){
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
	                if ($("#assembler_dir_bus").val() == dirRam){
	                    $("#"+regRam).val(contenido);
	                    resp = true;
	                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
	                    paso = 1;
	                    ejec = false;
	                    instruccionesEjecutadas++;
	                    $("#instrucciones_ejecutadas").text(instruccionesEjecutadas);
	                    alert("STORE TERMINADO");
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
		$("#instruccion").val(instruccion);
		$("#ejec").val(ejec);
		$("#store").val(repetirStore);
		$("#ejecutadas").val(instruccionesEjecutadas);
		$("#direccion").val(dirRam);
		$("#registro").val(regRam);
		$("#intents").val(intents);
		$("#fails").val(fails);
		var form = $("#assembler_cycle_form");
		$.ajax({
			type: "GET",
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