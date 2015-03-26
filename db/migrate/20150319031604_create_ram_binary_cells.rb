class CreateRamBinaryCells < ActiveRecord::Migration
  def change
    create_table :ram_binary_cells do |t|
      t.string :content
      t.string :direction
      t.references :ram_binary, index: true

      t.timestamps
    end
  end
end
