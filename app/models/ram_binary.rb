class RamBinary < ActiveRecord::Base
	has_many :ram_binary_cells
	belongs_to :cpu_binary
end
