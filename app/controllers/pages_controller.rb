class PagesController < ApplicationController

def index
  @ideas = Idea.all
end

end