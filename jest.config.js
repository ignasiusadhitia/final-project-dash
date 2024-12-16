export default {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Transform file JS, JSX, TS, and TSX using Babel
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS files
    '\\.(svg|png|jpg|jpeg|gif)$': 'jest-transform-stub', // Mock image files
    '^@icons$': '<rootDir>/src/assets/icons/index.js',
    '^@images$': '<rootDir>/src/assets/images/index.js',
    '^@components$': '<rootDir>/src/components/index.js',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@pages$': '<rootDir>/src/pages/index.js',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
