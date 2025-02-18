# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
puts "Cleaning database..."
Task.destroy_all
Project.destroy_all

# Create projects
puts "Creating projects..."
project1 = Project.create!(
  name: "Website Redesign"
)

project2 = Project.create!(
  name: "Mobile App Development"
)

# Create tasks for Website Redesign
puts "Creating tasks for Website Redesign..."
Task.create!([
  {
    name: "Design Homepage Mockup",
    project: project1
  },
  {
    name: "Implement Responsive Layout",
    project: project1
  },
  {
    name: "Create Navigation Menu",
    project: project1
  }
])

# Create tasks for Mobile App Development
puts "Creating tasks for Mobile App Development..."
Task.create!([
  {
    name: "Setup Development Environment",
    project: project2
  },
  {
    name: "Design User Authentication Flow",
    project: project2
  },
  {
    name: "Create API Integration Layer",
    project: project2
  }
])

puts "Seeding completed! Created:"
puts "- #{Project.count} projects"
puts "- #{Task.count} tasks"
