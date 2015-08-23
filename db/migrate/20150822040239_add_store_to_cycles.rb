class AddStoreToCycles < ActiveRecord::Migration
  def change
  	add_column :binary_cycles, :store, :boolean
  	add_column :hexa_cycles, :store, :boolean
  	add_column :assembler_cycles, :store, :boolean
  end
end
