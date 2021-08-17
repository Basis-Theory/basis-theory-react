/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@basis-theory/basis-theory-js':
      '<rootDir>/node_modules/@basis-theory/basis-theory-js/index.js',
  },
};
