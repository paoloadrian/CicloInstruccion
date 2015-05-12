$(document).ready(function(){
	var co, origen="", destino="", contenido="", pc = $("#pc").text(), ac, dirRam, regRam;
    var paso = 1, cantInstrucciones = parseInt($("#cant_instrucciones").text()), instruccionesEjecutadas = 0;
    var ejec = false, repetirStore = false, NuevaInstruccion = false;
    $('#assembler-cycle input[type="text"]').each(function () {
		$(this).regexMask(/^[0-9A-Za-z ,]+$/);
		$(this).keyup(function(){
	    	this.value = this.value.toUpperCase();
		});
	});
	$('#assembler-cycle input[type="text"]').keypress(function(e){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#assembler_pc").attr("id")){
			console.log("cambiando PC");
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#assembler_ac").attr("id")){
				console.log("cambiando ALU");
			}
			else{
				e.preventDefault();
				alert("Secuencia incorrecta");
        		console.log("bloqueado");
			}
		}
	});
	$('#assembler-cycle input[type="text"]').change(function(){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#assembler_pc").attr("id")){
			correcto();
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#assembler_ac").attr("id")){
				correcto();
			}
			else{
				alert("Secuencia incorrecta");
        		console.log("bloqueado");
			}
		}
	});
	$('#assembler-cycle input[type="text"]').focusout(function(){
		if(!ejec && paso == 7 && $(this).attr("id") === $("#assembler_pc").attr("id")){
			if (!correcto())
				alert("El PC no tiene el valor de la siguiente instruccion");
		}
		else{
			if (ejec && paso == 7 && $(this).attr("id") === $("#assembler_ac").attr("id")){
				if(!correcto())
					alert("El contenido de AC no es el correcto");
			}
		}
	});
	$('#assembler-cycle input[type="text"]').on("dblclick", function(event) {
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
	                alert("Ciclo de captación TERMINADO");
	            }
	            break;
	    }
	    return resp;
	}

	function obtenerCO(){
	    ir_content = $("#assembler_ir").val().split("");
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
	            if ("mbr" == origen && "dr" == destino){
	                resp = true;
	                console.log(origen + " -> " + destino);
	                paso++;
	                ac = $("#assembler_ac").val();
	            }
	            else
	                alert("Secuencia incorrecta");
	            break;
	        case 7:
	            OperacionALU();
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
					console.log("ac + dr -> ac");
				}
				break;
			case "SUB":
				if ((parseInt(ac) - parseInt($("#assembler_dr").val())).toString() == $("#assembler_ac").val()){
					resp = true;
					console.log("ac - dr -> ac");
				}
				break;
			case "MPY":
				if ((parseInt(ac) * parseInt($("#assembler_dr").val())).toString() == $("#assembler_ac").val()){
					resp = true;
					console.log("ac * dr -> ac");
				}
				break;
			case "DIV":
				if ((~~(parseInt(ac) / parseInt($("#assembler_dr").val()))).toString() == $("#assembler_ac").val()){
					resp = true;
					console.log("ac / dr -> ac");
				}
				break;
		}
		if (resp){
			paso = 1;
            instruccionesEjecutadas++;
        	ejec = false;
            alert(co + " TERMINADO");
            comprobarFinal();
		}
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

	function Jump(){
	    if ("ir" == origen && "pc" == destino){
            copiarIR();
            console.log(origen + " -> " + destino);
            ejec = false;
            instruccionesEjecutadas++;
            alert("LOAD TERMINADO");
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
	                if ($("#assembler_dir_bus").val() == dirRam){
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
});