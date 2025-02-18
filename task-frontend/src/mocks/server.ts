// @ts-nocheck
import { setupServer } from 'msw/node';
import { graphql } from 'msw';

// Define handlers for GraphQL operations
export const handlers = [
    // Query: Get all projects
    graphql.query('GetProjects', ((_req, res, ctx) => {
        return res(
            ctx.data({
                projects: [
                    { id: '1', name: 'Project 1' },
                    { id: '2', name: 'Project 2' },
                ],
            })
        );
    }) as any),

    // Query: Get tasks by project
    graphql.query('GetTasksByProject', ((req, res, ctx) => {
        const { projectId } = req.variables;
        return res(
            ctx.data({
                tasksByProject: [
                    {
                        id: '1',
                        name: 'Task 1',
                        createdAt: '2024-01-01T12:00:00Z',
                        project: { id: projectId, name: 'Project 1' },
                    },
                    {
                        id: '2',
                        name: 'Task 2',
                        createdAt: '2024-01-01T12:01:00Z',
                        project: { id: projectId, name: 'Project 1' },
                    },
                ],
            })
        );
    }) as any),

    // Operation for task creation (replacing subscription)
    graphql.operation(((req, res, ctx) => {
        if (req.operationName === 'OnTaskCreated') {
            return res(
                ctx.data({
                    taskCreated: {
                        id: '3',
                        name: 'New Task 12:00:00',
                        createdAt: '2024-01-01T12:00:00Z',
                        project: { id: '1', name: 'Project 1' },
                    },
                })
            );
        }
        return undefined;
    }) as any),
];

// Create mock server instance
export const server = setupServer(...handlers);