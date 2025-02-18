import React, { useState } from 'react';
import { ApolloProvider, useQuery, useSubscription } from '@apollo/client';
import { client } from './graphql/client';
import { ProjectSelector } from './components/ProjectSelector';
import { PresentationToggle } from './components/PresentationToggle';
import { TaskList } from './components/TaskList';
import { TaskGrid } from './components/TaskGrid';
import { useViewPreference } from './hooks/useViewPreference';
import { GET_TASKS_BY_PROJECT } from './graphql/queries';
import { TASK_CREATED_SUBSCRIPTION } from './graphql/subscriptions';
import './App.css';

function TaskDisplay({ projectId, viewStyle }: { projectId: string; viewStyle: 'list' | 'grid' }) {
  const { loading, error, data, refetch } = useQuery(GET_TASKS_BY_PROJECT, {
    variables: { projectId },
    pollInterval: 5000, // Fallback polling every 5 seconds
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('Error fetching tasks:', error);
    },
    notifyOnNetworkStatusChange: true,
  });

  // Subscribe to new tasks
  useSubscription(TASK_CREATED_SUBSCRIPTION, {
    onData: ({ data }) => {
      const newTask = data?.data?.taskCreated;
      if (newTask && newTask.project.id === projectId) {
        // Refetch to ensure we have the latest data
        refetch();
      }
    },
    onError: (error) => {
      console.error('Subscription error:', error);
      // If subscription fails, we still have polling as fallback
    },
  });

  // Retry on error
  if (error) {
    return (
      <div className="error-container">
        <p>Error loading tasks: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  const commonProps = {
    tasks: data?.tasksByProject || [],
    loading,
    error,
  };

  return viewStyle === 'list' ? (
    <TaskList {...commonProps} />
  ) : (
    <TaskGrid {...commonProps} />
  );
}

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { viewStyle, toggleViewStyle } = useViewPreference();

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <main>
          <div className="controls">
            <ProjectSelector
              selectedProjectId={selectedProjectId}
              onProjectSelect={handleProjectSelect}
            />
            <PresentationToggle
              viewStyle={viewStyle}
              onToggle={toggleViewStyle}
            />
          </div>
          {selectedProjectId && (
            <div className={`selected-project ${viewStyle}-view`}>
              <TaskDisplay projectId={selectedProjectId} viewStyle={viewStyle} />
            </div>
          )}
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
