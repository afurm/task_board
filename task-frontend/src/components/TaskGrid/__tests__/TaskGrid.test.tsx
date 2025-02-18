import React from 'react';
import { render, screen } from '../../../test-utils';
import { TaskGrid } from '..';
import { Task } from '../../../types';

describe('TaskGrid', () => {
    const mockTasks: Task[] = [
        {
            id: '1',
            name: 'Task 1',
            project: { id: '1', name: 'Project 1' },
            createdAt: '2024-01-01T12:00:00Z',
        },
        {
            id: '2',
            name: 'Task 2',
            project: { id: '1', name: 'Project 1' },
            createdAt: '2024-01-01T12:01:00Z',
        },
    ];

    it('renders loading state', () => {
        render(<TaskGrid tasks={[]} loading={true} />);
        expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        render(<TaskGrid tasks={[]} error={new Error('Test error')} />);
        expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    });

    it('renders empty state', () => {
        render(<TaskGrid tasks={[]} />);
        expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });

    it('renders grid of tasks', () => {
        render(<TaskGrid tasks={mockTasks} />);

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getAllByText('Project: Project 1')).toHaveLength(2);
    });

    it('displays task timestamps', () => {
        render(<TaskGrid tasks={mockTasks} />);

        const timestamp1 = new Date('2024-01-01T12:00:00Z').toLocaleString();
        const timestamp2 = new Date('2024-01-01T12:01:00Z').toLocaleString();

        expect(screen.getByText(timestamp1)).toBeInTheDocument();
        expect(screen.getByText(timestamp2)).toBeInTheDocument();
    });

    it('uses grid layout', () => {
        render(<TaskGrid tasks={mockTasks} />);

        const grid = screen.getByRole('list');
        expect(grid).toHaveClass('task-grid');
    });
}); 