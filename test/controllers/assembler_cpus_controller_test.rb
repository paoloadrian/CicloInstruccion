require 'test_helper'

class AssemblerCpusControllerTest < ActionController::TestCase
  setup do
    @assembler_cpu = assembler_cpus(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:assembler_cpus)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create assembler_cpu" do
    assert_difference('AssemblerCpu.count') do
      post :create, assembler_cpu: { architecture: @assembler_cpu.architecture, directions: @assembler_cpu.directions, pc: @assembler_cpu.pc }
    end

    assert_redirected_to assembler_cpu_path(assigns(:assembler_cpu))
  end

  test "should show assembler_cpu" do
    get :show, id: @assembler_cpu
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @assembler_cpu
    assert_response :success
  end

  test "should update assembler_cpu" do
    patch :update, id: @assembler_cpu, assembler_cpu: { architecture: @assembler_cpu.architecture, directions: @assembler_cpu.directions, pc: @assembler_cpu.pc }
    assert_redirected_to assembler_cpu_path(assigns(:assembler_cpu))
  end

  test "should destroy assembler_cpu" do
    assert_difference('AssemblerCpu.count', -1) do
      delete :destroy, id: @assembler_cpu
    end

    assert_redirected_to assembler_cpus_path
  end
end
