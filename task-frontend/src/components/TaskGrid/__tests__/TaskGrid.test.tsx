import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskGrid } from '../TaskGrid';
import { formatDate } from '../../../utils/dateUtils';

const mockTasks = [
    {
        id: '1',
        name: 'Test Task 1',
        project: { id: 'project1', name: 'Project 1' },
        createdAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '2',
        name: 'Test Task 2',
        project: { id: 'project1', name: 'Project 1' },
        createdAt: '2024-01-02T00:00:00Z',
    },
];

describe('TaskGrid', () => {
    it('renders loading state', () => {
        render(<TaskGrid tasks={[]} loading={true} error={null} />);
        expect(screen.getByTestId('task-grid-loading')).toBeInTheDocument();
        expect(screen.getByText(/Loading tasks/i)).toBeInTheDocument();
    });

    it('renders error state', () => {
        const error = new Error('Test error message');
        render(<TaskGrid tasks={[]} loading={false} error={error} />);
        expect(screen.getByTestId('task-grid-error')).toBeInTheDocument();
        expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
    });

    it('renders empty state when no tasks', () => {
        render(<TaskGrid tasks={[]} loading={false} error={null} />);
        expect(screen.getByTestId('task-grid-empty')).toBeInTheDocument();
        expect(screen.getByText(/No tasks found/i)).toBeInTheDocument();
    });

    it('renders tasks correctly', () => {
        render(<TaskGrid tasks={mockTasks} loading={false} error={null} />);

        // Check grid container
        const grid = screen.getByTestId('task-grid');
        expect(grid).toBeInTheDocument();

        // Check task cards
        const taskCards = screen.getAllByTestId('task-card');
        expect(taskCards).toHaveLength(2);

        // Check task names
        expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        expect(screen.getByText('Test Task 2')).toBeInTheDocument();

        // Check project names using regex to match partial text
        const projectElements = screen.getAllByText(/Project: Project 1/);
        expect(projectElements).toHaveLength(2);

        // Check dates are formatted correctly
        const formattedDate1 = formatDate('2024-01-01T00:00:00Z');
        const formattedDate2 = formatDate('2024-01-02T00:00:00Z');
        expect(screen.getByText(formattedDate1)).toBeInTheDocument();
        expect(screen.getByText(formattedDate2)).toBeInTheDocument();
    });

    it('applies correct CSS classes and structure', () => {
        render(<TaskGrid tasks={mockTasks} loading={false} error={null} />);

        // Check grid container
        const grid = screen.getByTestId('task-grid');
        expect(grid).toHaveClass('task-grid');

        // Check task items
        const taskItems = screen.getAllByTestId('task-grid-item');
        expect(taskItems).toHaveLength(2);
        taskItems.forEach(item => {
            expect(item).toHaveClass('task-grid-item');
        });

        // Check task cards
        const taskCards = screen.getAllByTestId('task-card');
        expect(taskCards).toHaveLength(2);
        taskCards.forEach(card => {
            expect(card).toHaveClass('task-card');

            // Check card structure
            expect(card.querySelector('.task-name')).toBeInTheDocument();
            expect(card.querySelector('.task-project')).toBeInTheDocument();
            expect(card.querySelector('.task-timestamp')).toBeInTheDocument();
        });
    });

    it('renders task details in correct order', () => {
        render(<TaskGrid tasks={[mockTasks[0]]} loading={false} error={null} />);

        const taskCard = screen.getByTestId('task-card');
        const elements = taskCard.children;

        expect(elements[0]).toHaveClass('task-name');
        expect(elements[1]).toHaveClass('task-project');
        expect(elements[2]).toHaveClass('task-timestamp');

        expect(elements[0].textContent).toBe('Test Task 1');
        expect(elements[1].textContent).toBe('Project: Project 1');
        expect(elements[2].textContent).toBe(formatDate('2024-01-01T00:00:00Z'));
    });
});