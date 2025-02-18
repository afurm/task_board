import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ProjectSelector } from '../ProjectSelector';
import { GET_PROJECTS } from '../../../graphql/queries';

const mockProjects = [
    { id: '1', name: 'Project 1' },
    { id: '2', name: 'Project 2' },
    { id: '3', name: 'Project 3' },
];

describe('ProjectSelector', () => {
    const defaultMocks = [
        {
            request: {
                query: GET_PROJECTS,
            },
            result: {
                data: {
                    projects: mockProjects,
                },
            },
        },
    ];

    it('shows loading state initially', () => {
        render(
            <MockedProvider mocks={defaultMocks} addTypename={false}>
                <ProjectSelector selectedProjectId={null} onProjectSelect={() => { }} />
            </MockedProvider>
        );

        expect(screen.getByTestId('project-selector-loading')).toBeInTheDocument();
        expect(screen.getByText(/Loading projects/i)).toBeInTheDocument();
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('renders projects after loading', async () => {
        render(
            <MockedProvider mocks={defaultMocks} addTypename={false}>
                <ProjectSelector selectedProjectId={null} onProjectSelect={() => { }} />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.queryByTestId('project-selector-loading')).not.toBeInTheDocument();
        });

        const select = screen.getByRole('combobox');
        const options = screen.getAllByRole('option');

        expect(select).toBeEnabled();
        expect(options).toHaveLength(mockProjects.length + 1);
        expect(options[0]).toHaveValue('');
        mockProjects.forEach((project, index) => {
            expect(options[index + 1]).toHaveValue(project.id);
            expect(options[index + 1]).toHaveTextContent(project.name);
        });
    });

    it('shows selected project', async () => {
        render(
            <MockedProvider mocks={defaultMocks} addTypename={false}>
                <ProjectSelector selectedProjectId="2" onProjectSelect={() => { }} />
            </MockedProvider>
        );

        await waitFor(() => {
            const select = screen.getByRole('combobox') as HTMLSelectElement;
            expect(select.value).toBe('2');
        });
    });

    it('calls onProjectSelect when a project is selected', async () => {
        const handleProjectSelect = jest.fn();

        render(
            <MockedProvider mocks={defaultMocks} addTypename={false}>
                <ProjectSelector selectedProjectId={null} onProjectSelect={handleProjectSelect} />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.queryByTestId('project-selector-loading')).not.toBeInTheDocument();
        });

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '2' } });

        expect(handleProjectSelect).toHaveBeenCalledWith('2');
    });

    it('shows error state when query fails', async () => {
        const errorMocks = [
            {
                request: {
                    query: GET_PROJECTS,
                },
                error: new Error('Failed to load projects'),
            },
        ];

        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <ProjectSelector selectedProjectId={null} onProjectSelect={() => { }} />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('project-selector-error')).toBeInTheDocument();
            expect(screen.getByText(/Failed to load projects/i)).toBeInTheDocument();
            expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
        });
    });

    it('handles loading state correctly', async () => {
        const loadingMock = [
            {
                request: {
                    query: GET_PROJECTS,
                },
                result: {
                    data: {
                        projects: mockProjects,
                    },
                },
                delay: 100,
            },
        ];

        render(
            <MockedProvider mocks={loadingMock} addTypename={false}>
                <ProjectSelector selectedProjectId={null} onProjectSelect={() => { }} />
            </MockedProvider>
        );

        expect(screen.getByTestId('project-selector-loading')).toBeInTheDocument();
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('project-selector-loading')).not.toBeInTheDocument();
        });

        const select = screen.getByRole('combobox');
        expect(select).toBeEnabled();
    });

    it('applies correct CSS classes', async () => {
        render(
            <MockedProvider mocks={defaultMocks} addTypename={false}>
                <ProjectSelector selectedProjectId={null} onProjectSelect={() => { }} />
            </MockedProvider>
        );

        await waitFor(() => {
            const container = screen.getByTestId('project-selector');
            expect(container).toHaveClass('project-selector');
        });
    });
}); 