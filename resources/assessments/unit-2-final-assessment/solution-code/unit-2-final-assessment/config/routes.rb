Rails.application.routes.draw do
  root 'widgets#index'
  resources :widgets, only: [:index, :create, :destroy]
end
