class AssemblerCpusController < ApplicationController
  before_action :set_assembler_cpu, only: [:show, :edit, :update, :destroy]

  # GET /assembler_cpus/new
  def new
    @assembler_cpu = AssemblerCpu.new
  end

  # POST /assembler_cpus
  # POST /assembler_cpus.json
  def create
    @assembler_cpu = AssemblerCpu.new(assembler_cpu_params)
    if(@assembler_cpu.architecture == 2)
      @assembler_cpu.directions = 2;
    end
    @exercise = AssemblerExercise.new
    @exercise.name = params[:name]
    respond_to do |format|
      if @assembler_cpu.save
      	@exercise.cpu_binary_id = @cpu_binary.id
        @exercise.user_id = current_user.id
        @exercise.save
        @assembler_ram = AssemblerRam.new
      	@assembler_ram.assembler_cpu_id = @assembler_cpu.id
        format.html { redirect_to :controller => 'assembler_rams', :action => 'new', :id => @exercise.id }
        format.json { render :show, status: :created, location: @assembler_ram }
      else
        format.html { render :new }
        format.json { render json: @assembler_cpu.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assembler_cpu
      @assembler_cpu = AssemblerCpu.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def assembler_cpu_params
      params.require(:assembler_cpu).permit(:architecture, :directions, :pc)
    end
end
