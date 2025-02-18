import React from 'react';
import { Task } from '../../types';
import './TaskList.css';

interface TaskListProps {
    tasks: Task[];
    loading?: boolean;
    error?: Error;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, loading, error }) => {
    if (loading) return <div className="task-list-loading">Loading tasks...</div>;
    if (error) return <div className="task-list-error">Error: {error.message}</div>;
    if (!tasks.length) return <div className="task-list-empty">No tasks found</div>;

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div key={task.id} className="task-list-item">
                    <div className="task-content">
                        <h3 className="task-name">{task.name}</h3>
                        <span className="task-project">Project: {task.project.name}</span>
                    </div>
                    <div className="task-timestamp">
                        {new Date(task.createdAt).toLocaleString()}
                    </div>
                </div>
            ))}
        </div>
    );
}; 