class PagesController < ApplicationController

def index
  @idea = Idea.find_by(id: params[:id])
  @ideas = Idea.all
  respond_with(@ideas)
end

end