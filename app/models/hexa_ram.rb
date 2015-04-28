class HexaRam < ActiveRecord::Base
  belongs_to :hexa_cpu
  has_many :hexa_ram_cells
	
	def findCellByPosition(pos)
		self.hexa_ram_cells.each do |cell|
			if cell.position == pos
				return cell
			end
		end
		return nil
	end
end
