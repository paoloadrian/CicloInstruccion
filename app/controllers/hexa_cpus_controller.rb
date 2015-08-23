class HexaCpusController < ApplicationController
  before_action :set_hexa_cpu, only: [:show, :edit, :update, :destroy]

  # GET /hexa_cpus/new
  def new
    @hexa_cpu = HexaCpu.new
  end

  # POST /hexa_cpus
  # POST /hexa_cpus.json
  def create
    @hexa_cpu = HexaCpu.new(hexa_cpu_params)
    @exercise = HexaExercise.new
    @exercise.name = params[:name]
    respond_to do |format|
      if @hexa_cpu.save
      	@exercise.cpu_binary_id = @cpu_binary.id
        @exercise.user_id = current_user.id
        @exercise.save
        @hexa_ram = HexaRam.new
      	@hexa_ram.hexa_cpu_id = @hexa_cpu.id
        format.html { redirect_to :controller => 'hexa_rams', :action => 'new', :id => @exercise.id }
        format.json { render :show, status: :created, location: @hexa_ram }
      else
        format.html { render :new }
        format.json { render json: @hexa_cpu.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hexa_cpu
      @hexa_cpu = HexaCpu.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hexa_cpu_params
      params.require(:hexa_cpu).permit(:co, :dir, :pc, :directions, :load, :store, :add, :sub)
    end
end
