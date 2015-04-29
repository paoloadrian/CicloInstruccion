class CreateAssemblerCycles < ActiveRecord::Migration
  def change
    create_table :assembler_cycles do |t|
      t.references :assembler_ram, index: true
      t.string :pc
      t.string :actual_instruction
      t.integer :step
      t.boolean :execution_cycle
      t.integer :total_instructions
      t.integer :executed_instructions

      t.timestamps
    end
  end
end
