import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PresentationToggle } from '../PresentationToggle';

describe('PresentationToggle', () => {
    it('renders with grid view selected', () => {
        render(
            <PresentationToggle viewStyle="grid" onToggle={() => { }} />
        );

        const toggle = screen.getByTestId('presentation-toggle');
        expect(toggle).toBeInTheDocument();
        expect(toggle).toHaveClass('presentation-toggle');

        const gridButton = screen.getByRole('button', { name: /grid/i });
        const listButton = screen.getByRole('button', { name: /list/i });

        expect(gridButton).toHaveClass('active');
        expect(listButton).not.toHaveClass('active');
    });

    it('renders with list view selected', () => {
        render(
            <PresentationToggle viewStyle="list" onToggle={() => { }} />
        );

        const gridButton = screen.getByRole('button', { name: /grid/i });
        const listButton = screen.getByRole('button', { name: /list/i });

        expect(listButton).toHaveClass('active');
        expect(gridButton).not.toHaveClass('active');
    });

    it('calls onToggle when grid view is selected', () => {
        const handleToggle = jest.fn();
        render(
            <PresentationToggle viewStyle="list" onToggle={handleToggle} />
        );

        const gridButton = screen.getByRole('button', { name: /grid/i });
        fireEvent.click(gridButton);

        expect(handleToggle).toHaveBeenCalledWith('grid');
    });

    it('calls onToggle when list view is selected', () => {
        const handleToggle = jest.fn();
        render(
            <PresentationToggle viewStyle="grid" onToggle={handleToggle} />
        );

        const listButton = screen.getByRole('button', { name: /list/i });
        fireEvent.click(listButton);

        expect(handleToggle).toHaveBeenCalledWith('list');
    });

    it('does not call onToggle when clicking already active view', () => {
        const handleToggle = jest.fn();
        render(
            <PresentationToggle viewStyle="grid" onToggle={handleToggle} />
        );

        const gridButton = screen.getByRole('button', { name: /grid/i });
        fireEvent.click(gridButton);

        expect(handleToggle).not.toHaveBeenCalled();
    });

    it('applies correct accessibility attributes', () => {
        render(
            <PresentationToggle viewStyle="grid" onToggle={() => { }} />
        );

        const gridButton = screen.getByRole('button', { name: /grid/i });
        const listButton = screen.getByRole('button', { name: /list/i });

        expect(gridButton).toHaveAttribute('aria-pressed', 'true');
        expect(listButton).toHaveAttribute('aria-pressed', 'false');
        expect(gridButton).toHaveAttribute('aria-label', 'Grid View');
        expect(listButton).toHaveAttribute('aria-label', 'List View');
    });
}); 