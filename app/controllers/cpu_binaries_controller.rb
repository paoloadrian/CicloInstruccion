class CpuBinariesController < ApplicationController
  before_action :set_cpu_binary, only: [:show, :edit, :update, :destroy]

  # GET /cpu_binaries/new
  def new
    @cpu_binary = CpuBinary.new
  end

  # GET /cpu_binaries/1/edit
  def edit
  end

  # POST /cpu_binaries
  # POST /cpu_binaries.json
  def create
    @cpu_binary = CpuBinary.new(cpu_binary_params)
    #respond_to do |format|
      if @cpu_binary.save
        redirect_to :controller => "ram_binaries", :action => "new", :id_cpu => @cpu_binary.id.to_s
      else
        render :new#format.html { render :new }
        #format.json { render json: @cpu_binary.errors, status: :unprocessable_entity }
      end
    #end
  end

  # PATCH/PUT /cpu_binaries/1
  # PATCH/PUT /cpu_binaries/1.json
  def update
    respond_to do |format|
      if @cpu_binary.update(cpu_binary_params)
        format.html { redirect_to @cpu_binary, notice: 'Cpu binary was successfully updated.' }
        format.json { render :show, status: :ok, location: @cpu_binary }
      else
        format.html { render :edit }
        format.json { render json: @cpu_binary.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cpu_binaries/1
  # DELETE /cpu_binaries/1.json
  def destroy
    @cpu_binary.destroy
    respond_to do |format|
      format.html { redirect_to cpu_binaries_url, notice: 'Cpu binary was successfully destroyed.' }
      format.json { head :no_content }
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
