class AssemblerRamsController < ApplicationController
  before_action :set_assembler_ram, only: [:show, :edit, :update, :destroy]

  # GET /assembler_rams/new
  def new
    @assembler_ram = AssemblerRam.new
    @exercise = AssemblerExercise.find(params[:id])
    @assembler_cpu = @exercise.assembler_cpu
  end

  # POST /assembler_rams
  # POST /assembler_rams.json
  def create
    @assembler_ram = AssemblerRam.new(assembler_ram_params)
	  @assembler_ram.instructions = params[:cant_instrucciones]
    respond_to do |format|
      if @assembler_ram.save
        for i in 0..30
          if params["assembler_dir"+i.to_s] != ""
            cell = AssemblerRamCell.new
            cell.assembler_ram_id = @assembler_ram.id
            cell.content = params["assembler_cont"+i.to_s]
            cell.direction = params["assembler_dir"+i.to_s]
            cell.position = i
            cell.save
          end
        end
        @assembler_cycle = AssemblerCycle.new
        @assembler_cycle.assembler_ram_id = @assembler_ram.id
        @assembler_cycle.step = 1
        @assembler_cycle.actual_instruction = 0
        @assembler_cycle.executed_instructions = 0
        @assembler_cycle.execution_cycle = false
        @assembler_cycle.store = false
        @assembler_cycle.log = "Captación:"
        @assembler_cycle.intents = 0
        @assembler_cycle.fails = 0
        if(@assembler_ram.assembler_cpu.architecture == 1)
          cpu = SpecificRegistersCpu.new
        else
          cpu = GeneralUseRegistersCpu.new
        end
        cpu.pc = @assembler_ram.assembler_cpu.pc
        cpu.save
        if(@assembler_ram.assembler_cpu.architecture == 1)
          @assembler_cycle.specific_registers_cpu_id = cpu.id
        else
          @assembler_cycle.general_use_registers_cpu_id = cpu.id
        end
        @assembler_cycle.save
        @exercise = AssemblerExercise.find(params[:exercise])
        @exercise.assembler_ram_id = @assembler_ram.id
        @exercise.assembler_cycle_id = @assembler_cycle.id
        @exercise.save
        format.html { redirect_to :controller => 'assembler_cycles', :action => 'new', :id => @assembler_cycle.id }
        format.json { render :show, status: :created, location: @assembler_cycle }
      else
        format.html { render :new }
        format.json { render json: @assembler_ram.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assembler_ram
      @assembler_ram = AssemblerRam.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def assembler_ram_params
      params.require(:assembler_ram).permit(:assembler_cpu_id)
    end
end
