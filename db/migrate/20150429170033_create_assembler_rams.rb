class CreateAssemblerRams < ActiveRecord::Migration
  def change
    create_table :assembler_rams do |t|
      t.references :assembler_cpu, index: true
      t.integer :instructions

      t.timestamps
    end
  end
end
