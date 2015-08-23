class CreateAssemblerExercises < ActiveRecord::Migration
  def change
    create_table :assembler_exercises do |t|
      t.references :user, index: true
      t.references :assembler_cpu, index: true
      t.references :assembler_ram, index: true
      t.references :assembler_cycle, index: true

      t.timestamps
    end
  end
end
