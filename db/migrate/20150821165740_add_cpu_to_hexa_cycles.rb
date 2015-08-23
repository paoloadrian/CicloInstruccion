class AddCpuToHexaCycles < ActiveRecord::Migration
  def change
    add_reference :hexa_cycles, :specific_registers_cpu, index: true
  end
end
