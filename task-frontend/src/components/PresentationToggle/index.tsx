import React from 'react';
import { ViewStyle } from '../../hooks/useViewPreference';
import './PresentationToggle.css';

interface PresentationToggleProps {
    viewStyle: ViewStyle;
    onToggle: () => void;
}

export const PresentationToggle: React.FC<PresentationToggleProps> = ({
    viewStyle,
    onToggle,
}) => {
    return (
        <div className="presentation-toggle">
            <button
                className={`toggle-button ${viewStyle === 'list' ? 'active' : ''}`}
                onClick={onToggle}
                title={`Switch to ${viewStyle === 'list' ? 'grid' : 'list'} view`}
            >
                <span className="toggle-icon">
                    {viewStyle === 'list' ? '☰' : '⊞'}
                </span>
                <span className="toggle-text">
                    {viewStyle === 'list' ? 'List View' : 'Grid View'}
                </span>
            </button>
        </div>
    );
}; 