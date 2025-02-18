// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

// Extend expect with custom matchers
declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveNoViolations(): R;
        }
    }
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() { }
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
} as any;

// Mock WebSocket
class MockWebSocket {
    constructor() { }
    send() { }
    close() { }
}

global.WebSocket = MockWebSocket as any;

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        if (
            typeof args[0] === 'string' &&
            (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
                args[0].includes('WebSocket connection to') ||
                args[0].includes('Failed to connect to WebSocket') ||
                args[0].includes('No more mocked responses for the query') ||
                args[0].includes('subscription OnTaskCreated') ||
                args[0].includes('An error occurred!') ||
                args[0].includes('Error fetching tasks'))
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

// Mock the subscription client
jest.mock('graphql-ws', () => ({
    createClient: () => ({
        subscribe: ({ next }: any) => {
            next?.({ data: { taskCreated: null } });
            return { unsubscribe: () => { } };
        },
    }),
}));

// Mock date formatting
jest.mock('../src/utils/dateUtils', () => ({
    formatDate: (date: string) => new Date(date).toLocaleDateString(),
}));

afterAll(() => {
    console.error = originalError;
}); 