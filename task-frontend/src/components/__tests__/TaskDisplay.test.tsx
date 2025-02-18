import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_TASKS_BY_PROJECT } from '../../graphql/queries';
import { TASK_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions';
import { TaskDisplay } from '../../App';

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

describe('TaskDisplay', () => {
    it('shows loading state initially', async () => {
        const loadingMock = [{
            request: {
                query: GET_TASKS_BY_PROJECT,
                variables: { projectId: 'project1' },
            },
            result: {
                data: {
                    tasksByProject: [],
                },
            },
            delay: 100,
        },
        {
            request: {
                query: TASK_CREATED_SUBSCRIPTION,
            },
            result: {
                data: null,
            },
        }];

        render(
            <MockedProvider mocks={loadingMock} addTypename={false}>
                <TaskDisplay projectId="project1" viewStyle="grid" />
            </MockedProvider>
        );

        // Loading state should be visible immediately
        expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();
    });

    it('displays tasks after loading', async () => {
        const successMocks = [{
            request: {
                query: GET_TASKS_BY_PROJECT,
                variables: { projectId: 'project1' },
            },
            result: {
                data: {
                    tasksByProject: mockTasks,
                },
            },
        },
        {
            request: {
                query: TASK_CREATED_SUBSCRIPTION,
            },
            result: {
                data: null,
            },
        }];

        render(
            <MockedProvider mocks={successMocks} addTypename={false}>
                <TaskDisplay projectId="project1" viewStyle="grid" />
            </MockedProvider>
        );

        // Wait for tasks to load
        await waitFor(() => {
            expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        });
        expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    });

    it('shows error state when query fails', async () => {
        const errorMocks = [{
            request: {
                query: GET_TASKS_BY_PROJECT,
                variables: { projectId: 'project1' },
            },
            error: new Error('An error occurred'),
        },
        {
            request: {
                query: TASK_CREATED_SUBSCRIPTION,
            },
            result: {
                data: null,
            },
        }];

        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <TaskDisplay projectId="project1" viewStyle="grid" />
            </MockedProvider>
        );

        // Wait for error state
        await waitFor(() => {
            expect(screen.getByText(/An error occurred/)).toBeInTheDocument();
        });
    });

    it('switches between grid and list views', async () => {
        const viewMocks = [{
            request: {
                query: GET_TASKS_BY_PROJECT,
                variables: { projectId: 'project1' },
            },
            result: {
                data: {
                    tasksByProject: mockTasks,
                },
            },
        },
        {
            request: {
                query: TASK_CREATED_SUBSCRIPTION,
            },
            result: {
                data: null,
            },
        }];

        const { rerender } = render(
            <MockedProvider mocks={viewMocks} addTypename={false}>
                <TaskDisplay projectId="project1" viewStyle="grid" />
            </MockedProvider>
        );

        // Wait for initial render
        await waitFor(() => {
            expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        });

        // Re-render with list view
        rerender(
            <MockedProvider mocks={viewMocks} addTypename={false}>
                <TaskDisplay projectId="project1" viewStyle="list" />
            </MockedProvider>
        );

        // Verify content is still present
        expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    });
}); 