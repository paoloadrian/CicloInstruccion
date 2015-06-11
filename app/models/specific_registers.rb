class SpecificRegisters
	def TwoDirectionsContent(dir)
		dirs = dir.split(',')
		if(self.command != "JUMP")
			if(dirs.length == 2)
				for i in 0..1
					if(dirs[i] != "")
				        content = FindDirectionContent(dirs[i])
				        if(content != false)
				        	if (content == "" && !(self.command == "MOVE" && i == 0))
			            		self.message = "La dirección " + dirs[i] + " debe contener un dato"
			            		return false
			            	else
				                content.each_char do |c|
				                    if (c.ord < 48 || c.ord > 57)
				                    	self.message = "La dirección " + dirs[i] + " de RAM debe contener un dato"
				                        return false
				                    end
				                end
			            	end
				        else
				        	return false
			    		end
			    	else
			    		self.message = "Las instrucciones deben contener dos direcciones"
			    		return false
			    	end
				end
			else
				self.message = "Las instrucciones deben contener dos direcciones separadas por una coma (,)"
	        	return false
			end
		else
			if(dirs.length == 1)
				self.jump = dir
				content = FindDirectionContent(dir)
				if(content != false)
				    if (content == "")
		        		self.message = "La dirección " + dir + " debe contener un comando"
		        		return false
		        	end
		        else
		        	return false
		        end
	        else
	        	self.message = "Las instrucciones JUMP deben contener solo una dirección"
	        	return false
	        end
		end
	    return true
	end

	def OneDirectionContent(dir)
		dirs = dir.split(',')
		if(dirs.length == 1)
		    content = FindDirectionContent(dir)
		    if(content !== false)
	            if (self.command == "STORE" && content == "")
	            	return true
	            else
	            	if (content == "")
	            		self.message = "La dirección " + dir + " debe contener un dato"
	            		return false
	            	else
	            		if(self.command != "JUMP")
			                content.each_char do |c|
			                    if (c.ord < 48 || c.ord > 57)
			                    	self.message = "La dirección " + dirs[i] + " de RAM debe contener un dato"
			                        return false
			                    end
			                end
			            else
			            	self.jump = dir
			            end
		            	return true
	            	end
	            end
		    else
		    	return false
			end
		else
			self.message = "Las instrucciones deben contener solo una dirección"
			return false
		end
	end

	def VerifyCommandContent(dir)
		if(dir=="")
			self.message = "Los registros con un código de operación deben tener al menos una dirección"
	        return false
		end
		if (self.assembler_cpu.directions == 1) 
			return OneDirectionContent(dir)
		else 
			return TwoDirectionsContent(dir)
		end
	end

	def IsACommand(cod)
		if(self.assembler_cpu.directions == 1)
			case(cod)
				when "LOAD"
					self.storeUsed = false
				when "STORE"
					self.storeUsed = true
				when "ADD"
					self.storeUsed = false
				when "SUB"
					self.storeUsed = false
				when "MPY"
					self.storeUsed = false
				when "DIV"
					self.storeUsed = false
				when "JUMP"
					self.storeUsed = false
				else
					self.message = "No se utilizó un CO válido"
					self.CorrectCommand = false
        			return false
			end
		else
			case(cod)
				when "ADD"
					self.storeUsed = true
				when "SUB"
					self.storeUsed = true
				when "MPY"
					self.storeUsed = true
				when "DIV"
					self.storeUsed = true
				when "JUMP"
					self.storeUsed = false
				when "MOVE"
					self.storeUsed = true
				else
					self.message = "No se utilizó un CO válido"
					self.CorrectCommand = false
        			return false
			end
		end
		self.command = cod
		self.CorrectCommand = true
        return true
	end
end