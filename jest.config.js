module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            diagnostics: false,
        }
    },
    roots: [
        'src',
    ],
    collectCoverageFrom: [
        'src/**/*.{ts, tsx}',
        
        // no coverage in
        '!**/node_modules/**',
        '!**/components/**',
    ],
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    testMatch: [
        '**/*.test.(ts)'
    ],
    testEnvironment: 'node'
};
