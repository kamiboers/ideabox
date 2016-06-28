class IdeasController < ApplicationController
  respond_to :html, :json

def index
  @ideas = Idea.order(updated_at: :desc)
  @idea = Idea.new
  respond_with(@ideas)
end

def new
  @idea = Idea.new
end

def create
  @ideas = Idea.order(updated_at: :desc)
  @idea = Idea.create!(idea_params)
end

def show
    @idea = Idea.find(params[:id])
end

def edit
  @idea = Idea.find(params[:id])
end

def update
    @idea = Idea.find(params[:id])

    if (params[:thumbs] == "up")
      @idea.thumbs_up 
    elsif (params[:thumbs] == "down")
      @idea.thumbs_down
    else
      @idea.update_attributes(idea_params)
    end 
end

def destroy
  @idea = Idea.find(params[:id])
  @idea.destroy
end


  private
  
  def idea_params
    params.require(:idea).permit(:title, :body)
  end

end