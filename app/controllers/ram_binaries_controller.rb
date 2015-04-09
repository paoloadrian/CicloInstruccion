class RamBinariesController < ApplicationController
  before_action :set_ram_binary, only: [:show, :edit, :update, :destroy]

  # GET /ram_binaries/new
  def new
    @ram_binary = RamBinary.new
    @cpu_binary = CpuBinary.find(params[:id_cpu])
  end

  # GET /ram_binaries/1/edit
  def edit
  end

  # POST /ram_binaries
  # POST /ram_binaries.json
  def create
    @ram_binary = RamBinary.new(ram_binary_params)
    @ram_binary.cpu_binary_id = params[:id_cpu]
    respond_to do |format|
      if @ram_binary.save
        for i in 0..14
          if params["dir"+i.to_s] != ""
            cell = RamBinaryCell.new
            cell.ram_binary_id = @ram_binary.id
            cell.content = params["cont"+i.to_s]
            cell.direction = params["dir"+i.to_s]
            cell.save
          end
        end
        @binary_cycle = BinaryCycle.new
        @binary_cycle.ram_binary_id = @ram_binary.id
        format.html { redirect_to :controller => 'binary_cycles', :action => 'new', :id_ram => @ram_binary.id, notice: 'RAM fue creada exitosamente.' }
        format.json { render :show, status: :created, location: @binary_cycle }
      else
        format.html { render :new }
        format.json { render json: @ram_binary.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ram_binaries/1
  # PATCH/PUT /ram_binaries/1.json
  def update
    respond_to do |format|
      if @ram_binary.update(ram_binary_params)
        format.html { redirect_to @ram_binary, notice: 'Ram binary was successfully updated.' }
        format.json { render :show, status: :ok, location: @ram_binary }
      else
        format.html { render :edit }
        format.json { render json: @ram_binary.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ram_binaries/1
  # DELETE /ram_binaries/1.json
  def destroy
    @ram_binary.destroy
    respond_to do |format|
      format.html { redirect_to ram_binaries_url, notice: 'Ram binary was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ram_binary
      @ram_binary = RamBinary.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ram_binary_params
      params[:ram_binary]
    end
end
