class CreateHexaCpus < ActiveRecord::Migration
  def change
    create_table :hexa_cpus do |t|
      t.integer :co
      t.integer :dir
      t.string :pc
      t.boolean :specific_registers
      t.string :load
      t.string :store
      t.string :add
      t.string :sub

      t.timestamps
    end
  end
end
