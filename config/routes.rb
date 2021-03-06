Rails.application.routes.draw do

  devise_for :users
  devise_scope :user do
  	get "/login" => "devise/sessions#new"
  	get "/logout" => "devise/sessions#destroy"
  	get "/change_password" => "devise/passwords#edit"
  end

  get 'cpu_binaries' => 'cpu_binaries#new'
  get 'ram_binaries' => 'ram_binaries#new'
  get 'ram_binaries/:id' => 'ram_binaries#new'
  get 'binary_cycles' => 'binary_cycles#new'
  post 'binary_cycles/verify/:id' => 'binary_cycles#verify'
  get 'binary_exercises' => 'cpu_binaries#exercises'
  
  get 'hexa_cpus' => 'hexa_cpus#new'
  get 'hexa_rams' => 'hexa_rams#new'
  get 'hexa_rams/:id' => 'hexa_rams#new'
  get 'hexa_cycles/:id' => 'hexa_cycles#new'
  post 'hexa_cycles/verify/:id' => 'hexa_cycles#verify'
  get 'hexa_exercises' => 'hexa_cpus#exercises'
  
  get 'assembler_cpus' => 'assembler_cpus#new'
  get 'assembler_rams' => 'assembler_rams#new'
  get 'assembler_rams/:id' => 'assembler_rams#new'
  get 'assembler_cycles/:id' => 'assembler_cycles#new'
  post 'assembler_cycles/verify_specific/:id' => 'assembler_cycles#verify_specific'
  post 'assembler_cycles/verify_general/:id' => 'assembler_cycles#verify_general'
  get 'assembler_exercises' => 'assembler_cpus#exercises'
  
  resources :hexa_cpus
  resources :hexa_rams
  resources :cpu_binaries
  resources :ram_binaries
  resources :binary_cycles
  resources :assembler_cycles
  resources :assembler_rams
  resources :assembler_cpus
  resources :hexa_cycles

  root 'cpu_binaries#home'
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
