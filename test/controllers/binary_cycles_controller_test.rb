require 'test_helper'

class BinaryCyclesControllerTest < ActionController::TestCase
  setup do
    @binary_cycle = binary_cycles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:binary_cycles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create binary_cycle" do
    assert_difference('BinaryCycle.count') do
      post :create, binary_cycle: { actual_instruction: @binary_cycle.actual_instruction, executed_instructions: @binary_cycle.executed_instructions, execution_cycle: @binary_cycle.execution_cycle, pc: @binary_cycle.pc, ram_binary_id: @binary_cycle.ram_binary_id, step: @binary_cycle.step, total_instructions: @binary_cycle.total_instructions }
    end

    assert_redirected_to binary_cycle_path(assigns(:binary_cycle))
  end

  test "should show binary_cycle" do
    get :show, id: @binary_cycle
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @binary_cycle
    assert_response :success
  end

  test "should update binary_cycle" do
    patch :update, id: @binary_cycle, binary_cycle: { actual_instruction: @binary_cycle.actual_instruction, executed_instructions: @binary_cycle.executed_instructions, execution_cycle: @binary_cycle.execution_cycle, pc: @binary_cycle.pc, ram_binary_id: @binary_cycle.ram_binary_id, step: @binary_cycle.step, total_instructions: @binary_cycle.total_instructions }
    assert_redirected_to binary_cycle_path(assigns(:binary_cycle))
  end

  test "should destroy binary_cycle" do
    assert_difference('BinaryCycle.count', -1) do
      delete :destroy, id: @binary_cycle
    end

    assert_redirected_to binary_cycles_path
  end
end
