class CreateGeneralUseRegistersCpus < ActiveRecord::Migration
  def change
    create_table :general_use_registers_cpus do |t|
      t.string :pc
      t.string :ir
      t.string :mar
      t.string :mbr
      t.string :r1
      t.string :r2
      t.string :r3
      t.string :r4
      t.string :r5
      t.string :r6
      t.string :data_bus
      t.string :dir_bus

      t.timestamps
    end
  end
end
