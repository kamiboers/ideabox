class Api::V1::IdeasController < Api::V1::BaseController

  def index
    render json: Idea.all
  end

  def create
    idea = Idea.new(idea_params)
      render json: idea if idea.save
  end

  # def update
  #   @idea = Idea.find_by(id: params[:id])
  #   render json: @idea.update!(idea_params)
  # end

  # def destroy
  #   @idea = Idea.find_by(id: params[:id])
  #   @idea.destroy
  # end



  private
  
  def idea_params
    params.require(:idea).permit(:title, :body)
  end

end