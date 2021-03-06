class CpuBinariesController < ApplicationController
  before_action :set_cpu_binary, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!, only: [:new, :create, :exercises]

  def home
  end

  # GET /cpu_binaries/new
  def new
    @cpu_binary = CpuBinary.new
  end

  def exercises
    @exercises = BinaryExercise.where(user_id: current_user.id)
  end

  def create
    @cpu_binary = CpuBinary.new(cpu_binary_params)
    @exercise = BinaryExercise.new
    @exercise.name = params[:name]
    respond_to do |format|
      if @cpu_binary.save
        @exercise.cpu_binary_id = @cpu_binary.id
        @exercise.user_id = current_user.id
        @exercise.save
      	@ram_binary = RamBinary.new
      	@ram_binary.cpu_binary_id = @cpu_binary.id
        format.html { redirect_to :controller => 'ram_binaries', :action => 'new', :id => @exercise.id }
        format.json { render :show, status: :created, location: @ram_binary }
      else
        format.html { render :new }
        format.json { render json: @cpu_binary.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cpu_binary
      @cpu_binary = CpuBinary.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cpu_binary_params
      params.require(:cpu_binary).permit(:co, :dir, :pc, :load, :store, :add, :sub)
    end
end
