class AddRamDataToCycles < ActiveRecord::Migration
  def change
  	add_column :binary_cycles, :register, :string
  	add_column :binary_cycles, :direction, :string
  	add_column :hexa_cycles, :register, :string
  	add_column :hexa_cycles, :direction, :string
  	add_column :assembler_cycles, :register, :string
  	add_column :assembler_cycles, :direction, :string
  end
end
