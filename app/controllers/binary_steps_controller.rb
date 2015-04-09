class BinaryStepsController < ApplicationController
  before_action :set_binary_step, only: [:show, :edit, :update, :destroy]

  # GET /binary_steps
  # GET /binary_steps.json
  def index
    @binary_steps = BinaryStep.all
  end

  # GET /binary_steps/1
  # GET /binary_steps/1.json
  def show
  end

  # GET /binary_steps/new
  def new
    @binary_step = BinaryStep.new
  end

  # GET /binary_steps/1/edit
  def edit
  end

  # POST /binary_steps
  # POST /binary_steps.json
  def create
    @binary_step = BinaryStep.new(binary_step_params)

    respond_to do |format|
      if @binary_step.save
        format.html { redirect_to @binary_step, notice: 'Binary step was successfully created.' }
        format.json { render :show, status: :created, location: @binary_step }
      else
        format.html { render :new }
        format.json { render json: @binary_step.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /binary_steps/1
  # PATCH/PUT /binary_steps/1.json
  def update
    respond_to do |format|
      if @binary_step.update(binary_step_params)
        format.html { redirect_to @binary_step, notice: 'Binary step was successfully updated.' }
        format.json { render :show, status: :ok, location: @binary_step }
      else
        format.html { render :edit }
        format.json { render json: @binary_step.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /binary_steps/1
  # DELETE /binary_steps/1.json
  def destroy
    @binary_step.destroy
    respond_to do |format|
      format.html { redirect_to binary_steps_url, notice: 'Binary step was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_binary_step
      @binary_step = BinaryStep.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def binary_step_params
      params.require(:binary_step).permit(:content, :origin, :destiny, :pc, :actual_instruction, :step, :execution_cycle, :binary_cycle_id)
    end
end
