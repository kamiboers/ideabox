class Idea < ActiveRecord::Base
  has_many :idea_tags
  has_many :tags, through: :idea_tags
  
  validates :title, presence: true, uniqueness: true
  validates :body, presence: true
  enum quality: { swill: 0, plausible: 1, genius: 2 }

  def thumbs_up
    increment!(:quality)
    return self
  end

  def thumbs_down
    decrement!(:quality)
    return self
  end

  def update_text(type, contents)
    update_attributes!(title: contents) if type == "title"
    update_attributes!(body: contents) if type == "body"
    return self
  end

end
