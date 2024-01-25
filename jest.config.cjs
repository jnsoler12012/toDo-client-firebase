/** @type {import('jest').Config} */

module.exports = {
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testMatch: [
        '<rootDir>/__tests__/**/*.(test|spec).(js|jsx)',
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/test/helpers/',
        '<rootDir>/node_modules/',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ["js", "json", "jsx"],
    "moduleNameMapper": {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    "unmockedModulePathPatterns": [
        "<rootDir>/node_modules/react",
        "<rootDir>/node_modules/react-dom",
        "<rootDir>/node_modules/react-addons-test-utils",
        "<rootDir>/EmptyModule.js"
    ]
};