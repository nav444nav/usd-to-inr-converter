module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^\\.(css|less|scss)$': 'identity-obj-proxy',
    '^\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '^@testing-library/react$': '<rootDir>/node_modules/@testing-library/react',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!(axios|@babel/runtime|@testing-library|@testing-library/react-hooks)/)',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  // Mock environment variables
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  // Handle ES modules
  // Transform settings for TypeScript and JavaScript files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // Mock environment variables
  setupFiles: ['<rootDir>/jest.setup.js'],
  // Mock import.meta for tests
  globals: {
    'import.meta': {}
  },
};
