class BinaryExercise < ActiveRecord::Base
  belongs_to :user
  belongs_to :cpu_binary
  belongs_to :ram_binary
  belongs_to :binary_cycle
end
