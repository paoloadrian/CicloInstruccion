class AddNameToBinaryExercises < ActiveRecord::Migration
  def change
    add_column :binary_exercises, :name, :string
  end
end
