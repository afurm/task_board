class CreateRecurringTasksJob < ApplicationJob
  queue_as :default

  def perform
    Project.find_each do |project|
      timestamp = Time.current.strftime("%H:%M:%S")
      task = Task.create!(
        name: "New Task #{timestamp}",
        project: project
      )
      
      # Trigger subscription
      TaskAppSchema.subscriptions.trigger(
        'taskCreated',
        {},
        task
      )
      
      Rails.logger.info "Created new task for project: #{project.name}"
    end
  end
end
