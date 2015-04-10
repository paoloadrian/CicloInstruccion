class CreateRamBinaries < ActiveRecord::Migration
  def change
    create_table :ram_binaries do |t|
      t.references :cpu_binary, index: true
      t.integer :instructions

      t.timestamps
    end
  end
end
