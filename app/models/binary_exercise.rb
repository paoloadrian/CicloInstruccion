class BinaryExercise < ActiveRecord::Base
  belongs_to :user
  belongs_to :cpu_binary
  belongs_to :ram_binary
  belongs_to :binary_cycle

  def get_score
  	if self.ram_binary_id == nil
  		return "Pendiente"
  	else
  		return self.binary_cycle.intents.to_s + "/" + (self.binary_cycle.intents + self.binary_cycle.fails).to_s + " intentos correctos"
  	end
  end
end
