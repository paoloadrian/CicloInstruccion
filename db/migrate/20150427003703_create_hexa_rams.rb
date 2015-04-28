class CreateHexaRams < ActiveRecord::Migration
  def change
    create_table :hexa_rams do |t|
      t.references :hexa_cpu, index: true
      t.integer :instructions

      t.timestamps
    end
  end
end
