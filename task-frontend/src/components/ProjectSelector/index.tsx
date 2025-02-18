import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../graphql/queries';
import { Project } from '../../types';
import './ProjectSelector.css';

interface ProjectSelectorProps {
  selectedProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  selectedProjectId,
  onProjectSelect,
}) => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error.message}</div>;

  return (
    <div className="project-selector">
      <h2>Select Project</h2>
      <select
        value={selectedProjectId || ''}
        onChange={(e) => onProjectSelect(e.target.value)}
        className="project-select"
      >
        <option value="">Select a project</option>
        {data.projects.map((project: Project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}; 