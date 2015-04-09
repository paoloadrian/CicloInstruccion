json.array!(@binary_steps) do |binary_step|
  json.extract! binary_step, :id, :content, :origin, :destiny, :pc, :actual_instruction, :step, :execution_cycle, :binary_cycle_id
  json.url binary_step_url(binary_step, format: :json)
end
