require 'test_helper'

class HexaRamsControllerTest < ActionController::TestCase
  setup do
    @hexa_ram = hexa_rams(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:hexa_rams)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create hexa_ram" do
    assert_difference('HexaRam.count') do
      post :create, hexa_ram: { hexa_cpu_id: @hexa_ram.hexa_cpu_id }
    end

    assert_redirected_to hexa_ram_path(assigns(:hexa_ram))
  end

  test "should show hexa_ram" do
    get :show, id: @hexa_ram
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @hexa_ram
    assert_response :success
  end

  test "should update hexa_ram" do
    patch :update, id: @hexa_ram, hexa_ram: { hexa_cpu_id: @hexa_ram.hexa_cpu_id }
    assert_redirected_to hexa_ram_path(assigns(:hexa_ram))
  end

  test "should destroy hexa_ram" do
    assert_difference('HexaRam.count', -1) do
      delete :destroy, id: @hexa_ram
    end

    assert_redirected_to hexa_rams_path
  end
end
