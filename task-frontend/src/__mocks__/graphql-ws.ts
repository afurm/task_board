export const createClient = jest.fn(() => ({
    subscribe: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    terminate: jest.fn(),
}));

export const TerminatedCloseEvent = {
    code: 1000,
    reason: 'Normal Closure',
    wasClean: true,
}; 