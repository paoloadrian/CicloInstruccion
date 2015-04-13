require 'test_helper'

class HexaCpusControllerTest < ActionController::TestCase
  setup do
    @hexa_cpu = hexa_cpus(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:hexa_cpus)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create hexa_cpu" do
    assert_difference('HexaCpu.count') do
      post :create, hexa_cpu: { add: @hexa_cpu.add, co: @hexa_cpu.co, dir: @hexa_cpu.dir, load: @hexa_cpu.load, pc: @hexa_cpu.pc, specific_registers: @hexa_cpu.specific_registers, store: @hexa_cpu.store, sub: @hexa_cpu.sub }
    end

    assert_redirected_to hexa_cpu_path(assigns(:hexa_cpu))
  end

  test "should show hexa_cpu" do
    get :show, id: @hexa_cpu
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @hexa_cpu
    assert_response :success
  end

  test "should update hexa_cpu" do
    patch :update, id: @hexa_cpu, hexa_cpu: { add: @hexa_cpu.add, co: @hexa_cpu.co, dir: @hexa_cpu.dir, load: @hexa_cpu.load, pc: @hexa_cpu.pc, specific_registers: @hexa_cpu.specific_registers, store: @hexa_cpu.store, sub: @hexa_cpu.sub }
    assert_redirected_to hexa_cpu_path(assigns(:hexa_cpu))
  end

  test "should destroy hexa_cpu" do
    assert_difference('HexaCpu.count', -1) do
      delete :destroy, id: @hexa_cpu
    end

    assert_redirected_to hexa_cpus_path
  end
end
