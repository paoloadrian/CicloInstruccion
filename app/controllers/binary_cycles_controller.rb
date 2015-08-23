class BinaryCyclesController < ApplicationController
  before_action :set_binary_cycle, only: [:show, :edit, :update, :destroy]

  # GET /binary_cycles/new
  def new
    @binary_cycle = BinaryCycle.find(params[:id])
    @ram_binary = @binary_cycle.ram_binary
    @cpu_binary = @ram_binary.cpu_binary
  end

  def verify
  	@binary_cycle = BinaryCycle.find(params[:id])
    @binary_cycle.store = params[:store]
    @binary_cycle.step = params[:paso]
    @binary_cycle.execution_cycle = params[:ejec]
    @binary_cycle.actual_instruction = params[:instruccion]
    @binary_cycle.executed_instructions = params[:ejecutadas]
    @binary_cycle.direction = params[:direccion]
    @binary_cycle.register = params[:registro]
    @binary_cycle.log = params[:log]
    @binary_cycle.intents = params[:intents]
    @binary_cycle.fails = params[:fails]
    @binary_cycle.save
    cpu = @binary_cycle.specific_registers_cpu
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
        cell = @binary_cycle.ram_binary.findCellByPosition(i)
        cell.content = params["cont-"+i.to_s]
        cell.direction = params["dir-"+i.to_s]
        cell.save
      end
    end
    render json: @binary_cycle
  end

  def create
    @binary_cycle = BinaryCycle.new(binary_cycle_params)

    respond_to do |format|
      if @binary_cycle.save
        format.html { redirect_to @binary_cycle, notice: 'Binary cycle was successfully created.' }
        format.json { render :show, status: :created, location: @binary_cycle }
      else
        format.html { render :new }
        format.json { render json: @binary_cycle.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_binary_cycle
      @binary_cycle = BinaryCycle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def binary_cycle_params
      params.require(:binary_cycle).permit(:pc, :actual_instruction, :step, :execution_cycle, :total_instructions, :executed_instructions, :ram_binary_id)
    end
end
