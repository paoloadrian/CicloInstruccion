class AddNameToAssemblerExercises < ActiveRecord::Migration
  def change
    add_column :assembler_exercises, :name, :string
  end
end
