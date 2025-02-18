ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"
require "database_cleaner/active_record"
require_relative "support/mock_subscriptions"

DatabaseCleaner.strategy = :truncation

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def setup
      DatabaseCleaner.start
      # Reset subscription triggers
      TaskAppSchema.subscriptions.clear if TaskAppSchema.subscriptions.respond_to?(:clear)
    end

    def teardown
      DatabaseCleaner.clean
    end
  end
end
