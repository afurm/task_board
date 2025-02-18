import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../graphql/queries';
import './ProjectSelector.css';

interface Project {
  id: string;
  name: string;
}

interface ProjectSelectorProps {
  selectedProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  selectedProjectId,
  onProjectSelect,
}) => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return (
      <div className="project-selector-loading" data-testid="project-selector-loading">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-selector-error" data-testid="project-selector-error">
        {error.message}
      </div>
    );
  }

  return (
    <div className="project-selector" data-testid="project-selector">
      <select
        value={selectedProjectId || ''}
        onChange={(e) => onProjectSelect(e.target.value)}
        disabled={loading}
      >
        <option value="">Select a project</option>
        {data?.projects.map((project: Project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}; 