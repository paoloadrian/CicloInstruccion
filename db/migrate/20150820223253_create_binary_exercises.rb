class CreateBinaryExercises < ActiveRecord::Migration
  def change
    create_table :binary_exercises do |t|
      t.references :user, index: true
      t.references :cpu_binary, index: true
      t.references :ram_binary, index: true
      t.references :binary_cycle, index: true

      t.timestamps
    end
  end
end
