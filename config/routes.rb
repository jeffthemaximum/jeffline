Rails.application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :users, only: [:show]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount Thredded::Engine => '/forum'

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  root "pages#landing"

  get "simple", to: "pages#simple"
  get "no-router", to: "pages#no_router"

  # React Router needs a wildcard
  get "react-router(/*all)", to: "pages#index"

  get '/landing', to: "pages#landing"
  get '/timeline', to: "pages#timeline"
  get '/jefflator', to: "jefflator#index"
  get '/jefflate', to: "jefflator#jefflate"

  get '/s/:token', to: "suggestions#share"
  get '/suggestion', to: "suggestions#index"
  get '/suggest', to: "suggestions#suggest", as: :suggest_share

  # random stuff
  get '/hourofcode', to: "pages#hourofcode"


  resources :timelines, only: [:new]
  resources :timelines, as: :time, param: :share_token, only: [:show]
  resources :timelines, param: :edit_token, only: [:edit]
  resources :timelines, param: :id, only: [:update]


  resources :comments
  resources :events
  resources :contact_requests

  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :documents, only: [:index, :create]
      resources :uploads, only: [:create]
    end
  end


  mount ActionCable.server => "/cable"
end
