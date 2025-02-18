import { useState, useEffect } from 'react';

export type ViewStyle = 'list' | 'grid';
const STORAGE_KEY = 'taskViewStyle';
const DEFAULT_VIEW: ViewStyle = 'list';

export const useViewPreference = () => {
    const [viewStyle, setViewStyle] = useState<ViewStyle>(() => {
        try {
            const savedStyle = localStorage.getItem(STORAGE_KEY);
            // Validate that the saved style is a valid ViewStyle
            if (savedStyle === 'list' || savedStyle === 'grid') {
                return savedStyle;
            }
            return DEFAULT_VIEW;
        } catch (error) {
            console.warn('Failed to read view preference from localStorage:', error);
            return DEFAULT_VIEW;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, viewStyle);
        } catch (error) {
            console.warn('Failed to save view preference to localStorage:', error);
        }
    }, [viewStyle]);

    const toggleViewStyle = () => {
        setViewStyle(current => current === 'list' ? 'grid' : 'list');
    };

    const setPreferredStyle = (style: ViewStyle) => {
        if (style !== 'list' && style !== 'grid') {
            console.warn('Invalid view style provided:', style);
            return;
        }
        setViewStyle(style);
    };

    return {
        viewStyle,
        toggleViewStyle,
        setViewStyle
    };
}; 