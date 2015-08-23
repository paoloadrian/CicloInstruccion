class BinaryCycle < ActiveRecord::Base
  belongs_to :ram_binary
  belongs_to :specific_registers_cpu
end
