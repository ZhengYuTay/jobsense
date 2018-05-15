module.exports = {
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  }
};
