/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
	transform: {
		"node_modules/(react-dnd|dnd-core|@react-dnd)/.+\\.(j|t)sx?$": "ts-jest",
		"^.+.tsx?$": [
			"ts-jest",
			{
				tsconfig: "./tsconfig.test.json",
			},
		],
		"^.+\\.js$": "babel-jest",
	},
	transformIgnorePatterns: [`/node_modules/(?!(somePkg)|react-dnd|dnd-core|@react-dnd)`],
	testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"], // Ignore Next.js build and node_modules
	moduleDirectories: ["node_modules", "<rootDir>/src"], // Look for modules in src/ as well
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@components/(.*)$": "<rootDir>/src/components/$1",
		"^@ui": "<rootDir>/src/components/ui",
		"^@ui/(.*)$": "<rootDir>/src/components/ui/$1",
		"^@test-utils": "<rootDir>/src/lib/utils/testing/utils",
		"^@test-utils/(.*)$": "<rootDir>/src/lib/utils/testing/$1",
		"^@types/(.*)$": "<rootDir>/src/types/$1",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
		"\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock static files
		'use-resize-observer': 'use-resize-observer/polyfilled'
	},
};
