$(document).ready(function(){
	var InstructionsQuantity=0, message, start, end, pc, command, CorrectCommand, CorrectContent, storeUsed, jump, content_cell_ind;
	var registers;
	pc = $("#pc").text();
	$("#create_assembler_general_ram").on('click', function(e){
		if (!correct()){
            console.log(message);
			alert(message);
            e.preventDefault();
		}
		else {
			$("#cant_instrucciones").val(InstructionsQuantity);
			console.log("Cantidad de instrucciones: "+$("#cant_instrucciones").val());
			console.log("Formato correcto");
			alert("Formato correcto");
			e.preventDefault();
		}
	});

	function correct(){
	    var content, dir;
	    command = "";
	    InstructionsQuantity = 0;
		start = false;
	    end = false;
	    storeUsed = false;
	    pc = $("#pc").text();
	    CorrectCommand = false;
	    console.log("aca si");
	    for (var i = 0; i < 31 && !end; i++){
	        CorrectContent = false;
	        dir = $("#assembler_dir"+i.toString()).val();
	        content = $("#assembler_cont"+i.toString()).val();
	        console.log("aca si");
	        if (dir != ""){
                if (!start){
                	console.log("llega aca");
                	if (CompareWithPC(dir, content)){
                        if (!CorrectProgramStart(dir))
                            return false;
                        else{
                            if (!CorrectContent)
                                return false;
                        }
                    }
                }
                else{
                    if (!end){
                    	if (CompareWithPC(dir, content)){
                    		if(!end){
                    			if (CorrectCommand){
	                            	if (!CorrectContent)
	                                    return false;
	                                IncreasePC();
	                                if (command == "JUMP") {
	                                	i = content_cell_ind - 1;
	                                }
	                            }
	                            else{
	                            	if (IncorrectRegister(content)){
	                            		console.log("si entró");
	                                	message = "La dirección " + dir + " de RAM debe contener una instruccióm válida";
	                                    return false;
	                                }
	                                else{
	                                	end = true;
	                                }
	                            }
                        	}
                        }
                        else{
                        	if (CorrectCommand){
	                            if (storeUsed){
	                                end = true;
	                            }
	                            else{
	                            	message = "Debe usarse como último comando un CO que escriba en RAM";
	                                return false;
	                            }
	                        }
	                        else{
	                        	message = "La dirección " + dir + " de RAM debe contener una instruccióm válida";
	                            return false;
	                        }
                        }
                    }
                }
	        }
	        else{
	            if (start){
	                if (storeUsed)
	                	end = true;
	                else{
	                	message = "Debe usarse como último comando un CO que escriba en RAM";
	                	return false;
	            	}
	            }
	        }
	    }
	    if (InstructionsQuantity == 0){
	        message = "La RAM no contiene la dirección con el valor del PC";
	        return false;
	    }
	    return end;
	}

	function FindDirectionContent(dir){
		for (var j = 0; j < 31; j++){
			if ($("#assembler_dir"+j.toString()).val() == dir){
				content_cell_ind = j;
			    return $("#assembler_cont"+j.toString()).val();
			}
		}
		message = "No existe la dirección " + dir + " de RAM";
		return false;
	}

	function IsARegister(dir){
		for (var i = 1; i < 7; i++) {
			if(dir == ("R"+i))
				return true;
		}
		message = "Los comandos de ALU deben usar solamente registros del CPU";
		return false;
	}

	function TwoRegistersContent(dir){
		var dirs = dir.split(",");
		if(dirs.length == 2){
			for (var i = 0; i < 2; i++){
				if(dirs[i] != ""){
			        if(!IsARegister(dirs[i]))
			        	return false;
		    	}
		    	else{
		    		message = "Las instrucciones deben contener dos direcciones";
		    		return false;
		    	}
			}
		}
		else{
			message = "Las instrucciones deben contener dos direcciones separadas por una coma (,)";
        	return false;
		}
		return true;
	}

	function CorrectDirectionContent(dir){
		var content = FindDirectionContent(dir);
	    if(content !== false){
            if (command == "STORE" && content == "")
            	return true;
            else{
            	if (content == ""){
            		message = "La dirección " + dir + " debe contener un dato";
            		return false;
            	}
            	else{
            		if(command != "JUMP"){
		                for (var i = 0; i < content.length; i++){
		                    if (content.charCodeAt(i) < 48 || content.charCodeAt(i) > 57){
		                    	message = "La dirección " + dir + " de RAM debe contener un dato";
		                        return false;
		                    }
		                }
		            }
		            else
		            	jump = dir;
	            	return true;
            	}
            }
	    }
	    else
	    	return false;
	}

	function OneRegisterContent(dir){
		var dirs = dir.split(",");
		if(dirs.length == 2){
		    for(var i = 0; i < 2; i++){
	            if (dirs[i] != ""){
	            	if (command == "LOAD"){
	            		if(i == 1){
		            		if(!CorrectDirectionContent(dirs[i]))
				                return false;
				        }
				        else{
						    if(!IsARegister(dirs[i]))
						       	return false;
				        }
	            	}
	            	else{
	            		if(i == 0){
		            		if(!CorrectDirectionContent(dirs[i]))
				                return false;
				        }
				        else{
						    if(!IsARegister(dirs[i]))
						       	return false;
				        }
	            	}
	            }
	            else{
	            	message = "Las instrucciones deben contener dos direcciones";
					return false;
	            }
		    }
		}
		else{
			message = "Las instrucciones deben contener dos direcciones";
			return false;
		}
		return true;
	}

	function VerifyCommandContent(dir){
		if(dir==""){
			message = "Las instrucciones deben contener dos direcciones	";
	        return false;
		}
		if (registers == 1) {
			return OneRegisterContent(dir);
		}
		else {
			return TwoRegistersContent(dir);
		}
	}

	function IsACommand(cod){
		switch(cod){
			case "LOAD":
				storeUsed = false;
				registers = 1;
				break;
			case "STORE":
				storeUsed = true;
				registers = 1;
				break;
			case "ADD":
				storeUsed = false;
				registers = 2;
				break;
			case "SUB":
				storeUsed = false;
				registers = 2;
				break;
			case "MPY":
				storeUsed = false;
				registers = 2;
				break;
			case "DIV":
				storeUsed = false;
				registers = 2;
				break;
			case "JUMP":
				storeUsed = false;
				registers = 1;
				break;
			default:
				message = "No se utilizó un CO válido";
				CorrectCommand = false;
    			return false;
		}
		command = cod;
		CorrectCommand = true;
        return true;
	}

	function ContainsCommand(passed_content){
		var content = passed_content.split(" ");
		if(content.length != 2){
			message = "El formato de una instruccion debe ser el CO seguido de un espacio y la(s) direccion(es) separadas por comas";
			return false;
		}
		cod = content[0];
		if(!IsACommand(cod))
			return false;
		CorrectContent = VerifyCommandContent(content[1]);
	    return true;
	}

	function VerifyCommand(content){
	    if (content != ""){
	    	if(ContainsCommand(content))
	        	return true;
	        else
	        	return false;
	    }
	    else{
	    	if(storeUsed){
	    		end = true;
	    		return true;
	    	}
	    	else
	        	return false;
	    }
	}

	function CompareWithPC(dir, content){
	    if (dir == pc)
	    	return VerifyCommand(content);
	    return false;
	}

	function IncreasePC(){
		if(command != "JUMP")
			pc = (parseInt(pc) + 1).toString();
		else
			pc = jump;
		InstructionsQuantity++;
	}

	function CorrectProgramStart(dir){
	    start = true;
	    if (CorrectCommand){
	        if (command == "LOAD"){
	            IncreasePC();
	            return true;
	        }
	        else{
	            message = "El comando contenido en la dirección del PC debe ser LOAD";
	            return false;
	        }
	    }
	    else{
	    	console.log("comando incorrecto");
	        message = "la dirección " + dir + " de RAM debe contener un codigo de operacion";
	        return false;
	    }
	}

	function IncorrectRegister(content){
	    console.log("incorrecto?");
	    if (!storeUsed)
	        return true;
	    var splitted_content = content.split(" ");
	    if (splitted_content.length != 1)
	    	return true;
	    for (var i = 0; i < content.length; i++){
	        if (content.charCodeAt(i) < 48 || content.charCodeAt(i) > 57)
	            return true;
	    }
	    return false;
	}
});