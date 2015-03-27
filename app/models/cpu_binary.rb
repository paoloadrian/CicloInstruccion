class CpuBinary < ActiveRecord::Base
	has_many :ram_binaries
	
	validates :co, presence: { message: " es requerido" }, :numericality => {:only_integer => true, message: " debe ser numerico"}
	validates :dir, presence: { message: " es requerido" }, :numericality => {:only_integer => true, message: " debe ser numerico"}
	validates :pc, presence: { message: " es requerido" }, format: { without: /[^01]/, message: " debe ser binario" }
	validates :add, format: { without: /[^01]/, message: " (sumar) debe ser binario" }
	validates :sub, format: { without: /[^01]/, message: " (restar) debe ser binario" }
	validates :load, presence: { message: " (leer) es requerido" }, format: { without: /[^01]/, message: " (leer) debe ser binario" }
	validates :store, presence: { message: " (almacenar) es requerido" }, format: { without: /[^01]/, message: " (almacenar) debe ser binario" }
	validate :register_size, :pc_size, :co_size, :dir_size, :load_size, :store_size, :add_size, :sub_size
	def pc_size
		if self.co != nil && self.dir != nil
			errors.add(:pc, "El tamaño del PC debe ser de "+((self.co + self.dir).to_s)+" bits") unless self.co + self.dir == self.pc.length
		end
	end
	def register_size
		if self.co != nil && self.dir != nil
			errors.add(:co, "El tamaño del total debe ser de "+((self.co + self.dir).to_s)+" bits") unless self.co + self.dir <= 16
		end
	end
	def co_size
		if self.co != nil
			errors.add(:co, "El tamaño del campo de CO debe ser multiplo de 4 bits") unless self.co % 4 == 0 && self.co > 0
		end
	end
	def dir_size
		if self.dir != nil
			errors.add(:dir, "El tamaño del campo de Direcciones debe ser multiplo de 4 bits") unless self.dir % 4 == 0 && self.dir > 0
		end
	end
	def load_size
		if self.co != nil
			errors.add(:load, "El tamaño del CO leer debe ser igual al del CO") unless self.load.length == self.co
		end
	end
	def store_size
		if self.co != nil
			errors.add(:store, "El tamaño del CO almacenar debe ser igual al del CO") unless self.store.length == self.co
		end
	end
	def add_size
		if !self.add.empty? && self.co != nil
			errors.add(:add, "El tamaño del CO sumar debe ser igual al del CO") unless self.add.length == self.co
		end
	end
	def sub_size
		if !self.sub.empty? && self.co != nil
			errors.add(:sub, "El tamaño del CO restar debe ser igual al del CO") unless self.sub.length == self.co
		end
	end
end
