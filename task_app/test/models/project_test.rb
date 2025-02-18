require "test_helper"

class ProjectTest < ActiveSupport::TestCase
  def setup
    @project = Project.new(name: "Test Project")
  end

  test "should be valid with a name" do
    assert @project.valid?
  end

  test "should require a name" do
    @project.name = nil
    assert_not @project.valid?
    assert_includes @project.errors[:name], "can't be blank"
  end

  test "should have many tasks" do
    assert_respond_to @project, :tasks
  end

  test "should destroy associated tasks when project is destroyed" do
    @project.save
    @project.tasks.create!(name: "Test Task")
    
    assert_difference 'Task.count', -1 do
      @project.destroy
    end
  end
end
