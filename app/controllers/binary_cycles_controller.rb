class BinaryCyclesController < ApplicationController
  before_action :set_binary_cycle, only: [:show, :edit, :update, :destroy]

  # GET /binary_cycles/new
  def new
    @binary_cycle = BinaryCycle.find(params[:id])
    @ram_binary = RamBinary.find(@ram_binary.ram_binary_id)
    @cpu_binary = CpuBinary.find(@ram_binary.cpu_binary_id)
  end

  def verify
  	@binary_cycle = BinaryCycle.find(params[:id])
  	respond_to do |format|
  		format.js
  		format.json { render json: [@binary_cycle, @binary_cycle.binary_cycle_cpu, @binary_cycle.ram_binary] }
  	end
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
