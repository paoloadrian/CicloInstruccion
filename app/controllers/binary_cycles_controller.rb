class BinaryCyclesController < ApplicationController
  before_action :set_binary_cycle, only: [:show, :edit, :update, :destroy]

  # GET /binary_cycles/1
  # GET /binary_cycles/1.json
  def show
  end

  # GET /binary_cycles/new
  def new
    @binary_cycle = BinaryCycle.new
    @ram_binary = RamBinary.find(params[:id_ram])
    @cpu_binary = CpuBinary.find(@ram_binary.cpu_binary_id)
  end

  # GET /binary_cycles/1/edit
  def edit
  end

  # POST /binary_cycles
  # POST /binary_cycles.json
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

  # PATCH/PUT /binary_cycles/1
  # PATCH/PUT /binary_cycles/1.json
  def update
    respond_to do |format|
      if @binary_cycle.update(binary_cycle_params)
        format.html { redirect_to @binary_cycle, notice: 'Binary cycle was successfully updated.' }
        format.json { render :show, status: :ok, location: @binary_cycle }
      else
        format.html { render :edit }
        format.json { render json: @binary_cycle.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /binary_cycles/1
  # DELETE /binary_cycles/1.json
  def destroy
    @binary_cycle.destroy
    respond_to do |format|
      format.html { redirect_to binary_cycles_url, notice: 'Binary cycle was successfully destroyed.' }
      format.json { head :no_content }
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
