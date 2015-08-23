class CreateHexaExercises < ActiveRecord::Migration
  def change
    create_table :hexa_exercises do |t|
      t.references :user, index: true
      t.references :hexa_cpu, index: true
      t.references :hexa_ram, index: true
      t.references :hexa_cycle, index: true

      t.timestamps
    end
  end
end
