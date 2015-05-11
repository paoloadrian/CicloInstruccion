$(document).ready(function(){
	var InstructionsQuantity=0, message, start, end, pc, command, CorrectCommand, CorrectContent, storeUsed, jump, content_cell_ind;
	var directions = parseInt($("#directions").text());
	$("#assembler-cells input[type='text']").regexMask(/^[0-9A-Za-z ,]+$/);
	$("#assembler-cells input[type='text']").keyup(function(){
    	this.value = this.value.toUpperCase();
	});
	pc = $("#pc").text();
	$("#create_assembler_specific_ram").on('click', function(e){
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
		}
	});

	function correct(){
	    var content, dir;
	    command = "";
	    if(directions == 1)
	    	start = false;
	    else
	    	start = true;
	    end = false;
	    storeUsed = false;
        InstructionsQuantity = 0;
	    pc = $("#pc").text();
	    CorrectCommand = false;
	    for (var i = 0; i < 31 && !end; i++){
	        CorrectContent = false;
	        dir = $("#assembler_dir"+i.toString()).val();
	        content = $("#assembler_cont"+i.toString()).val();
	        if (dir != ""){
                if (!start){
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
	                                	message = "La dirección " + dir + " de RAM debe contener una instrucción válida";
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
	                        	message = "La dirección " + dir + " de RAM debe contener una instrucción válida";
	                            return false;
	                        }
                        }
                    }
                }
	        }
	        else{
	            if (InstructionsQuantity > 0){
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

	function TwoDirectionsContent(dir){
		var dirs = dir.split(",");
		if(command != "JUMP"){
			if(dirs.length == 2){
				var content;
				for (var i = 0; i < 2; i++){
					if(dirs[i] != ""){
				        content = FindDirectionContent(dirs[i]);
				        if(content !== false){
				        	if (content == "" && !(command == "MOVE" && i == 0)){
			            		message = "La dirección " + dirs[i] + " debe contener un dato";
			            		return false;
			            	}
			            	else{
				                for (var j = 0; j < content.length; j++){
				                    if (content.charCodeAt(j) < 48 || content.charCodeAt(j) > 57){
				                    	message = "La dirección " + dirs[i] + " de RAM debe contener un dato";
				                        return false;
				                    }
				                }
			            	}
				        }
				        else
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
		}
		else{
			if(dirs.length == 1){
				jump = dir;
				var content = FindDirectionContent(dir);
				if(content !== false){
				    if (content == ""){
		        		message = "La dirección " + dir + " debe contener un comando";
		        		return false;
		        	}
		        }
		        else
		        	return false;
	        }
	        else{
	        	message = "Las instrucciones JUMP deben contener solo una dirección";
	        	return false;
	        }
		}
	    return true;
	}

	function OneDirectionContent(dir){
		var dirs = dir.split(",");
		if(dirs.length == 1){
		    content = FindDirectionContent(dir);
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
		else{
			message = "Las instrucciones deben contener solo una dirección";
			return false;
		}
	}

	function VerifyCommandContent(dir){
		if(dir==""){
			message = "Los registros con un código de operación deben tener al menos una dirección";
	        return false;
		}
		if (directions == 1) {
			return OneDirectionContent(dir);
		}
		else {
			return TwoDirectionsContent(dir);
		}
	}

	function IsACommand(cod){
		if(directions == 1){
			switch(cod){
				case "LOAD":
					storeUsed = false;
					break;
				case "STORE":
					storeUsed = true;
					break;
				case "ADD":
					storeUsed = false;
					break;
				case "SUB":
					storeUsed = false;
					break;
				case "MPY":
					storeUsed = false;
					break;
				case "DIV":
					storeUsed = false;
					break;
				case "JUMP":
					storeUsed = false;
					break;
				default:
					message = "No se utilizó un CO válido";
					CorrectCommand = false;
        			return false;
			}
		}
		else {
			switch(cod){
				case "ADD":
					storeUsed = true;
					break;
				case "SUB":
					storeUsed = true;
					break;
				case "MPY":
					storeUsed = true;
					break;
				case "DIV":
					storeUsed = true;
					break;
				case "JUMP":
					storeUsed = false;
					break;
				case "MOVE":
					storeUsed = true;
					break;
				default:
					message = "No se utilizó un CO válido";
					CorrectCommand = false;
        			return false;
			}
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
	    if (dir == pc){
	    	VerifyCommand(content);
	    	return true;
	    }
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
	    	message = "La dirección " + dir + " de RAM debe contener una instrucción válida";
	        return false;
	    }
	}

	function IncorrectRegister(content){
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