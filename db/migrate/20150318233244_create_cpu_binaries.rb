class CreateCpuBinaries < ActiveRecord::Migration
  def change
    create_table :cpu_binaries do |t|
      t.integer :co
      t.integer :dir
      t.string :pc
      t.string :load
      t.string :store
      t.string :add
      t.string :sub

      t.timestamps
    end
  end
end
