class CreateHexaRamCells < ActiveRecord::Migration
  def change
    create_table :hexa_ram_cells do |t|
      t.references :hexa_ram, index: true
      t.string :direction
      t.string :content
      t.integer :position

      t.timestamps
    end
  end
end
