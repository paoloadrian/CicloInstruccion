class BinaryCycle < ActiveRecord::Base
  belongs_to :ram_binary
  has_many :binary_steps
end
