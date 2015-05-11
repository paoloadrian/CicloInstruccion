class AssemblerRam < ActiveRecord::Base
  belongs_to :assembler_cpu
  has_many :assembler_ram_cells
	
	def findCellByPosition(pos)
		self.assembler_ram_cells.each do |cell|
			if cell.position == pos
				return cell
			end
		end
		return nil
	end
end
