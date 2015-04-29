require 'test_helper'

class AssemblerRamsControllerTest < ActionController::TestCase
  setup do
    @assembler_ram = assembler_rams(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:assembler_rams)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create assembler_ram" do
    assert_difference('AssemblerRam.count') do
      post :create, assembler_ram: { assembler_cpu_id: @assembler_ram.assembler_cpu_id }
    end

    assert_redirected_to assembler_ram_path(assigns(:assembler_ram))
  end

  test "should show assembler_ram" do
    get :show, id: @assembler_ram
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @assembler_ram
    assert_response :success
  end

  test "should update assembler_ram" do
    patch :update, id: @assembler_ram, assembler_ram: { assembler_cpu_id: @assembler_ram.assembler_cpu_id }
    assert_redirected_to assembler_ram_path(assigns(:assembler_ram))
  end

  test "should destroy assembler_ram" do
    assert_difference('AssemblerRam.count', -1) do
      delete :destroy, id: @assembler_ram
    end

    assert_redirected_to assembler_rams_path
  end
end
