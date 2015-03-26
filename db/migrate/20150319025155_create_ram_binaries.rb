class CreateRamBinaries < ActiveRecord::Migration
  def change
    create_table :ram_binaries do |t|

      t.timestamps
    end
  end
end
