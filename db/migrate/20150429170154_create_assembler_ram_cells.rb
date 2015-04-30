class CreateAssemblerRamCells < ActiveRecord::Migration
  def change
    create_table :assembler_ram_cells do |t|
      t.references :assembler_ram, index: true
      t.string :direction
      t.string :content
      t.integer :position

      t.timestamps
    end
  end
end
