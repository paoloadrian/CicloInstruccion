class AddCpuToAssemblerCycles < ActiveRecord::Migration
  def change
    add_reference :assembler_cycles, :specific_registers_cpu, index: true
    add_reference :assembler_cycles, :general_use_registers_cpu, index: true
  end
end
