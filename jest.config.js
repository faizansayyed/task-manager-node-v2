module.exports = {
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ["node_modules", "src/config", "src/app.ts", "tests"],
  coverageReporters: ["text", "lcov", "clover", "html"],
};
