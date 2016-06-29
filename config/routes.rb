Rails.application.routes.draw do
  root 'ideas#index'

  get '/api/v1/upvote/:id', to: 'api/v1/ideas#upvote'
  get '/api/v1/downvote/:id', to: 'api/v1/ideas#downvote'
  get '/api/v1/ideas/:id', to: 'api/v1/ideas#update'
  get '/api/v1/save/:id', to: 'api/v1/ideas#save_text'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :destroy]
    end
  end


end
