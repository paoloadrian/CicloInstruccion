require 'test_helper'

class RamBinariesControllerTest < ActionController::TestCase
  setup do
    @ram_binary = ram_binaries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:ram_binaries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create ram_binary" do
    assert_difference('RamBinary.count') do
      post :create, ram_binary: {  }
    end

    assert_redirected_to ram_binary_path(assigns(:ram_binary))
  end

  test "should show ram_binary" do
    get :show, id: @ram_binary
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @ram_binary
    assert_response :success
  end

  test "should update ram_binary" do
    patch :update, id: @ram_binary, ram_binary: {  }
    assert_redirected_to ram_binary_path(assigns(:ram_binary))
  end

  test "should destroy ram_binary" do
    assert_difference('RamBinary.count', -1) do
      delete :destroy, id: @ram_binary
    end

    assert_redirected_to ram_binaries_path
  end
end
