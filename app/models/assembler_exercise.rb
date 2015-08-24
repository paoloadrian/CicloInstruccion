class AssemblerExercise < ActiveRecord::Base
  belongs_to :user
  belongs_to :assembler_cpu
  belongs_to :assembler_ram
  belongs_to :assembler_cycle

  def get_score
  	if self.assembler_ram_id == nil
  		return "Pendiente"
  	else
  		return self.assembler_cycle.intents.to_s + "/" + (self.assembler_cycle.intents + self.assembler_cycle.fails).to_s + " intentos correctos"
  	end
  end
end
