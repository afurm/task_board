module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^graphql-ws(.*)$': '<rootDir>/src/__mocks__/graphql-ws.ts',
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
            useESM: true,
        }],
        '^.+\\.(js|jsx)$': ['babel-jest', { rootMode: 'upward' }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!(graphql-tag|@apollo/client|ts-invariant)/)',
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleDirectories: ['node_modules', 'src'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
            useESM: true,
        },
    },
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
}; 