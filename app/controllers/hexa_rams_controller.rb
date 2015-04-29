class HexaRamsController < ApplicationController
  before_action :set_hexa_ram, only: [:show, :edit, :update, :destroy]

  # GET /hexa_rams/1
  # GET /hexa_rams/1.json
  def show
  end

  # GET /hexa_rams/new
  def new
    @hexa_ram = HexaRam.new
    @hexa_cpu = HexaCpu.find(params[:id_cpu])
  end

  # POST /hexa_rams
  # POST /hexa_rams.json
  def create
    @hexa_ram = HexaRam.new(hexa_ram_params)
	@hexa_ram.instructions = params[:cant_instrucciones]
    respond_to do |format|
      if @hexa_ram.save
        for i in 0..30
          if params["dir"+i.to_s] != ""
            cell = HexaRamCell.new
            cell.hexa_ram_id = @hexa_ram.id
            cell.content = params["hexa_cont"+i.to_s]
            cell.direction = params["hexa_dir"+i.to_s]
            cell.position = i
            cell.save
          end
        end
        @hexa_cycle = HexaCycle.new
        @hexa_cycle.hexa_ram_id = @hexa_ram.id
        format.html { redirect_to :controller => 'hexa_cycles', :action => 'new', :id_ram => @hexa_ram.id }
        format.json { render :show, status: :created, location: @hexa_cycle }
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
