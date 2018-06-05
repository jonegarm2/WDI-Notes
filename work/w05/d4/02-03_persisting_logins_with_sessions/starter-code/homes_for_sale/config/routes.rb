Rails.application.routes.draw do

  root 'houses#index'
  resources :houses

  # we only want to display a sign up page and create users
  resources :users, only: [:new, :create]

end
