class AddScoreToAssemblerCycles < ActiveRecord::Migration
  def change
    add_column :assembler_cycles, :log, :text
    add_column :assembler_cycles, :intents, :integer
    add_column :assembler_cycles, :fails, :integer
  end
end
