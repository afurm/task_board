import React from 'react';
import { render, screen, waitFor, fireEvent } from '../../../test-utils';
import { ProjectSelector } from '..';

describe('ProjectSelector', () => {
  const mockOnProjectSelect = jest.fn();

  beforeEach(() => {
    mockOnProjectSelect.mockClear();
  });

  it('renders loading state initially', () => {
    render(
      <ProjectSelector
        selectedProjectId={null}
        onProjectSelect={mockOnProjectSelect}
      />
    );
    expect(screen.getByText('Loading projects...')).toBeInTheDocument();
  });

  it('displays projects after loading', async () => {
    render(
      <ProjectSelector
        selectedProjectId={null}
        onProjectSelect={mockOnProjectSelect}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
    });
  });

  it('calls onProjectSelect when a project is selected', async () => {
    render(
      <ProjectSelector
        selectedProjectId={null}
        onProjectSelect={mockOnProjectSelect}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });

    expect(mockOnProjectSelect).toHaveBeenCalledWith('1');
  });

  it('shows the selected project', async () => {
    render(
      <ProjectSelector
        selectedProjectId="1"
        onProjectSelect={mockOnProjectSelect}
      />
    );

    await waitFor(() => {
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('1');
    });
  });
}); 