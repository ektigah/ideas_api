Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      resources :ideas  
    end
  end
end
