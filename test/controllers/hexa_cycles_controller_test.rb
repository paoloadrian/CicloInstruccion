require 'test_helper'

class HexaCyclesControllerTest < ActionController::TestCase
  setup do
    @hexa_cycle = hexa_cycles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:hexa_cycles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create hexa_cycle" do
    assert_difference('HexaCycle.count') do
      post :create, hexa_cycle: { actual_instruction: @hexa_cycle.actual_instruction, executed_instructions: @hexa_cycle.executed_instructions, execution_cycle: @hexa_cycle.execution_cycle, hexa_ram_id: @hexa_cycle.hexa_ram_id, pc: @hexa_cycle.pc, step: @hexa_cycle.step, total: @hexa_cycle.total }
    end

    assert_redirected_to hexa_cycle_path(assigns(:hexa_cycle))
  end

  test "should show hexa_cycle" do
    get :show, id: @hexa_cycle
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @hexa_cycle
    assert_response :success
  end

  test "should update hexa_cycle" do
    patch :update, id: @hexa_cycle, hexa_cycle: { actual_instruction: @hexa_cycle.actual_instruction, executed_instructions: @hexa_cycle.executed_instructions, execution_cycle: @hexa_cycle.execution_cycle, hexa_ram_id: @hexa_cycle.hexa_ram_id, pc: @hexa_cycle.pc, step: @hexa_cycle.step, total: @hexa_cycle.total }
    assert_redirected_to hexa_cycle_path(assigns(:hexa_cycle))
  end

  test "should destroy hexa_cycle" do
    assert_difference('HexaCycle.count', -1) do
      delete :destroy, id: @hexa_cycle
    end

    assert_redirected_to hexa_cycles_path
  end
end
