import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  verbose: true,
  testEnvironment: "jsdom",
  // collectCoverage: true,
  coverageDirectory: "coverage",
  testMatch: [
    "**/test/**/?(*.)+(unit).+(spec|test).+(ts|tsx|js)",
    "!**/?(*.)+(e2e|integration).+(spec|test).+(ts|tsx|js)"
  ],
  // coverageReporters: ["text", "cobertura", "json", "lcov", "clover"],
  // collectCoverageFrom: [
  //   "**/*.ts",
  //   "!**/coverage/**",
  //   "!**/test/**",
  //   "!**/*.test.ts"
  // ],
};
export default config;
