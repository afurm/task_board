import React from 'react';
import './PresentationToggle.css';

type ViewStyle = 'grid' | 'list';

interface PresentationToggleProps {
    viewStyle: ViewStyle;
    onToggle: (style: ViewStyle) => void;
}

export const PresentationToggle: React.FC<PresentationToggleProps> = ({
    viewStyle,
    onToggle,
}) => {
    return (
        <div className="presentation-toggle" data-testid="presentation-toggle">
            <button
                className={`toggle-button ${viewStyle === 'grid' ? 'active' : ''}`}
                onClick={() => viewStyle !== 'grid' && onToggle('grid')}
                aria-pressed={viewStyle === 'grid'}
                aria-label="Grid View"
            >
                Grid
            </button>
            <button
                className={`toggle-button ${viewStyle === 'list' ? 'active' : ''}`}
                onClick={() => viewStyle !== 'list' && onToggle('list')}
                aria-pressed={viewStyle === 'list'}
                aria-label="List View"
            >
                List
            </button>
        </div>
    );
}; 