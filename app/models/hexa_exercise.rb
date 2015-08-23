class HexaExercise < ActiveRecord::Base
  belongs_to :user
  belongs_to :hexa_cpu
  belongs_to :hexa_ram
  belongs_to :hexa_cycle
end
