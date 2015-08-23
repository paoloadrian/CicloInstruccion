class RamBinariesController < ApplicationController
  before_action :set_ram_binary, only: [:show, :edit, :update, :destroy]

  # GET /ram_binaries/new
  def new
    @ram_binary = RamBinary.new
    @exercise = BinaryExercise.find(params[:id])
    @cpu_binary = @exercise.cpu_binary
  end

  # POST /ram_binaries
  # POST /ram_binaries.json
  def create
    @ram_binary = RamBinary.new(ram_binary_params)
    @ram_binary.instructions = params[:cant_instrucciones]
    respond_to do |format|
      if @ram_binary.save
        for i in 0..15
          if params["dir"+i.to_s] != ""
            cell = RamBinaryCell.new
            cell.ram_binary_id = @ram_binary.id
            cell.content = params["cont"+i.to_s]
            cell.direction = params["dir"+i.to_s]
            cell.position = i
            cell.save
          end
        end
        @binary_cycle = BinaryCycle.new
        @binary_cycle.ram_binary_id = @ram_binary.id
        @binary_cycle.step = 1
        @binary_cycle.actual_instruction = 0
        @binary_cycle.executed_instructions = 0
        @binary_cycle.execution_cycle = false
        @binary_cycle.store = false
        @binary_cycle.log = "Captación:"
        @binary_cycle.intents = 0
        @binary_cycle.fails = 0
        cpu = SpecificRegistersCpu.new
        cpu.pc = @ram_binary.cpu_binary.pc
        cpu.save
        @binary_cycle.specific_registers_cpu_id = cpu.id
        @binary_cycle.save
        @exercise = BinaryExercise.find(params[:exercise])
        @exercise.ram_binary_id = @ram_binary.id
        @exercise.binary_cycle_id = @binary_cycle.id
        @exercise.save
        format.html { redirect_to :controller => 'binary_cycles', :action => 'new', :id => @binary_cycle.id }
        format.json { render :show, status: :created, location: @binary_cycle }
      else
        format.html { render :new }
        format.json { render json: @ram_binary.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ram_binary
      @ram_binary = RamBinary.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ram_binary_params
      params.require(:ram_binary).permit(:cpu_binary_id)
    end
end
