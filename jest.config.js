module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts", // this excludes server startup files
        "!src/types/**/*.ts", // this excludes type definitions
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "/config/",
        "/src/api/v1/constants/",
        "/src/api/v1/models/",
        "/src/api/v1/errors/",
        "/src/api/v1/middleware/",
        "/src/api/v1/repositories/",
    ],
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
};
