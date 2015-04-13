class HexaCpu < ActiveRecord::Base
	validates :co, presence: { message: " es requerido" }, :numericality => {:only_integer => true, message: " debe ser numerico"}
	validates :dir, presence: { message: " es requerido" }, :numericality => {:only_integer => true, message: " debe ser numerico"}
	validates :pc, presence: { message: " es requerido" }, format: { without: /[^0-9A-Z]/, message: " debe ser hexadecimal" }
	validates :add, format: { without: /[^0-9A-Z]/, message: " (sumar) debe ser hexadecimal" }
	validates :sub, format: { without: /[^0-9A-Z]/, message: " (restar) debe ser hexadecimal" }
	validates :load, presence: { message: " (leer) es requerido" }, format: { without: /[^0-9A-Z]/, message: " (leer) debe ser hexadecimal" }
	validates :store, presence: { message: " (almacenar) es requerido" }, format: { without: /[^0-9A-Z]/, message: " (almacenar) debe ser hexadecimal" }
	validate :register_size, :pc_size, :co_size, :dir_size, :load_size, :store_size, :add_size, :sub_size
	def pc_size
		if self.co != nil && self.dir != nil
			errors.add(:pc, "El tamaño del PC debe ser de "+((self.co + self.dir).to_s)) unless self.co + self.dir == self.pc.length
		end
	end
	def register_size
		if self.co != nil && self.dir != nil
			errors.add(:co, "El tamaño de los registros debe ser de máximo de 8 dígitos hexadecimales") unless self.co + self.dir <= 8
		end
	end
	def co_size
		if self.co != nil
			errors.add(:co, "El valor del campo de CO debe ser menor a 3 y mayor a 0") unless self.co < 3 && self.co > 0
		end
	end
	def dir_size
		if self.dir != nil
			errors.add(:dir, "El valor del campo de Direcciones debe ser menor a 7 y mayor a 0") unless self.dir < 7 && self.dir > 0
		end
	end
	def load_size
		if self.co != nil
			errors.add(:load, "El tamaño del CO leer debe ser igual al del campo CO") unless self.load.length == self.co
		end
	end
	def store_size
		if self.co != nil
			errors.add(:store, "El tamaño del CO almacenar debe ser igual al del campo CO") unless self.store.length == self.co
		end
	end
	def add_size
		if !self.add.empty? && self.co != nil
			errors.add(:add, "El tamaño del CO sumar debe ser igual al del campo CO") unless self.add.length == self.co
		end
	end
	def sub_size
		if !self.sub.empty? && self.co != nil
			errors.add(:sub, "El tamaño del CO restar debe ser igual al del campo CO") unless self.sub.length == self.co
		end
	end
end
