class AddScoreToHexaCycles < ActiveRecord::Migration
  def change
    add_column :hexa_cycles, :log, :text
    add_column :hexa_cycles, :intents, :integer
    add_column :hexa_cycles, :fails, :integer
  end
end
