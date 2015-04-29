require 'test_helper'

class AssemblerCyclesControllerTest < ActionController::TestCase
  setup do
    @assembler_cycle = assembler_cycles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:assembler_cycles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create assembler_cycle" do
    assert_difference('AssemblerCycle.count') do
      post :create, assembler_cycle: { actual_instruction: @assembler_cycle.actual_instruction, assembler_ram_id: @assembler_cycle.assembler_ram_id, executed_instructions: @assembler_cycle.executed_instructions, execution_cycle: @assembler_cycle.execution_cycle, pc: @assembler_cycle.pc, step: @assembler_cycle.step, total_instructions: @assembler_cycle.total_instructions }
    end

    assert_redirected_to assembler_cycle_path(assigns(:assembler_cycle))
  end

  test "should show assembler_cycle" do
    get :show, id: @assembler_cycle
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @assembler_cycle
    assert_response :success
  end

  test "should update assembler_cycle" do
    patch :update, id: @assembler_cycle, assembler_cycle: { actual_instruction: @assembler_cycle.actual_instruction, assembler_ram_id: @assembler_cycle.assembler_ram_id, executed_instructions: @assembler_cycle.executed_instructions, execution_cycle: @assembler_cycle.execution_cycle, pc: @assembler_cycle.pc, step: @assembler_cycle.step, total_instructions: @assembler_cycle.total_instructions }
    assert_redirected_to assembler_cycle_path(assigns(:assembler_cycle))
  end

  test "should destroy assembler_cycle" do
    assert_difference('AssemblerCycle.count', -1) do
      delete :destroy, id: @assembler_cycle
    end

    assert_redirected_to assembler_cycles_path
  end
end
