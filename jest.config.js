module.exports = {
  "collectCoverageFrom": [
    `src/**/*.{ts,tsx,js,jsx}`,
    "!src/**/*.test.{ts,tsx,js,jsx}",
    "!src/*/RbGenerated*/*.{ts,tsx,js,jsx}",
    "!src/**/_stories.{ts,tsx}"
  ],
  "moduleDirectories": [
    "node_modules"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/lib/"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/internals/testing/bundler.js",
  "testRegex": '^.*test\.(ts|js)x?$',
  "transform": {
    "^.+\\.(js|ts)x?$": "babel-jest"
  },
}
