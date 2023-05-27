/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true, // Automatically clear mock calls, instances, contexts and results before every test
    collectCoverage: true, // Indicates whether the coverage information should be collected while executing the test
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'], // An array of glob patterns indicating a set of files for which coverage information should be collected

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'entity.ts',
        'dto.ts',
        'index.ts',
        'datasource.ts',
        'interface.ts',
        'tests/',
        'src/main.ts',
        'src/app.ts',
        '.type.ts',
    ],
    coverageProvider: 'v8', // Indicates which provider should be used to instrument code for coverage
    coverageReporters: ['text'], // A list of reporter names that Jest uses when writing coverage reports
    roots: ['<rootDir>/tests'], // A list of paths to directories that Jest should use to search for files in
    setupFiles: ['dotenv/config'], // The paths to modules that run some code to configure or set up the testing environment before each test
    testMatch: ['tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'], // The glob patterns Jest uses to detect test files
};
