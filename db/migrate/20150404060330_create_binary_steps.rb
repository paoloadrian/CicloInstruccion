class CreateBinarySteps < ActiveRecord::Migration
  def change
    create_table :binary_steps do |t|
      t.string :content
      t.string :origin
      t.string :destiny
      t.string :pc
      t.string :actual_instruction
      t.integer :step
      t.boolean :execution_cycle
      t.references :binary_cycle, index: true

      t.timestamps
    end
  end
end
