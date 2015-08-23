class HexaCycle < ActiveRecord::Base
  belongs_to :hexa_ram
  belongs_to :specific_registers_cpu
end
