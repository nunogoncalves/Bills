Bills::Application.routes.draw do
  root :to => 'home#dashboard'
  resources :tenants, only: [:new, :create, :edit, :update]
end
