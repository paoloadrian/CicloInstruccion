class CreateAssemblerRams < ActiveRecord::Migration
  def change
    create_table :assembler_rams do |t|
      t.references :assembler_cpu, index: true

      t.timestamps
    end
  end
end
