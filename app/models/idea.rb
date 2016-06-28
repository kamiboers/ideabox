class Idea < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  validates :body, presence: true
  enum quality: { swill: 0, plausible: 1, genius: 2 }

  def thumbs_up
    increment!(:quality)
  end

  def thumbs_down
    decrement!(:quality)
  end

end
