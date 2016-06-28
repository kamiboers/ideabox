class Api::V1::IdeasController < Api::V1::BaseController

  def index
    render json: Idea.all
  end

  def create
    idea = Idea.new(idea_params)
      render json: idea if idea.save
  end

  def update
    binding.pry
    @idea = Idea.find_by(id: params[:id])
    if params[:change] == "thumbs-up"
      @idea.thumbs-up
    elsif params[:change] == "thumbs-down"
      @idea.thumbs-up
    else
      render json: @idea.update!(idea_params)
    end
  end

  def upvote
    @idea = Idea.find_by(id: params[:id])
    render json: @idea.thumbs_up
  end

  def downvote
    @idea = Idea.find_by(id: params[:id])
    render json: @idea.thumbs_down
  end


  def destroy
    @idea = Idea.find_by(id: params[:id])
    render json: @idea.destroy
  end



  private
  
  def idea_params
    params.require(:idea).permit(:title, :body)
  end

end