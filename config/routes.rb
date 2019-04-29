Rails.application.routes.draw do
  devise_for :users
  get "messages/index" => "messages#index"
  resources :users, only: [:edit, :update]
end
