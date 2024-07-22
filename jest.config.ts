import { create } from "lodash";

const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

const config = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
	preset: "ts-jest",
	transform: {
		"^.+.tsx?$": ["ts-jest", {}],
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@components/(.*)$": "<rootDir>/src/components/$1",
		"^@ui/(.*)$": "<rootDir>/src/components/ui/$1",
		"^@test-utils/(.*)$": "<rootDir>/src/lib/utils/testing/$1",
		"^@types/(.*)$": "<rootDir>/src/types/$1",
	},
};

export default createJestConfig(config);
