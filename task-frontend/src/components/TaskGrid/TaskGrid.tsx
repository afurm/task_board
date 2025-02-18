import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import './TaskGrid.css';

interface Task {
    id: string;
    name: string;
    project: {
        id: string;
        name: string;
    };
    createdAt: string;
}

interface TaskGridProps {
    tasks: Task[];
    loading: boolean;
    error: Error | null;
}

export const TaskGrid: React.FC<TaskGridProps> = ({ tasks, loading, error }) => {
    if (loading) {
        return (
            <div className="task-grid-loading" data-testid="task-grid-loading">
                Loading tasks...
            </div>
        );
    }

    if (error) {
        return (
            <div className="task-grid-error" data-testid="task-grid-error">
                {error.message}
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="task-grid-empty" data-testid="task-grid-empty">
                No tasks found
            </div>
        );
    }

    return (
        <div className="task-grid" data-testid="task-grid">
            {tasks.map((task) => (
                <div key={task.id} className="task-grid-item" data-testid="task-grid-item">
                    <div className="task-card" data-testid="task-card">
                        <h3 className="task-name">{task.name}</h3>
                        <span className="task-project">Project: {task.project.name}</span>
                        <div className="task-timestamp">{formatDate(task.createdAt)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}; 