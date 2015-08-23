class AddCpuToBinaryCycles < ActiveRecord::Migration
  def change
    add_reference :binary_cycles, :specific_registers_cpu, index: true
  end
end
