class RamBinary < ActiveRecord::Base
	has_many :ram_binary_cells
	belongs_to :cpu_binary
	
	def findCellByPosition(pos)
		self.ram_binary_cells.each do |cell|
			if cell.position == pos
				return cell
			end
		end
		return nil
	end
end
