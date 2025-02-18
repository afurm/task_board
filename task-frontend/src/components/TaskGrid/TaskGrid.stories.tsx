import type { Meta, StoryObj } from '@storybook/react';
import { TaskGrid } from './TaskGrid';

const meta = {
    title: 'Components/TaskGrid',
    component: TaskGrid,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TaskGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTasks = [
    {
        id: '1',
        name: 'Complete Project Proposal',
        project: { id: 'project1', name: 'Website Redesign' },
        createdAt: '2024-01-01T10:00:00Z',
    },
    {
        id: '2',
        name: 'Review Pull Request',
        project: { id: 'project1', name: 'Website Redesign' },
        createdAt: '2024-01-02T11:30:00Z',
    },
    {
        id: '3',
        name: 'Update Documentation',
        project: { id: 'project2', name: 'Mobile App' },
        createdAt: '2024-01-03T09:15:00Z',
    },
];

// Create error object outside of story definition
const mockError = { message: 'Failed to load tasks' } as Error;

export const Default: Story = {
    args: {
        tasks: mockTasks,
        loading: false,
        error: null,
    },
};

export const Loading: Story = {
    args: {
        tasks: [],
        loading: true,
        error: null,
    },
};

export const Empty: Story = {
    args: {
        tasks: [],
        loading: false,
        error: null,
    },
};

export const Error: Story = {
    args: {
        tasks: [],
        loading: false,
        error: mockError,
    },
};

export const SingleTask: Story = {
    args: {
        tasks: [mockTasks[0]],
        loading: false,
        error: null,
    },
};

export const ManyTasks: Story = {
    args: {
        tasks: Array(10).fill(null).map((_, index) => ({
            id: `task${index}`,
            name: `Task ${index + 1}`,
            project: { id: 'project1', name: 'Large Project' },
            createdAt: new Date(2024, 0, index + 1).toISOString(),
        })),
        loading: false,
        error: null,
    },
}; 