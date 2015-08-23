class HexaRamsController < ApplicationController
  before_action :set_hexa_ram, only: [:show, :edit, :update, :destroy]

  # GET /hexa_rams/new
  def new
    @hexa_ram = HexaRam.new
    @exercise = HexaExercise.find(params[:id])
    @hexa_cpu = @exercise.hexa_cpu
  end

  # POST /hexa_rams
  # POST /hexa_rams.json
  def create
    @hexa_ram = HexaRam.new(hexa_ram_params)
	  @hexa_ram.instructions = params[:cant_instrucciones]
    respond_to do |format|
      if @hexa_ram.save
        for i in 0..30
          if params["hexa_dir"+i.to_s] != ""
            cell = HexaRamCell.new
            cell.hexa_ram_id = @hexa_ram.id
            cell.content = params["hexa_cont"+i.to_s]
            cell.direction = params["hexa_dir"+i.to_s]
            cell.position = i
            cell.save
          end
        end
        if @hexa_ram.correcto
          @hexa_ram.save
          @hexa_cycle = HexaCycle.new
          @hexa_cycle.hexa_ram_id = @hexa_ram.id
          @hexa_cycle.step = 1
          @hexa_cycle.actual_instruction = 0
          @hexa_cycle.executed_instructions = 0
          @hexa_cycle.execution_cycle = false
          @hexa_cycle.store = false
          @hexa_cycle.log = "Captación:"
          @hexa_cycle.intents = 0
          @hexa_cycle.fails = 0
          cpu = SpecificRegistersCpu.new
          cpu.pc = @hexa_ram.hexa_cpu.pc
          cpu.save
          @hexa_cycle.specific_registers_cpu_id = cpu.id
          @hexa_cycle.save
          @exercise = HexaExercise.find(params[:exercise])
          @exercise.hexa_ram_id = @hexa_ram.id
          @exercise.hexa_cycle_id = @hexa_cycle.id
          @exercise.save
          format.html { redirect_to :controller => 'hexa_cycles', :action => 'new', :id => @hexa_cycle.id }
          format.json { render :show, status: :created, location: @hexa_cycle }
        else
          @hexa_cpu = @hexa_ram.hexa_cpu
          mensaje = @hexa_ram.mensaje
          celdas = @hexa_ram.hexa_ram_cells
          @hexa_ram = HexaRam.new
          @hexa_ram.mensaje = mensaje
          @hexa_ram.celdas = celdas
          format.html { render :new }
          format.json { render json: @hexa_ram.errors, status: :unprocessable_entity }
        end
      else
        format.html { render :new }
        format.json { render json: @hexa_ram.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hexa_ram
      @hexa_ram = HexaRam.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hexa_ram_params
      params.require(:hexa_ram).permit(:hexa_cpu_id)
    end
end
