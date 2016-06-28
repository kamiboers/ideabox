Rails.application.routes.draw do
  root 'ideas#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :ideas
    end
  end
end
