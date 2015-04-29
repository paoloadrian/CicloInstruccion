class CreateAssemblerCpus < ActiveRecord::Migration
  def change
    create_table :assembler_cpus do |t|
      t.integer :architecture
      t.integer :directions
      t.string :pc

      t.timestamps
    end
  end
end
