require "test_helper"

module Queries
  class ProjectsQueryTest < ActiveSupport::TestCase
    def setup
      @project1 = Project.create!(name: "Project 1")
      @project2 = Project.create!(name: "Project 2")
      @query = <<~GQL
        query {
          projects {
            id
            name
          }
        }
      GQL
    end

    test "should return all projects" do
      result = TaskAppSchema.execute(@query)
      projects = result["data"]["projects"]

      assert_equal 2, projects.length
      assert_equal @project1.name, projects[0]["name"]
      assert_equal @project2.name, projects[1]["name"]
    end

    test "should return project by id" do
      query = <<~GQL
        query {
          project(id: "#{@project1.id}") {
            id
            name
          }
        }
      GQL

      result = TaskAppSchema.execute(query)
      project = result["data"]["project"]

      assert_equal @project1.name, project["name"]
    end

    test "should return null for non-existent project" do
      query = <<~GQL
        query {
          project(id: "0") {
            id
            name
          }
        }
      GQL

      result = TaskAppSchema.execute(query)
      assert_nil result["data"]["project"]
    end
  end
end