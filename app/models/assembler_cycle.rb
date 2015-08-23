class AssemblerCycle < ActiveRecord::Base
  belongs_to :assembler_ram
  belongs_to :specific_registers_cpu
  belongs_to :general_use_registers_cpu
end
