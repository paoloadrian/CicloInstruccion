require 'test_helper'

class BinaryStepsControllerTest < ActionController::TestCase
  setup do
    @binary_step = binary_steps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:binary_steps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create binary_step" do
    assert_difference('BinaryStep.count') do
      post :create, binary_step: { actual_instruction: @binary_step.actual_instruction, binary_cycle_id: @binary_step.binary_cycle_id, content: @binary_step.content, destiny: @binary_step.destiny, execution_cycle: @binary_step.execution_cycle, origin: @binary_step.origin, pc: @binary_step.pc, step: @binary_step.step }
    end

    assert_redirected_to binary_step_path(assigns(:binary_step))
  end

  test "should show binary_step" do
    get :show, id: @binary_step
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @binary_step
    assert_response :success
  end

  test "should update binary_step" do
    patch :update, id: @binary_step, binary_step: { actual_instruction: @binary_step.actual_instruction, binary_cycle_id: @binary_step.binary_cycle_id, content: @binary_step.content, destiny: @binary_step.destiny, execution_cycle: @binary_step.execution_cycle, origin: @binary_step.origin, pc: @binary_step.pc, step: @binary_step.step }
    assert_redirected_to binary_step_path(assigns(:binary_step))
  end

  test "should destroy binary_step" do
    assert_difference('BinaryStep.count', -1) do
      delete :destroy, id: @binary_step
    end

    assert_redirected_to binary_steps_path
  end
end
