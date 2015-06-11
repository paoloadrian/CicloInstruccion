class AssemblerRam < ActiveRecord::Base
  belongs_to :assembler_cpu
  has_many :assembler_ram_cells

  attr_accessor :message, :start, :fin, :pc, :command, :CorrectCommand, :CorrectContent, :storeUsed, :jump, :content_cell_ind
	
	def findCellByPosition(pos)
		self.assembler_ram_cells.each do |cell|
			if cell.position == pos
				return cell
			end
		end
		return nil
	end

	def correct()
	    self.command = ""
	    if(self.assembler_cpu.directions == 1)
	    	self.start = false
	    else
	    	self.start = true
	    end
	    self.fin = false
	    self.storeUsed = false
        self.instructions = 0
	    self.pc = self.assembler_cpu.pc
	    for i in 0..(self.assembler_ram_cells.size-1)
	        self.CorrectCommand = false
	    	self.CorrectContent = false
	    	dir = self.assembler_ram_cells[i].direction
	    	content = self.assembler_ram_cells[i].content
            if (!self.start)
                if (CompareWithPC(dir, content))
                    if (!CorrectProgramStart(dir))
                        return false
                    else
                        if (!self.CorrectContent)
                            return false
                        end
                    end
                end
            else
                if (!self.fin)
                	if (CompareWithPC(dir, content))
                		if(!self.fin)
                			if (self.CorrectCommand)
                            	if (!self.CorrectContent)
                                    return false
                                end
                                IncreasePC()
                                if (self.command == "JUMP") 
                                	i = self.content_cell_ind - 1
                                end
                            else
                            	if (IncorrectRegister(content))
                                	self.message = "La dirección " + dir + " de RAM debe contener una instrucción válida"
                                    return false
                                else
                                	self.fin = true
                                end
                            end
                    	end
                    else
                    	if (self.CorrectCommand)
                            if (self.storeUsed)
                                self.fin = true
                            else
                            	self.message = "Debe usarse como último comando un CO que escriba en RAM"
                                return false
                            end
                        else
                        	self.message = "La dirección " + dir + " de RAM debe contener una instrucción válida"
                            return false
                        end
                    end
                end
            end
	    end
	    if (self.instructions == 0)
	        self.message = "La RAM no contiene la dirección con el valor del PC"
	        return false
	    end
	    return self.fin
	end

	def FindDirectionContent(dir)
		for j in 0..(assembler_ram_cells.size-1)
			if (self.assembler_ram_cells[i].direction == dir)
				self.content_cell_ind = j
			    return self.assembler_ram_cells[i].content
			end
		end
		self.message = "No existe la dirección " + dir + " de RAM"
		return false
	end

	def ContainsCommand(passed_content)
		content = passed_content.split(" ")
		if(content.length != 2)
			self.message = "El formato de una instruccion debe ser el CO seguido de un espacio y la(s) direccion(es) separadas por comas"
			return false
		end
		cod = content[0]
		if(!IsACommand(cod))
			return false
		end
		self.CorrectContent = VerifyCommandContent(content[1])
	    return true
	end

	def VerifyCommand(content)
	    if (content != "")
	    	if(ContainsCommand(content))
	        	return true
	        else
	        	return false
	    	end
	    else
	    	if(self.storeUsed)
	    		self.fin = true
	    		return true
	    	else
	        	return false
	    	end
	    end
	end

	def CompareWithPC(dir, content)
	    if (dir == self.pc)
	    	VerifyCommand(content)
	    	return true
	    end
	    return false
	end

	def IncreasePC()
		if(command != "JUMP")
			self.pc = (self.pc.to_i + 1).to_s
		else
			self.pc = self.jump
		end
		self.instructions+=1
	end

	def CorrectProgramStart(dir)
	    self.start = true
	    if (self.CorrectCommand)
	        if (self.command == "LOAD")
	            IncreasePC()
	            return true
	        else
	            self.message = "El comando contenido en la dirección del PC debe ser LOAD"
	            return false
	        end
	    else
	    	self.message = "La dirección " + dir + " de RAM debe contener una instrucción válida"
	        return false
	    end
	end

	def IncorrectRegister(content)
	    if (!self.storeUsed)
	        return true
	    end
	    splitted_content = content.split(" ")
	    if (splitted_content.length != 1)
	    	return true
	   	end
	   	content.each_char do |c|
            if (c.ord < 48 || c.ord > 57)
            	return true
            end
        end
	    return false
	end
end
