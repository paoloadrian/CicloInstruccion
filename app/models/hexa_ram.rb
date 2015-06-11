class HexaRam < ActiveRecord::Base
  belongs_to :hexa_cpu
  has_many :hexa_ram_cells
  attr_accessor :celdas, :mensaje, :inicio, :fin, :pc, :comando, :comandoCorrecto, :contenidoCorrecto, :storeUsado

	def findCellByPosition(pos)
		self.hexa_ram_cells.each do |cell|
			if cell.position == pos
				return cell
			end
		end
		return nil
	end

	def correcto
	    self.comando = ""
	    self.mensaje = ""
	    self.instructions = 0
	    self.inicio = false
	    self.fin = false
	    self.storeUsado = false
	    self.pc = self.hexa_cpu.pc
	    self.hexa_ram_cells.each do |cell|
	        self.comandoCorrecto = false
	        self.contenidoCorrecto = false
	        if (cell.direction != "")
	            if (cell.direction.length == self.pc.length && (cell.content == "" || cell.content.length == self.pc.length))
	                if (!self.inicio)
	                    if (CompararConPC(cell.direction, cell.content))
	                        if (!InicioDeProgramaCorrecto(cell.direction))
	                            return false
	                        else
	                            if (!self.contenidoCorrecto)
	                                return false
	                            end
	                        end
	                    end
	                else
	                    if (!self.fin)
	                    	if (CompararConPC(cell.direction, cell.content))
	                    		if(!self.fin)
		                            if (self.comandoCorrecto)
		                                if (!self.contenidoCorrecto)
		                                    return false
		                                end
		                                incrementarPC()
		                            else
		                                if (RegistroErroneo(cell.content))
		                                    self.mensaje = "La direccion " + cell.direction + " de la RAM debe contener un codigo de operacion"
		                                    return false
		                                else
		                                	self.fin = true
		                                end
		                            end
	                        	end
	                        else
	                            if (self.instructions > 1 && self.storeUsado)
	                                self.fin = true
	                            else
	                                self.mensaje = "Debe usarse el CO 'Almacenar en RAM' como último comando"
	                                return false
	                            end
	                        end
	                    end
	                end
	            else
	                self.mensaje = "Todos los registros y direcciones deben ser de " + self.pc.length.to_s + " dígitos"
	                return false
	            end
	        else
	            if (self.inicio)
	                if (self.storeUsado)
	                	self.fin = true
	                else
	                	self.mensaje = "Debe usarse el CO 'Almacenar en RAM' como último comando"
	                	return false
	            	end
	            end
	        end
	    end
	    if (!self.inicio)
	        self.mensaje = "La RAM no contiene la direccion con el valor del PC"
	        return false
	    end
	    return true
	end

	def ComprobarContenidoComando(dir, cod)
	    self.hexa_ram_cells.each do |cell|
	        if (cell.direction == dir)
	            if (cell.content.length == self.pc.length)
	                for i in 0..(self.hexa_cpu.co-1)
	        			if (cell.content[i] != '0')
	                    	self.mensaje = "La dirección " + dir + " de la RAM no debe contener un código de operación"
	                        return false
	                    end
	                end
	                return true
	            else
	                if (cod == self.hexa_cpu.store && cell.content == "")
	                    return true
	                else
	                	if(self.storeUsado)
	                		return true
	                	end
	                    self.mensaje = "Todos los registros usados de la RAM deben ser de " + self.pc.length.to_s + " bits"
	                    return false
	                end
	            end
	        end
	    end
	    self.mensaje = "No existe la direccion " + dir + " de la RAM"
	    return false
	end

	def ContieneComando(contenido, cod)
		dir = ""
		if (cod != "")
	        for i in 0..(self.hexa_cpu.co-1)
	            if (contenido[i] == cod[i])
	                dir = dir + "0"
	            else
	                break
	            end
	        end
	        if (dir.length == self.hexa_cpu.co)
	            self.comandoCorrecto = true
	            for i in (self.hexa_cpu.co)..(self.pc.length-1)
	                dir = dir + contenido[i]
	            end
	            self.contenidoCorrecto = ComprobarContenidoComando(dir, cod)
	            return true
	        else
	            return false
	        end
	    end
	    return false
	end

	def CompararConComandos(texto)
	    if (texto != "")
	    	if(ContieneComando(texto, self.hexa_cpu.load))
	        	self.comando = "load"
	        	self.storeUsado = false
		        return true
	        else
	        	if(ContieneComando(texto, self.hexa_cpu.store))
		        	self.comando = "store"
		        	self.storeUsado = true
		        	return true
		        else
	        		if(ContieneComando(texto, self.hexa_cpu.add))
			        	self.comando = "add"
			        	self.storeUsado = false
			        	return true
			        else
			        	if(ContieneComando(texto, self.hexa_cpu.sub))
				        	self.comando = "sub"
				        	self.storeUsado = false
				        	return true
				        else
			        		return false
			        	end
			        end
	        	end
	        end
	    else
	    	if(self.storeUsado)
	    		self.fin = true
	    		return true
	    	else
	        	return false
	        end
	    end
	end

	def CompararConPC(dir, texto)
	    if (dir == self.pc)
	    	CompararConComandos(texto)
	        return true
	    end
	    return false
	end

	def incrementarPC()
		hex = Hexa.new
		self.pc = hex.sumarHexa(self.pc, hex.decimalAHexa(1,self.pc.length), self.pc.length)
	    self.instructions+=1
	end

	def InicioDeProgramaCorrecto(dir)
	    self.inicio = true
	    if (self.comandoCorrecto)
	        if (self.comando == "load")
	            incrementarPC()
	            return true
	        else
	            self.mensaje = "El comando contenido en la direccion del PC debe ser 'Leer de RAM'"
	            return false
	        end
	    else
	        self.mensaje = "La direccion " + dir + " de la RAM debe contener un codigo de operacion"
	        return false
	    end
	end

	def RegistroErroneo(texto)
	    if (self.instructions < 2)
	        return true
	    end
	    if (!self.storeUsado)
	        return true
	    end
	    for i in 0..(self.hexa_cpu.co-1)
	        if (texto[i] != '0')
	            return true
	        end
	    end
	    return false
	end
end
