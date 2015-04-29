class HexaCyclesController < ApplicationController
  before_action :set_hexa_cycle, only: [:show, :edit, :update, :destroy]

  # GET /hexa_cycles/new
  def new
    @hexa_cycle = HexaCycle.new
    @hexa_ram = HexaRam.find(params[:id_ram])
    @hexa_cpu = HexaCpu.find(@hexa_ram.hexa_cpu_id)
  end

  # POST /hexa_cycles
  # POST /hexa_cycles.json
  def create
    @hexa_cycle = HexaCycle.new(hexa_cycle_params)

    respond_to do |format|
      if @hexa_cycle.save
        format.html { redirect_to @hexa_cycle, notice: 'Hexa cycle was successfully created.' }
        format.json { render :show, status: :created, location: @hexa_cycle }
      else
        format.html { render :new }
        format.json { render json: @hexa_cycle.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hexa_cycle
      @hexa_cycle = HexaCycle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hexa_cycle_params
      params.require(:hexa_cycle).permit(:pc, :actual_instruction, :step, :execution_cycle, :total, :executed_instructions, :hexa_ram_id)
    end
end
