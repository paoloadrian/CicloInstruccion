class AssemblerCyclesController < ApplicationController
  before_action :set_assembler_cycle, only: [:show, :edit, :update, :destroy]

  # GET /assembler_cycles/new
  def new
    @assembler_cycle = AssemblerCycle.find(params[:id])
    @assembler_ram = @assembler_cycle.assembler_ram
    @assembler_cpu = @assembler_ram.assembler_cpu
  end

  def verify_specific
    @assembler_cycle = AssemblerCycle.find(params[:id])
    @assembler_cycle.store = params[:store]
    @assembler_cycle.step = params[:paso]
    @assembler_cycle.execution_cycle = params[:ejec]
    @assembler_cycle.actual_instruction = params[:instruccion]
    @assembler_cycle.executed_instructions = params[:ejecutadas]
    @assembler_cycle.direction = params[:direccion]
    @assembler_cycle.register = params[:registro]
    @assembler_cycle.save
    cpu = @assembler_cycle.specific_registers_cpu
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
        cell = @assembler_cycle.assembler_ram.findCellByPosition(i)
        cell.content = params["cont-"+i.to_s]
        cell.direction = params["dir-"+i.to_s]
        cell.save
      end
    end
    render json: @assembler_cycle
  end

  def verify_general
    @assembler_cycle = AssemblerCycle.find(params[:id])
    @assembler_cycle.store = params[:store]
    @assembler_cycle.step = params[:paso]
    @assembler_cycle.execution_cycle = params[:ejec]
    @assembler_cycle.actual_instruction = params[:instruccion]
    @assembler_cycle.executed_instructions = params[:ejecutadas]
    @assembler_cycle.direction = params[:direccion]
    @assembler_cycle.register = params[:registro]
    @assembler_cycle.save
    cpu = @assembler_cycle.specific_registers_cpu
    cpu.pc = params[:pc]
    cpu.ir = params[:ir]
    cpu.mar = params[:mar]
    cpu.mbr = params[:mbr]
    cpu.r1 = params[:R1]
    cpu.r2 = params[:R2]
    cpu.r3 = params[:R3]
    cpu.r4 = params[:R4]
    cpu.r5 = params[:R5]
    cpu.r6 = params[:R6]
    cpu.dir_bus = params[:busDirs]
    cpu.data_bus = params[:busDatos]
    cpu.save
    for i in 0..15
      if params["dir-"+i.to_s] != ""
        cell = @assembler_cycle.assembler_ram.findCellByPosition(i)
        cell.content = params["cont-"+i.to_s]
        cell.direction = params["dir-"+i.to_s]
        cell.save
      end
    end
    render json: @assembler_cycle
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
