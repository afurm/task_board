# frozen_string_literal: true

module Types
  class SubscriptionType < Types::BaseObject
    field :task_created, Types::TaskType, null: false,
      description: "Called when a new task is created"

    def task_created
      object
    end
  end
end 