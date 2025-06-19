import { JestConfigWithTsJest } from "ts-jest";
/**
 * Jest configuration for TypeScript project.
 * 
 * - `preset`: Uses `ts-jest` for transforming TypeScript files.
 * - `verbose`: Enables verbose test output.
 * - `testEnvironment`: Uses `jest-environment-jsdom` for simulating a browser environment.
 * - `moduleDirectories`: Includes `node_modules` and root directory for module resolution.
 * - `moduleFileExtensions`: Array of file extensions Jest will process.
 * - `moduleNameMapper`: Maps module paths and handles CSS/SCSS imports.
 * - `transform`: Configures `babel-jest` to process various file types with specific Babel presets.
 */
const config: JestConfigWithTsJest = {
 
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",  
    "\\.(css|scss)$": "identity-obj-proxy", 
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"] }],
    "\\.[jt]sx?$": "babel-jest",
  },
};

export default config;
