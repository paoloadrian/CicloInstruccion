class CreateBinaryCycles < ActiveRecord::Migration
  def change
    create_table :binary_cycles do |t|
      t.string :pc
      t.string :actual_instruction
      t.integer :step
      t.boolean :execution_cycle
      t.integer :total_instructions
      t.integer :executed_instructions
      t.references :ram_binary, index: true

      t.timestamps
    end
  end
end
