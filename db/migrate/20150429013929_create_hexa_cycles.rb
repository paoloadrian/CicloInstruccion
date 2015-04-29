class CreateHexaCycles < ActiveRecord::Migration
  def change
    create_table :hexa_cycles do |t|
      t.string :pc
      t.string :actual_instruction
      t.integer :step
      t.boolean :execution_cycle
      t.integer :total_instructions
      t.integer :executed_instructions
      t.references :hexa_ram, index: true

      t.timestamps
    end
  end
end
