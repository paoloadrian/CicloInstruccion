class HexaCpusController < ApplicationController
  before_action :set_hexa_cpu, only: [:show, :edit, :update, :destroy]

  # GET /hexa_cpus/1
  # GET /hexa_cpus/1.json
  def show
  end

  # GET /hexa_cpus/new
  def new
    @hexa_cpu = HexaCpu.new
  end

  # GET /hexa_cpus/1/edit
  def edit
  end

  # POST /hexa_cpus
  # POST /hexa_cpus.json
  def create
    @hexa_cpu = HexaCpu.new(hexa_cpu_params)

    respond_to do |format|
      if @hexa_cpu.save
        format.html { redirect_to @hexa_cpu, notice: 'Hexa cpu was successfully created.' }
        format.json { render :show, status: :created, location: @hexa_cpu }
      else
        format.html { render :new }
        format.json { render json: @hexa_cpu.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hexa_cpus/1
  # DELETE /hexa_cpus/1.json
  def destroy
    @hexa_cpu.destroy
    respond_to do |format|
      format.html { redirect_to hexa_cpus_url, notice: 'Hexa cpu was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hexa_cpu
      @hexa_cpu = HexaCpu.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hexa_cpu_params
      params.require(:hexa_cpu).permit(:co, :dir, :pc, :specific_registers, :load, :store, :add, :sub)
    end
end
