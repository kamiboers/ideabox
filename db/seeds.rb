# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Idea.delete_all

Idea.create!([
  {id: 1, title: "Uno", body: "One"},
  {id: 2, title: "Dos", body: "Two"},
  {id: 3, title: "Tres", body: "Three"},
  {id: 4, title: "Cuatro", body: "Four"},
  {id: 5, title: "Cinco", body: "Five"}
])