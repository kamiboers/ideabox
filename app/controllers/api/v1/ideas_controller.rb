class Api::V1::IdeasController < Api::V1::BaseController

  def index
    render json: Idea.order(created_at: :asc)
  end

  def create
    idea = Idea.new(idea_params)
    if idea.save
      IdeaTagAssociator.call(idea.id, params[:idea][:tag_names])
      render json: idea
    end
  end

  def update
    @idea = Idea.find_by(id: params[:id])
    render json: @idea.update!(idea_params)
  end

  def upvote
    @idea = Idea.find_by(id: params[:id])
    render json: @idea.thumbs_up
  end

  def downvote
    @idea = Idea.find_by(id: params[:id])
    render json: @idea.thumbs_down
  end

  def save_text
    @idea = Idea.find_by(id: split_params.last)
    render json: @idea.update_text(split_params.first, params[:contents])
  end

  def destroy
    @idea = Idea.find_by(id: params[:id])
    @idea.idea_tags.destroy_all
    render json: @idea.destroy
  end

  def tags
    tags_list = Idea.find_by(id: params[:id]).tags.pluck(:name).join(",")
    render json: { tags: tags_list }
  end

  def all_tags
    render json: Tag.all.pluck(:name)
  end

  def by_tag
    render json: Idea.joins(:tags).where('tags.name = ?', params[:tag])
  end

  private
  
  def idea_params
    params.require(:idea).permit(:title, :body, :tags)
  end

  def split_params
    params[:id].split('_')
  end

end