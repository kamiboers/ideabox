class Api::V1::IdeasController < Api::V1::BaseController

  def index
    render json: Idea.all
  end

  def create
    render json: Idea.create(idea_params)
  end

  def update
    @idea = Idea.find_by(id: params[:id])
    render json: @idea.update!(idea_params)
  end

  def destroy
    @idea = Idea.find_by(id: params[:id])
    @idea.destroy
  end

  def 

  private
  
  def idea_params
    params.require(:idea).permit(:title, :body)
  end

end