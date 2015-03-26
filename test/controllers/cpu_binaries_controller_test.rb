require 'test_helper'

class CpuBinariesControllerTest < ActionController::TestCase
  setup do
    @cpu_binary = cpu_binaries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cpu_binaries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create cpu_binary" do
    assert_difference('CpuBinary.count') do
      post :create, cpu_binary: { add: @cpu_binary.add, co: @cpu_binary.co, dir: @cpu_binary.dir, load: @cpu_binary.load, pc: @cpu_binary.pc, store: @cpu_binary.store, sub: @cpu_binary.sub }
    end

    assert_redirected_to cpu_binary_path(assigns(:cpu_binary))
  end

  test "should show cpu_binary" do
    get :show, id: @cpu_binary
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @cpu_binary
    assert_response :success
  end

  test "should update cpu_binary" do
    patch :update, id: @cpu_binary, cpu_binary: { add: @cpu_binary.add, co: @cpu_binary.co, dir: @cpu_binary.dir, load: @cpu_binary.load, pc: @cpu_binary.pc, store: @cpu_binary.store, sub: @cpu_binary.sub }
    assert_redirected_to cpu_binary_path(assigns(:cpu_binary))
  end

  test "should destroy cpu_binary" do
    assert_difference('CpuBinary.count', -1) do
      delete :destroy, id: @cpu_binary
    end

    assert_redirected_to cpu_binaries_path
  end
end
