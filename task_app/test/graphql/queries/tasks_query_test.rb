require "test_helper"

module Queries
  class TasksQueryTest < ActiveSupport::TestCase
    def setup
      @project = Project.create!(name: "Test Project")
      @task1 = @project.tasks.create!(name: "Task 1")
      @task2 = @project.tasks.create!(name: "Task 2")
      @tasks_query = <<~GQL
        query {
          tasks {
            id
            name
            project {
              id
              name
            }
          }
        }
      GQL
    end

    test "should return all tasks" do
      result = TaskAppSchema.execute(@tasks_query)
      tasks = result["data"]["tasks"]

      assert_equal 2, tasks.length
      assert_equal @task1.name, tasks[0]["name"]
      assert_equal @task2.name, tasks[1]["name"]
    end

    test "should return tasks by project id" do
      query = <<~GQL
        query {
          tasksByProject(projectId: "#{@project.id}") {
            id
            name
            project {
              id
              name
            }
          }
        }
      GQL

      result = TaskAppSchema.execute(query)
      tasks = result["data"]["tasksByProject"]

      assert_equal 2, tasks.length
      assert_equal @project.name, tasks[0]["project"]["name"]
      assert_equal @project.name, tasks[1]["project"]["name"]
    end

    test "should return empty array for non-existent project" do
      query = <<~GQL
        query {
          tasksByProject(projectId: "0") {
            id
            name
          }
        }
      GQL

      result = TaskAppSchema.execute(query)
      tasks = result["data"]["tasksByProject"]

      assert_empty tasks
    end
  end
end 