class ChangeInstructionFromAssemblerCycles < ActiveRecord::Migration
  def change
    reversible do |dir|
      change_table :assembler_cycles do |t|
        dir.up   { t.change :actual_instruction, :string }
        dir.down { t.change :actual_instruction, :integer }
      end
    end
  end
end
