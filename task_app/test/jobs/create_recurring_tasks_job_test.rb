require "test_helper"

class CreateRecurringTasksJobTest < ActiveJob::TestCase
  def setup
    super
    @project1 = Project.create!(name: "Project 1")
    @project2 = Project.create!(name: "Project 2")
  end

  test "should create a new task for each project" do
    assert_difference 'Task.count', 2 do
      CreateRecurringTasksJob.perform_now
    end
  end

  test "should create tasks with timestamp in name" do
    travel_to Time.zone.local(2024, 1, 1, 12, 0, 0) do
      CreateRecurringTasksJob.perform_now
      
      new_tasks = Task.last(2)
      new_tasks.each do |task|
        assert_match /New Task 12:00:00/, task.name
      end
    end
  end

  test "should associate tasks with correct projects" do
    CreateRecurringTasksJob.perform_now
    
    new_tasks = Task.last(2)
    project_ids = new_tasks.map(&:project_id)
    
    assert_includes project_ids, @project1.id
    assert_includes project_ids, @project2.id
  end

  test "should trigger subscription for each new task" do
    CreateRecurringTasksJob.perform_now
    
    triggered_events = TaskAppSchema.subscriptions.triggered_events
    assert_equal 2, triggered_events.length
    
    triggered_events.each do |event|
      assert_equal 'taskCreated', event[0]
      assert_instance_of Task, event[2]
    end
  end

  test "should handle empty projects gracefully" do
    Project.destroy_all
    
    assert_no_difference 'Task.count' do
      CreateRecurringTasksJob.perform_now
    end
  end
end
