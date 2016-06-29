class IdeasController < ApplicationController
  respond_to :html

def index
  @ideas = Idea.order(created_at: :asc)
  # @idea = Idea.new
end

# def create
#   @ideas = Idea.order(updated_at: :desc)
#   @idea = Idea.create!(idea_params)
# end

# def show
#     @idea = Idea.find(params[:id])
# end

# def edit
#   @idea = Idea.find(params[:id])
# end

# def update
#     @idea = Idea.find(params[:id])

#     if (params[:thumbs] == "up")
#       @idea.thumbs_up 
#     elsif (params[:thumbs] == "down")
#       @idea.thumbs_down
#     else
#       @idea.update_attributes(idea_params)
#     end 
# end

# def destroy
#   @idea = Idea.find(params[:id])
#   @idea.destroy
# end


end