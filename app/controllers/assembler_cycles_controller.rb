class AssemblerCyclesController < ApplicationController
  before_action :set_assembler_cycle, only: [:show, :edit, :update, :destroy]

  # GET /assembler_cycles/new
  def new
    @assembler_cycle = AssemblerCycle.new
    @assembler_ram = AssemblerRam.find(params[:id_ram])
    @assembler_cpu = AssemblerCpu.find(@assembler_ram.assembler_cpu_id)
  end

  # POST /assembler_cycles
  # POST /assembler_cycles.json
  def create
    @assembler_cycle = AssemblerCycle.new(assembler_cycle_params)

    respond_to do |format|
      if @assembler_cycle.save
        format.html { redirect_to @assembler_cycle, notice: 'Assembler cycle was successfully created.' }
        format.json { render :show, status: :created, location: @assembler_cycle }
      else
        format.html { render :new }
        format.json { render json: @assembler_cycle.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assembler_cycle
      @assembler_cycle = AssemblerCycle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def assembler_cycle_params
      params.require(:assembler_cycle).permit(:assembler_ram_id, :pc, :actual_instruction, :step, :execution_cycle, :total_instructions, :executed_instructions)
    end
end
