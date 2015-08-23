class AddScoreToBinaryCycles < ActiveRecord::Migration
  def change
    add_column :binary_cycles, :log, :text
    add_column :binary_cycles, :intents, :integer
    add_column :binary_cycles, :fails, :integer
  end
end
