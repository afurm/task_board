import React from 'react';
import { Task } from '../../types';
import './TaskGrid.css';

interface TaskGridProps {
    tasks: Task[];
    loading?: boolean;
    error?: Error;
}

export const TaskGrid: React.FC<TaskGridProps> = ({ tasks, loading, error }) => {
    if (loading) return <div className="task-grid-loading">Loading tasks...</div>;
    if (error) return <div className="task-grid-error">Error: {error.message}</div>;
    if (!tasks.length) return <div className="task-grid-empty">No tasks found</div>;

    return (
        <div className="task-grid">
            {tasks.map((task) => (
                <div key={task.id} className="task-grid-item">
                    <div className="task-card">
                        <h3 className="task-name">{task.name}</h3>
                        <span className="task-project">Project: {task.project.name}</span>
                        <div className="task-timestamp">
                            {new Date(task.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}; 