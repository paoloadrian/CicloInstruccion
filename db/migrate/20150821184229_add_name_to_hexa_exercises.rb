class AddNameToHexaExercises < ActiveRecord::Migration
  def change
    add_column :hexa_exercises, :name, :string
  end
end
