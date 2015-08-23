class AssemblerExercise < ActiveRecord::Base
  belongs_to :user
  belongs_to :assembler_cpu
  belongs_to :assembler_ram
  belongs_to :assembler_cycle
end
