class GeneralUseRegisters
	attr_accessor :ram, :used_registers, :registers

	def CanUseRegister(ind)
		if (self.ram.self.ram.command == "LOAD")
			self.ram.used_registers[ind - 1] = true
			return true
		else
			if(self.ram.used_registers[ind - 1])
				return true
			else
				self.ram.message = "El registro 'R" + ind + "' debe ser utilizado en LOAD antes de usarlo con otro comando"
				return false
			end
		end
	end

	def SetFormatMessage()
		case(self.ram.self.ram.command)
			when "LOAD"
				self.ram.message = "El comando LOAD debe tener el siguiente formato: 'LOAD R#,dir'"
			when "STORE"
				self.ram.message = "El comando STORE debe tener el siguiente formato: 'STORE dir,R#'"
			when "self.ram.jump"
				self.ram.message = "El comando self.ram.jump debe tener el siguiente formato: 'self.ram.jump dir,R#'"
			else
				self.ram.message = "Los comandos de ALU deben tener el siguiente formato: 'CO R#,R#'"
		end
	end

	def IsARegister(dir)
		for i in 1..6 
			if(dir == ("R"+i))
				if(CanUseRegister(i))
					return true
				else
					return false
				end
			end
		end
		SetFormatMessage()
		return false
	end

	def TwoRegistersContent(dir)
		dirs = dir.split(",")
		if(dirs.length == 2)
			for i in 0..1
				if(dirs[i] != "")
			        if(!IsARegister(dirs[i]))
			        	return false
			        end
		    	else
		    		self.ram.message = "Las instrucciones deben contener dos direcciones"
		    		return false
		    	end
			end
		else
			self.ram.message = "Las instrucciones deben contener dos direcciones separadas por una coma (,)"
        	return false
		end
		return true
	end

	def CorrectDirectionContent(dir)
		content = FindDirectionContent(dir)
	    if(content != false)
            if (self.ram.command == "STORE" && content == "")
            	return true
            else
            	if (content == "")
            		self.ram.message = "La dirección " + dir + " debe contener un dato"
            		return false
            	else
            		if(self.ram.command != "self.ram.jump")
		                content.each_char do |c|
		                    if (c.ord < 48 || c.ord > 57)
		                    	self.ram.message = "La dirección " + dir + " de RAM debe contener un dato"
		                        return false
		                    end
		                end
		            else
		            	self.ram.jump = dir
	            	end
	            	return true
            	end
            end
	    else
	    	return false
		end
	end

	def OneRegisterContent(dir)
		dirs = dir.split(",")
		if(dirs.length == 2)
		    for i in 0..1
	            if (dirs[i] != "")
	            	if (self.ram.command == "LOAD")
	            		if(i == 1)
		            		if(!CorrectDirectionContent(dirs[i]))
				                return false
				        	end
				        else
						    if(!IsARegister(dirs[i]))
						       	return false
				        	end
				        end
	            	else
	            		if(i == 0)
	            			if(!CorrectDirectionContent(dirs[i]))
				                return false
				        	end
				        else
				        	if(!IsARegister(dirs[i]))
						       	return false
				        	end
				        end
	            	end
	            else
	            	self.ram.message = "Las instrucciones deben contener dos direcciones"
					return false
	            end
		    end
		else
			self.ram.message = "Las instrucciones deben contener dos direcciones"
			return false
		end
		return true
	end

	def JumpContent(dir)
		dirs = dir.split(",")
		if(dirs.length == 1)
			self.ram.jump = dir
			content = FindDirectionContent(dir)
			if(content != false)
			    if (content == "")
	        		self.ram.message = "La dirección " + dir + " debe contener una instrucción"
	        		return false
	        	else
	        		return true
	        	end
	        else
	        	return false
        	end
        else
        	self.ram.message = "Las instrucciones self.ram.jump deben contener solo una dirección"
        	return false
        end
	end

	def VerifyCommandContent(dirs)
		if(dirs == "")
			self.ram.message = "Las instrucciones deben contener dos direcciones"
	        return false
		end
		if (self.registers == 1) 
			return OneRegisterContent(dirs)
		else 
			if (self.registers == 2)
				return TwoRegistersContent(dirs)
			else
				return self.ram.jumpContent(dirs)
			end
		end
	end

	def IsAsCommand(cod)
		case(cod)
			when "LOAD"
				self.ram.storeUsed = false
				self.registers = 1
			when "STORE"
				self.ram.storeUsed = true
				self.registers = 1
			when "ADD"
				self.ram.storeUsed = false
				self.registers = 2
			when "SUB"
				self.ram.storeUsed = false
				self.registers = 2
			when "MPY"
				self.ram.storeUsed = false
				self.registers = 2
			when "DIV"
				self.ram.storeUsed = false
				self.registers = 2
			when "self.ram.jump"
				self.ram.storeUsed = false
				self.registers = 0
			else
				self.ram.message = "No se utilizó un CO válido"
				self.ram.CorrectCommand = false
				return false
		end
		self.ram.command = cod
		self.ram.CorrectCommand = true
        return true
	end
end