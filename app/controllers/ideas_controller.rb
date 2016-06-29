class IdeasController < ApplicationController
  respond_to :html

def index
  @ideas = Idea.order(created_at: :asc)
end

end