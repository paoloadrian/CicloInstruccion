class HexaCyclesController < ApplicationController
  before_action :set_hexa_cycle, only: [:show, :edit, :update, :destroy]

  # GET /hexa_cycles/new
  def new
    @hexa_cycle = HexaCycle.find(params[:id])
    @hexa_ram = @hexa_cycle.hexa_ram
    @hexa_cpu = @hexa_ram.hexa_cpu
  end

  def verify
    @hexa_cycle = HexaCycle.find(params[:id])
    @hexa_cycle.store = params[:store]
    @hexa_cycle.step = params[:paso]
    @hexa_cycle.execution_cycle = params[:ejec]
    @hexa_cycle.actual_instruction = params[:instruccion]
    @hexa_cycle.executed_instructions = params[:ejecutadas]
    @hexa_cycle.direction = params[:direccion]
    @hexa_cycle.register = params[:registro]
    @hexa_cycle.log = params[:log]
    @hexa_cycle.intents = params[:intents]
    @hexa_cycle.fails = params[:fails]
    @hexa_cycle.save
    cpu = @hexa_cycle.specific_registers_cpu
    cpu.pc = params[:pc]
    cpu.ir = params[:ir]
    cpu.mar = params[:mar]
    cpu.mbr = params[:mbr]
    cpu.ac = params[:ac]
    cpu.dr = params[:dr]
    cpu.dir_bus = params[:busDirs]
    cpu.data_bus = params[:busDatos]
    cpu.save
    for i in 0..15
      if params["dir-"+i.to_s] != ""
        cell = @hexa_cycle.hexa_ram.findCellByPosition(i)
        cell.content = params["cont-"+i.to_s]
        cell.direction = params["dir-"+i.to_s]
        cell.save
      end
    end
    render json: @hexa_cycle
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
