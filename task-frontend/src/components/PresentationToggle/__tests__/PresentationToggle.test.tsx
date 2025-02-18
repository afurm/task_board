import React from 'react';
import { render, screen, fireEvent } from '../../../test-utils';
import { PresentationToggle } from '..';
import { ViewStyle } from '../../../hooks/useViewPreference';

describe('PresentationToggle', () => {
    const mockOnToggle = jest.fn();

    beforeEach(() => {
        mockOnToggle.mockClear();
    });

    it('renders with list view selected', () => {
        render(
            <PresentationToggle
                viewStyle="list"
                onToggle={mockOnToggle}
            />
        );

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('List View');
        expect(button).toHaveClass('active');
    });

    it('renders with grid view selected', () => {
        render(
            <PresentationToggle
                viewStyle="grid"
                onToggle={mockOnToggle}
            />
        );

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Grid View');
        expect(button).toHaveClass('active');
    });

    it('calls onToggle when clicked', () => {
        render(
            <PresentationToggle
                viewStyle="list"
                onToggle={mockOnToggle}
            />
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('shows correct title based on current view', () => {
        render(
            <PresentationToggle
                viewStyle="list"
                onToggle={mockOnToggle}
            />
        );

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('title', 'Switch to grid view');
    });
}); 