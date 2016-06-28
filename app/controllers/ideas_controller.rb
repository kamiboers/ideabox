class IdeasController < ApplicationController
  respond_to :html, :json

def index
  @ideas = Idea.all
end

end