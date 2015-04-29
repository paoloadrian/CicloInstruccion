class AssemblerCpu < ActiveRecord::Base
	validates :pc, presence: { message: " es requerido" }, format: { without: /[^0-9]/, message: " debe ser decimal" }
end
