class IdeaTagAssociator

def self.call(idea_id, tags)
  @idea = Idea.find_by(id: idea_id)
  tags = tags.split(",")
  unless tags.empty? 
    tag_ids = find_or_create_tag_ids(tags)
    create_idea_tags(tag_ids)
  end

end

def self.find_or_create_tag_ids(tags)
  tags.map { |tag| (Tag.find_or_create_by(name: tag)).id }
end

def self.create_idea_tags(tag_ids)
  tag_ids.each { |tag_id| IdeaTag.create(idea_id: @idea.id, tag_id: tag_id) }
  return tag_ids
end

end