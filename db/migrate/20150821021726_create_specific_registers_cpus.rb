class CreateSpecificRegistersCpus < ActiveRecord::Migration
  def change
    create_table :specific_registers_cpus do |t|
      t.string :pc
      t.string :ir
      t.string :mar
      t.string :mbr
      t.string :ac
      t.string :dr
      t.string :data_bus
      t.string :dir_bus

      t.timestamps
    end
  end
end
