class MockSubscriptions
  def initialize
    @triggers = []
  end

  def trigger(*args)
    @triggers << args
  end

  def triggered_events
    @triggers
  end

  def clear
    @triggers = []
  end
end

# Add mock subscriptions to the schema for testing
TaskAppSchema.subscriptions = MockSubscriptions.new 