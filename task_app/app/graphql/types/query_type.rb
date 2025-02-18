# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :projects, [Types::ProjectType], null: false,
      description: "Returns a list of all projects"
    
    field :project, Types::ProjectType, null: true,
      description: "Returns a single project" do
      argument :id, ID, required: true
    end

    field :tasks, [Types::TaskType], null: false,
      description: "Returns a list of all tasks"
    
    field :tasks_by_project, [Types::TaskType], null: false,
      description: "Returns a list of tasks for a specific project" do
      argument :project_id, ID, required: true
    end

    def projects
      Project.all
    end

    def project(id:)
      Project.find_by(id: id)
    end

    def tasks
      Task.all
    end

    def tasks_by_project(project_id:)
      Task.where(project_id: project_id)
    end
  end
end
