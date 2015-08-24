class HexaExercise < ActiveRecord::Base
  belongs_to :user
  belongs_to :hexa_cpu
  belongs_to :hexa_ram
  belongs_to :hexa_cycle

  def get_score
  	if self.hexa_ram_id == nil
  		return "Pendiente"
  	else
  		return self.hexa_cycle.intents.to_s + "/" + (self.hexa_cycle.intents + self.hexa_cycle.fails).to_s + " intentos correctos"
  	end
  end
end
