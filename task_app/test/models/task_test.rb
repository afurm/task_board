require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def setup
    @project = Project.create!(name: "Test Project")
    @task = Task.new(name: "Test Task", project: @project)
  end

  test "should be valid with a name and project" do
    assert @task.valid?
  end

  test "should require a name" do
    @task.name = nil
    assert_not @task.valid?
    assert_includes @task.errors[:name], "can't be blank"
  end

  test "should require a project" do
    @task.project = nil
    assert_not @task.valid?
    assert_includes @task.errors[:project], "must exist"
  end

  test "should belong to a project" do
    assert_respond_to @task, :project
  end

  test "should be created with timestamp in name" do
    timestamp = Time.current.strftime("%H:%M:%S")
    task = Task.create!(name: "New Task #{timestamp}", project: @project)
    assert_match /New Task \d{2}:\d{2}:\d{2}/, task.name
  end
end
