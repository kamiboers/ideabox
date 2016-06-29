require "rails_helper"

RSpec.feature "Idea Index", :type => :feature do
  scenario "user visits index of ideas" do
    idea = Idea.create(title: "Freeform", body: "String")
    visit root_path
    save_and_open_page

    expect(page).to have_text("Freeform")
    expect(page).to have_text("String")
    expect(page).to have_text("swill")
  end
end