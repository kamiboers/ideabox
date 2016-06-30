Rails.application.routes.draw do
  get 'idea_tags_controller/create'

  root 'ideas#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :destroy]
    end
  end

  get '/api/v1/upvote/:id', to: 'api/v1/ideas#upvote'
  get '/api/v1/downvote/:id', to: 'api/v1/ideas#downvote'
  get '/api/v1/ideas/:id', to: 'api/v1/ideas#destroy'
  get '/api/v1/save/:id', to: 'api/v1/ideas#save_text'
  get '/api/v1/tags/:id', to: 'api/v1/ideas#tags'
  get '/api/v1/get_tags', to: 'api/v1/ideas#all_tags'
  get '/api/v1/by_tag', to: 'api/v1/ideas#by_tag'



end
